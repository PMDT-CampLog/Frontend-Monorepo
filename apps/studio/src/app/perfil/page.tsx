'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPublicProfileByUserId } from '@camplog/api/profile'
import '@camplog/module-profile/styles.css'

export default function PerfilRedirectPage() {
  const router = useRouter()
  const [error, setError] = useState(false)

  useEffect(() => {
    async function redirect() {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token') || localStorage.getItem('camplog:token')
        
        if (!token) {
          window.location.href = 'http://localhost:3000/login'
          return
        }
        
        const payload = JSON.parse(atob(token.split('.')[1] || ''))
        const userId = payload.userId
        if (!userId) {
          window.location.href = 'http://localhost:3000/login'
          return
        }

        try {
          const profile = await getPublicProfileByUserId(userId)
          if (profile && profile.username) {
            router.replace(`/perfil/${profile.username}`)
          } else {
            router.replace(`/perfil/${userId}`)
          }
        } catch (e) {
          router.replace(`/perfil/${userId}`)
        }
      } catch {
        window.location.href = 'http://localhost:3000/login'
      }
    }

    redirect()
  }, [router])

  return (
    <div className="profile-page">
      <div className="profile-page-loading" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner" />
        <p style={{ color: 'var(--heading)' }}>Localizando o seu perfil...</p>
      </div>
    </div>
  )
}
