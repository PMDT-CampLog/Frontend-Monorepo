'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { connectSpotifyCallback, getPublicProfileByUserId } from '@camplog/api/profile'
import bg1 from '../../../../assets/bg-1.png'
import bg2 from '../../../../assets/bg-2.png'

function SpotifyCallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'connecting' | 'success' | 'error'>('connecting')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!searchParams) return

    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setStatus('error')
      setErrorMessage(`O Spotify retornou um erro: ${errorParam}`)
      return
    }

    if (!code) {
      setStatus('error')
      setErrorMessage('Código de autorização do Spotify ausente na URL.')
      return
    }

    let isMounted = true

    async function handleCallback() {
      try {
        const token = localStorage.getItem('camplog:token')
        if (!token) {
          throw new Error('Você precisa estar autenticado no CampLog para conectar ao Spotify.')
        }

        // Decodificar payload do token JWT local
        const payload = JSON.parse(atob(token.split('.')[1] || ''))
        const userId = payload.userId

        if (!userId) {
          throw new Error('Identificador de usuário ausente no token de autenticação.')
        }

        if (!code) {
          throw new Error('Código de autorização do Spotify ausente ou inválido.')
        }

        // Conectar no backend enviando userId e code
        await connectSpotifyCallback(userId, code)

        if (!isMounted) return

        // Buscar dados do perfil público para obter o username correto
        const profile = await getPublicProfileByUserId(userId)
        
        if (!isMounted) return

        setStatus('success')

        // Redirecionar de volta para o perfil do usuário após 1.5 segundos
        setTimeout(() => {
          if (isMounted) {
            router.push(`/perfil/${profile.username}`)
          }
        }, 1500)

      } catch (err: any) {
        console.error('Spotify callback failed:', err)
        if (isMounted) {
          setStatus('error')
          setErrorMessage(
            err.response?.data?.message || err.message || 'Falha ao conectar com o Spotify. Tente novamente.'
          )
        }
      }
    }

    handleCallback()

    return () => {
      isMounted = false
    }
  }, [searchParams, router])

  if (status === 'connecting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
          <svg className="auth-spinner" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="3" style={{ width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}>
            <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="14" />
          </svg>
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Conectando ao Spotify</h1>
        <p style={{ color: 'var(--heading-sm)', fontSize: '0.95rem', lineHeight: '1.5', maxWidth: '380px' }}>
          Estamos vinculando sua conta de streaming. Suas músicas e preferências serão exibidas no seu perfil em instantes.
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#1DB954',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          boxShadow: '0 0 20px rgba(29, 185, 84, 0.4)'
        }}>
          ✓
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Conectado com Sucesso!</h1>
        <p style={{ color: 'var(--heading-sm)', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Tudo pronto! Redirecionando você de volta para o seu perfil...
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#ff4d4f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: '0 0 20px rgba(255, 77, 79, 0.4)'
      }}>
        !
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Erro de Conexão</h1>
      <div style={{
        backgroundColor: 'rgba(255, 77, 79, 0.1)',
        border: '1px solid rgba(255, 77, 79, 0.3)',
        borderRadius: '12px',
        padding: '0.75rem 1.25rem',
        color: '#ff4d4f',
        fontSize: '0.9rem',
        maxWidth: '400px',
        lineHeight: 1.4
      }}>
        {errorMessage}
      </div>
      <button
        onClick={() => router.push('/')}
        style={{
          background: 'var(--icon-accent, #1DB954)',
          color: '#fff',
          border: 'none',
          padding: '0.6rem 1.5rem',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          transition: 'transform 0.1s'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Ir para a Página Inicial
      </button>
    </div>
  )
}

export default function SpotifyCallbackPage() {
  const bg1Url = bg1.src
  const bg2Url = bg2.src

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#07050f' }}>
      <div
        className="custom-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url('${bg1Url}'), url('${bg2Url}')`, opacity: 0.4 }}
      />
      <main style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(19, 14, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        maxWidth: '480px',
        width: '90%',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)'
      }}>
        <Suspense fallback={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
            <svg className="auth-spinner" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="3" style={{ width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="14" />
            </svg>
            <span style={{ fontWeight: 700, color: '#fff' }}>Carregando...</span>
          </div>
        }>
          <SpotifyCallbackHandler />
        </Suspense>
      </main>
    </div>
  )
}
