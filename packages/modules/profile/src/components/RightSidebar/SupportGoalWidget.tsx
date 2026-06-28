import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupportGoal, addSupport } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface SupportGoalWidgetProps {
  userId: string
}

export function SupportGoalWidget({ userId }: SupportGoalWidgetProps) {
  const queryClient = useQueryClient()

  const { data: supportStatus, isLoading } = useQuery({
    queryKey: ['supportGoal', userId],
    queryFn: () => getSupportGoal(userId),
  })

  const supportMutation = useMutation({
    mutationFn: (amount: number) => addSupport(userId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportGoal', userId] })
    },
  })

  return (
    <WidgetCard title="Meta de Apoio">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando meta...</span>
      ) : !supportStatus ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Nenhuma campanha apoiada no momento</span>
      ) : (
        <div className="support-progress-wrapper">
          <div className="support-progress-header">
            <span>{supportStatus.studio}</span>
            <span>{supportStatus.currency} {supportStatus.current} / {supportStatus.goal}</span>
          </div>
          <div className="support-progress-bar-bg">
            <div 
              className="support-progress-bar-fg" 
              style={{ width: `${Math.min((supportStatus.current / supportStatus.goal) * 100, 100)}%` }} 
            />
          </div>
          <button 
            onClick={() => supportMutation.mutate(50)}
            disabled={supportStatus.current >= supportStatus.goal || supportMutation.isPending}
            className="support-action-btn"
          >
            {supportStatus.current >= supportStatus.goal ? 'Meta Atingida!' : 'Apoiar mais R$ 50'}
          </button>
        </div>
      )}
    </WidgetCard>
  )
}
