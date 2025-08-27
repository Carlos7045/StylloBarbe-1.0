'use client'

import { cn } from '@/shared/utils/cn'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg border border-theme-primary shadow-sm transition-all duration-200',
        // Theme styles
        'bg-theme-secondary text-theme-primary',
        // Hover effect
        hover && 'hover:shadow-md hover:border-theme-hover',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'p-6 border-b border-theme-primary',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function CardTitle({ children, className, icon }: CardTitleProps) {
  return (
    <div className="flex items-center space-x-3">
      {icon && (
        <div className="p-2 rounded-lg bg-amber-400/10 text-amber-600 dark:text-amber-400">
          {icon}
        </div>
      )}
      <div>
        <h2 className={cn(
          'text-xl font-semibold text-theme-primary',
          className
        )}>
          {children}
        </h2>
      </div>
    </div>
  )
}

interface CardDescriptionProps {
  children: ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn(
      'text-sm text-theme-tertiary mt-1',
      className
    )}>
      {children}
    </p>
  )
}