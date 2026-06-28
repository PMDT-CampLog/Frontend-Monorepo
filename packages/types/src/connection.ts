/**
 * Tipos de domínio para o sistema de conexões (follow/unfollow).
 *
 * DECISÃO DE DESIGN:
 * ProfileType é um union type estrito (não um enum) para compatibilidade
 * máxima com o ecossistema React — enums do TypeScript geram código
 * JavaScript em runtime, enquanto union types são apagados na compilação.
 */

/** Tipos de perfil existentes no CampLog — espelha o enum Java do backend. */
export type ProfileType = 'CREATOR' | 'SUPPORTER'

/** DTO de entrada para follow/unfollow — enviado no body do request. */
export interface FollowRequest {
  targetId: string
  targetType: ProfileType
}

/**
 * Representa um perfil na lista de seguidores/seguindo.
 * Inclui dados de exibição desnormalizados (displayName, avatarUrl)
 * para evitar N+1 requests no frontend.
 */
export interface ConnectionProfile {
  profileId: string
  profileType: ProfileType
  displayName: string
  username?: string | null
  avatarUrl: string | null
  bio: string | null
  connectedAt: string
}

/**
 * Status de conexão entre o usuário autenticado e um perfil alvo.
 * Usado pelo FollowButton para renderizar o estado correto.
 */
export interface ConnectionStatus {
  isFollowing: boolean
  followersCount: number
  followingCount: number
}

/**
 * Resposta paginada de conexões (seguidores ou seguindo).
 * Compatível com a estrutura Page<T> do Spring Data.
 */
export interface ConnectionsPageResponse {
  content: ConnectionProfile[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  first: boolean
  last: boolean
}
