'use client'

import React, { useState } from 'react'
import {
  useStudioMetrics,
  useTeamMembers,
  useStudioContent,
  useMediaLibrary,
  useBugTracker,
  useCommunityFeed
} from '../hooks/creator-mocks'

import { ViewTeamManager } from './creator-views/ViewTeamManager'
import { ViewSettings } from './creator-views/ViewSettings'
import { ViewBlogManager } from './creator-views/ViewBlogManager'
import { ViewMediaLibrary } from './creator-views/ViewMediaLibrary'

import { WikiEditor } from '@camplog/module-wiki'
import { BugBoard } from '@camplog/module-bug-tracker'
import { UnifiedFeed } from '@camplog/module-forum'

/* ──────────────────────── SVG Icons Básicos ──────────────────────── */
function LogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{ display: 'block', fill: 'currentColor' }}>
      <path d="M 200 60 C 200 60 130 130 135 200 C 140 250 215 265 250 225 C 270 200 260 160 260 160 C 260 160 240 190 220 190 C 195 190 200 140 200 140 C 200 140 220 110 200 60 Z" />
      <g>
        <path d="M 140 270 L 151 281 L 112 305 L 151 329 L 140 340 L 89 305 Z" />
        <path d="M 185 345 L 175 340 L 215 255 L 225 260 Z" />
        <path d="M 260 270 L 311 305 L 260 340 L 249 329 L 288 305 L 249 281 Z" />
      </g>
    </svg>
  )
}

function IconLayout() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> }
function IconUsers() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> }
function IconGear() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> }
function IconBook() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> }
function IconLock() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> }
function IconEdit() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
function IconUpload() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> }
function IconBug() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="13" rx="5" ry="6" /><path d="M4 9l2 2M20 9l-2 2M4 15l2-2M20 15l-2-2M12 3v3M9 3h6M12 21v-3" /></svg> }
function IconList() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg> }
function IconLink() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> }
function IconChat() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> }
function IconHeart() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> }

/* ──────────────────────── Estrutura de Navegação ──────────────────────── */
const navGroups = [
  {
    title: 'Gestão e Métricas',
    items: [
      { id: 'visao_geral', label: 'Visão Geral', icon: <IconLayout /> },
      { id: 'equipe', label: 'Gerenciar Equipe', icon: <IconUsers /> },
      { id: 'configuracoes', label: 'Configurações', icon: <IconGear /> },
    ]
  },
  {
    title: 'Conteúdo e Doc',
    items: [
      { id: 'wiki_publica', label: 'Wikis Públicas', icon: <IconBook /> },
      { id: 'wiki_privada', label: 'Wikis Privadas', icon: <IconLock /> },
      { id: 'blog', label: 'Blog e Publicações', icon: <IconEdit /> },
      { id: 'midia', label: 'Imagens e Mídia', icon: <IconUpload /> },
    ]
  },
  {
    title: 'Engenharia',
    items: [
      { id: 'bugs', label: 'Relatórios de Bugs', icon: <IconBug /> },
      { id: 'changelog', label: 'Changelog', icon: <IconList /> },
      { id: 'integracoes', label: 'Integrações Externas', icon: <IconLink /> },
    ]
  },
  {
    title: 'Comunidade',
    items: [
      { id: 'feed', label: 'Feed Unificado', icon: <IconChat /> },
      { id: 'ranking', label: 'Engajamento', icon: <IconHeart /> },
    ]
  }
]

/* ──────────────────────── Sub-componentes das Telas ──────────────────────── */

