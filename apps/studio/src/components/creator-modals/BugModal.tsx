import React from 'react'

interface BugModalProps {
  onClose: () => void
}

export function BugModal({ onClose }: BugModalProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Projeto</label>
        <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }}>
          <option value="">Selecione um projeto</option>
          <option value="camplog">CampLog Core</option>
          <option value="studio">Creator Studio</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Repositório</label>
        <input 
          type="text" 
          placeholder="Ex: camplog-frontend"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Título do Bug</label>
        <input 
          type="text" 
          placeholder="Ex: Erro ao carregar imagens no feed"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Suspeita / Descrição detalhada</label>
        <textarea 
          placeholder="Descreva o que pode estar causando o problema ou como reproduzi-lo..."
          rows={4}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', resize: 'vertical' }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Desde quando?</label>
          <input 
            type="date" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)', colorScheme: 'dark' }} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Prioridade</label>
          <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }}>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Cancelar
        </button>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--icon-accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Registrar Bug
        </button>
      </div>
    </div>
  )
}
