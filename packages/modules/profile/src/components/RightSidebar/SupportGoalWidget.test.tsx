import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SupportGoalWidget } from './SupportGoalWidget'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@camplog/api/profile'

vi.mock('@camplog/api/profile', () => ({
  getSupportGoal: vi.fn(),
  addSupport: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('SupportGoalWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state initially', () => {
    vi.mocked(api.getSupportGoal).mockReturnValue(new Promise(() => {}))
    render(
      <QueryClientProvider client={queryClient}>
        <SupportGoalWidget userId="1" />
      </QueryClientProvider>
    )
    expect(screen.getByText('Carregando meta...')).toBeInTheDocument()
  })

  it('renders goal details', async () => {
    vi.mocked(api.getSupportGoal).mockResolvedValueOnce({
      studio: 'Studio X',
      current: 100,
      goal: 500,
      currency: 'R$'
    })
    
    render(
      <QueryClientProvider client={queryClient}>
        <SupportGoalWidget userId="1" />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Studio X')).toBeInTheDocument()
      expect(screen.getByText('R$ 100 / 500')).toBeInTheDocument()
      expect(screen.getByText('Apoiar mais R$ 50')).toBeInTheDocument()
    })
  })
})
