import React from 'react'

interface InviteModalProps {
  onClose: () => void
}

export function InviteModal({ onClose }: InviteModalProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>E-mail do Convidado</label>
        <input 
          type="email" 
          placeholder="exemplo@email.com"
          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--heading-sm)', marginBottom: '0.5rem', fontWeight: 600 }}>Cargo / Permissão</label>
        <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--bg)', color: 'var(--heading)' }}>
          <option value="member">Membro (Visualização e Edição de Conteúdo)</option>
          <option value="admin">Administrador (Acesso Total)</option>
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Cancelar
        </button>
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--icon-accent)', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Enviar Convite
        </button>
      </div>
    </div>
  )
}