function ViewVisaoGeral() {
  const { data, loading } = useStudioMetrics()

  if (loading) return <div style={{ color: 'var(--body-text)' }}>Carregando métricas...</div>

  const storageUsedMB = (data.storage.used / (1024 * 1024)).toFixed(1)
  const storageLimitMB = (data.storage.limit / (1024 * 1024)).toFixed(1)
  const storagePercent = (data.storage.used / data.storage.limit) * 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Storage Progress */}
      <section className="studio-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Armazenamento Mensal (Plano Indie)</h3>
        <div style={{ background: 'var(--card-border)', borderRadius: '8px', height: '12px', overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ width: `${storagePercent}%`, height: '100%', background: 'var(--icon-accent)', transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--body-text)' }}>
          <span>{storageUsedMB} MB utilizados</span>
          <span>{storageLimitMB} MB limite</span>
        </div>
      </section>

      {/* Métricas */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="studio-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Novos Seguidores</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--studio-text-primary)' }}>{data.followers.total}</p>
          <p style={{ color: '#10b981', fontSize: '0.85rem' }}>{data.followers.trend} esta semana</p>
        </div>
        <div className="studio-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Bugs Críticos Abertos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--studio-text-primary)' }}>{data.bugs.critical}</p>
          <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>De {data.bugs.open} total em aberto</p>
        </div>
        <div className="studio-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--heading-sm)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Visualizações da Semana</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--studio-text-primary)' }}>{data.views.weekly}</p>
          <p style={{ color: 'var(--body-text)', fontSize: '0.85rem' }}>Em todas as wikis e blogs</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ display: 'flex', gap: '1rem' }}>
        <button className="studio-sidebar__btn" style={{ background: 'var(--icon-accent)', color: '#fff', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '8px' }}>+ Nova Publicação</button>
        <button className="studio-sidebar__btn" style={{ background: 'var(--card-border)', color: 'var(--heading)', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Registrar Bug</button>
      </section>
    </div>
  )
}

function ViewPlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <div className="studio-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--heading)', fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ color: 'var(--body-text)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>{description}</p>
    </div>
  )
}

/* ──────────────────────── Main Component ──────────────────────── */

export default function CreatorDashboard() {
  const [activeTabId, setActiveTabId] = useState('visao_geral')

  // Helper para buscar o label do activeTab
  const activeLabel = navGroups.flatMap(g => g.items).find(i => i.id === activeTabId)?.label || 'Dashboard'

  const renderContent = () => {
    switch (activeTabId) {
      case 'visao_geral':
        return <ViewVisaoGeral />
      case 'equipe':
        return <ViewTeamManager />
      case 'configuracoes':
        return <ViewSettings />
      case 'wiki_publica':
        return <WikiEditor />
      case 'blog':
        return <ViewBlogManager />
      case 'midia':
        return <ViewMediaLibrary />
      case 'bugs':
        return <BugBoard />
      case 'feed':
        return <UnifiedFeed />
      default:
        return <ViewPlaceholder title={activeLabel} description="Funcionalidade em desenvolvimento baseada na arquitetura aprovada." />
    }
  }

  return (
    <div className="studio-shell">
      {/* ── Sidebar ── */}
      <aside className="studio-sidebar" style={{ width: '16rem', alignItems: 'flex-start', padding: '1.25rem 1rem', overflowY: 'auto' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', color: 'var(--heading)', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <LogoIcon size={32} />
          <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--heading)' }}>
            Creator<span style={{ color: 'var(--icon-accent)', fontWeight: 600 }}>Studio</span>
          </span>
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          {navGroups.map((group) => (
            <div key={group.title}>
              <div style={{ padding: '0 0.5rem', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--heading-sm)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {group.title}
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {group.items.map((item) => {
                  const isActive = activeTabId === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTabId(item.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: isActive ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))' : 'transparent',
                        color: isActive ? 'var(--studio-text-primary)' : 'var(--body-text)',
                        fontWeight: isActive ? 700 : 500,
                        transition: 'all 0.2s ease',
                        borderLeft: isActive ? '3px solid var(--icon-accent)' : '3px solid transparent',
                        fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--studio-hover-bg)' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      <div style={{ color: isActive ? 'var(--icon-accent)' : 'inherit' }}>{item.icon}</div>
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Workspace ── */}
      <div className="studio-workspace" style={{ background: 'radial-gradient(ellipse at top right, rgba(26, 15, 60, 0.5), transparent 40%), var(--bg)' }}>
        <header className="studio-topbar" style={{ padding: '0 2rem' }}>
          <h1 style={{ color: 'var(--studio-text-primary)', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-dm-sans), sans-serif', margin: 0 }}>
            {activeLabel}
          </h1>
          <div className="studio-topbar__end">
            <a href="/" className="studio-topbar__avatar" title="Voltar ao site" style={{ display: 'block', textDecoration: 'none' }} />
          </div>
        </header>

        <main className="studio-main" style={{ padding: '2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
