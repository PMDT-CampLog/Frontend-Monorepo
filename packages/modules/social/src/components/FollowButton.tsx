'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@camplog/ui'
import { useFollowConnection } from '../hooks/useFollowConnection'
import type { ProfileType } from '@camplog/types'
import { useState } from 'react'

/**
 * Variantes do FollowButton usando CVA (Class Variance Authority).
 *
 * DECISÃO DE DESIGN:
 * Segue o padrão do Button do @camplog/ui, mas com variantes semânticas
 * específicas para estados de conexão social. Três estados visuais:
 *
 * 1. "follow" (não seguindo): botão outline com cor primária — convida à ação
 * 2. "following" (seguindo): botão filled com cor de sucesso — confirma estado
 * 3. "unfollow" (hover sobre "following"): botão destructive — alerta sobre ação inversa
 */
const followButtonVariants = cva(
  [
    'follow-button',
    'inline-flex items-center justify-center gap-2 rounded-full',
    'font-semibold transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
  ].join(' '),
  {
    variants: {
      state: {
        follow:
          'border-2 border-brand-500 text-brand-600 dark:text-brand-400 bg-transparent hover:bg-brand-500 hover:text-white focus-visible:ring-brand-500',
        following:
          'border-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 focus-visible:ring-emerald-500',
        unfollow:
          'border-2 border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        md: 'h-9 px-5 text-sm',
        lg: 'h-11 px-7 text-base',
      },
    },
    defaultVariants: {
      state: 'follow',
      size: 'md',
    },
  },
)

/**
 * Props do componente FollowButton.
 *
 * O componente é agnóstico — recebe apenas IDs e tipos genéricos
 * (CREATOR | SUPPORTER), abstraindo a complexidade das páginas de perfil.
 */
export interface FollowButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    Pick<VariantProps<typeof followButtonVariants>, 'size'> {
  /** ID do perfil alvo (quem será seguido/desseguido). */
  targetId: string
  /** Tipo do perfil alvo. */
  targetType: ProfileType
  /** ID do usuário autenticado (null se não autenticado). */
  currentUserId: string | null
  /** Tipo do perfil do usuário autenticado. */
  currentUserType: ProfileType
  /** Callback opcional chamado após follow/unfollow (ex: analytics). */
  onConnectionChange?: (isFollowing: boolean) => void
}

/**
 * Componente FollowButton — botão de seguir/deixar de seguir reutilizável.
 *
 * ESTADOS VISUAIS:
 * - Não seguindo: "Seguir" (outline brand) → hover: preenche com brand
 * - Seguindo: "Seguindo ✓" (outline verde) → hover: "Deixar de seguir" (outline vermelho)
 * - Loading: spinner animado durante mutações
 * - Desabilitado: quando é o próprio perfil ou não autenticado
 *
 * ENCAPSULAMENTO:
 * O componente internamente usa useFollowConnection para gerenciar
 * todo o estado de cache, optimistic updates e chamadas de API.
 * O consumidor só precisa passar os IDs.
 *
 * @example
 * ```tsx
 * <FollowButton
 *   targetId={profile.userId}
 *   targetType="CREATOR"
 *   currentUserId={currentUser.id}
 *   currentUserType="SUPPORTER"
 *   size="md"
 * />
 * ```
 */
export function FollowButton({
  targetId,
  targetType,
  currentUserId,
  currentUserType,
  size,
  onConnectionChange,
  className,
  ...buttonProps
}: FollowButtonProps) {
  const [isHovering, setIsHovering] = useState(false)

  const {
    isFollowing,
    toggleFollow,
    isLoading,
    isMutating,
  } = useFollowConnection({
    targetId,
    targetType,
    currentUserId,
    currentUserType,
  })

  // Não renderiza o botão se o usuário está vendo seu próprio perfil
  const isOwnProfile = currentUserId === targetId
  if (isOwnProfile) return null

  // Não renderiza se não está autenticado
  if (!currentUserId) return null

  const handleClick = () => {
    toggleFollow()
    onConnectionChange?.(!isFollowing)
  }

  // Determina o estado visual atual
  const visualState: 'follow' | 'following' | 'unfollow' = isFollowing
    ? isHovering
      ? 'unfollow'
      : 'following'
    : 'follow'

  // Determina o texto do botão
  const buttonText = isMutating
    ? null // Mostra spinner
    : isFollowing
      ? isHovering
        ? 'Deixar de seguir'
        : 'Seguindo'
      : 'Seguir'

  // Ícone de check para o estado "Seguindo"
  const checkIcon = isFollowing && !isHovering && !isMutating && (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  // Spinner para o estado de loading/mutating
  const spinner = (isLoading || isMutating) && (
    <svg
      className="follow-button__spinner"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="28 10"
      />
    </svg>
  )

  // Obter estilo do botão dinamicamente para transparência e borda amarela
  const getStyles = () => {
    if (visualState === 'unfollow') {
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '2px solid #ef4444',
        color: '#ef4444',
        borderRadius: '9999px',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }
    }
    if (visualState === 'following') {
      return {
        backgroundColor: 'rgba(255, 241, 118, 0.1)',
        border: '2px solid #fff176',
        color: '#fff176',
        borderRadius: '9999px',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }
    }
    // 'follow'
    return {
      backgroundColor: isHovering ? 'rgba(255, 241, 118, 0.08)' : 'transparent',
      border: '2px solid #fff176',
      color: '#fff176',
      borderRadius: '9999px',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }
  }

  return (
    <button
      type="button"
      className={cn(
        followButtonVariants({ state: visualState, size }),
        className,
      )}
      style={{
        ...getStyles(),
        ...buttonProps.style
      }}
      onClick={handleClick}
      disabled={isLoading || isMutating}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={
        isFollowing
          ? `Deixar de seguir ${targetType === 'CREATOR' ? 'criador' : 'apoiador'}`
          : `Seguir ${targetType === 'CREATOR' ? 'criador' : 'apoiador'}`
      }
      aria-pressed={isFollowing}
      {...buttonProps}
    >
      {spinner}
      {checkIcon}
      {buttonText && <span>{buttonText}</span>}
    </button>
  )
}
