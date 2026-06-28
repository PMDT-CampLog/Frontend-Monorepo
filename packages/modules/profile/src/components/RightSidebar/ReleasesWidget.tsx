import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUpcomingReleases } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface ReleasesWidgetProps {
  userId: string
}

export function ReleasesWidget({ userId }: ReleasesWidgetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['upcomingReleases', userId],
    queryFn: () => getUpcomingReleases(userId),
  })

  return (
    <WidgetCard title="Lançamentos">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando lançamentos...</span>
      ) : !data || data.length === 0 ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhum lançamento próximo</span>
      ) : (
        <div className="timeline-list">
          {data.map((rel) => (
            <div key={rel.id} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-title">{rel.game}</span>
                <span className="timeline-date">{rel.event} - {rel.date}</span>
                <span className="timeline-countdown">Em {rel.days} dias</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
