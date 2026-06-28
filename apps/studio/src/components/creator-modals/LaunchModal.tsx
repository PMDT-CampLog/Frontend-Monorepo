import React, { useState } from 'react'

interface LaunchModalProps {
  onClose: () => void
}

export function LaunchModal({ onClose }: LaunchModalProps) {
  const [dateType, setDateType] = useState<'month' | 'specific'>('specific')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Título do Lançamento</label>
        <input 
          type="text" 
          placeholder="Ex: Atualização 2.0 - Novo Mapa"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Tipo de Data</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--body-text)', fontSize: '0.9rem' }}>
            <input type="radio" checked={dateType === 'specific'} onChange={() => setDateType('specific')} />
            Data Específica
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--body-text)', fontSize: '0.9rem' }}>
            <input type="radio" checked={dateType === 'month'} onChange={() => setDateType('month')} />
            Apenas Mês/Ano
          </label>
        </div>
      </div>

      {dateType === 'specific' ? (
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Data do Lançamento</label>
          <input 
            type="date" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', colorScheme: 'dark' }} 
          />
        </div>
      ) : (
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Mês do Lançamento</label>
          <input 
            type="month" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', colorScheme: 'dark' }} 
          />
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Mídia (Imagem ou Vídeo)</label>
        <div style={{ padding: '2rem', border: '2px dashed var(--card-border)', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.02)' }}>
          <span style={{ color: 'var(--body-text)', fontSize: '0.9rem' }}>Clique ou arraste a mídia aqui</span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Descrição</label>
        <textarea 
          placeholder="Detalhes do que está por vir..."
          rows={4}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', resize: 'vertical' }} 
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Cancelar
        </button>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--icon-accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Registrar Lançamento
        </button>
      </div>
    </div>
  )
}
