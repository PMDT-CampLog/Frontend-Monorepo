import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { OstWidget } from './OstWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getSpotifyStatus: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('OstWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getSpotifyStatus).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <OstWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando OST...')).toBeInTheDocument()
  })

  it('renders disconnected state', async () => {
    vi.mocked(api.getSpotifyStatus).mockResolvedValueOnce({ connected: false })
    render(
      <QueryClientProvider client={queryClient}>
        <OstWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Spotify não conectado')).toBeInTheDocument()
    })
    
    // Ensure no emojis
    const textContent = screen.getByText('OST Favorita').parentElement?.textContent || ''
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false)
  })

  it('renders connected state with iframe', async () => {
    vi.mocked(api.getSpotifyStatus).mockResolvedValueOnce({ connected: true, playlistUrl: 'https://open.spotify.com/embed/playlist/123' })
    render(
      <QueryClientProvider client={queryClient}>
        <OstWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTitle('Spotify Player')).toBeInTheDocument()
      expect(screen.getByTitle('Spotify Player')).toHaveAttribute('src', 'https://open.spotify.com/embed/playlist/123')
    })
  })
})
