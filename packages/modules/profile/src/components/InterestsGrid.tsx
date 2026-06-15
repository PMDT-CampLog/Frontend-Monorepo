'use client'

import React from 'react'

interface InterestsGridProps {
  interests: string[]
}

export function InterestsGrid({ interests }: InterestsGridProps) {
  if (interests.length === 0) {
    return (
      <div className="interests-empty">
        <p>Nenhum interesse cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div className="interests-grid">
      {interests.map((tag, index) => (
        <span key={`${tag}-${index}`} className="interest-tag">
          {tag}
        </span>
      ))}
    </div>
  )
}
