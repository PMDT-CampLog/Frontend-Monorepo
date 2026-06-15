'use client'

import React, { useState } from 'react'
import type { UpdateProfileRequest, SupporterProfile } from '@camplog/types'

interface ProfileEditModalProps {
  profile: SupporterProfile
  onSave: (data: UpdateProfileRequest) => void
  onClose: () => void
  isLoading?: boolean
}

export function ProfileEditModal({
  profile,
  onSave,
  onClose,
  isLoading = false,
}: ProfileEditModalProps) {
  const [form, setForm] = useState<UpdateProfileRequest>({
    displayName: profile.displayName || '',
    bio: profile.bio || '',
    bioExtended: profile.bioExtended || '',
    websiteUrl: profile.websiteUrl || '',
    location: profile.location || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const handleChange = (field: keyof UpdateProfileRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button className="btn-close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-displayName">Nome de exibição</label>
            <input
              id="edit-displayName"
              type="text"
              value={form.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-bio">Bio</label>
            <textarea
              id="edit-bio"
              value={form.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              maxLength={500}
              rows={3}
            />
            <span className="char-count">{(form.bio?.length || 0)}/500</span>
          </div>

          <div className="form-group">
            <label htmlFor="edit-bioExtended">Sobre (estendido)</label>
            <textarea
              id="edit-bioExtended"
              value={form.bioExtended}
              onChange={(e) => handleChange('bioExtended', e.target.value)}
              maxLength={2000}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-location">Localização</label>
            <input
              id="edit-location"
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Ex: São Paulo, SP"
              maxLength={150}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-website">Website</label>
            <input
              id="edit-website"
              type="url"
              value={form.websiteUrl}
              onChange={(e) => handleChange('websiteUrl', e.target.value)}
              placeholder="https://..."
              maxLength={500}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
