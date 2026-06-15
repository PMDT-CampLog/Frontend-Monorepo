'use client'

import React from 'react'
import type { SupporterProfile } from '@camplog/types'

interface ProfileHeaderProps {
  profile: SupporterProfile
  isOwner: boolean
  onEditClick?: () => void
  onAvatarClick?: () => void
  onCoverClick?: () => void
}

export function ProfileHeader({
  profile,
  isOwner,
  onEditClick,
  onAvatarClick,
  onCoverClick,
}: ProfileHeaderProps) {
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
          {isOwner && (
            <button className="btn-edit-profile" onClick={onEditClick}>
              Editar Perfil
            </button>
          )}
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
          <span className="profile-stat">
            <strong>{profile.postsCount}</strong> posts
          </span>
          <span className="profile-stat">
            <strong>{profile.likesReceivedCount}</strong> curtidas recebidas
          </span>
        </div>
      </div>
    </div>
  )
}
