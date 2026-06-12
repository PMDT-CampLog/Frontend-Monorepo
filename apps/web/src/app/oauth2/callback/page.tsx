'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { processOAuth2Callback } from '@camplog/api'
import { STUDIO_URL } from '../../../lib/studioUrl'
import bg1 from '../../../assets/bg-1.png'
import bg2 from '../../../assets/bg-2.png'
import NoScroll from '../../bem-vindo/NoScroll'

function OAuthCallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchParams) return

    const providerParam = searchParams.get('provider')
    const codeParam = searchParams.get('code')

    if ((providerParam !== 'google' && providerParam !== 'github') || !codeParam) {
      setError('Parâmetros de autenticação inválidos ou ausentes.')
      return
    }

    const provider: 'google' | 'github' = providerParam
    const code: string = codeParam

    let isMounted = true

    async function handleCallback() {
      try {
        const redirectUri = window.location.origin + window.location.pathname
        const response = await processOAuth2Callback(provider, code, redirectUri)

        if (!isMounted) return

        if (response.token) {
          localStorage.setItem('camplog:token', response.token)
        }

        // Determina se o usuário é novo comparando createdAt com o timestamp atual.
        // Se a conta foi criada há menos de 30 segundos, consideramos um novo usuário.
        const createdAt = response.user?.createdAt ? new Date(response.user.createdAt).getTime() : 0
        const isNewUser = Date.now() - createdAt < 30000 // 30 segundos

        if (isNewUser) {
          router.push(`/bem-vindo?nome=${encodeURIComponent(response.user?.name || 'Usuário')}`)
        } else {
          const role = response.user?.role || 'member'
          if (role === 'creator') {
            window.location.href = `${STUDIO_URL}/creator`
          } else {
            window.location.href = `${STUDIO_URL}/`
          }
        }
      } catch (err: any) {
        console.error('OAuth callback validation failed:', err)
        if (isMounted) {
          setError(
            err.response?.data?.message || 'Falha na autenticação social. Por favor, tente novamente.'
          )
        }
      }
    }

    handleCallback()

    return () => {
      isMounted = false
    }
  }, [searchParams, router])

  return (
    <div className="auth-card" style={{ textAlign: 'center', padding: '2rem', maxWidth: '480px', width: '100%' }}>
      <h1 className="welcome-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Autenticação Social</h1>
      
      {error ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="auth-error-banner" role="alert" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderRadius: '9999px' }}>
            <svg className="auth-error-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <button 
            type="button" 
            className="auth-primary" 
            onClick={() => router.push('/login')}
          >
            Voltar para o Login
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
          <div className="auth-spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
            <svg className="auth-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '28px', height: '28px' }}>
              <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="14" />
            </svg>
            <span style={{ fontWeight: 700 }}>Conectando com o provedor...</span>
          </div>
          <p style={{ color: 'var(--heading-sm)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Por favor, aguarde enquanto validamos sua sessão e sincronizamos seus dados.
          </p>
        </div>
      )}
    </div>
  )
}

export default function OAuthCallbackPage() {
  const bg1Url = bg1.src
  const bg2Url = bg2.src

  return (
    <>
      <NoScroll />
      <div
        className="custom-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url('${bg1Url}'), url('${bg2Url}')` }}
      />
      <main className="auth" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <Suspense fallback={
          <div className="auth-card" style={{ textAlign: 'center', padding: '2rem', maxWidth: '480px', width: '100%' }}>
            <div className="auth-spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
              <svg className="auth-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: '28px', height: '28px' }}>
                <circle cx="12" cy="12" r="10" strokeDasharray="42" strokeDashoffset="14" />
              </svg>
              <span style={{ fontWeight: 700 }}>Carregando...</span>
            </div>
          </div>
        }>
          <OAuthCallbackHandler />
        </Suspense>
      </main>
    </>
  )
}
