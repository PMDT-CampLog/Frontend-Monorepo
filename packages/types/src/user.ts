export type UserRole = 'admin' | 'moderator' | 'member' | 'guest' | 'creator'

export interface User {
  id: string
  username: string
  email: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
}
