import React from 'react'

interface MessageModalProps {
  onClose: () => void
}

export function MessageModal({ onClose }: MessageModalProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '300px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--body-text)', padding: '2rem' }}>
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem', color: 'var(--heading)' }}>Nenhum chat aberto</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Suas mensagens diretas com apoiadores aparecerão aqui futuramente.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Fechar
        </button>
      </div>
    </div>
  )
}
