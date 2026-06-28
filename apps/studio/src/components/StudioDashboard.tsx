'use client'

import React, { useState, useEffect, useRef } from 'react'
import '../styles/dashboard.css'
import { searchProfiles } from '@camplog/api/profile'
import { LogoIcon, IconHome, IconSearch, IconChat, IconPlus, IconDots, IconHeart, IconComment, IconShare, IconPlay, IconDoc, IconRss, IconCalendar, IconFlag, IconCompass, UsersIcon, GearIcon, BookIcon, BugIcon, BellIcon, BookmarkIcon } from '@camplog/ui'

/* ──────────────────────── SVG Icons ──────────────────────── */

/* ──────────────────────── Data ──────────────────────── */

const sidebarNav = [
  { title: 'Início', icon: <IconHome /> },
  { title: 'Comunidade', icon: <UsersIcon /> },
  { title: 'Wiki', icon: <BookIcon /> },
  { title: 'Bugs', icon: <BugIcon /> },
  { title: 'Configurações', icon: <GearIcon /> },
] as const

const shortcutItems = [
  {
    title: 'Lore',
    desc: 'História e origem do Camplog.',
    icon: <BookIcon />,
    count: '1 visualização   · 1 hr atrás',
  },
  {
    title: 'Guia Iniciante',
    desc: 'Primeiros passos para novos usuários.',
    icon: <IconFlag />,
    count: '12 visualizações · 3 min atrás',
  },
  {
    title: 'Blog',
    desc: 'Atualizações e changelog do Camplog.',
    icon: <IconRss />,
    count: '312 mil visualizações · 1 plot atrás',
  },
  {
    title: 'Bug Short',
    desc: 'Resumo rápido do que foi reportado.',
    icon: <BugIcon />,
    count: '7 visualizações · 1 mho atrás',
  },
  {
    title: 'Explore',
    desc: 'Exploração de conteúdo e curiosidades.',
    icon: <IconCompass />,
    count: '10 visualizações · 1 plot atrás',
  },
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
    tagColor: {
      borderColor: 'var(--tag-in-progress-border)',
      backgroundColor: 'var(--tag-in-progress-bg)',
      color: 'var(--tag-in-progress-color)',
    } as React.CSSProperties,
  },
  {
    title: 'Bug Tracker',
    desc: 'Resumo rápido do que será consertado no próximo patch',
    tag: 'Feito',
    tagColor: {
      borderColor: 'var(--tag-done-border)',
      backgroundColor: 'var(--tag-done-bg)',
      color: 'var(--tag-done-color)',
    } as React.CSSProperties,
  },
]

/* ──────────────────────── Main Component ──────────────────────── */

