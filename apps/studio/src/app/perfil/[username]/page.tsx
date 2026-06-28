'use client'

import React, { useState, useEffect } from 'react'
import '@camplog/module-profile/styles.css'
import { useRouter, useParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
  createPost,
  getPublicProfile,
  updatePublicProfile,
  checkUsernameAvailability
} from '@camplog/api/profile'
import type { SupporterProfile, UpdateProfileRequest, CreatePostRequest, PublicProfile, UpdatePublicProfileRequest } from '@camplog/types'
import {
  ProfileHeader,
  ProfileTabs,
  PostFeed,
  PostComposer,
  ProfileEditModal,
  ImageUploader,
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



/* ──────────────────────── CONSTANTES ──────────────────────── */


function UsernameOnboardingModal({ onSuccess }: { onSuccess: (username: string) => void }) {
  const [username, setUsername] = useState('')
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: UpdatePublicProfileRequest) => updatePublicProfile(data),
    onSuccess: (_, variables) => {
      onSuccess(variables.username!)
    },
    onError: () => {
      setErrorMsg('Erro ao salvar o username. Tente novamente.')
    }
  })

  useEffect(() => {
    if (!username || username.length < 3) {
      setIsAvailable(null)
      setErrorMsg('O username deve ter pelo menos 3 caracteres.')
      return
    }
    const timer = setTimeout(async () => {
      setIsChecking(true)
      try {
        const available = await checkUsernameAvailability(username)
        setIsAvailable(available)
        setErrorMsg(available ? '' : 'Este username já está em uso.')
      } catch (e: any) {
        setIsAvailable(null)
        setErrorMsg('Erro na verificação. Tente novamente.')
        console.error('Username check error:', e)
      } finally {
        setIsChecking(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [username])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 999999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: '#1a0533', padding: '2rem', borderRadius: '16px',
        border: '1px solid var(--card-border)', width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', gap: '1rem'
      }}>
        <h2 style={{ margin: 0, color: 'var(--heading)' }}>Bem-vindo ao CampLog!</h2>
        <p style={{ margin: 0, color: 'var(--body-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Para continuar, você precisa definir o seu <strong>@username</strong> único. Ele será usado para o seu perfil público.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--heading-sm)' }}>ESCOLHA SEU USERNAME</label>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--input-border)', borderRadius: '8px', padding: '0 0.75rem' }}>
            <span style={{ color: 'var(--heading-sm)', fontWeight: 600 }}>@</span>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
              placeholder="seu-estudio"
              style={{
                flex: 1, background: 'transparent', border: 'none', color: '#fff',
                padding: '0.75rem 0.5rem', outline: 'none', fontSize: '0.95rem'
              }}
            />
          </div>
          {isChecking && <span style={{ fontSize: '0.75rem', color: '#06b6d4' }}>Verificando disponibilidade...</span>}
          {!isChecking && errorMsg && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errorMsg}</span>}
          {!isChecking && isAvailable && <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Username disponível!</span>}
        </div>

        <button
          disabled={!isAvailable || isChecking || mutation.isPending}
          onClick={() => mutation.mutate({ username })}
          style={{
            marginTop: '1rem', width: '100%', padding: '0.75rem',
            background: (!isAvailable || isChecking) ? 'rgba(255,255,255,0.1)' : 'var(--icon-accent)',
            color: (!isAvailable || isChecking) ? '#888' : '#fff',
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: (!isAvailable || isChecking) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {mutation.isPending ? 'Salvando...' : 'Confirmar e Continuar'}
        </button>
      </div>
    </div>
  )
}

export default function StudioProfilePage() {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const username = params?.username as string

  const [activeTab, setActiveTab] = useState<TabId>('feed')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [showCoverUploader, setShowCoverUploader] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  /* Estados para Notificações e Feedback Visual (Toast) */
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activeShortcut, setActiveShortcut] = useState<string>('apoiados')

  /* ──────────────────────── ESTADOS DE WIDGETS INTERATIVOS ──────────────────────── */

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token') || localStorage.getItem('camplog:token')
      
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1] || ''))
        if (payload.userId) {
          setUserId(payload.userId)
          return
        }
      }
      // Se não encontrou token válido ou userId, redireciona para login
      window.location.href = 'http://localhost:3000/login'
    } catch {
      window.location.href = 'http://localhost:3000/login'
    }
  }, [])

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

  // Busca o perfil na Pokedex
  const { data: profile, isLoading, isError } = useQuery<PublicProfile>({
    queryKey: ['publicProfile', username],
    queryFn: () => getPublicProfile(username),
    enabled: !!username,
  })

  // Mutations Pokedex
  const updateMutation = useMutation({
    mutationFn: (data: UpdatePublicProfileRequest) => updatePublicProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicProfile', username] })
      setShowEditModal(false)
      showToast('Configurações de perfil atualizadas com sucesso! Elas estarão visíveis em instantes.')
    },
  })

  const avatarMutation = useMutation({
    mutationFn: (file: File) => updatePublicProfile({}, file, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicProfile', username] })
      showToast('Avatar em processamento, atualização visível em breve!')
    },
  })

  const coverMutation = useMutation({
    mutationFn: (file: File) => updatePublicProfile({}, undefined, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicProfile', username] })
      showToast('Foto de capa em processamento, atualização visível em breve!')
    },
  })

  const postMutation = useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', profile?.userId] })
      showToast('Postagem criada no feed!')
    },
  })

  if (!userId || isLoading) {
    return (
      <div className="profile-page-loading">
        <div className="loading-spinner" />
        <p>Carregando perfil...</p>
      </div>
    )
  }

  // Se houve erro na busca (404) e o username atual da URL for na verdade o userId do usuário,
  // isso significa que ele está no fluxo de Onboarding (sem perfil criado ainda).
  const isOnboarding = isError && userId === username

  if (isOnboarding) {
    return <UsernameOnboardingModal onSuccess={(newUsername) => router.replace(`/perfil/${newUsername}`)} />
  }

  if (isError || !profile) {
    return (
      <div className="profile-page-error">
        <h2>Perfil não encontrado</h2>
        <p>O perfil solicitado não existe ou não está disponível.</p>
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--icon-accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Voltar para Home
        </button>
      </div>
    )
  }
  return (
    <div className="profile-page">
      <div className="profile-dashboard-layout">
        
        {/* ─── LADO ESQUERDO: MENU DE NAVEGAÇÃO ─── */}
        <aside className="profile-sidebar-left">
          <div className="widget-card" style={{ padding: '1rem', gap: '0.5rem' }}>
            <button
              onClick={() => handleShortcutClick('apoiados', 'Projetos Apoiados')}
              className={`profile-nav-item ${activeShortcut === 'apoiados' ? 'active' : ''}`}
            >
              <RocketIcon />
              <span>Projetos Apoiados</span>
            </button>

            <button
              onClick={() => handleShortcutClick('notificacoes', 'Notificações')}
              className={`profile-nav-item ${activeShortcut === 'notificacoes' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BellIcon />
                  <span>Notificações</span>
                </div>
                <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '99px' }}>3</span>
              </div>
            </button>

            <button
              onClick={() => handleShortcutClick('mensagens', 'Mensagens Diretas')}
              className={`profile-nav-item ${activeShortcut === 'mensagens' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <EnvelopeIcon />
                  <span>Mensagens Diretas</span>
                </div>
                <span style={{ background: 'var(--welcome-btn-border)', color: '#1a0533', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '99px' }}>1</span>
              </div>
            </button>

            <button
              onClick={() => handleShortcutClick('salvas', 'Postagens Salvas')}
              className={`profile-nav-item ${activeShortcut === 'salvas' ? 'active' : ''}`}
            >
              <BookmarkIcon />
              <span>Postagens Salvas</span>
            </button>

            <button
              onClick={() => handleShortcutClick('wikis', 'Wikis Favoritadas')}
              className={`profile-nav-item ${activeShortcut === 'wikis' ? 'active' : ''}`}
            >
              <BookIcon />
              <span>Wikis Favoritadas</span>
            </button>

            <button
              onClick={() => handleShortcutClick('bugs', 'Meus Bugs Reportados')}
              className={`profile-nav-item ${activeShortcut === 'bugs' ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BugIcon />
                  <span>Meus Bugs</span>
                </div>
                <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--heading-sm)', fontSize: '0.7rem', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '99px' }}>2</span>
              </div>
            </button>

            <button
              onClick={() => handleShortcutClick('seguindo', 'Criadores que Segue')}
              className={`profile-nav-item ${activeShortcut === 'seguindo' ? 'active' : ''}`}
            >
              <UsersIcon />
              <span>Criadores que Segue</span>
            </button>

            <div className="profile-nav-footer">
              <button
                onClick={() => {
                  setActiveShortcut('configuracoes')
                  setShowEditModal(true)
                }}
                className={`profile-nav-item ${activeShortcut === 'configuracoes' ? 'active' : ''}`}
              >
                <GearIcon />
                <span>Configurações</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ─── CENTRO: CONTEÚDO PRINCIPAL ─── */}
        <main className="profile-center-column">
          <ProfileHeader
            profile={{ ...profile, displayName: profile.username } as any}
            isOwner={userId === profile?.userId}
            onEditClick={() => setShowEditModal(true)}
            onAvatarClick={() => setShowAvatarUploader(true)}
            onCoverClick={() => setShowCoverUploader(true)}
          />

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="profile-tab-content">
            {activeTab === 'feed' && (
              <>
                <PostComposer
                  onSubmit={(data) => postMutation.mutate(data)}
                  isLoading={postMutation.isPending}
                />
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
        <RightSidebar userId={profile.userId} isOwner={userId === profile.userId} />

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

      {/* Modais */}
      {showEditModal && (
        <ProfileEditModal
          profile={profile as any}
          onSave={(data) => updateMutation.mutate(data)}
          onClose={() => setShowEditModal(false)}
          isLoading={updateMutation.isPending}
        />
      )}

      {showAvatarUploader && (
        <ImageUploader
          aspectRatio={1}
          title="Alterar Foto de Perfil"
          onCrop={(blob) => {
            const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
            avatarMutation.mutate(file)
          }}
          onClose={() => setShowAvatarUploader(false)}
        />
      )}

      {showCoverUploader && (
        <ImageUploader
          aspectRatio={3}
          title="Alterar Foto de Capa"
          onCrop={(blob) => {
            const file = new File([blob], 'cover.jpg', { type: 'image/jpeg' })
            coverMutation.mutate(file)
          }}
          onClose={() => setShowCoverUploader(false)}
        />
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
