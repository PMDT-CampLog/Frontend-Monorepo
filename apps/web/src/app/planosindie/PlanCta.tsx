'use client'

import React, { useState } from 'react'
import { updateUserRole } from '@camplog/api'
import { STUDIO_URL } from '../../lib/studioUrl'

type PlanCtaProps = {
  ctaText: string
}

export default function PlanCta({ ctaText }: PlanCtaProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectPlan = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateUserRole('creator')
      window.location.href = `${STUDIO_URL}/creator`
    } catch (error) {
      console.error('Failed to update user role to creator:', error)
      const token = typeof window !== 'undefined' ? localStorage.getItem('camplog:token') : null
      if (!token) {
        window.location.href = `/login`
      } else {
        window.location.href = `${STUDIO_URL}/creator`
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      className="plan-cta"
      onClick={handleSelectPlan}
      disabled={isLoading}
      style={{
        width: '100%',
        height: '46px',
        border: 'none',
        borderRadius: '9999px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontWeight: 900,
        backgroundColor: 'var(--btn-cadastre-bg)',
        color: 'var(--btn-cadastre-text)',
        transition: 'all 0.2s ease',
      }}
    >
      {isLoading ? 'Processando...' : ctaText}
    </button>
  )
}
