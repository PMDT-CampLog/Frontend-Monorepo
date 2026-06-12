export type UserRole = 'admin' | 'moderator' | 'member' | 'guest' | 'creator'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
}
