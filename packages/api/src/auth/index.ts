import { httpClient } from '../http-client'
import { RegisterRequest, LoginRequest, AuthResponse, UserRole } from '@camplog/types'

/**
 * Cadastra um novo usuário de forma tradicional (e-mail, nome, senha).
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const response = await httpClient.post<AuthResponse>('/api/v1/auth/register', data)
  return response.data
}

/**
 * Realiza o login de um usuário de forma tradicional (e-mail, senha).
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await httpClient.post<AuthResponse>('/api/v1/auth/login', data)
  return response.data
}

/**
 * Atualiza a role (perfil) do usuário logado (ex: tornar-se 'creator').
 */
export async function updateUserRole(role: UserRole): Promise<AuthResponse> {
  const response = await httpClient.put<AuthResponse>('/api/v1/auth/role', { role })
  return response.data
}

/**
 * Processa o token/código retornado pelo provedor OAuth2 (Google ou GitHub)
 * e retorna o JWT correspondente do backend.
 */
export async function processOAuth2Callback(
  provider: 'google' | 'github',
  code: string,
  redirectUri?: string,
): Promise<AuthResponse> {
  const response = await httpClient.post<AuthResponse>(`/api/v1/auth/oauth2/callback/${provider}`, { code, redirectUri })
  return response.data
}
