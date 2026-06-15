'use client'

import React from 'react'

export type TabId = 'feed' | 'likes' | 'interests'

interface ProfileTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'likes', label: 'Curtidas' },
  { id: 'interests', label: 'Interesses' },
]

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <nav className="profile-tabs" role="tablist" aria-label="Abas do perfil">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
