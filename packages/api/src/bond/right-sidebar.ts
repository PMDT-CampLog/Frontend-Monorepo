import { httpClient } from '../http-client'

export interface SpotifyStatus {
  connected: boolean;
  trackId?: string;
  mode?: string;
}

export interface MiniPost {
  id: number;
  studio: string;
  title: string;
  time: string;
  avatar: string;
}

export interface Release {
  id: number;
  game: string;
  event: string;
  date: string;
  days: number;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  userVote: string | null;
}

export interface DiscordChannel {
  name: string;
  users: number;
}

export interface DiscordStatus {
  connected: boolean;
  serverName?: string;
  onlineCount?: number;
  channels?: DiscordChannel[];
}

export interface SupportStatus {
  studio: string;
  current: number;
  goal: number;
  currency: string;
}

export interface StudioSuggestion {
  id: number;
  name: string;
  tags: string;
  followed: boolean;
}

export async function getSpotifyStatus(userId: string): Promise<SpotifyStatus> {
  const response = await httpClient.get<SpotifyStatus>(`/api/v1/spotify/status/${userId}`);
  return response.data;
}

export async function getSpotifyAuthUrl(): Promise<{url: string}> {
  const response = await httpClient.get<{url: string}>(`/api/v1/spotify/authorize`);
  return response.data;
}

export async function connectSpotifyCallback(userId: string, code: string): Promise<{status: string}> {
  const response = await httpClient.post<{status: string}>(`/api/v1/spotify/callback?userId=${userId}&code=${code}`);
  return response.data;
}

export async function disconnectSpotify(userId: string): Promise<void> {
  await httpClient.delete(`/api/v1/spotify/disconnect?userId=${userId}`);
}

export async function setSpotifyPreferences(userId: string, trackId?: string): Promise<void> {
  await httpClient.put(`/api/v1/spotify/preferences?userId=${userId}${trackId ? `&trackId=${trackId}` : ''}`);
}

export async function getLatestPosts(userId: string): Promise<MiniPost[]> {
  const response = await httpClient.get<MiniPost[]>(`/api/v1/profile/${userId}/feed/recent`);
  return response.data;
}

export async function getUpcomingReleases(userId: string): Promise<Release[]> {
  const response = await httpClient.get<Release[]>(`/api/v1/profile/${userId}/calendar/releases`);
  return response.data;
}

export async function getAchievements(userId: string): Promise<Badge[]> {
  const response = await httpClient.get<Badge[]>(`/api/v1/profile/${userId}/trophies/likes`);
  return response.data;
}

export async function getActivePolls(userId: string): Promise<Poll> {
  const response = await httpClient.get<Poll>(`/api/v1/profile/${userId}/polls/active`);
  return response.data;
}

export async function votePoll(userId: string, pollId: string, optionId: string): Promise<void> {
  await httpClient.post(`/api/v1/profile/${userId}/polls/${pollId}/vote`, { optionId });
}

export async function getDiscordStatus(userId: string): Promise<DiscordStatus> {
  const response = await httpClient.get<DiscordStatus>(`/api/v1/profile/${userId}/discord/status`);
  return response.data;
}

export async function getSupportGoal(userId: string): Promise<SupportStatus> {
  const response = await httpClient.get<SupportStatus>(`/api/v1/profile/${userId}/crowdfunding/support`);
  return response.data;
}

export async function addSupport(userId: string, amount: number): Promise<void> {
  await httpClient.post(`/api/v1/profile/${userId}/crowdfunding/support`, { amount });
}

export async function getStudioSuggestions(userId: string): Promise<StudioSuggestion[]> {
  const response = await httpClient.get<StudioSuggestion[]>(`/api/v1/profile/${userId}/recommendations/studios`);
  return response.data;
}

export async function followStudio(userId: string, studioId: number): Promise<void> {
  await httpClient.post(`/api/v1/profile/${userId}/recommendations/studios/${studioId}/follow`);
}