export default function StudioDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Close search results dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search logic
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true)
      try {
        const results = await searchProfiles(searchQuery)
        setSearchResults(results)
        setShowSearchResults(true)
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

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
            <div ref={searchContainerRef} className="studio-topbar__search" style={{ position: 'relative' }}>
              <span className="studio-search-icon">
                <IconSearch />
              </span>
              <input
                type="search"
                placeholder="Buscar por @username ou Nome..."
                className="studio-search-input"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchResults(true)
                }}
              />
              
              {/* Dropdown de Resultados da Pesquisa */}
              {showSearchResults && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '0.5rem',
                  background: '#130e2a',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
                  zIndex: 99999,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  padding: '0.5rem'
                }}>
                  {isSearching ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--body-text)', fontSize: '0.85rem' }}>
                      Buscando contas...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--body-text)', fontSize: '0.85rem' }}>
                      Nenhum resultado encontrado
                    </div>
                  ) : (
                    searchResults.map((p: any) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setShowSearchResults(false)
                          // Redireciona para o perfil público do usuário
                          window.location.href = `http://localhost:3000/perfil/${p.username}`
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderBottom: '1px solid rgba(255,255,255,0.02)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {p.avatarUrl ? (
                          <img
                            src={p.avatarUrl}
                            alt={p.username}
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--icon-accent)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.85rem'
                          }}>
                            {p.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', textAlign: 'left' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--heading)' }}>
                            {p.displayName || p.username}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--icon-accent)' }}>
                            @{p.username}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <button type="button" className="studio-topbar__icon-btn" aria-label="Mensagens">
              <IconChat />
            </button>
            <button
              type="button"
              className="studio-topbar__icon-btn"
              aria-label="Notificações"
              style={{ position: 'relative' }}
            >
              <BellIcon />
              <span
                style={{
                  position: 'absolute',
                  right: 4,
                  top: 4,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#ef4444',
                  border: '2px solid var(--studio-chrome)',
                }}
              />
            </button>
            <button
              className="studio-topbar__avatar"
              aria-label="Foto de perfil"
              title="Meu Perfil"
              onClick={() => {
                try {
                  const token = localStorage.getItem('camplog:token')
                  if (token) {
                    const payload = JSON.parse(atob(token.split('.')[1] || ''))
                    if (payload.role === 'creator') {
                      window.location.href = '/creator'
                      return
                    }
                  }
                  window.location.href = '/perfil'
                } catch {
                  window.location.href = '/perfil'
                }
              }}
              style={{ display: 'block', cursor: 'pointer', border: '2px solid var(--card-border)', background: 'var(--module-bg)' }}
            />
          </div>
        </header>

        {/* ── Main content: 3-column grid ── */}
        <main className="studio-main">
          <div className="studio-grid">
            {/* ═══════ COLUNA ESQUERDA — Devlog Post + CTA ═══════ */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}
            >
              {/* — Devlog Post header — */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h2
                    style={{
                      color: 'var(--heading)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid var(--card-border)',
                    }}
                  >
                    <div className="studio-avatar studio-avatar--md" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: 'var(--studio-text-primary)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        CampLog
                        <span
                          style={{
                            color: 'var(--heading-sm)',
                            fontWeight: 400,
                            marginLeft: '0.5rem',
                          }}
                        >
                          admin · há 30m
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--footer-text)',
                        cursor: 'pointer',
                      }}
                    >
                      <IconDots />
                    </button>
                  </div>

                  {/* Post body */}
                  <div style={{ padding: '1rem' }}>
                    <p
                      style={{
                        color: 'var(--body-text)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        marginBottom: '0.75rem',
                      }}
                    >
                      Bem-vindo ao Devlog Post! Este é o último post sobre o custo de conteúdo para
                      desenvolver comunidades, feira e mercado. Fique ligado nas novidades!
                    </p>
                    {/* Video/Image placeholder */}
                    <div
                      style={{
                        aspectRatio: '16/9',
                        borderRadius: 12,
                        background:
                          'linear-gradient(135deg, #2b0a4f 0%, #1a0a2e 50%, #0d0a1e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: 0.3,
                          background:
                            'radial-gradient(circle at 30% 40%, rgba(167,139,250,0.3), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,241,118,0.15), transparent 50%)',
                        }}
                      />
                      <button
                        type="button"
                        aria-label="Reproduzir vídeo"
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.4)',
                          backdropFilter: 'blur(6px)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1,
                        }}
                      >
                        <IconPlay />
                      </button>
                    </div>
                  </div>

                  {/* Engagement bar */}
                  <div className="studio-engage">
                    <button
                      type="button"
                      className="studio-engage__btn"
                      style={{ color: '#ef4444' }}
                    >
                      <IconHeart /> <span>155</span>
                    </button>
                    <button type="button" className="studio-engage__btn">
                      <IconComment /> <span>0</span>
                    </button>
                    <button type="button" className="studio-engage__btn">
                      <BookmarkIcon />
                    </button>
                    <button
                      type="button"
                      className="studio-engage__btn"
                      style={{ marginLeft: 'auto' }}
                    >
                      <IconShare />
                    </button>
                  </div>
                </article>
              </div>

              {/* — Banner CTA — */}
              <div className="studio-card" style={{ padding: '1.5rem 1.25rem' }}>
                <h3
                  style={{
                    color: 'var(--heading)',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                  }}
                >
                  Cansado do caos de ferramentas?
                </h3>
                <p
                  style={{
                    color: 'var(--heading-sm)',
                    fontSize: '0.85rem',
                    marginTop: '0.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  Centralize wiki, fórum e bugs — sem perder o ritmo da comunidade.
                </p>
              </div>
            </section>

            {/* ═══════ COLUNA CENTRAL — Shortcuts / Atalhos ═══════ */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}
            >
              <div className="studio-card" style={{ padding: '0.5rem 0' }}>
                {shortcutItems.map((item) => (
                  <a href="#" key={item.title} className="studio-shortcut">
                    <span className="studio-shortcut__icon">{item.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          color: 'var(--studio-text-primary)',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        {item.title}
                      </p>
                      <p style={{ color: 'var(--heading-sm)', fontSize: '0.72rem', marginTop: 2 }}>
                        {item.desc}
                      </p>
                      <p style={{ color: 'var(--footer-text)', fontSize: '0.65rem', marginTop: 2 }}>
                        {item.count}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* ═══════ COLUNA DIREITA — Wiki + Bugs ═══════ */}
            <section
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}
            >
              {/* — Latest Wiki Pages — */}
              <div className="studio-card" style={{ padding: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3 className="studio-section-title">Ultimas Wiki's vistas</h3>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--heading)',
                      opacity: 0.6,
                      cursor: 'pointer',
                    }}
                  >
                    <IconDots />
                  </button>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {wikiItems.map((w) => (
                    <li key={w.title}>
                      <a
                        href="#"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.4rem 0.5rem',
                          borderRadius: 8,
                          textDecoration: 'none',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--studio-hover-bg)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span style={{ flexShrink: 0 }}>
                          <IconDoc />
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              color: 'var(--studio-text-primary)',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                            }}
                          >
                            {w.title}
                          </p>
                          <p
                            style={{
                              color: 'var(--heading-sm)',
                              fontSize: '0.65rem',
                              marginTop: 1,
                            }}
                          >
                            {w.sub}
                          </p>
                        </div>
                        <div className="studio-avatar studio-avatar--sm" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* — Recent Bugs — */}
              <div className="studio-card" style={{ padding: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <h3 className="studio-section-title">Recentes Bugs</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--heading)',
                        opacity: 0.6,
                        cursor: 'pointer',
                        padding: 2,
                      }}
                    >
                      <IconPlus />
                    </button>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--heading)',
                        opacity: 0.6,
                        cursor: 'pointer',
                        padding: 2,
                      }}
                    >
                      <IconDots />
                    </button>
                  </div>
                </div>
                <p
                  style={{
                    color: 'var(--heading-sm)',
                    fontSize: '0.72rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  3 few tickets
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {bugItems.map((b) => (
                    <li key={b.title}>
                      <a
                        href="#"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                          padding: '0.5rem',
                          borderRadius: 8,
                          textDecoration: 'none',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--studio-hover-bg)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span
                          style={{
                            display: 'flex',
                            width: 32,
                            height: 32,
                            flexShrink: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 6,
                            background: 'var(--module-bg)',
                            marginTop: 2,
                          }}
                        >
                          <IconCalendar />
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              color: 'var(--studio-text-primary)',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                            }}
                          >
                            🐛 {b.title}
                          </p>
                          <p
                            style={{
                              color: 'var(--heading-sm)',
                              fontSize: '0.65rem',
                              marginTop: 2,
                              lineHeight: 1.4,
                            }}
                          >
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
          </span>{' '}
          CampLog © 2026 — Onde os devs e a comunidade se reúnem.
        </footer>
      </div>
    </div>
  )
}
