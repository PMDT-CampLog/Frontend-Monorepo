import { httpClient } from '../http-client'
import type {
  FollowRequest,
  ConnectionStatus,
  ConnectionsPageResponse,
  ProfileType,
} from '@camplog/types'

/**
 * API client para o módulo de conexões.
 *
 * Segue o padrão estabelecido pelos outros módulos em @camplog/api:
 * - Usa o httpClient compartilhado (axios instance com baseURL e interceptors de auth)
 * - Retorna dados tipados diretamente (sem wrapper de resposta)
 * - Funções são exportadas individualmente para tree-shaking eficiente
 */

// --- Follow / Unfollow ---

/**
 * Seguir um perfil.
 * POST /api/v1/connections/follow
 */
export async function followProfile(data: FollowRequest): Promise<void> {
  await httpClient.post('/api/v1/connections/follow', data)
}

/**
 * Deixar de seguir um perfil.
 * DELETE /api/v1/connections/unfollow
 */
export async function unfollowProfile(data: FollowRequest): Promise<void> {
  await httpClient.delete('/api/v1/connections/unfollow', { data })
}

// --- Status ---

/**
 * Verificar o status de conexão com um perfil alvo.
 * Requer autenticação — retorna isFollowing + contagens.
 * GET /api/v1/connections/status?targetId=...&targetType=...
 */
export async function getConnectionStatus(
  targetId: string,
  targetType: ProfileType,
): Promise<ConnectionStatus> {
  const response = await httpClient.get<ConnectionStatus>('/api/v1/connections/status', {
    params: { targetId, targetType },
  })
  return response.data
}

// --- Followers / Following ---

/**
 * Listar os seguidores de um perfil (público, paginado).
 * GET /api/v1/connections/{profileId}/{profileType}/followers
 */
export async function getFollowers(
  profileId: string,
  profileType: ProfileType,
  page: number = 0,
  size: number = 20,
): Promise<ConnectionsPageResponse> {
  const response = await httpClient.get<ConnectionsPageResponse>(
    `/api/v1/connections/${profileId}/${profileType}/followers`,
    { params: { page, size } },
  )
  return response.data
}

/**
 * Listar quem um perfil está seguindo (público, paginado).
 * GET /api/v1/connections/{profileId}/{profileType}/following
 */
export async function getFollowing(
  profileId: string,
  profileType: ProfileType,
  page: number = 0,
  size: number = 20,
): Promise<ConnectionsPageResponse> {
  const response = await httpClient.get<ConnectionsPageResponse>(
    `/api/v1/connections/${profileId}/${profileType}/following`,
    { params: { page, size } },
  )
  return response.data
}
