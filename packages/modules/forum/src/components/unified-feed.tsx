import React from 'react'

export function UnifiedFeed() {
  const items = [
    { id: 1, type: 'forum', text: 'Novo comentário no tópico "Dicas para iniciantes"', time: 'Há 5 mins' },
    { id: 2, type: 'blog', text: 'Admin publicou "Atualização v1.0.4"', time: 'Há 2 horas' },
    { id: 3, type: 'bug', text: 'Bug #42 foi marcado como Resolvido', time: 'Há 1 dia' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map(item => (
        <div key={item.id} className="studio-card" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '8px', background: 'var(--module-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>{item.type === 'forum' ? '💬' : item.type === 'blog' ? '📝' : '🐛'}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--studio-text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>{item.text}</p>
            <p style={{ color: 'var(--body-text)', fontSize: '0.75rem', marginTop: '0.2rem' }}>{item.time}</p>
          </div>
          <button style={{ background: 'transparent', border: '1px solid var(--card-border)', padding: '0.4rem 0.8rem', borderRadius: '6px', color: 'var(--body-text)', cursor: 'pointer', fontSize: '0.8rem' }}>Ver</button>
        </div>
      ))}
    </div>
  )
}
