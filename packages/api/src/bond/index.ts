import { httpClient } from '../http-client'
import {
  SupporterProfile,
  UpdateProfileRequest,
} from '@camplog/types'

// --- Bond ---

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
  const response = await httpClient.post<SupporterProfile>('/api/v1/profile/me/avatar', formData)
  return response.data
}

export async function uploadCover(file: File): Promise<SupporterProfile> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await httpClient.post<SupporterProfile>('/api/v1/profile/me/cover', formData)
  return response.data
}

export * from './right-sidebar'
