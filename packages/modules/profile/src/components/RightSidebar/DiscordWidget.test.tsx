import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DiscordWidget } from './DiscordWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getDiscordStatus: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('DiscordWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getDiscordStatus).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <DiscordWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando Discord...')).toBeInTheDocument()
  })

  it('renders disconnected state', async () => {
    vi.mocked(api.getDiscordStatus).mockResolvedValueOnce({ connected: false })
    render(
      <QueryClientProvider client={queryClient}>
        <DiscordWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Discord não conectado')).toBeInTheDocument()
    })
  })

  it('renders connected state with server info', async () => {
    vi.mocked(api.getDiscordStatus).mockResolvedValueOnce({
      connected: true,
      serverName: 'Indie Devs Hub',
      onlineCount: 42,
      channels: [
        { name: 'general', users: 14 }
      ]
    })
    
    render(
      <QueryClientProvider client={queryClient}>
        <DiscordWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Indie Devs Hub')).toBeInTheDocument()
      expect(screen.getByText('42 Online')).toBeInTheDocument()
      expect(screen.getByText('general')).toBeInTheDocument()
      expect(screen.getByText('14')).toBeInTheDocument()
    })
  })
})
