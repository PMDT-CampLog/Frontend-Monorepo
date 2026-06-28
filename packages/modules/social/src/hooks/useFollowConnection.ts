import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  followProfile,
  unfollowProfile,
  getConnectionStatus,
} from '@camplog/api'
import type { ProfileType, ConnectionStatus } from '@camplog/types'

/**
 * Query key factory para o módulo de conexões.
 * Centraliza as chaves de cache para invalidação precisa.
 */
export const connectionKeys = {
  status: (targetId: string, targetType: ProfileType) =>
    ['connection-status', targetId, targetType] as const,
  followers: (profileId: string, profileType: ProfileType) =>
    ['connection-followers', profileId, profileType] as const,
  following: (profileId: string, profileType: ProfileType) =>
    ['connection-following', profileId, profileType] as const,
}

/**
 * Props do hook useFollowConnection.
 *
 * DECISÃO DE DESIGN:
 * O hook recebe IDs e tipos do perfil alvo, e do usuário corrente.
 * O currentUserId é usado para habilitar/desabilitar a query de status —
 * se não estiver autenticado, o status não é buscado (evita 401 desnecessário).
 */
export interface UseFollowConnectionProps {
  /** ID do perfil alvo (quem será seguido/desseguido). */
  targetId: string
  /** Tipo do perfil alvo. */
  targetType: ProfileType
  /** ID do usuário autenticado (null se não autenticado). */
  currentUserId: string | null
  /** Tipo do perfil do usuário autenticado. */
  currentUserType: ProfileType
}

/**
 * Hook de estado compartilhado para gerenciar conexões (follow/unfollow).
 *
 * Funcionalidades:
 * - Busca o status de conexão via React Query (cache automático + refetch)
 * - Implementa **optimistic updates** para follow/unfollow — o UI atualiza
 *   instantaneamente antes da confirmação do server, com rollback automático em caso de erro
 * - Invalida cache de seguidores/seguindo após mutação bem-sucedida
 *
 * @example
 * ```tsx
 * const { isFollowing, followersCount, toggleFollow, isLoading } = useFollowConnection({
 *   targetId: 'uuid-123',
 *   targetType: 'CREATOR',
 *   currentUserId: user.id,
 *   currentUserType: 'SUPPORTER',
 * })
 * ```
 */
export function useFollowConnection({
  targetId,
  targetType,
  currentUserId,
  currentUserType,
}: UseFollowConnectionProps) {
  const queryClient = useQueryClient()
  const statusQueryKey = connectionKeys.status(targetId, targetType)

  /**
   * Query de status — busca isFollowing + contagens.
   * Desabilitada quando o usuário não está autenticado.
   * staleTime de 30s para reduzir requests redundantes ao navegar entre perfis.
   */
  const {
    data: status,
    isLoading: isStatusLoading,
    isError: isStatusError,
  } = useQuery({
    queryKey: statusQueryKey,
    queryFn: () => getConnectionStatus(targetId, targetType),
    enabled: !!currentUserId,
    staleTime: 30_000,
    retry: 1,
  })

  /**
   * Mutation de follow com optimistic update.
   *
   * OPTIMISTIC UPDATE:
   * 1. onMutate: atualiza o cache local ANTES da requisição
   * 2. onError: reverte ao estado anterior em caso de falha
   * 3. onSettled: invalida o cache para sincronizar com o server
   */
  const followMutation = useMutation({
    mutationFn: () => followProfile({ targetId, targetType }),

    onMutate: async () => {
      // Cancela queries em andamento para evitar race conditions
      await queryClient.cancelQueries({ queryKey: statusQueryKey })

      // Salva o estado anterior para rollback
      const previousStatus = queryClient.getQueryData<ConnectionStatus>(statusQueryKey)

      // Atualiza otimisticamente o cache
      queryClient.setQueryData<ConnectionStatus>(statusQueryKey, (old) => ({
        isFollowing: true,
        followersCount: (old?.followersCount ?? 0) + 1,
        followingCount: old?.followingCount ?? 0,
      }))

      return { previousStatus }
    },

    onError: (_error, _variables, context) => {
      // Rollback ao estado anterior em caso de erro
      if (context?.previousStatus) {
        queryClient.setQueryData(statusQueryKey, context.previousStatus)
      }
    },

    onSettled: () => {
      // Invalida caches relacionados para sincronizar com o server
      queryClient.invalidateQueries({ queryKey: statusQueryKey })
      queryClient.invalidateQueries({
        queryKey: connectionKeys.followers(targetId, targetType),
      })
      queryClient.invalidateQueries({
        queryKey: connectionKeys.following(currentUserId ?? '', currentUserType),
      })
    },
  })

  /**
   * Mutation de unfollow com optimistic update.
   * Mesma lógica do follow, mas inverte o sentido da atualização otimista.
   */
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowProfile({ targetId, targetType }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: statusQueryKey })

      const previousStatus = queryClient.getQueryData<ConnectionStatus>(statusQueryKey)

      queryClient.setQueryData<ConnectionStatus>(statusQueryKey, (old) => ({
        isFollowing: false,
        followersCount: Math.max((old?.followersCount ?? 1) - 1, 0),
        followingCount: old?.followingCount ?? 0,
      }))

      return { previousStatus }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousStatus) {
        queryClient.setQueryData(statusQueryKey, context.previousStatus)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: statusQueryKey })
      queryClient.invalidateQueries({
        queryKey: connectionKeys.followers(targetId, targetType),
      })
      queryClient.invalidateQueries({
        queryKey: connectionKeys.following(currentUserId ?? '', currentUserType),
      })
    },
  })

  /**
   * Função que alterna entre follow e unfollow baseado no estado atual.
   * Usada pelo FollowButton como handler de clique único.
   */
  const toggleFollow = () => {
    if (followMutation.isPending || unfollowMutation.isPending) return
    if (status?.isFollowing) {
      unfollowMutation.mutate()
    } else {
      followMutation.mutate()
    }
  }

  return {
    /** Se o usuário autenticado está seguindo o perfil alvo. */
    isFollowing: status?.isFollowing ?? false,

    /** Contagem de seguidores do perfil alvo. */
    followersCount: status?.followersCount ?? 0,

    /** Contagem de perfis que o alvo está seguindo. */
    followingCount: status?.followingCount ?? 0,

    /** Alterna entre follow/unfollow. */
    toggleFollow,

    /** Se alguma operação assíncrona está em andamento. */
    isLoading: isStatusLoading,

    /** Se a mutation de follow/unfollow está em andamento. */
    isMutating: followMutation.isPending || unfollowMutation.isPending,

    /** Se houve erro na busca de status. */
    isError: isStatusError,

    /** Se houve erro na mutation de follow. */
    followError: followMutation.error,

    /** Se houve erro na mutation de unfollow. */
    unfollowError: unfollowMutation.error,
  }
}
