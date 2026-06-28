import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStudioSuggestions, followStudio } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface StudioSuggestionsWidgetProps {
  userId: string
}

export function StudioSuggestionsWidget({ userId }: StudioSuggestionsWidgetProps) {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['studioSuggestions', userId],
    queryFn: () => getStudioSuggestions(userId),
  })

  const followMutation = useMutation({
    mutationFn: (studioId: number) => followStudio(userId, studioId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studioSuggestions', userId] })
      // Ideally trigger an event to update 'latestPosts' here as well, per legacy logic.
      queryClient.invalidateQueries({ queryKey: ['latestPosts', userId] })
    },
  })

  return (
    <WidgetCard title="Sugestões de Estúdios">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando sugestões...</span>
      ) : !data || data.length === 0 ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhuma sugestão encontrada</span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {data.map((sug) => (
            <div key={sug.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sug.name}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--heading-sm)', fontWeight: 500 }}>{sug.tags}</span>
              </div>
              <button
                onClick={() => followMutation.mutate(sug.id)}
                disabled={followMutation.isPending}
                style={{
                  background: sug.followed ? 'rgba(255,255,255,0.05)' : 'var(--welcome-btn-bg)',
                  color: sug.followed ? 'var(--body-text)' : 'var(--welcome-btn-color)',
                  border: `1px solid ${sug.followed ? 'var(--card-border)' : 'var(--welcome-btn-border)'}`,
                  borderRadius: '16px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {sug.followed ? 'Seguindo' : 'Seguir'}
              </button>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
