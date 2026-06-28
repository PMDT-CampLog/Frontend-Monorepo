import React from 'react'

interface WikiModalProps {
  onClose: () => void
}

export function WikiModal({ onClose }: WikiModalProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Nome da Wiki</label>
        <input 
          type="text" 
          placeholder="Ex: Guia de Modding"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Descrição Breve</label>
        <textarea 
          placeholder="Sobre o que é esta wiki?"
          rows={3}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', resize: 'vertical' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Visibilidade</label>
        <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }}>
          <option value="public">Pública (Qualquer um pode ver)</option>
          <option value="private">Privada (Apenas equipe)</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Cancelar
        </button>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--icon-accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Criar Wiki
        </button>
      </div>
    </div>
  )
}
