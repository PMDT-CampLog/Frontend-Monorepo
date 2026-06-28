import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ReleasesWidget } from './ReleasesWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getUpcomingReleases: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('ReleasesWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getUpcomingReleases).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <ReleasesWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando lançamentos...')).toBeInTheDocument()
  })

  it('renders releases correctly', async () => {
    vi.mocked(api.getUpcomingReleases).mockResolvedValueOnce([
      { id: 1, game: 'Nebula', event: 'Demo', date: '24/06/2026', days: 5 }
    ])
    render(
      <QueryClientProvider client={queryClient}>
        <ReleasesWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Nebula')).toBeInTheDocument()
      expect(screen.getByText('Demo - 24/06/2026')).toBeInTheDocument()
      expect(screen.getByText('Em 5 dias')).toBeInTheDocument()
    })
  })
})
