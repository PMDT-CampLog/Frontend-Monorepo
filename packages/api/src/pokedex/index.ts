import { httpClient } from '../http-client'
// --- Pokedex (Public Profile) ---

export async function getPublicProfile(username: string): Promise<import('@camplog/types').PublicProfile> {
  const response = await httpClient.get<import('@camplog/types').PublicProfile>(`/api/v1/pokedex/${username}`)
  return response.data
}

export async function saveArroba(username: string): Promise<void> {
  await httpClient.post(`/api/v1/pokedex/arroba`, {q: username})
}

export async function getPublicProfileByUserId(userId: string): Promise<import('@camplog/types').PublicProfile> {
  const response = await httpClient.get<import('@camplog/types').PublicProfile>(`/api/v1/pokedex/user/${userId}`)
  return response.data
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  const response = await httpClient.get<{available: boolean}>(`/api/v1/pokedex/check/username`, { params: { q: username } })
  return response.data.available
}

export async function searchProfiles(query: string): Promise<import('@camplog/types').PublicProfile[]> {
  const response = await httpClient.get<import('@camplog/types').PublicProfile[]>('/api/v1/pokedex/query/search', {
    params: { q: query },
  })
  return response.data
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

  await httpClient.put('/api/v1/pokedex/me', formData)
}