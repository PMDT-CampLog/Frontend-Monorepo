'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@camplog/api'
import { ApiError } from '@camplog/types'
import { STUDIO_URL } from '../../lib/studioUrl'

type FormState = {
  email: string
  password: string
}

type TouchedState = {
  email: boolean
  password: boolean
}

type FieldErrors = {
  email?: string
  password?: string
}

export function useLogin() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    password: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Validação em tempo real
  const errors = useMemo((): FieldErrors => {
    const errs: FieldErrors = {}

    // E-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      errs.email = 'O e-mail é obrigatório.'
    } else if (!emailRegex.test(form.email)) {
      errs.email = 'Insira um e-mail válido (ex: voce@email.com).'
    }

    // Senha
    if (!form.password) {
      errs.password = 'A senha é obrigatória.'
    }

    return errs
  }, [form])

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleBlur(field: keyof TouchedState) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setTouched({
      email: true,
      password: true,
    })

    if (!isValid) return

    setIsLoading(true)
    setSubmitError(null)

    try {
      const response = await loginUser({
        email: form.email.trim(),
        password: form.password,
      })

      if (response.token) {
        localStorage.setItem('camplog:token', response.token)
      }

      // Redirecionamento dinâmico baseado na role do usuário
      const role = response.user?.role || 'member'
      if (role === 'creator') {
        window.location.href = `${STUDIO_URL}/creator?token=${response.token}`
      } else if (role === 'member' || role === 'apoiador') {
        window.location.href = `${STUDIO_URL}/perfil?token=${response.token}`
      } else {
        window.location.href = `${STUDIO_URL}/?token=${response.token}`
      }
    } catch (err: any) {
      const status = err.response?.status
      const apiErr = err.response?.data as ApiError

      if (status === 404) {
        // Direciona para o cadastro caso não seja cadastrado
        router.push(`/cadastro?email=${encodeURIComponent(form.email.trim())}`)
      } else if (status === 401) {
        setSubmitError(apiErr?.message || 'Credenciais inválidas. Verifique seu e-mail e senha.')
      } else {
        console.warn('Login failed with status:', status)
        setSubmitError(apiErr?.message || 'Falha no login. Por favor, verifique suas credenciais.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Redirecionamentos de OAuth2
  function handleOAuthRedirect(provider: 'google' | 'github') {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
    window.location.href = `${apiBaseUrl}/oauth2/authorization/${provider}`
  }

  return {
    form,
    touched,
    errors,
    isValid,
    isLoading,
    submitError,
    updateField,
    handleBlur,
    handleLogin,
    handleOAuthRedirect,
  }
}
