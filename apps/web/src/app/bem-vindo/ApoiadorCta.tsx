'use client'

import React, { useState } from 'react'
import { updateUserRole } from '@camplog/api'
import { STUDIO_URL } from '../../lib/studioUrl'

type ApoiadorCtaProps = {
  ctaText: string
}

export default function ApoiadorCta({ ctaText }: ApoiadorCtaProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectApoiador = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await updateUserRole('apoiador')
      if (response.token) {
        localStorage.setItem('camplog:token', response.token)
        window.location.href = `${STUDIO_URL}/perfil?token=${response.token}`
      } else {
        window.location.href = `${STUDIO_URL}/perfil`
      }
    } catch (error) {
      console.error('Failed to update user role to apoiador:', error)
      const token = typeof window !== 'undefined' ? localStorage.getItem('camplog:token') : null
      if (!token) {
        window.location.href = `/login`
      } else {
        window.location.href = `${STUDIO_URL}/perfil`
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <a
      href={`${STUDIO_URL}/perfil`}
      className="welcome-btn"
      onClick={handleSelectApoiador}
      style={{
        opacity: isLoading ? 0.7 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      {isLoading ? 'Processando...' : ctaText}
    </a>
  )
}
