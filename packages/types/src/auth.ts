import { User } from './user'

export interface RegisterRequest {
  name: string
  email: string
  password?: string
}

export interface LoginRequest {
  email: string
  password?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface OAuth2CallbackRequest {
  code: string
  provider: 'google' | 'github'
}
