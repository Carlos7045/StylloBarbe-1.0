import * as React from 'react'
import { cn } from '../../utils/cn'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Container({ 
  className, 
  size = 'lg', 
  padding = 'md',
  children, 
  ...props 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Componente de seção com container integrado
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: ContainerProps['size']
  containerPadding?: ContainerProps['padding']
  background?: 'white' | 'gray' | 'primary' | 'accent'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({
  className,
  containerSize = 'lg',
  containerPadding = 'md',
  background = 'white',
  spacing = 'lg',
  children,
  ...props
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    primary: 'bg-primary-800 dark:bg-primary-900',
    accent: 'bg-accent-50 dark:bg-accent-900/20',
  }

  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  return (
    <section
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      <Container size={containerSize} padding={containerPadding}>
        {children}
      </Container>
    </section>
  )
}