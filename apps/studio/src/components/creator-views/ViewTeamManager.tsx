import React, { useState } from 'react'
import { useTeamMembers } from '../../hooks/creator-mocks'

export function ViewTeamManager() {
  const { members, limit } = useTeamMembers()
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Gerenciar Equipe</h2>
          <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>
            {members.length} de {limit} membros (Plano Indie)
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          disabled={members.length >= limit}
          style={{
            background: 'var(--icon-accent)', color: '#fff', fontWeight: 600, padding: '0.65rem 1.25rem',
            borderRadius: '8px', border: 'none', cursor: members.length >= limit ? 'not-allowed' : 'pointer',
            opacity: members.length >= limit ? 0.5 : 1
          }}
        >
          + Convidar Membro
        </button>
      </div>

      <div className="studio-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--heading-sm)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1rem' }}>Membro</th>
              <th style={{ padding: '1rem' }}>E-mail</th>
              <th style={{ padding: '1rem' }}>Papel</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--module-bg)' }} />
                  <span style={{ color: 'var(--studio-text-primary)', fontWeight: 600 }}>{member.name}</span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--body-text)', fontSize: '0.85rem' }}>{member.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--icon-accent)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
                    {member.role}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--body-text)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="studio-card" style={{ width: '100%', maxWidth: 400, padding: '2rem' }}>
            <h3 style={{ color: 'var(--heading)', marginBottom: '1rem' }}>Convidar Membro</h3>
            <input type="email" placeholder="E-mail" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} />
            <select style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)' }}>
              <option value="editor">Editor</option>
              <option value="moderator">Moderador</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setShowInviteModal(false)} style={{ padding: '0.65rem 1.25rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--body-text)', cursor: 'pointer' }}>Cancelar</button>
              <button style={{ padding: '0.65rem 1.25rem', borderRadius: '8px', background: 'var(--icon-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}>Enviar Convite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
