'use client'

import React, { useState, useEffect } from 'react'
import '../styles/dashboard.css'
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
import { LogoIcon, IconLayout, IconLock, IconEdit, IconUpload, IconList, IconLink, IconChat, IconHeart, UsersIcon, GearIcon, BookIcon, BugIcon } from '@camplog/ui'

/* ──────────────────────── SVG Icons Básicos ──────────────────────── */
/* ──────────────────────── Estrutura de Navegação ──────────────────────── */
const navGroups = [
  {
    title: 'Gestão e Métricas',
    items: [
      { id: 'visao_geral', label: 'Visão Geral', icon: <IconLayout /> },
      { id: 'equipe', label: 'Gerenciar Equipe', icon: <UsersIcon /> },
      { id: 'configuracoes', label: 'Configurações', icon: <GearIcon /> },
    ]
  },
  {
    title: 'Conteúdo e Doc',
    items: [
      { id: 'wiki_publica', label: 'Wikis Públicas', icon: <BookIcon /> },
      { id: 'wiki_privada', label: 'Wikis Privadas', icon: <IconLock /> },
      { id: 'blog', label: 'Blog e Publicações', icon: <IconEdit /> },
      { id: 'midia', label: 'Imagens e Mídia', icon: <IconUpload /> },
    ]
  },
  {
    title: 'Engenharia',
    items: [
      { id: 'bugs', label: 'Relatórios de Bugs', icon: <BugIcon /> },
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

/* ──────────────────────── Feature Descriptions ──────────────────────── */
const itemDescriptions: Record<string, string> = {
  visao_geral: 'Painel geral com métricas de armazenamento, seguidores, bugs ativos e visualizações semanais.',
  equipe: 'Controle os membros do seu estúdio e gerencie permissões de acesso e colaboração.',
  configuracoes: 'Ajuste as preferências do seu estúdio, nome público, biografia e faturamento do plano.',
  wiki_publica: 'Crie e edite documentações acessíveis para toda a comunidade de jogadores.',
  wiki_privada: 'Documentos internos exclusivos para a equipe do estúdio (Indisponível no Plano Indie).',
  blog: 'Publique novidades, atualizações de desenvolvimento e artigos para os seus seguidores.',
  midia: 'Gerencie e faça upload de imagens, assets e arquivos multimídia do seu projeto.',
  bugs: 'Acompanhe e solucione os problemas técnicos reportados pela sua comunidade.',
  changelog: 'Histórico público de atualizações e novas versões lançadas para o seu projeto.',
  integracoes: 'Conecte ferramentas externas como GitHub ou Webhooks ao seu fluxo de trabalho.',
  feed: 'Acompanhe discussões, comentários e interações dos membros no fórum unificado.',
  ranking: 'Métricas detalhadas sobre o nível de interação e fidelidade da sua comunidade.',
}

/* ──────────────────────── Main Component ──────────────────────── */

export default function CreatorDashboard() {
  const [activeTabId, setActiveTabId] = useState('visao_geral')
  const [authorized, setAuthorized] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  // Atalhos salvos do usuário
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([])
  const [isConfigured, setIsConfigured] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  
  // Atalhos selecionados temporariamente no Modal
  const [modalSelected, setModalSelected] = useState<string[]>([])
  
  // Tooltip Hover State
  const [activeTooltip, setActiveTooltip] = useState<{
    text: string
    x: number
    y: number
    align: 'top' | 'right'
  } | null>(null)

  // 1. Verificação de Autenticação e Papel (Role)
  useEffect(() => {
    try {
      let token = typeof window !== 'undefined' ? localStorage.getItem('camplog:token') : null
      
      // Se houver token na URL, ele tem precedência
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')
        if (urlToken) {
          token = urlToken
          localStorage.setItem('camplog:token', urlToken)
        }
      }
      
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1] || ''))
        if (payload.role === 'creator') {
          setUserId(payload.userId || 'default')
          setAuthorized(true)
        } else if (payload.role === 'member' || payload.role === 'apoiador') {
          window.location.href = '/perfil'
        } else {
          window.location.href = 'http://localhost:3000/cadastro'
        }
      } else {
        window.location.href = 'http://localhost:3000/cadastro'
      }
    } catch (e) {
      window.location.href = 'http://localhost:3000/cadastro'
    }
  }, [])

  // 2. Carregar Atalhos do localStorage após autenticação
  useEffect(() => {
    if (!authorized || !userId) return
    const key = `camplog:creator-shortcuts:${userId}`
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSelectedShortcuts(parsed)
        setIsConfigured(true)
      } catch (e) {
        setShowOnboarding(true)
      }
    } else {
      setShowOnboarding(true)
    }
  }, [authorized, userId])

  // 3. Sincronizar modalSelected com selectedShortcuts ao abrir o pop-up
  useEffect(() => {
    if (showOnboarding) {
      setModalSelected(selectedShortcuts)
    }
  }, [showOnboarding, selectedShortcuts])

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

  // Filtrar grupos para a barra lateral esquerda
  const filteredNavGroups = navGroups.map((group) => {
    if (group.title === 'Gestão e Métricas') {
      return group
    }
    const items = group.items.filter(item => selectedShortcuts.includes(item.id))
    return { ...group, items }
  }).filter(group => group.items.length > 0) // Ocultar cabeçalhos de categorias vazias

  const openOnboarding = () => {
    setModalSelected(selectedShortcuts)
    setShowOnboarding(true)
  }

  // Se ainda estiver validando credenciais, exibe tela de carregamento neutra
  if (!authorized) {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        color: 'var(--body-text)',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '1rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--card-border)',
            borderTopColor: 'var(--icon-accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <span>Verificando credenciais...</span>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="studio-shell">
      {/* ── Keyframes Auxiliares CSS ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* ── Onboarding Shortcut Selection Popup ── */}
      {showOnboarding && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div className="studio-card" style={{
            width: '90%',
            maxWidth: '750px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6)',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--card-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(13, 10, 30, 0.4)',
            }}>
              <div>
                <h2 style={{ color: 'var(--heading)', fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-dm-sans), sans-serif', margin: 0 }}>
                  Personalizar Barra Lateral
                </h2>
                <p style={{ color: 'var(--body-text)', fontSize: '0.8rem', marginTop: '0.25rem', margin: '0.25rem 0 0 0' }}>
                  Selecione até 7 atalhos opcionais para a sua barra de ferramentas.
                </p>
              </div>
              <div style={{
                background: (3 + modalSelected.length) > 7 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                color: (3 + modalSelected.length) > 7 ? '#f87171' : 'var(--icon-accent)',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: 'all 0.2s',
              }}>
                {3 + modalSelected.length} / 7 selecionados
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}>
              {navGroups.map((group) => (
                <div key={group.title}>
                  <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--heading-sm)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem',
                    marginTop: 0,
                  }}>
                    {group.title}
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                    gap: '1rem',
                  }}>
                    {group.items.map((item) => {
                      const isFixed = group.title === 'Gestão e Métricas'
                      const isPrivateWiki = item.id === 'wiki_privada'
                      const isChecked = isFixed || modalSelected.includes(item.id)
                      const isDisabled = isFixed || isPrivateWiki
                      const totalCount = 3 + modalSelected.length
                      const limitReached = totalCount >= 7 && !isChecked

                      return (
                        <div
                          key={item.id}
                          style={{ position: 'relative' }}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setActiveTooltip({
                              text: itemDescriptions[item.id] || '',
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                              align: 'top'
                            })
                          }}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <label
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem',
                              borderRadius: '12px',
                              border: isChecked ? '1px solid var(--icon-accent)' : '1px solid var(--card-border)',
                              background: isChecked ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              opacity: isDisabled && !isFixed ? 0.4 : 1,
                              transition: 'all 0.2s ease',
                              userSelect: 'none',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: isChecked ? 'var(--studio-text-primary)' : 'var(--body-text)' }}>
                              <div style={{ color: isChecked ? 'var(--icon-accent)' : 'inherit', display: 'flex', alignItems: 'center' }}>
                                {item.icon}
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.label}</span>
                                {isPrivateWiki && (
                                  <span style={{ fontSize: '0.65rem', color: '#f87171', fontWeight: 600, marginTop: '2px' }}>
                                    Indisponível no Plano Indie
                                  </span>
                                )}
                                {isFixed && (
                                  <span style={{ fontSize: '0.65rem', color: 'var(--heading-sm)', fontWeight: 600, marginTop: '2px' }}>
                                    Fixo Obrigatório
                                  </span>
                                )}
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              disabled={isDisabled || limitReached}
                              onChange={() => {
                                if (isFixed || isPrivateWiki) return
                                if (isChecked) {
                                  setModalSelected(modalSelected.filter(id => id !== item.id))
                                } else {
                                  if (totalCount < 7) {
                                    setModalSelected([...modalSelected, item.id])
                                  }
                                }
                              }}
                              style={{
                                accentColor: 'var(--icon-accent)',
                                cursor: (isDisabled || limitReached) ? 'not-allowed' : 'pointer',
                                width: '16px',
                                height: '16px',
                              }}
                            />
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid var(--card-border)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              alignItems: 'center',
              background: 'rgba(13, 10, 30, 0.4)',
            }}>
              {isConfigured && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTooltip(null)
                    setShowOnboarding(false)
                  }}
                  style={{
                    background: 'transparent',
                    color: 'var(--body-text)',
                    border: '1px solid var(--card-border)',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--studio-hover-bg)'
                    e.currentTarget.style.color = 'var(--studio-text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--body-text)'
                  }}
                >
                  Cancelar
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (3 + modalSelected.length > 7) {
                    alert('Por favor, selecione no máximo 7 atalhos.')
                    return
                  }
                  // Save config
                  const key = `camplog:creator-shortcuts:${userId}`
                  localStorage.setItem(key, JSON.stringify(modalSelected))
                  setSelectedShortcuts(modalSelected)
                  setIsConfigured(true)
                  setActiveTooltip(null)
                  setShowOnboarding(false)
                }}
                style={{
                  background: 'var(--icon-accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
              >
                Salvar Atalhos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className="studio-sidebar" style={{ width: '16rem', alignItems: 'flex-start', padding: '1.25rem 1rem', overflowY: 'auto' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', color: 'var(--heading)', marginBottom: '2rem', padding: '0 0.5rem' }}>
          <LogoIcon size={32} />
          <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--heading)' }}>
            Creator<span style={{ color: 'var(--icon-accent)', fontWeight: 600 }}>Studio</span>
          </span>
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          {filteredNavGroups.map((group) => (
            <div key={group.title}>
              <div style={{ padding: '0 0.5rem', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--heading-sm)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {group.title}
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {group.items.map((item) => {
                  const isActive = activeTabId === item.id
                  return (
                    <div
                      key={item.id}
                      style={{ position: 'relative', width: '100%' }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTabId(item.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: isActive ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))' : 'transparent',
                          color: isActive ? 'var(--studio-text-primary)' : 'var(--body-text)',
                          fontWeight: isActive ? 700 : 500,
                          transition: 'all 0.2s ease',
                          borderLeft: isActive ? '3px solid var(--icon-accent)' : '3px solid transparent',
                          fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '0.85rem',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setActiveTooltip({
                            text: itemDescriptions[item.id] || '',
                            x: rect.right + 8,
                            y: rect.top + rect.height / 2,
                            align: 'right'
                          })
                          if (!isActive) e.currentTarget.style.background = 'var(--studio-hover-bg)'
                        }}
                        onMouseLeave={(e) => {
                          setActiveTooltip(null)
                          if (!isActive) e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        <div style={{ color: isActive ? 'var(--icon-accent)' : 'inherit', display: 'flex', alignItems: 'center' }}>
                          {item.icon}
                        </div>
                        {item.label}
                      </button>
                    </div>
                  )
                })}
              </nav>
            </div>
          ))}

          {/* Botão Personalizar Atalhos */}
          <button
            type="button"
            onClick={openOnboarding}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.5rem',
              borderRadius: '8px',
              border: '1px dashed var(--card-border)',
              background: 'rgba(139, 92, 246, 0.05)',
              color: 'var(--heading-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
              marginTop: '1rem',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'
              e.currentTarget.style.borderColor = 'var(--icon-accent)'
              e.currentTarget.style.color = 'var(--studio-text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.05)'
              e.currentTarget.style.borderColor = 'var(--card-border)'
              e.currentTarget.style.color = 'var(--heading-sm)'
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Personalizar Atalhos
          </button>
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

      {/* Unified Tooltip manager */}
      {activeTooltip && (
        <div style={{
          position: 'fixed',
          left: activeTooltip.x,
          top: activeTooltip.y,
          transform: activeTooltip.align === 'top' ? 'translate(-50%, -100%)' : 'translateY(-50%)',
          backgroundColor: '#130e2a',
          color: '#ffffff',
          padding: '0.6rem 0.8rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          width: activeTooltip.align === 'top' ? '240px' : '220px',
          border: '1px solid var(--card-border)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
          zIndex: 100005,
          pointerEvents: 'none',
          lineHeight: '1.4',
          textAlign: activeTooltip.align === 'top' ? 'center' : 'left',
          animation: 'fadeIn 0.15s ease-out',
        }}>
          {activeTooltip.text}
          {activeTooltip.align === 'top' ? (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: '#130e2a transparent transparent transparent'
            }} />
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '100%',
              transform: 'translateY(-50%)',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: 'transparent #130e2a transparent transparent'
            }} />
          )}
        </div>
      )}
    </div>
  )
}
