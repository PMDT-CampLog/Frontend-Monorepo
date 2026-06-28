import { httpClient } from '../http-client'
import {
  SupporterProfile,
  UpdateProfileRequest,
  Post,
  PostPageResponse,
  CreatePostRequest,
} from '@camplog/types'

// --- Profile ---

export async function getProfile(userId: string): Promise<SupporterProfile> {
  const response = await httpClient.get<SupporterProfile>(`/api/v1/profile/${userId}`)
  return response.data
}

export async function updateProfile(data: UpdateProfileRequest): Promise<SupporterProfile> {
  const response = await httpClient.put<SupporterProfile>('/api/v1/profile/me', data)
  return response.data
}

export async function uploadAvatar(file: File): Promise<SupporterProfile> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await httpClient.post<SupporterProfile>('/api/v1/profile/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export async function uploadCover(file: File): Promise<SupporterProfile> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await httpClient.post<SupporterProfile>('/api/v1/profile/me/cover', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

// --- Posts ---

export async function createPost(data: CreatePostRequest): Promise<Post> {
  const response = await httpClient.post<Post>('/api/v1/profile/me/posts', data)
  return response.data
}

export async function getUserPosts(
  userId: string,
  cursor?: string | null,
  size?: number,
): Promise<PostPageResponse> {
  const params: Record<string, string> = {}
  if (cursor) params.cursor = cursor
  if (size) params.size = String(size)
  const response = await httpClient.get<PostPageResponse>(`/api/v1/profile/${userId}/posts`, { params })
  return response.data
}

export async function getPost(postId: string): Promise<Post> {
  const response = await httpClient.get<Post>(`/api/v1/profile/posts/${postId}`)
  return response.data
}

export async function updatePost(postId: string, data: CreatePostRequest): Promise<Post> {
  const response = await httpClient.put<Post>(`/api/v1/profile/me/posts/${postId}`, data)
  return response.data
}

export async function deletePost(postId: string): Promise<void> {
  await httpClient.delete(`/api/v1/profile/me/posts/${postId}`)
}

export async function uploadPostMedia(postId: string, file: File): Promise<Post> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await httpClient.post<Post>(`/api/v1/profile/me/posts/${postId}/media`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

// --- Likes ---

export async function toggleLike(postId: string): Promise<{ liked: boolean }> {
  const response = await httpClient.post<{ liked: boolean }>(`/api/v1/profile/posts/${postId}/like`)
  return response.data
}

export async function getLikedPosts(
  userId: string,
  page: number = 0,
  size: number = 20,
): Promise<PostPageResponse> {
  const response = await httpClient.get<PostPageResponse>(`/api/v1/profile/${userId}/likes`, {
    params: { page, size },
  })
  return response.data
}

// --- Interests ---

export async function getInterests(userId: string): Promise<string[]> {
  const response = await httpClient.get<string[]>(`/api/v1/profile/${userId}/interests`)
  return response.data
}

export async function updateInterests(tags: string[]): Promise<string[]> {
  const response = await httpClient.put<string[]>('/api/v1/profile/me/interests', { tags })
  return response.data
}

// --- Pokedex (Public Profile) ---

export async function getPublicProfile(username: string): Promise<import('@camplog/types').PublicProfile> {
  const response = await httpClient.get<import('@camplog/types').PublicProfile>(`/api/v1/pokedex/${username}`)
  return response.data
}

export async function getPublicProfileByUserId(userId: string): Promise<import('@camplog/types').PublicProfile> {
  const response = await httpClient.get<import('@camplog/types').PublicProfile>(`/api/v1/pokedex/user/${userId}`)
  return response.data
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const response = await httpClient.get<{available: boolean}>(`/api/v1/pokedex/check/username`, { params: { q: username } })
  return response.data.available
}

export async function updatePublicProfile(
  data: import('@camplog/types').UpdatePublicProfileRequest,
  avatarFile?: File,
  coverFile?: File
): Promise<void> {
  const formData = new FormData()
  
  if (data) {
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
  }
  if (avatarFile) formData.append('avatar', avatarFile)
  if (coverFile) formData.append('cover', coverFile)

  await httpClient.put('/api/v1/pokedex/me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export * from './right-sidebar'
