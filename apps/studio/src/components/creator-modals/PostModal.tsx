import React from 'react'
import { PostComposer } from '@camplog/module-profile'

interface PostModalProps {
  onClose: () => void
}

export function PostModal({ onClose }: PostModalProps) {
  // PostComposer assumes a typical environment, we might just wrap it.
  // It handles its own state and submission, but we might want to close the modal after.
  // For now, we just render it. If we need to listen for success, we might have to pass an onSuccess callback if PostComposer supports it.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <style>{`
        .post-composer {
          background: var(--card-bg, #120e29);
          border: 1px solid var(--card-border, #2f354a);
          border-radius: 16px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: border-color 0.2s ease;
        }

        .post-composer:focus-within {
          border-color: rgba(139, 92, 246, 0.45);
        }

        .post-composer-editor {
          margin-bottom: 1rem;
        }

        .post-composer-textarea {
          width: 100%;
          background: var(--input-bg, #181c2c);
          border: 2px solid var(--input-border, #2f354a);
          border-radius: 12px;
          color: var(--heading, #ffffff);
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-family: var(--font-dm-sans, sans-serif);
          resize: vertical;
          min-height: 100px;
          outline: none;
          transition: border-color 0.2s ease, background-color 0.2s ease;
          box-sizing: border-box;
        }

        .post-composer-textarea:focus {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }

        .post-composer-preview {
          min-height: 104px;
          background: var(--input-bg, #181c2c);
          border: 2px solid var(--input-border, #2f354a);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          color: var(--body-text, #a0aec0);
          font-size: 1rem;
          line-height: 1.6;
        }

        .post-composer-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--card-border, #2f354a);
          padding-top: 1rem;
        }

        .post-composer-options {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .post-composer-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--heading-sm, #cbd5e1);
          font-weight: 600;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }

        .post-composer-toggle:hover {
          color: var(--heading, #ffffff);
        }

        .post-composer-toggle input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: var(--icon-accent, #8b5cf6);
          cursor: pointer;
        }

        .btn-preview {
          background: transparent;
          border: 1px solid var(--card-border, #2f354a);
          color: var(--heading-sm, #cbd5e1);
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-family: var(--font-dm-sans, sans-serif);
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-preview:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--heading, #ffffff);
        }

        .btn-preview.active {
          background: rgba(139, 92, 246, 0.15);
          color: var(--icon-accent, #8b5cf6);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .btn-publish {
          background: var(--icon-accent, #8b5cf6);
          color: #ffffff;
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 999px;
          font-family: var(--font-dm-sans, sans-serif);
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-publish:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
        }

        .btn-publish:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }
      `}</style>
      <p style={{ color: 'var(--body-text)', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Crie uma nova publicação para os seus seguidores. Ela aparecerá no feed de todos que apoiam ou seguem seu trabalho.
      </p>
      
      <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <PostComposer onSubmit={() => {}} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--body-text)', cursor: 'pointer', fontWeight: 600 }}>
          Fechar
        </button>
      </div>
    </div>
  )
}
