'use client'

import React from 'react'
import type { Post } from '@camplog/types'
import { LatexRenderer } from './LatexRenderer'

interface PostCardProps {
  post: Post
  onLikeToggle?: (postId: string) => void
}

export function PostCard({ post, onLikeToggle }: PostCardProps) {
  const timeAgo = formatTimeAgo(post.createdAt)

  return (
    <article className="post-card" id={`post-${post.id}`}>
      <div className="post-card-header">
        <div className="post-author-avatar">
          {post.authorAvatarUrl ? (
            <img src={post.authorAvatarUrl} alt={post.authorName} />
          ) : (
            <div className="post-author-avatar-placeholder">
              {post.authorName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="post-author-info">
          <span className="post-author-name">{post.authorName}</span>
          <span className="post-timestamp" title={post.createdAt}>{timeAgo}</span>
        </div>
      </div>

      <div className="post-card-content">
        {post.latexEnabled ? (
          <LatexRenderer content={post.content} enabled={true} />
        ) : (
          <p className="post-text">{post.content}</p>
        )}
      </div>

      {/* Galeria de imagens */}
      {post.media && post.media.length > 0 && (
        <div className={`post-media-grid media-count-${Math.min(post.media.length, 4)}`}>
          {post.media.map((media) => (
            <div key={media.id} className="post-media-item">
              <img src={media.mediaUrl} alt="Imagem do post" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Ações */}
      <div className="post-card-actions">
        <button
          className={`post-like-btn ${post.likedByMe ? 'liked' : ''}`}
          onClick={() => onLikeToggle?.(post.id)}
          aria-label={post.likedByMe ? 'Descurtir' : 'Curtir'}
        >
          <span className="like-icon">{post.likedByMe ? '❤️' : '🤍'}</span>
          <span className="like-count">{post.likesCount}</span>
        </button>
      </div>
    </article>
  )
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return 'agora'
  if (diffMin < 60) return `${diffMin}min`
  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `${diffHours}h`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays}d`
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })
}
