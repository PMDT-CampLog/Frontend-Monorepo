import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LatestPostsWidget } from './LatestPostsWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getLatestPosts: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('LatestPostsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getLatestPosts).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <LatestPostsWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando publicações...')).toBeInTheDocument()
  })

  it('renders empty state', async () => {
    vi.mocked(api.getLatestPosts).mockResolvedValueOnce([])
    render(
      <QueryClientProvider client={queryClient}>
        <LatestPostsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Nenhuma publicação recente')).toBeInTheDocument()
    })
  })

  it('renders posts and checks no emojis', async () => {
    vi.mocked(api.getLatestPosts).mockResolvedValueOnce([
      { id: 1, studio: 'Studio 1', title: 'Title 1', time: '1h', avatar: 'S' }
    ])
    render(
      <QueryClientProvider client={queryClient}>
        <LatestPostsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Studio 1')).toBeInTheDocument()
      expect(screen.getByText('Title 1')).toBeInTheDocument()
    })

    const textContent = screen.getByText('Últimas Publicações').parentElement?.textContent || ''
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false)
  })
})
