'use client'

import React from 'react'

export type TabId = 'feed' | 'likes' | 'interests' | 'projects' | 'wikis'

interface ProfileTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  isCreator?: boolean
}

export function ProfileTabs({ activeTab, onTabChange, isCreator = false }: ProfileTabsProps) {
  const tabs = isCreator
    ? [
        { id: 'feed' as TabId, label: 'Feed' },
        { id: 'likes' as TabId, label: 'Curtidas' },
        { id: 'projects' as TabId, label: 'Projetos' },
        { id: 'wikis' as TabId, label: 'Wikis' },
      ]
    : [
        { id: 'feed' as TabId, label: 'Feed' },
        { id: 'likes' as TabId, label: 'Curtidas' },
        { id: 'interests' as TabId, label: 'Interesses' },
      ]

  return (
    <nav className="profile-tabs" role="tablist" aria-label="Abas do perfil">
      {tabs.map((tab) => (
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
