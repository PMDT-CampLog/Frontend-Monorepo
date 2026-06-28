import React from 'react'
import { OstWidget } from './OstWidget'
import { LatestPostsWidget } from './LatestPostsWidget'
import { ReleasesWidget } from './ReleasesWidget'
import { AchievementsWidget } from './AchievementsWidget'
import { ActivePollsWidget } from './ActivePollsWidget'
import { DiscordWidget } from './DiscordWidget'
import { SupportGoalWidget } from './SupportGoalWidget'
import { StudioSuggestionsWidget } from './StudioSuggestionsWidget'

interface RightSidebarProps {
  userId: string
  isOwner?: boolean
  isCreator?: boolean
}

export function RightSidebar({ userId, isOwner = false, isCreator = false }: RightSidebarProps) {
  if (isCreator) {
    return (
      <aside className="profile-sidebar-right right-sidebar-container">
        <DiscordWidget userId={userId} />
        <ReleasesWidget userId={userId} />
        <ActivePollsWidget userId={userId} />
        <SupportGoalWidget userId={userId} />
        <AchievementsWidget userId={userId} />
      </aside>
    )
  }

  // Apoiador (original)
  return (
    <aside className="profile-sidebar-right right-sidebar-container">
      <OstWidget userId={userId} isOwner={isOwner} />
      <LatestPostsWidget userId={userId} />
      <ReleasesWidget userId={userId} />
      <AchievementsWidget userId={userId} />
      <ActivePollsWidget userId={userId} />
      <DiscordWidget userId={userId} />
      <SupportGoalWidget userId={userId} />
      <StudioSuggestionsWidget userId={userId} />
    </aside>
  )
}
