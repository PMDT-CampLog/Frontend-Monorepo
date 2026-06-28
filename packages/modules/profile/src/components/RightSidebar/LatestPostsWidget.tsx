import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLatestPosts } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface LatestPostsWidgetProps {
  userId: string
}

export function LatestPostsWidget({ userId }: LatestPostsWidgetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['latestPosts', userId],
    queryFn: () => getLatestPosts(userId),
  })

  return (
    <WidgetCard title="Últimas Publicações">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando publicações...</span>
      ) : !data || data.length === 0 ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhuma publicação recente</span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.map((post) => (
            <div key={post.id} className="mini-feed-item">
              <div className="mini-feed-avatar">{post.avatar}</div>
              <div className="mini-feed-info">
                <span className="mini-feed-studio">{post.studio}</span>
                <span className="mini-feed-title" title={post.title}>{post.title}</span>
                <span className="mini-feed-time">{post.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
