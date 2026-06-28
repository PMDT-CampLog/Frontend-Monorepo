'use client'

import React, { useState, useEffect } from 'react'
import '@camplog/module-profile/styles.css'
import { useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getPublicProfile
} from '@camplog/api/profile'
import type { SupporterProfile, PublicProfile } from '@camplog/types'
import {
  ProfileHeader,
  ProfileTabs,
  PostFeed,
  LikedPostsFeed,
  InterestsGrid,
  RightSidebar,
} from '@camplog/module-profile'
import type { TabId } from '@camplog/module-profile'
import {
  RocketIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  BookIcon,
  BugIcon,
  UsersIcon,
  GearIcon
} from '@camplog/ui'




/* ──────────────────────── MAIN COMPONENT ──────────────────────── */


export default function ProfilePage() {
  const params = useParams()
  const username = params?.username as string
  const queryClient = useQueryClient()

  const [activeTab, setActiveTab] = useState<TabId>('feed')

  /* Estados para Notificações e Feedback Visual (Toast) */
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activeShortcut, setActiveShortcut] = useState<string>('apoiados')

  /* ──────────────────────── ESTADOS DE WIDGETS INTERATIVOS ──────────────────────── */

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
            isOwner={false}
          />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="profile-tab-content">
            {activeTab === 'feed' && (
              <>
                <PostFeed userId={profile.userId} />
              </>
            )}

            {activeTab === 'likes' && <LikedPostsFeed userId={profile.userId} />}

            {activeTab === 'interests' && (
              <InterestsGrid interests={[]} />
            )}
          </div>
        </main>

        {/* ─── LADO DIREITO: GRID DE WIDGETS ─── */}
        <RightSidebar userId={profile.userId} isOwner={isOwner} />

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

