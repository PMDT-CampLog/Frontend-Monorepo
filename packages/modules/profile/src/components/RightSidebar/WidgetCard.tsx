import React from 'react'

export interface WidgetCardProps {
  title: string
  children: React.ReactNode
}

export function WidgetCard({ title, children }: WidgetCardProps) {
  // Remover emojis do título caso passem por props acidentalmente
  const cleanTitle = title.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim()

  return (
    <div className="widget-card">
      <div className="widget-card-title">
        <span>{cleanTitle}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}
