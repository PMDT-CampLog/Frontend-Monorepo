import axios from 'axios'

// Cliente HTTP base — todas as rotas partem desta instância
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Interceptor de request: injeta o token de autenticação quando disponível e ajusta headers
httpClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('camplog:token') : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Remove o Content-Type se for FormData para que o Axios coloque automaticamente com o boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})
