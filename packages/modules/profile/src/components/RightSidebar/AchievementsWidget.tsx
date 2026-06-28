import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAchievements } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface AchievementsWidgetProps {
  userId: string
}

export function AchievementsWidget({ userId }: AchievementsWidgetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['achievements', userId],
    queryFn: () => getAchievements(userId),
  })

  return (
    <WidgetCard title="Conquistas">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando conquistas...</span>
      ) : !data || data.length === 0 ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhuma conquista ainda</span>
      ) : (
        <div className="badges-grid">
          {data.map((b) => (
            <div key={b.id} className="badge-item">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Simplified icons, since the goal is to refactor mock data and remove emojis, not replace SVG */}
                {b.id === 'alpha' ? <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /> :
                 b.id === 'bug' ? <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" /> :
                 b.id === 'gamer' ? <rect x="2" y="6" width="20" height="12" rx="2" ry="2" /> :
                 b.id === 'donor' ? <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /> :
                 <circle cx="12" cy="12" r="10" /> /* Fallback icon */
                }
              </svg>
              <span className="badge-tooltip">
                <strong>{b.name}</strong>
                <br />
                {b.desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
