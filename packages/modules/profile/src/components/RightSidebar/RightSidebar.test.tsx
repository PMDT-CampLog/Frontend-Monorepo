import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RightSidebar } from './RightSidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('./OstWidget', () => ({ OstWidget: () => <div data-testid="ost-widget" /> }))
vi.mock('./LatestPostsWidget', () => ({ LatestPostsWidget: () => <div data-testid="latest-posts-widget" /> }))
vi.mock('./ReleasesWidget', () => ({ ReleasesWidget: () => <div data-testid="releases-widget" /> }))
vi.mock('./AchievementsWidget', () => ({ AchievementsWidget: () => <div data-testid="achievements-widget" /> }))
vi.mock('./ActivePollsWidget', () => ({ ActivePollsWidget: () => <div data-testid="active-polls-widget" /> }))
vi.mock('./DiscordWidget', () => ({ DiscordWidget: () => <div data-testid="discord-widget" /> }))
vi.mock('./SupportGoalWidget', () => ({ SupportGoalWidget: () => <div data-testid="support-goal-widget" /> }))
vi.mock('./StudioSuggestionsWidget', () => ({ StudioSuggestionsWidget: () => <div data-testid="studio-suggestions-widget" /> }))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe('RightSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders all widgets', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RightSidebar userId="user1" />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('ost-widget')).toBeInTheDocument()
    expect(screen.getByTestId('latest-posts-widget')).toBeInTheDocument()
    expect(screen.getByTestId('releases-widget')).toBeInTheDocument()
    expect(screen.getByTestId('achievements-widget')).toBeInTheDocument()
    expect(screen.getByTestId('active-polls-widget')).toBeInTheDocument()
    expect(screen.getByTestId('discord-widget')).toBeInTheDocument()
    expect(screen.getByTestId('support-goal-widget')).toBeInTheDocument()
    expect(screen.getByTestId('studio-suggestions-widget')).toBeInTheDocument()
  })
})
