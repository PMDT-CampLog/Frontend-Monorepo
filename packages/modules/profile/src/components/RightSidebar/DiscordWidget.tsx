import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDiscordStatus } from '@camplog/api/profile'
import { WidgetCard } from './WidgetCard'

interface DiscordWidgetProps {
  userId: string
}

export function DiscordWidget({ userId }: DiscordWidgetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['discordStatus', userId],
    queryFn: () => getDiscordStatus(userId),
  })

  return (
    <WidgetCard title="Servidor Discord">
      {isLoading ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Carregando Discord...</span>
      ) : !data?.connected ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--body-text)' }}>Discord não conectado</span>
      ) : (
        <div className="discord-widget-container">
          <div className="discord-header">
            <span className="discord-logo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
              </svg>
              <span>{data.serverName || 'Indie Devs Hub'}</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div className="discord-online-badge" />
              <span style={{ fontSize: '0.7rem', color: '#23a55a', fontWeight: 700 }}>{data.onlineCount || 0} Online</span>
            </div>
          </div>
          <div className="discord-body">
            <span style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--heading-sm)' }}>CANAIS POPULARES</span>
            {(data.channels || []).map((ch, idx) => (
              <div key={idx} className="discord-channel-item">
                <span style={{ color: '#8e9297' }}>#</span>
                <span style={{ flex: 1 }}>{ch.name}</span>
                {ch.users > 0 && (
                  <span style={{ fontSize: '0.65rem', background: '#35393e', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                    {ch.users}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </WidgetCard>
  )
}
