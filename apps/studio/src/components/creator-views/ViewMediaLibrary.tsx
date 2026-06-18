import React from 'react'
import { useMediaLibrary } from '../../hooks/creator-mocks'

export function ViewMediaLibrary() {
  const { media } = useMediaLibrary()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Imagens e Mídia</h2>
          <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Gerencie o espaço de 500MB disponível</p>
        </div>
        <button style={{ background: 'var(--card-border)', color: 'var(--studio-text-primary)', fontWeight: 600, padding: '0.65rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Limpar Antigos
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {media.map((item) => (
          <div key={item.id} className="studio-card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 120, background: 'var(--module-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--body-text)', fontSize: '0.75rem' }}>Thumbnail</span>
            </div>
            <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--body-text)', fontSize: '0.75rem' }}>{(item.size / (1024 * 1024)).toFixed(1)} MB</span>
              <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
