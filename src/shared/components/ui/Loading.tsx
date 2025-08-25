import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const loadingVariants = cva(
  'animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      variant: {
        default: 'text-primary-600',
        white: 'text-white',
        accent: 'text-accent-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size, variant, text, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2', className)}
        {...props}
      >
        <div className={cn(loadingVariants({ size, variant }))} />
        {text && (
          <span className="text-sm text-gray-600">{text}</span>
        )}
      </div>
    )
  }
)

Loading.displayName = 'Loading'

// Componente de loading para tela inteira
export const LoadingScreen: React.FC<{ text?: string }> = ({ text = 'Carregando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loading size="xl" />
        <p className="text-lg font-medium text-gray-700">{text}</p>
      </div>
    </div>
  )
}

// Componente de loading inline
export const LoadingInline: React.FC<{ text?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  text = 'Carregando...', 
  size = 'md' 
}) => {
  return (
    <div className="flex items-center justify-center py-4">
      <Loading size={size} text={text} />
    </div>
  )
}

export { Loading, loadingVariants }