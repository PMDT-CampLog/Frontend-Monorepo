import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getActivePolls, votePoll } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface ActivePollsWidgetProps {
  userId: string
}

export function ActivePollsWidget({ userId }: ActivePollsWidgetProps) {
  const queryClient = useQueryClient()

  const { data: poll, isLoading } = useQuery({
    queryKey: ['activePolls', userId],
    queryFn: () => getActivePolls(userId),
  })

  const voteMutation = useMutation({
    mutationFn: (optionId: string) => votePoll(userId, poll!.id, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activePolls', userId] })
      // Toast notification would typically go here, managed by a higher-level context
    },
  })

  return (
    <WidgetCard title="Enquetes Ativas">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando enquetes...</span>
      ) : !poll ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhuma enquete ativa</span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--body-text)', fontWeight: 600, marginBottom: '0.25rem' }}>
            {poll.question}
          </p>
          {(() => {
            const pollTotalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0)
            return poll.options.map((opt) => {
              const percent = pollTotalVotes > 0 ? Math.round((opt.votes / pollTotalVotes) * 100) : 0
              const isSelected = poll.userVote === opt.id

              return (
                <button
                  key={opt.id}
                  onClick={() => voteMutation.mutate(opt.id)}
                  disabled={!!poll.userVote || voteMutation.isPending}
                  className={`poll-option-button ${isSelected ? 'voted' : ''}`}
                >
                  <div className="poll-option-progress" style={{ width: `${percent}%` }} />
                  <span style={{ position: 'relative', zIndex: 2 }}>{opt.text}</span>
                  <span style={{ position: 'relative', zIndex: 2, fontSize: '0.75rem', color: 'var(--heading-sm)' }}>
                    {percent}% ({opt.votes})
                  </span>
                </button>
              )
            })
          })()}
          {poll.userVote && (
            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, textAlign: 'center', marginTop: '0.2rem' }}>
              Voto registrado! Obrigado por participar.
            </span>
          )}
        </div>
      )}
    </WidgetCard>
  )
}
