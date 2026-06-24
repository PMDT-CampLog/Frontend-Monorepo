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



/* ──────────────────────── WIDGET CARD WRAPPER ──────────────────────── */

interface WidgetCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

function WidgetCard({ title, icon, children }: WidgetCardProps) {
  return (
    <div className="widget-card">
      <div className="widget-card-title">
        {icon}
        <span>{title}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        {children}
      </div>
    </div>
  )
}

/* ──────────────────────── CONSTANTES ──────────────────────── */

const badges = [
  { id: 'alpha', name: 'Apoiador Alpha', desc: 'Apoiou o CampLog na fase inicial alpha' },
  { id: 'bug', name: 'Bug Hunter', desc: 'Reportou e ajudou a corrigir 5+ bugs críticos' },
  { id: 'gamer', name: 'Super Fan', desc: 'Segue mais de 10 estúdios de jogos' },
  { id: 'donor', name: 'Patrocinador', desc: 'Apoiou financeiramente um projeto indie' },
]

const discordChannels = [
  { name: 'general', users: 14 },
  { name: 'announcements', users: 0 },
  { name: 'bug-reports', users: 3 },
]

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

  // Poll
  const [poll, setPoll] = useState({
    question: 'Qual deve ser o nome do boss final de CyberQuest?',
    options: [
      { id: 'a', text: 'Mecha-Goliath', votes: 145 },
      { id: 'b', text: 'Apex Sentinel', votes: 238 },
      { id: 'c', text: 'Neon Leviathan', votes: 94 },
    ],
    userVote: null as string | null
  })

  // Support goal
  const [supportStatus, setSupportStatus] = useState({
    studio: 'ByteSize Games',
    current: 4250,
    goal: 5000,
    currency: 'R$'
  })

  // Suggestions followed status
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: 'Void Walkers Studio', tags: 'RPG / Sci-Fi', followed: false },
    { id: 2, name: 'Sunberry Devs', tags: 'Farming / Cozy', followed: false },
  ])

  // Mini-feed posts
  const [latestPosts, setLatestPosts] = useState([
    { id: 1, studio: 'ByteSize Games', title: 'Update 1.4: Novas mecânicas de combate reveladas!', time: 'Há 2 horas', avatar: 'B' },
    { id: 2, studio: 'Studio Nebula', title: 'A demo oficial está disponível no Steam!', time: 'Há 5 horas', avatar: 'N' },
    { id: 3, studio: 'Pixel Forge', title: 'Concept art de novos personagens e bosses.', time: 'Ontem', avatar: 'P' },
  ])

  // Release calendar
  const [releases] = useState([
    { id: 1, game: 'Nebula Chronicles', event: 'Demo Pública', date: '24/06/2026', days: 5 },
    { id: 2, game: 'Chrono Rift', event: 'Beta Fechado', date: '30/06/2026', days: 11 },
  ])

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

  // Poll Vote Handler
  const handleVote = (optionId: string) => {
    if (poll.userVote) return
    setPoll(prev => ({
      ...prev,
      userVote: optionId,
      options: prev.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
    }))
    showToast('Seu voto no painel de enquetes foi registrado!')
  }

  // Support Status Handler
  const handleSupportMore = () => {
    setSupportStatus(prev => ({
      ...prev,
      current: Math.min(prev.current + 50, prev.goal)
    }))
    showToast('Obrigado pelo seu apoio! +R$ 50 adicionados à meta de arrecadação.')
  }

  // Follow Studio Handler (with dynamic feed updates)
  const handleFollowStudio = (studioName: string) => {
    setSuggestions(prev => prev.map(s => s.name === studioName ? { ...s, followed: !s.followed } : s))
    
    const isNowFollowing = !suggestions.find(s => s.name === studioName)?.followed
    
    if (isNowFollowing) {
      const newPost = {
        id: Date.now(),
        studio: studioName,
        title: `Novo estúdio adicionado! Fique ligado nas novidades de ${studioName}.`,
        time: 'Agora mesmo',
        avatar: studioName.charAt(0)
      }
      setLatestPosts(prev => [newPost, ...prev])
      showToast(`Seguindo ${studioName}! Últimas publicações atualizadas.`)
    } else {
      setLatestPosts(prev => prev.filter(p => p.studio !== studioName))
      showToast(`Você deixou de seguir ${studioName}.`)
    }
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

  const pollTotalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0)

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
        <aside className="profile-sidebar-right">
          
          {/* Widget 1: Spotify Embed */}
          <WidgetCard title="OST Favorita" icon={<span style={{ color: '#1db954', fontWeight: 800 }}>🎵</span>}>
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2sQHbtM2jWD?utm_source=generator&theme=0"
              width="100%"
              height="80"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px', border: 'none' }}
            />
          </WidgetCard>

          {/* Widget 2: Últimas Publicações */}
          <WidgetCard title="Últimas Publicações" icon={<span style={{ color: 'var(--welcome-btn-border)' }}>📢</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {latestPosts.map(post => (
                <div key={post.id} className="mini-feed-item">
                  <div className="mini-feed-avatar">{post.avatar}</div>
                  <div className="mini-feed-info">
                    <span className="mini-feed-studio">{post.studio}</span>
                    <span className="mini-feed-title" title={post.title}>{post.title}</span>
                    <span className="mini-feed-time">{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* Widget 3: Calendário de Lançamentos */}
          <WidgetCard title="Lançamentos" icon={<span style={{ color: '#f43f5e' }}>📅</span>}>
            <div className="timeline-list">
              {releases.map(rel => (
                <div key={rel.id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="timeline-title">{rel.game}</span>
                    <span className="timeline-date">{rel.event} - {rel.date}</span>
                    <span className="timeline-countdown">Em {rel.days} dias</span>
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* Widget 4: Vitrine de Badges/Conquistas */}
          <WidgetCard title="Conquistas" icon={<span style={{ color: '#eab308' }}>🏆</span>}>
            <div className="badges-grid">
              {badges.map(b => (
                <div key={b.id} className="badge-item">
                  <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {b.id === 'alpha' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
                    {b.id === 'bug' && <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" />}
                    {b.id === 'gamer' && <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />}
                    {b.id === 'donor' && <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />}
                  </svg>
                  <span className="badge-tooltip">
                    <strong>{b.name}</strong>
                    <br />
                    {b.desc}
                  </span>
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* Widget 5: Painel de Enquetes */}
          <WidgetCard title="Enquetes Ativas" icon={<span style={{ color: '#a855f7' }}>🗳️</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--body-text)', fontWeight: 600, marginBottom: '0.25rem' }}>{poll.question}</p>
              {poll.options.map(opt => {
                const percent = pollTotalVotes > 0 ? Math.round((opt.votes / pollTotalVotes) * 100) : 0
                const isSelected = poll.userVote === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    disabled={!!poll.userVote}
                    className={`poll-option-button ${isSelected ? 'voted' : ''}`}
                  >
                    <div className="poll-option-progress" style={{ width: `${percent}%` }} />
                    <span style={{ zIndex: 2, position: 'relative' }}>{opt.text}</span>
                    <span style={{ zIndex: 2, position: 'relative', fontSize: '0.75rem', color: 'var(--heading-sm)' }}>
                      {percent}% ({opt.votes})
                    </span>
                  </button>
                )
              })}
              {poll.userVote && (
                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, textAlign: 'center', marginTop: '0.2rem' }}>
                  ✓ Voto registrado! Obrigado por participar.
                </span>
              )}
            </div>
          </WidgetCard>

          {/* Widget 6: Integração Discord */}
          <WidgetCard title="Servidor Discord" icon={<span style={{ color: '#5865f2' }}>💬</span>}>
            <div className="discord-widget-container">
              <div className="discord-header">
                <span className="discord-logo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                  </svg>
                  <span>Indie Devs Hub</span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div className="discord-online-badge" />
                  <span style={{ fontSize: '0.7rem', color: '#23a55a', fontWeight: 700 }}>42 Online</span>
                </div>
              </div>
              <div className="discord-body">
                <span style={{ fontWeight: 700, fontSize: '0.7rem', color: 'var(--heading-sm)' }}>CANAIS POPULARES</span>
                {discordChannels.map((ch, idx) => (
                  <div key={idx} className="discord-channel-item">
                    <span style={{ color: '#8e9297' }}>#</span>
                    <span style={{ flex: 1 }}>{ch.name}</span>
                    {ch.users > 0 && (
                      <span style={{ fontSize: '0.65rem', background: '#35393e', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                        👥 {ch.users}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </WidgetCard>

          {/* Widget 7: Status de Apoio */}
          <WidgetCard title="Meta de Apoio" icon={<span style={{ color: '#ec4899' }}>💖</span>}>
            <div className="support-progress-wrapper">
              <div className="support-progress-header">
                <span>{supportStatus.studio}</span>
                <span>{supportStatus.currency} {supportStatus.current} / {supportStatus.goal}</span>
              </div>
              <div className="support-progress-bar-bg">
                <div 
                  className="support-progress-bar-fg" 
                  style={{ width: `${(supportStatus.current / supportStatus.goal) * 100}%` }} 
                />
              </div>
              <button 
                onClick={handleSupportMore}
                disabled={supportStatus.current >= supportStatus.goal}
                className="support-action-btn"
              >
                {supportStatus.current >= supportStatus.goal ? 'Meta Atingida! 🎉' : `Apoiar mais R$ 50`}
              </button>
            </div>
          </WidgetCard>

          {/* Widget 8: Sugestões de Estúdios */}
          <WidgetCard title="Sugestões de Estúdios" icon={<span style={{ color: '#06b6d4' }}>✨</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {suggestions.map(sug => (
                <div key={sug.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sug.name}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--heading-sm)', fontWeight: 500 }}>{sug.tags}</span>
                  </div>
                  <button
                    onClick={() => handleFollowStudio(sug.name)}
                    style={{
                      background: sug.followed ? 'rgba(255,255,255,0.05)' : 'var(--welcome-btn-bg)',
                      color: sug.followed ? 'var(--body-text)' : 'var(--welcome-btn-color)',
                      border: `1px solid ${sug.followed ? 'var(--card-border)' : 'var(--welcome-btn-border)'}`,
                      borderRadius: '16px',
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {sug.followed ? 'Seguindo' : 'Seguir'}
                  </button>
                </div>
              ))}
            </div>
          </WidgetCard>

        </aside>

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
