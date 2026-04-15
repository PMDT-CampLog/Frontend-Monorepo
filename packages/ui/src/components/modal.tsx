import { cn } from '../lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  if (!open) return null

  return (
    // Backdrop com blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full max-w-md rounded-2xl border border-surface-overlay bg-surface-raised p-6 shadow-2xl',
          className,
        )}
        // Impede o clique interno de fechar o modal
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
        )}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
          aria-label="Fechar modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
