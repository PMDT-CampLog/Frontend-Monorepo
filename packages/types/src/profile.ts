export interface SupporterProfile {
  userId: string
  name: string
  displayName: string
  email: string
  avatarUrl: string | null
  coverUrl: string | null
  bio: string | null
  bioExtended: string | null
  websiteUrl: string | null
  location: string | null
  role: string
  postsCount: number
  likesReceivedCount: number
  interests: string[]
  createdAt: string
}

export interface UpdateProfileRequest {
  displayName?: string
  bio?: string
  bioExtended?: string
  websiteUrl?: string
  location?: string
}

export interface PublicProfile {
  id: string
  userId: string
  username: string
  bio: string | null
  avatarUrl: string | null
  coverUrl: string | null
  themeColors: string | null
  role: string
}

export interface UpdatePublicProfileRequest {
  username?: string
  bio?: string
  themeColors?: string
}
