'use client'

import React, { useState, useEffect } from 'react'
import '@camplog/module-profile/styles.css'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getPublicProfile
} from '@camplog/api/profile'
import type { PublicProfile } from '@camplog/types'
import {
  ProfileHeader,
  ProfileTabs,
  PostFeed,
  LikedPostsFeed,
  InterestsGrid,
  RightSidebar,
} from '@camplog/module-profile'
import type { TabId } from '@camplog/module-profile'

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */

export default function ProfilePage() {
  const params = useParams()
  const username = params?.username as string
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<TabId>('feed')

  /* Estados para Notificações e Feedback Visual (Toast) */
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activeShortcut, setActiveShortcut] = useState<string>('apoiados')

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const showToast = (msg: string) => {
    setToastMessage(msg)
  }

  // Sidebar shortcut click handler
  const handleShortcutClick = (id: string, label: string) => {
    setActiveShortcut(id)
    if (id === 'apoiados' || id === 'seguindo') {
      setActiveTab('interests')
      showToast(`Navegando para o tab Interesses / Projetos Apoiados.`)
    } else if (id === 'salvas') {
      setActiveTab('likes')
      showToast(`Navegando para o tab Postagens Salvas / Curtidas.`)
    } else {
      showToast(`Atalho acionado: ${label} (Simulando carregamento de dados...)`)
    }
  }

  // Busca o perfil do usuário na Pokedex
  const { data: profile, isLoading, isError } = useQuery<PublicProfile>({
    queryKey: ['publicProfile', username],
    queryFn: () => getPublicProfile(username),
    enabled: !!username,
  })

  // Verifica se o usuário logado é o dono do perfil
  const currentUserId =
    typeof window !== 'undefined'
      ? (() => {
          try {
            const token = localStorage.getItem('camplog:token')
            if (!token) return null
            const payload = JSON.parse(atob(token.split('.')[1] || ''))
            return payload.userId || null
          } catch {
            return null
          }
        })()
      : null

  const isOwner = profile ? currentUserId === profile.userId : false
  const isCreator = profile?.role === 'creator' || profile?.role === 'CREATOR'

  if (isLoading) {
    return (
      <div className="profile-page-loading">
        <div className="loading-spinner" />
        <p>Carregando perfil...</p>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="profile-page-error">
        <h2>Perfil não encontrado</h2>
        <p>O perfil solicitado não existe ou não está disponível.</p>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-public-layout">
        
        {/* ─── CENTRO: CONTEÚDO PRINCIPAL ─── */}
        <main className="profile-center-column">
          {isOwner && (
            <div style={{ background: 'var(--icon-accent)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>Você está visualizando seu perfil público.</span>
              <button onClick={() => window.location.href = `http://localhost:3001/perfil/${username}`} style={{ background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Gerenciar no Studio
              </button>
            </div>
          )}
          <ProfileHeader
            profile={{ ...profile, displayName: profile.username } as any} // Mock translation for module
            isOwner={isOwner}
            onPostsClick={() => setActiveTab('feed')}
          />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} isCreator={isCreator} />

          <div className="profile-tab-content">
            {activeTab === 'feed' && (
              <>
                <PostFeed userId={profile.userId} />
              </>
            )}

            {activeTab === 'likes' && <LikedPostsFeed userId={profile.userId} />}

            {activeTab === 'interests' && !isCreator && (
              <InterestsGrid interests={[]} />
            )}

            {activeTab === 'projects' && isCreator && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="studio-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--card-border)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--icon-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>CL</div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--heading)' }}>CampLog Core</h3>
                      <span style={{ fontSize: '0.75rem', color: '#fff176', fontWeight: 600 }}>Desenvolvimento</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body-text)', margin: '0 0 1rem 0', lineHeight: 1.4, textAlign: 'left' }}>
                    Sistema unificado de devlogs, wikis e fóruns integrados para comunidades de gamedev e engenharia.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--heading-sm)' }}>
                    <span>🚀 Ativo</span>
                    <span>12 colaboradores</span>
                  </div>
                </div>
                
                <div className="studio-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--card-border)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--icon-accent)' }}>SDK</div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--heading)' }}>Pokedex API Client</h3>
                      <span style={{ fontSize: '0.75rem', color: '#fff176', fontWeight: 600 }}>Biblioteca</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--body-text)', margin: '0 0 1rem 0', lineHeight: 1.4, textAlign: 'left' }}>
                    Cliente de API e injetor de dados analíticos integrado com a nossa data platform em FastAPI e Java Spring.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--heading-sm)' }}>
                    <span>📦 Beta</span>
                    <span>4 colaboradores</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wikis' && isCreator && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="studio-card" style={{ padding: '1.25rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--card-border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--heading)' }}>Guia de Instalação e Configuração</h3>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--body-text)' }}>
                      Atualizado em {new Date().toLocaleDateString('pt-BR')} • Categoria: <b>Instalação</b>
                    </p>
                  </div>
                  <a href="#" style={{ fontSize: '0.85rem', color: '#fff176', fontWeight: 600, textDecoration: 'none' }}>Ler Wiki →</a>
                </div>
                
                <div className="studio-card" style={{ padding: '1.25rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--card-border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--heading)' }}>Arquitetura de Monólitos Modulares</h3>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--body-text)' }}>
                      Atualizado em {new Date().toLocaleDateString('pt-BR')} • Categoria: <b>Arquitetura</b>
                    </p>
                  </div>
                  <a href="#" style={{ fontSize: '0.85rem', color: '#fff176', fontWeight: 600, textDecoration: 'none' }}>Ler Wiki →</a>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ─── LADO DIREITO: GRID DE WIDGETS ─── */}
        <RightSidebar userId={profile.userId} isOwner={isOwner} isCreator={isCreator} />

      </div>

      {/* ─── TOAST NOTIFICATION SYSTEM ─── */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#130e2a',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid var(--card-border)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <span style={{ color: 'var(--welcome-btn-border)' }}>✓</span>
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
