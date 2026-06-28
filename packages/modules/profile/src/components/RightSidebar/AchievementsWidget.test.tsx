import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AchievementsWidget } from './AchievementsWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getAchievements: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('AchievementsWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getAchievements).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <AchievementsWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando conquistas...')).toBeInTheDocument()
  })

  it('renders achievements correctly', async () => {
    vi.mocked(api.getAchievements).mockResolvedValueOnce([
      { id: 'alpha', name: 'Alpha', desc: 'Desc' }
    ])
    render(
      <QueryClientProvider client={queryClient}>
        <AchievementsWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
      expect(screen.getByText('Desc')).toBeInTheDocument()
    })
  })
})
