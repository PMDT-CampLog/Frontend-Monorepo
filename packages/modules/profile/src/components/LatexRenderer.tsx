'use client'

import React from 'react'
import katex from 'katex'

interface LatexRendererProps {
  content: string
  enabled: boolean
  className?: string
}

/**
 * Renderiza conteúdo com suporte a LaTeX inline ($...$) e em bloco ($$...$$).
 * Quando disabled, exibe o texto plano sem processamento.
 */
export function LatexRenderer({ content, enabled, className = '' }: LatexRendererProps) {
  if (!enabled || !content) {
    return <div className={`latex-renderer ${className}`}>{content}</div>
  }

  const rendered = renderLatexContent(content)

  return (
    <div
      className={`latex-renderer ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  )
}

function renderLatexContent(text: string): string {
  // Primeiro, processa blocos $$...$$ (display mode)
  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (_match, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
        errorColor: '#ef4444',
      })
    } catch {
      return `<span class="latex-error" style="color: #ef4444;">[Erro LaTeX: ${escapeHtml(formula)}]</span>`
    }
  })

  // Depois, processa inline $...$  (evita falsos positivos com $$ já processado)
  result = result.replace(/(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g, (_match, formula: string) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
        errorColor: '#ef4444',
      })
    } catch {
      return `<span class="latex-error" style="color: #ef4444;">[Erro LaTeX: ${escapeHtml(formula)}]</span>`
    }
  })

  // Converte quebras de linha em <br> para manter a formatação
  result = result.replace(/\n/g, '<br />')

  return result
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
