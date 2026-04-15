'use client'

import React, { useState } from 'react'

/* ──────────────────────── SVG Icons ──────────────────────── */

function LogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width={size} height={size} style={{ display: 'block', fill: 'currentColor' }}>
      <path d="M 200 60 C 200 60 130 130 135 200 C 140 250 215 265 250 225 C 270 200 260 160 260 160 C 260 160 240 190 220 190 C 195 190 200 140 200 140 C 200 140 220 110 200 60 Z" />
      <g>
        <path d="M 140 270 L 151 281 L 112 305 L 151 329 L 140 340 L 89 305 Z" />
        <path d="M 185 345 L 175 340 L 215 255 L 225 260 Z" />
        <path d="M 260 270 L 311 305 L 260 340 L 249 329 L 288 305 L 249 281 Z" />
      </g>
    </svg>
  )
}

function IconLayout() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
}

function IconUsers() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}

function IconBook() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
}

function IconBug() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <ellipse cx="12" cy="13" rx="5" ry="6" />
      <path d="M4 9l2 2M20 9l-2 2M4 15l2-2M20 15l-2-2M12 3v3M9 3h6M12 21v-3" />
    </svg>
  )
}

function IconGear() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
}

function IconUpload() {
  return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--icon-accent)' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
}

function IconBold() { return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg> }
function IconItalic() { return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg> }
function IconList() { return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> }
function IconLink() { return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> }

/* ──────────────────────── Component ──────────────────────── */

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('Conteúdo da Wiki')
  const [dragActive, setDragActive] = useState(false)

  const sidebarNav = [
    { title: 'Visão Geral', icon: <IconLayout /> },
    { title: 'Gerenciar Equipe', icon: <IconUsers /> },
    { title: 'Conteúdo da Wiki', icon: <IconBook /> },
    { title: 'Relatórios de Bugs', icon: <IconBug /> },
    { title: 'Configurações', icon: <IconGear /> },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  return (
    <div className="studio-shell">
      {/* ── Sidebar (Restyled for Creator View) ── */}
      <aside className="studio-sidebar" style={{ width: '16rem', alignItems: 'flex-start', padding: '1.25rem 1rem' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', color: 'var(--heading)', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <LogoIcon size={32} />
          <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--heading)' }}>Creator<span style={{ color: 'var(--icon-accent)', fontWeight: 600 }}>Studio</span></span>
        </a>

        <div style={{ padding: '0 0.5rem', marginBottom: '1rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--heading-sm)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Menu Principal
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
          {sidebarNav.map((item) => {
            const isActive = activeTab === item.title
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveTab(item.title)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem',
                  borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: isActive ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))' : 'transparent',
                  color: isActive ? '#fff' : 'var(--body-text)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid var(--icon-accent)' : '3px solid transparent',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '0.85rem'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ color: isActive ? 'var(--icon-accent)' : 'inherit' }}>
                  {item.icon}
                </div>
                {item.title}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ── Workspace ── */}
      <div className="studio-workspace" style={{ background: 'radial-gradient(ellipse at top right, rgba(26, 15, 60, 0.5), transparent 40%), var(--bg)' }}>
        
        {/* Topbar specific to creator area */}
        <header className="studio-topbar" style={{ padding: '0 2rem' }}>
          <h1 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-dm-sans), sans-serif', m: 0 }}>
            {activeTab}
          </h1>
          <div className="studio-topbar__end">
            <a href="/" className="studio-topbar__avatar" title="Voltar ao site" style={{ display: 'block', textDecoration: 'none' }} />
          </div>
        </header>

        {/* Main Workspace Area */}
        <main className="studio-main" style={{ padding: '2rem' }}>
          
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Quick Metrics (Dynamic Row) */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="studio-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--icon-accent)', filter: 'blur(50px)', opacity: 0.2 }} />
                <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Novos Seguidores</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>1,204</span>
                  <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, paddingBottom: '4px' }}>+12% esta semana</span>
                </div>
              </div>

              <div className="studio-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: '#ef4444', filter: 'blur(50px)', opacity: 0.15 }} />
                <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bugs Pendentes</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>8</span>
                  <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, paddingBottom: '4px' }}>3 críticos</span>
                </div>
              </div>
            </section>

            {/* Content Editor CRUD Form */}
            <section className="studio-card" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  Nova Postagem na Wiki
                </h2>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{
                    padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--card-border)',
                    background: 'transparent', color: '#fff', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s', fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.85rem'
                  }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    Salvar Rascunho
                  </button>
                  <button style={{
                    padding: '0.65rem 1.25rem', borderRadius: '8px', border: 'none',
                    background: 'var(--icon-accent)', color: '#000', fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(167, 139, 250, 0.4)', transition: 'transform 0.1s',
                    fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.85rem'
                  }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Publicar
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Ex: Tomo das Metodologias: Padrão Registry"
                  style={{
                    width: '100%', background: 'rgba(8, 6, 18, 0.55)', border: '1px solid var(--card-border)',
                    padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1.1rem', fontWeight: 600,
                    outline: 'none', fontFamily: 'var(--font-dm-sans), sans-serif', transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--heading)'}
                  onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                />
              </div>

              {/* Visual Editor Workspace */}
              <div style={{ border: '1px solid var(--card-border)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(13, 10, 30, 0.65)' }}>
                {/* Toolbar */}
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid var(--card-border)', background: 'var(--studio-chrome)' }}>
                  {[IconBold, IconItalic, IconList, IconLink].map((Icon, idx) => (
                    <button key={idx} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px',
                      borderRadius: '6px', border: 'none', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer'
                    }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--body-text)' }}>
                      <Icon />
                    </button>
                  ))}
                  <div style={{ width: '1px', background: 'var(--card-border)', margin: '0 0.5rem' }} />
                  <select style={{
                    background: 'transparent', border: 'none', color: 'var(--body-text)',
                    fontFamily: 'var(--font-lato), sans-serif', outline: 'none', cursor: 'pointer'
                  }}>
                    <option>Parágrafo</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                </div>
                
                {/* Text Area */}
                <textarea
                  placeholder="Escreva o conteúdo da sua postagem aqui..."
                  style={{
                    width: '100%', minHeight: '250px', background: 'transparent', border: 'none',
                    padding: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem',
                    lineHeight: 1.6, outline: 'none', resize: 'vertical', fontFamily: 'var(--font-lato), sans-serif'
                  }}
                />
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                  marginTop: '1.5rem', border: dragActive ? '2px dashed var(--icon-accent)' : '2px dashed var(--card-border)',
                  borderRadius: '12px', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  background: dragActive ? 'rgba(167, 139, 250, 0.05)' : 'rgba(8, 6, 18, 0.3)', transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
              >
                <IconUpload />
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.5rem', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  Arraste e solte imagens aqui
                </p>
                <p style={{ color: 'var(--body-text)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  SVG, PNG, JPG ou GIF (max. 5MB)
                </p>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
