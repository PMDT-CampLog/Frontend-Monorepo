import React, { useState } from 'react'

export function BugBoard() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban')

  const columns = [
    { title: 'Aberto', color: '#ef4444', count: 3 },
    { title: 'Investigando', color: '#f59e0b', count: 1 },
    { title: 'Resolvido', color: '#10b981', count: 5 }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setViewMode('kanban')} style={{ padding: '0.5rem 1rem', background: viewMode === 'kanban' ? 'var(--icon-accent)' : 'var(--card-border)', color: viewMode === 'kanban' ? '#fff' : 'var(--heading)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Kanban</button>
          <button onClick={() => setViewMode('list')} style={{ padding: '0.5rem 1rem', background: viewMode === 'list' ? 'var(--icon-accent)' : 'var(--card-border)', color: viewMode === 'list' ? '#fff' : 'var(--heading)', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Lista</button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--body-text)', borderRadius: '8px', cursor: 'pointer' }}>Filtro: Prioridade</button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', flex: 1 }}>
          {columns.map(col => (
            <div key={col.title} style={{ background: 'var(--module-bg)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--heading-sm)', textTransform: 'uppercase', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} /> {col.title}
                </h4>
                <span style={{ background: 'var(--card-border)', color: 'var(--body-text)', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{col.count}</span>
              </div>
              <div className="studio-card" style={{ padding: '1rem', cursor: 'grab' }}>
                <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.7rem', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Alta Prioridade</span>
                <p style={{ color: 'var(--studio-text-primary)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>Erro ao carregar menu</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', color: 'var(--body-text)', fontSize: '0.75rem' }}>
                  <span>#42</span>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--card-border)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="studio-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--body-text)' }}>Visualização em lista (simulada)</div>
      )}
    </div>
  )
}
