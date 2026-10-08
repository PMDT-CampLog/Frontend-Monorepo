import { httpClient } from '../http-client'
import {
  Post,
  PostPageResponse,
  CreatePostRequest,
} from '@camplog/types'


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
  const response = await httpClient.post<Post>(`/api/v1/profile/me/posts/${postId}/media`, formData)
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