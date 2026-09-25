'use client'

import React, { useState } from 'react'
import type { CreatePostRequest } from '@camplog/types'
import { LatexRenderer } from './LatexRenderer'

interface PostComposerProps {
  onSubmit: (data: CreatePostRequest, file?: File) => void
  isLoading?: boolean
}

export function PostComposer({ onSubmit, isLoading = false }: PostComposerProps) {
  const [content, setContent] = useState('')
  const [latexEnabled, setLatexEnabled] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && !selectedFile) return

    onSubmit({
      content: content.trim(),
      type: selectedFile ? 'MEDIA' : 'TEXT',
      latexEnabled,
    }, selectedFile || undefined)

    setContent('')
    setShowPreview(false)
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
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
          {previewUrl && (
            <div style={{ marginTop: '0.5rem', position: 'relative', display: 'inline-block' }}>
              <img src={previewUrl} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => { setSelectedFile(null); setPreviewUrl(null) }}
                style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="post-composer-toolbar">
          <div className="post-composer-options">
            <label className="post-composer-toggle" style={{ cursor: 'pointer' }}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isLoading}
              />
              <span style={{ fontSize: '1.2rem' }}>📎</span>
              <span className="toggle-label" style={{ marginLeft: '4px' }}>Imagem</span>
            </label>
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
            disabled={(!content.trim() && !selectedFile) || isLoading}
          >
            {isLoading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  )
}
