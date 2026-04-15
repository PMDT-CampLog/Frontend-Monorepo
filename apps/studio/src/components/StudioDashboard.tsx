'use client'

import React from 'react'

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

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
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
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function IconDots() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconComment() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconBookmark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="white" style={{ opacity: 0.85 }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--icon-accent)' }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  )
}

function IconRss() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--icon-accent)' }}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--icon-accent)' }}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function IconFlag() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--icon-accent)' }}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--icon-accent)' }}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

/* ──────────────────────── Data ──────────────────────── */

const sidebarNav = [
  { title: 'Início', icon: <IconHome /> },
  { title: 'Comunidade', icon: <IconUsers /> },
  { title: 'Wiki', icon: <IconBook /> },
  { title: 'Bugs', icon: <IconBug /> },
  { title: 'Configurações', icon: <IconGear /> },
] as const

const shortcutItems = [
  { title: 'Lore', desc: 'História e origem do Camplog.', icon: <IconBook />, count: '1 visualização   · 1 hr atrás' },
  { title: 'Guia Iniciante', desc: 'Primeiros passos para novos usuários.', icon: <IconFlag />, count: '12 visualizações · 3 min atrás' },
  { title: 'Blog', desc: 'Atualizações e changelog do Camplog.', icon: <IconRss />, count: '312 mil visualizações · 1 plot atrás' },
  { title: 'Bug Short', desc: 'Resumo rápido do que foi reportado.', icon: <IconBug />, count: '7 visualizações · 1 mho atrás' },
  { title: 'Explore', desc: 'Exploração de conteúdo e curiosidades.', icon: <IconCompass />, count: '10 visualizações · 1 plot atrás' },
]

const wikiItems = [
  { title: 'Lore', sub: '1 visualização · 1 hr atrás' },
  { title: 'Guia Iniciante', sub: '12 visualizações · 3 min atrás' },
  { title: 'Bug Short', sub: '7 visualizações · 3 min atrás' },
  { title: 'Exploração', sub: '10 visualizações · 1 dia atrás' },
]

