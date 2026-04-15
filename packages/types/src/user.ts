export type UserRole = 'admin' | 'moderator' | 'member' | 'guest'

export interface User {
  id: string
  username: string
  email: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
}
