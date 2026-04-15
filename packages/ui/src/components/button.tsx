import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/cn'

// Variantes do botão usando CVA (Class Variance Authority)
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700',
        secondary:
          'bg-surface-raised text-white border border-surface-overlay hover:bg-surface-overlay',
        ghost:
          'text-white hover:bg-surface-raised',
        destructive:
          'bg-red-600 text-white hover:bg-red-700',
        outline:
          'border border-brand-500 text-brand-400 hover:bg-brand-500/10',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
