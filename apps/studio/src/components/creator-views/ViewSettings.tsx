import React from 'react'

export function ViewSettings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>Configurações do Estúdio</h2>
        <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Gerencie o perfil público e faturamento</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="studio-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Perfil Público</h3>
          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Nome do Estúdio</label>
            <input type="text" defaultValue="Meu Estúdio Indie" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--body-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Biografia</label>
            <textarea rows={3} defaultValue="Criando jogos inovadores." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--studio-text-primary)' }} />
          </div>
          <button style={{ alignSelf: 'flex-start', background: 'var(--icon-accent)', color: '#fff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Salvar Alterações
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="studio-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Plano Atual</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--studio-text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>Indie Starter</p>
                <p style={{ color: 'var(--body-text)', fontSize: '0.8rem' }}>Gratuito - 5 membros, 500MB</p>
              </div>
              <button style={{ background: 'transparent', color: 'var(--icon-accent)', border: '1px solid var(--icon-accent)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                Upgrade
              </button>
            </div>
          </div>

          <div className="studio-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Aparência</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Dark Mode</span>
              <div style={{ width: 40, height: 20, background: 'var(--icon-accent)', borderRadius: 20, position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
