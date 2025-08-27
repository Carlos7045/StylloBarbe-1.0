'use client'

import { cn } from '@/shared/utils/cn'

interface LoadingSkeletonProps {
  className?: string
  rows?: number
}

export function LoadingSkeleton({ className, rows = 1 }: LoadingSkeletonProps) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 rounded bg-theme-tertiary',
            className
          )}
        />
      ))}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn(
      'rounded-lg border p-6 bg-theme-secondary border-theme-primary',
      className
    )}>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-theme-tertiary rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-theme-tertiary rounded w-3/4" />
          <div className="h-4 bg-theme-tertiary rounded w-1/2" />
        </div>
        <div className="h-8 bg-theme-tertiary rounded w-full" />
      </div>
    </div>
  )
}

interface LoadingGridProps {
  items?: number
  className?: string
}

export function LoadingGrid({ items = 4, className }: LoadingGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <svg
      className={cn(
        'animate-spin text-theme-tertiary',
        sizeClasses[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}