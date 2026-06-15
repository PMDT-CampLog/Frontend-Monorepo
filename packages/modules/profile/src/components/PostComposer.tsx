'use client'

import React, { useState } from 'react'
import type { CreatePostRequest } from '@camplog/types'
import { LatexRenderer } from './LatexRenderer'

interface PostComposerProps {
  onSubmit: (data: CreatePostRequest) => void
  isLoading?: boolean
}

export function PostComposer({ onSubmit, isLoading = false }: PostComposerProps) {
  const [content, setContent] = useState('')
  const [latexEnabled, setLatexEnabled] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    onSubmit({
      content: content.trim(),
      type: 'TEXT',
      latexEnabled,
    })

    setContent('')
    setShowPreview(false)
  }

  return (
    <div className="post-composer">
      <form onSubmit={handleSubmit}>
        <div className="post-composer-editor">
          {showPreview && latexEnabled ? (
            <div className="post-composer-preview">
              <LatexRenderer content={content} enabled={true} />
            </div>
          ) : (
            <textarea
              className="post-composer-textarea"
              placeholder="O que você está pensando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              disabled={isLoading}
            />
          )}
        </div>

        <div className="post-composer-toolbar">
          <div className="post-composer-options">
            <label className="post-composer-toggle" htmlFor="latex-toggle">
              <input
                id="latex-toggle"
                type="checkbox"
                checked={latexEnabled}
                onChange={(e) => {
                  setLatexEnabled(e.target.checked)
                  if (!e.target.checked) setShowPreview(false)
                }}
              />
              <span className="toggle-label">LaTeX</span>
            </label>

            {latexEnabled && (
              <button
                type="button"
                className={`btn-preview ${showPreview ? 'active' : ''}`}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? '✏️ Editar' : '👁️ Preview'}
              </button>
            )}
          </div>

          <button
            type="submit"
            className="btn-publish"
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}
