import React from 'react'

export function WikiEditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
      <input type="text" placeholder="Título da Wiki" style={{ fontSize: '1.5rem', fontWeight: 800, padding: '1rem', border: '1px solid var(--card-border)', borderRadius: '8px', background: 'transparent', color: 'var(--studio-text-primary)' }} />
      <div style={{ border: '1px solid var(--card-border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 400 }}>
        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '0.5rem', background: 'var(--module-bg)' }}>
          <button style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--body-text)', fontWeight: 600 }}>B</button>
          <button style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--body-text)', fontStyle: 'italic' }}>I</button>
          <button style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--body-text)', textDecoration: 'underline' }}>U</button>
          <div style={{ width: 1, background: 'var(--card-border)' }} />
          <button style={{ padding: '0.25rem 0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--body-text)' }}>List</button>
        </div>
        <textarea placeholder="Comece a escrever ou arraste e solte imagens aqui (Drag & Drop)..." style={{ flex: 1, padding: '1rem', border: 'none', background: 'transparent', color: 'var(--studio-text-primary)', resize: 'none', outline: 'none', minHeight: 300 }} />
      </div>
    </div>
  )
}
