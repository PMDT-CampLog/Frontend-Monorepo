'use client'

import React, { useState } from 'react'
import type { SupporterProfile } from '@camplog/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getFollowers, getFollowing } from '@camplog/api'
import { FollowButton } from '../../../social/src/components/FollowButton'
import '../../../social/src/styles/follow-button.css'

interface ProfileHeaderProps {
  profile: SupporterProfile & { role?: string }
  isOwner: boolean
  onEditClick?: () => void
  onAvatarClick?: () => void
  onCoverClick?: () => void
  onPostsClick?: () => void
}

interface CustomModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

function CustomModal({ open, onClose, title, children }: CustomModalProps) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <style>{`
        .hover-close-btn:hover {
          color: var(--heading) !important;
          background: rgba(255, 255, 255, 0.05);
          transform: rotate(90deg);
        }
        .hover-close-btn {
          transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }
      `}</style>
      <div
        className="modal-content"
        style={{
          width: '90%',
          maxWidth: '520px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: 'var(--card-shadow)',
          background: '#120e29',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 2rem',
            borderBottom: '1px solid var(--divider-color)',
          }}
        >
          <h2
            style={{
              fontSize: '1.3rem',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 900,
              color: 'var(--heading)',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="hover-close-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--heading-sm)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <div style={{ padding: '2rem', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  )
}

export function ProfileHeader({
  profile,
  isOwner,
  onEditClick,
  onAvatarClick,
  onCoverClick,
  onPostsClick,
}: ProfileHeaderProps) {
  const queryClient = useQueryClient()
  const [isFollowersOpen, setIsFollowersOpen] = useState(false)
  const [isFollowingOpen, setIsFollowingOpen] = useState(false)

  // Determina se o perfil é criador ou apoiador
  const isCreator = profile.role === 'creator' || profile.role === 'CREATOR'
  const isSupporter = !isCreator

  // Obter detalhes do usuário atualmente logado (do token JWT)
  const currentUser = typeof window !== 'undefined'
    ? (() => {
        try {
          const token = localStorage.getItem('camplog:token')
          if (!token) return null
          const payload = JSON.parse(atob(token.split('.')[1] || ''))
          return {
            id: payload.userId || null,
            role: payload.role ? (payload.role.toUpperCase() === 'CREATOR' ? 'CREATOR' : 'SUPPORTER') : 'SUPPORTER',
          }
        } catch {
          return null
        }
      })()
    : null

  // Resolve os Enums de ProfileType corretos para envio ao backend (CREATOR ou SUPPORTER)
  const resolvedTargetType = isCreator ? 'CREATOR' : 'SUPPORTER'
  const resolvedCurrentUserType = currentUser?.role === 'CREATOR' ? 'CREATOR' : 'SUPPORTER'

  // Busca lista de seguidores usando o React Query
  const { data: followersData } = useQuery({
    queryKey: ['followers', profile.userId, resolvedTargetType],
    queryFn: () => getFollowers(profile.userId, resolvedTargetType, 0, 1000),
    enabled: !!profile.userId,
  })

  // Busca lista de quem o perfil segue usando o React Query
  const { data: followingData } = useQuery({
    queryKey: ['following', profile.userId, resolvedTargetType],
    queryFn: () => getFollowing(profile.userId, resolvedTargetType, 0, 1000),
    enabled: !!profile.userId,
  })

  const followersCount = followersData?.totalElements ?? 0
  const followingCount = followingData?.totalElements ?? 0

  // Função para ordenar as contas conforme regra de negócio:
  // Criadores primeiro (ordenados por conectado mais recentemente -> antigo), depois Apoiadores (mesma ordem)
  const sortConnections = (connections: any[]) => {
    return [...connections].sort((a, b) => {
      const aIsCreator = a.profileType === 'CREATOR' ? 1 : 0
      const bIsCreator = b.profileType === 'CREATOR' ? 1 : 0
      
      if (aIsCreator !== bIsCreator) {
        return bIsCreator - aIsCreator // Criadores primeiro
      }
      
      // Do mais recente para o mais antigo
      return new Date(b.connectedAt).getTime() - new Date(a.connectedAt).getTime()
    })
  }

  const sortedFollowers = sortConnections(followersData?.content || [])
  const sortedFollowing = sortConnections(followingData?.content || [])

  // Componente de lista de conexões para renderizar dentro dos modais
  const renderConnectionsList = (items: any[]) => {
    if (items.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--heading-sm)', fontSize: '0.85rem' }}>
          Nenhuma conta encontrada.
        </div>
      )
    }

    return (
      <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
        {items.map((item) => (
          <div
            key={item.profileId}
            onClick={() => {
              if (item.username) {
                window.location.href = `/perfil/${item.username}`
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'rgba(255, 255, 255, 0.01)',
              marginBottom: '0.5rem',
              transition: 'all 0.2s',
              cursor: item.username ? 'pointer' : 'default',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.avatarUrl ? (
                <img
                  src={item.avatarUrl}
                  alt={item.displayName}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--icon-accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}>
                  {item.displayName?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--heading)' }}>
                    {item.displayName}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.35rem',
                      borderRadius: '99px',
                      background: item.profileType === 'CREATOR' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: item.profileType === 'CREATOR' ? 'var(--icon-accent)' : '#10b981',
                    }}
                  >
                    {item.profileType === 'CREATOR' ? 'CRIADOR' : 'APOIADOR'}
                  </span>
                </div>
                {item.bio && (
                  <p style={{ color: 'var(--body-text)', fontSize: '0.75rem', margin: '0.15rem 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>
                    {item.bio}
                  </p>
                )}
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--heading-sm)' }}>
              {new Date(item.connectedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="profile-header">
      {/* Foto de Capa */}
      <div
        className="profile-cover"
        onClick={isOwner ? onCoverClick : undefined}
        role={isOwner ? 'button' : undefined}
        tabIndex={isOwner ? 0 : undefined}
        aria-label={isOwner ? 'Alterar foto de capa' : undefined}
        style={{
          backgroundImage: profile.coverUrl ? `url(${profile.coverUrl})` : undefined,
        }}
      >
        {!profile.coverUrl && (
          <div className="profile-cover-placeholder">
            {isOwner && <span>Clique para adicionar capa</span>}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="profile-avatar-container">
        <div
          className="profile-avatar"
          onClick={isOwner ? onAvatarClick : undefined}
          role={isOwner ? 'button' : undefined}
          tabIndex={isOwner ? 0 : undefined}
          aria-label={isOwner ? 'Alterar foto de perfil' : undefined}
        >
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={`Avatar de ${profile.displayName}`} />
          ) : (
            <div className="profile-avatar-placeholder">
              {profile.displayName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="profile-info">
        <div className="profile-info-header">
          <div>
            <h1 className="profile-display-name">{profile.displayName || profile.name}</h1>
            {profile.location && (
              <p className="profile-location">📍 {profile.location}</p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isOwner ? (
              <button className="btn-edit-profile" onClick={onEditClick}>
                Editar Perfil
              </button>
            ) : (
              <FollowButton
                targetId={profile.userId}
                targetType={resolvedTargetType}
                currentUserId={currentUser?.id || null}
                currentUserType={resolvedCurrentUserType}
                size="md"
                onConnectionChange={() => {
                  // Invalida os caches do React Query imediatamente para atualizar a contagem real
                  queryClient.invalidateQueries({
                    queryKey: ['followers', profile.userId, resolvedTargetType],
                  })
                  queryClient.invalidateQueries({
                    queryKey: ['following', currentUser?.id || '', resolvedCurrentUserType],
                  })
                }}
              />
            )}
          </div>
        </div>

        {profile.bio && <p className="profile-bio">{profile.bio}</p>}

        {profile.websiteUrl && (
          <a
            href={profile.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-website"
          >
            🔗 {profile.websiteUrl}
          </a>
        )}

        <div className="profile-stats">
          {/* Posts: clicável apenas para apoiador */}
          {isSupporter ? (
            <button
              onClick={onPostsClick}
              className="profile-stat hover:opacity-80 transition-opacity"
              style={{ font: 'inherit', color: 'inherit', background: 'transparent', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
            >
              <strong>{profile.postsCount}</strong> posts
            </button>
          ) : (
            <span className="profile-stat">
              <strong>{profile.postsCount}</strong> posts
            </span>
          )}

          {/* Curtidas recebidas: apenas informativo */}
          <span className="profile-stat">
            <strong>{profile.likesReceivedCount}</strong> curtidas recebidas
          </span>

          {/* Campos novos apenas para perfis do tipo Apoiador */}
          {isSupporter && (
            <>
              <button
                onClick={() => setIsFollowingOpen(true)}
                className="profile-stat hover:opacity-80 transition-opacity"
                style={{ font: 'inherit', color: 'inherit', background: 'transparent', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
              >
                <strong>{followingCount}</strong> seguindo
              </button>

              <button
                onClick={() => setIsFollowersOpen(true)}
                className="profile-stat hover:opacity-80 transition-opacity"
                style={{ font: 'inherit', color: 'inherit', background: 'transparent', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
              >
                <strong>{followersCount}</strong> seguidores
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modais de Conexões */}
      <CustomModal
        open={isFollowersOpen}
        onClose={() => setIsFollowersOpen(false)}
        title="Seguidores"
      >
        <p style={{ fontSize: '0.75rem', color: 'var(--body-text)', marginBottom: '1rem', textAlign: 'left' }}>
          Seguidores ordenados por prioridade (criadores mais recentes primeiro, seguidos por apoiadores).
        </p>
        {renderConnectionsList(sortedFollowers)}
      </CustomModal>

      <CustomModal
        open={isFollowingOpen}
        onClose={() => setIsFollowingOpen(false)}
        title="Seguindo"
      >
        <p style={{ fontSize: '0.75rem', color: 'var(--body-text)', marginBottom: '1rem', textAlign: 'left' }}>
          Perfis seguidos ordenados por prioridade (criadores mais recentes primeiro, seguidos por apoiadores).
        </p>
        {renderConnectionsList(sortedFollowing)}
      </CustomModal>
    </div>
  )
}
