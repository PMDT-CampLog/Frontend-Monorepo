export type UserRole = 'admin' | 'moderator' | 'member' | 'guest' | 'creator' | 'apoiador'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  coverUrl: string | null
  bio: string | null
  role: UserRole
  createdAt: string
}
