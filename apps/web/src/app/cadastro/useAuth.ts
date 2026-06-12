import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { registerUser } from '@camplog/api'
import { ApiError } from '@camplog/types'

type FormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type TouchedState = {
  name: boolean
  email: boolean
  password: boolean
  confirmPassword: boolean
}

type FieldErrors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function useAuth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams?.get('email') ?? ''

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }))
    }
  }, [emailParam])

  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Validação em tempo real
  const errors = useMemo((): FieldErrors => {
    const errs: FieldErrors = {}

    // Nome completo: pelo menos 2 palavras
    const nameTrimmed = form.name.trim()
    if (!nameTrimmed) {
      errs.name = 'O nome completo é obrigatório.'
    } else if (nameTrimmed.split(/\s+/).length < 2) {
      errs.name = 'Insira seu nome completo (nome e sobrenome).'
    }

    // E-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      errs.email = 'O e-mail é obrigatório.'
    } else if (!emailRegex.test(form.email)) {
      errs.email = 'Insira um e-mail válido (ex: voce@email.com).'
    }

    // Senha forte: mínimo 8 caracteres, maiúscula, minúscula, número e especial
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    if (!form.password) {
      errs.password = 'A senha é obrigatória.'
    } else if (form.password.length < 8) {
      errs.password = 'A senha deve ter no mínimo 8 caracteres.'
    } else if (!pwdRegex.test(form.password)) {
      errs.password = 'Deve conter pelo menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.'
    }

    // Confirmar Senha
    if (!form.confirmPassword) {
      errs.confirmPassword = 'A confirmação de senha é obrigatória.'
    } else if (form.confirmPassword !== form.password) {
      errs.confirmPassword = 'As senhas não coincidem.'
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

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Marcar todos os campos como tocados para exibir erros remanescentes
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    })

    if (!isValid) return

    setIsLoading(true)
    setSubmitError(null)

    try {
      const response = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })

      // Armazena o token recebido no localStorage (utilizado pelo httpClient)
      if (response.token) {
        localStorage.setItem('camplog:token', response.token)
      }

      // Redireciona o usuário para a página de boas-vindas
      router.push(`/bem-vindo?nome=${encodeURIComponent(form.name.trim() || 'Usuário')}`)
    } catch (err: any) {
      console.error('Registration failed:', err)
      const apiErr = err.response?.data as ApiError
      setSubmitError(apiErr?.message || 'Falha no cadastro. Por favor, tente novamente.')
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
    handleRegister,
    handleOAuthRedirect,
  }
}
