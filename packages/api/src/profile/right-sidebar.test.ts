import { describe, it, expect, vi, beforeEach } from 'vitest'
import { httpClient } from '../http-client'
import {
  getSpotifyStatus,
  getLatestPosts,
  getUpcomingReleases,
  getAchievements,
  getActivePolls,
  votePoll,
  getDiscordStatus,
  getSupportGoal,
  addSupport,
  getStudioSuggestions,
  followStudio
} from './right-sidebar'

vi.mock('../http-client', () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('Right Sidebar API Contracts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getSpotifyStatus should call GET /api/v1/profile/:userId/spotify', async () => {
    const mockData = { connected: true, playlistUrl: 'http://spotify.com' }
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getSpotifyStatus('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/spotify')
    expect(result).toEqual(mockData)
  })

  it('getLatestPosts should call GET /api/v1/profile/:userId/feed/recent', async () => {
    const mockData = [{ id: 1, studio: 'Studio 1', title: 'Post 1', time: '1h', avatar: 'S' }]
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getLatestPosts('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/feed/recent')
    expect(result).toEqual(mockData)
  })

  it('getUpcomingReleases should call GET /api/v1/profile/:userId/calendar/releases', async () => {
    const mockData = [{ id: 1, game: 'Game', event: 'Event', date: '2026', days: 5 }]
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getUpcomingReleases('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/calendar/releases')
    expect(result).toEqual(mockData)
  })

  it('getAchievements should call GET /api/v1/profile/:userId/trophies/likes', async () => {
    const mockData = [{ id: '1', name: 'Badge', desc: 'Desc' }]
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getAchievements('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/trophies/likes')
    expect(result).toEqual(mockData)
  })

  it('getActivePolls should call GET /api/v1/profile/:userId/polls/active', async () => {
    const mockData = { id: 'poll1', question: 'Q?', options: [], userVote: null }
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getActivePolls('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/polls/active')
    expect(result).toEqual(mockData)
  })

  it('votePoll should call POST /api/v1/profile/:userId/polls/:pollId/vote', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({} as any)
    
    await votePoll('user123', 'poll1', 'opt1')
    
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/profile/user123/polls/poll1/vote', { optionId: 'opt1' })
  })

  it('getDiscordStatus should call GET /api/v1/profile/:userId/discord/status', async () => {
    const mockData = { connected: true, serverName: 'Server' }
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getDiscordStatus('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/discord/status')
    expect(result).toEqual(mockData)
  })

  it('getSupportGoal should call GET /api/v1/profile/:userId/crowdfunding/support', async () => {
    const mockData = { studio: 'S', current: 100, goal: 200, currency: 'R$' }
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getSupportGoal('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/crowdfunding/support')
    expect(result).toEqual(mockData)
  })

  it('addSupport should call POST /api/v1/profile/:userId/crowdfunding/support', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({} as any)
    
    await addSupport('user123', 50)
    
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/profile/user123/crowdfunding/support', { amount: 50 })
  })

  it('getStudioSuggestions should call GET /api/v1/profile/:userId/recommendations/studios', async () => {
    const mockData = [{ id: 1, name: 'Studio', tags: 'tag', followed: false }]
    vi.mocked(httpClient.get).mockResolvedValueOnce({ data: mockData } as any)
    
    const result = await getStudioSuggestions('user123')
    
    expect(httpClient.get).toHaveBeenCalledWith('/api/v1/profile/user123/recommendations/studios')
    expect(result).toEqual(mockData)
  })

  it('followStudio should call POST /api/v1/profile/:userId/recommendations/studios/:studioId/follow', async () => {
    vi.mocked(httpClient.post).mockResolvedValueOnce({} as any)
    
    await followStudio('user123', 1)
    
    expect(httpClient.post).toHaveBeenCalledWith('/api/v1/profile/user123/recommendations/studios/1/follow')
  })
})