const bugItems = [
  {
    title: 'Quadros solução de bugs',
    desc: 'Ultimo commit feito há 13 minutos atrás',
    tag: 'Em progresso',
    tagColor: { borderColor: 'rgba(255, 241, 118, 0.4)', backgroundColor: 'rgba(255, 241, 118, 0.12)', color: '#fff176' } as React.CSSProperties,
  },
  {
    title: 'Bug Tracker',
    desc: 'Resumo rápido do que será consertado no próximo patch',
    tag: 'Feito',
    tagColor: { borderColor: 'rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: 'rgb(252, 165, 165)' } as React.CSSProperties,
  },
]

/* ──────────────────────── Main Component ──────────────────────── */

export default function StudioDashboard() {
  return (
    <div className="studio-shell">
      {/* ── Sidebar (icon rail) ── */}
      <aside className="studio-sidebar" aria-label="Navegação principal">
        <span className="studio-sidebar__logo" aria-hidden>
          <LogoIcon />
        </span>
        <nav className="studio-sidebar__nav">
          {sidebarNav.map((item, i) => (
            <button
              key={item.title}
              type="button"
              className="studio-sidebar__btn"
              title={item.title}
              data-active={i === 0 ? 'true' : undefined}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Workspace ── */}
      <div className="studio-workspace">
        {/* ── Topbar ── */}
        <header className="studio-topbar">
          <a href="/" className="studio-topbar__brand" aria-label="CampLog — início">
            <span className="studio-topbar__code">&lt; / &gt;</span>
            <span>CampLog</span>
          </a>

          <div className="studio-topbar__end">
            <div className="studio-topbar__search">
              <span className="studio-search-icon"><IconSearch /></span>
              <input
                type="search"
                placeholder="Encontrar recente"
                className="studio-search-input"
                autoComplete="off"
              />
            </div>
            <button type="button" className="studio-topbar__icon-btn" aria-label="Mensagens">
              <IconChat />
            </button>
            <button type="button" className="studio-topbar__icon-btn" aria-label="Notificações" style={{ position: 'relative' }}>
              <IconBell />
              <span style={{
                position: 'absolute', right: 4, top: 4, width: 6, height: 6,
                borderRadius: '50%', background: '#ef4444', border: '2px solid var(--studio-chrome)'
              }} />
            </button>
            <div className="studio-topbar__avatar" aria-label="Foto de perfil" role="img" />
          </div>
        </header>

        {/* ── Main content: 3-column grid ── */}
        <main className="studio-main">
          <div className="studio-grid">

            {/* ═══════ COLUNA ESQUERDA — Devlog Post + CTA ═══════ */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

              {/* — Devlog Post header — */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h2 style={{ color: 'var(--heading)', fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                    Devlog Post
                  </h2>
                  <button
                    type="button"
                    style={{
                      border: '1px solid var(--card-border)',
                      background: 'rgba(8, 6, 18, 0.45)',
                      color: 'var(--heading-sm)',
                      borderRadius: 8,
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                    }}
                  >
                    ⚙ Compo ▾
                  </button>
                </div>

                <article className="studio-card" style={{ overflow: 'hidden' }}>
                  {/* Post header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderBottom: '1px solid var(--card-border)' }}>
                    <div className="studio-avatar studio-avatar--md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                        CampLog
                        <span style={{ color: 'var(--heading-sm)', fontWeight: 400, marginLeft: '0.5rem' }}>
                          admin · há 30m
                        </span>
                      </p>
                    </div>
                    <button type="button" style={{ background: 'none', border: 'none', color: 'var(--footer-text)', cursor: 'pointer' }}>
                      <IconDots />
                    </button>
                  </div>

                  {/* Post body */}
                  <div style={{ padding: '1rem' }}>
                    <p style={{ color: 'var(--body-text)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      Bem-vindo ao Devlog Post! Este é o último post sobre o custo de conteúdo para desenvolver comunidades, feira e mercado. Fique ligado nas novidades!
                    </p>
                    {/* Video/Image placeholder */}
                    <div style={{
                      aspectRatio: '16/9',
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #2b0a4f 0%, #1a0a2e 50%, #0d0a1e 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0, opacity: 0.3,
                        background: 'radial-gradient(circle at 30% 40%, rgba(167,139,250,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,241,118,0.15), transparent 50%)',
                      }} />
                      <button
                        type="button"
                        aria-label="Reproduzir vídeo"
                        style={{
                          width: 56, height: 56, borderRadius: '50%',
                          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                          border: 'none', cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', zIndex: 1,
                        }}
                      >
                        <IconPlay />
                      </button>
                    </div>
                  </div>

                  {/* Engagement bar */}
                  <div className="studio-engage">
                    <button type="button" className="studio-engage__btn" style={{ color: '#ef4444' }}>
                      <IconHeart /> <span>155</span>
                    </button>
                    <button type="button" className="studio-engage__btn">
                      <IconComment /> <span>0</span>
                    </button>
                    <button type="button" className="studio-engage__btn">
                      <IconBookmark />
                    </button>
                    <button type="button" className="studio-engage__btn" style={{ marginLeft: 'auto' }}>
                      <IconShare />
                    </button>
                  </div>
                </article>
              </div>

              {/* — Banner CTA — */}
              <div className="studio-card" style={{ padding: '1.5rem 1.25rem' }}>
                <h3 style={{ color: 'var(--heading)', fontWeight: 800, fontSize: '1.3rem', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  Cansado do caos de ferramentas?
                </h3>
                <p style={{ color: 'var(--heading-sm)', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  Centralize wiki, fórum e bugs — sem perder o ritmo da comunidade.
                </p>
              </div>
            </section>

            {/* ═══════ COLUNA CENTRAL — Shortcuts / Atalhos ═══════ */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
              <div className="studio-card" style={{ padding: '0.5rem 0' }}>
                {shortcutItems.map((item) => (
                  <a href="#" key={item.title} className="studio-shortcut">
                    <span className="studio-shortcut__icon">{item.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</p>
                      <p style={{ color: 'var(--heading-sm)', fontSize: '0.72rem', marginTop: 2 }}>{item.desc}</p>
                      <p style={{ color: 'var(--footer-text)', fontSize: '0.65rem', marginTop: 2 }}>{item.count}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* ═══════ COLUNA DIREITA — Wiki + Bugs ═══════ */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

              {/* — Latest Wiki Pages — */}
              <div className="studio-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h3 className="studio-section-title">Ultimas Wiki's vistas</h3>
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--heading)', opacity: 0.6, cursor: 'pointer' }}>
                    <IconDots />
                  </button>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {wikiItems.map((w) => (
                    <li key={w.title}>
                      <a
                        href="#"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.6rem',
                          padding: '0.4rem 0.5rem', borderRadius: 8,
                          textDecoration: 'none', transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ flexShrink: 0 }}><IconDoc /></span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: 'white', fontWeight: 600, fontSize: '0.8rem' }}>{w.title}</p>
                          <p style={{ color: 'var(--heading-sm)', fontSize: '0.65rem', marginTop: 1 }}>{w.sub}</p>
                        </div>
                        <div className="studio-avatar studio-avatar--sm" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* — Recent Bugs — */}
              <div className="studio-card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 className="studio-section-title">Recentes Bugs</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button type="button" style={{ background: 'none', border: 'none', color: 'var(--heading)', opacity: 0.6, cursor: 'pointer', padding: 2 }}>
                      <IconPlus />
                    </button>
                    <button type="button" style={{ background: 'none', border: 'none', color: 'var(--heading)', opacity: 0.6, cursor: 'pointer', padding: 2 }}>
                      <IconDots />
                    </button>
                  </div>
                </div>
                <p style={{ color: 'var(--heading-sm)', fontSize: '0.72rem', marginBottom: '0.75rem' }}>
                  3 few tickets
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {bugItems.map((b) => (
                    <li key={b.title}>
                      <a
                        href="#"
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                          padding: '0.5rem', borderRadius: 8,
                          textDecoration: 'none', transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{
                          display: 'flex', width: 32, height: 32, flexShrink: 0,
                          alignItems: 'center', justifyContent: 'center',
                          borderRadius: 6, background: 'rgba(43, 10, 79, 0.5)',
                          marginTop: 2,
                        }}>
                          <IconCalendar />
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: 'white', fontWeight: 600, fontSize: '0.8rem' }}>
                            🐛 {b.title}
                          </p>
                          <p style={{ color: 'var(--heading-sm)', fontSize: '0.65rem', marginTop: 2, lineHeight: 1.4 }}>
                            {b.desc}
                          </p>
                          <span className="studio-tag" style={{ ...b.tagColor, marginTop: 6 }}>
                            {b.tag}
                          </span>
                        </div>
                        <div className="studio-avatar studio-avatar--sm" style={{ marginTop: 2 }} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="studio-footer">
          <span style={{ color: 'var(--studio-logo-purple)' }}>
            <LogoIcon size={16} />
          </span>
          {' '}CampLog © 2026 — Onde os devs e a comunidade se reúnem.
        </footer>
      </div>
    </div>
  )
}
