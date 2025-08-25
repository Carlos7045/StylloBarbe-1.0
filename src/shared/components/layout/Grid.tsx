import * as React from 'react'
import { cn } from '../../utils/cn'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  }
}

export function Grid({ 
  className, 
  cols = 1, 
  gap = 'md',
  responsive,
  children, 
  ...props 
}: GridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }

  const responsiveClasses = responsive ? [
    responsive.sm && `sm:grid-cols-${responsive.sm}`,
    responsive.md && `md:grid-cols-${responsive.md}`,
    responsive.lg && `lg:grid-cols-${responsive.lg}`,
    responsive.xl && `xl:grid-cols-${responsive.xl}`,
  ].filter(Boolean).join(' ') : ''

  return (
    <div
      className={cn(
        'grid',
        colsClasses[cols],
        gapClasses[gap],
        responsiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Componente de item do grid com span customizável
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
}

export function GridItem({ 
  className, 
  span = 1,
  responsive,
  children, 
  ...props 
}: GridItemProps) {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  }

  const responsiveClasses = responsive ? [
    responsive.sm && `sm:col-span-${responsive.sm}`,
    responsive.md && `md:col-span-${responsive.md}`,
    responsive.lg && `lg:col-span-${responsive.lg}`,
    responsive.xl && `xl:col-span-${responsive.xl}`,
  ].filter(Boolean).join(' ') : ''

  return (
    <div
      className={cn(
        spanClasses[span],
        responsiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Layout de duas colunas comum
interface TwoColumnLayoutProps {
  sidebar: React.ReactNode
  main: React.ReactNode
  sidebarWidth?: 'sm' | 'md' | 'lg'
  gap?: GridProps['gap']
  className?: string
}

export function TwoColumnLayout({
  sidebar,
  main,
  sidebarWidth = 'md',
  gap = 'lg',
  className,
}: TwoColumnLayoutProps) {


  return (
    <Grid 
      cols={1} 
      responsive={{ lg: 12 }} 
      gap={gap}
      className={className}
    >
      <GridItem span={12} responsive={{ lg: sidebarWidth === 'sm' ? 3 : sidebarWidth === 'md' ? 4 : 5 }}>
        {sidebar}
      </GridItem>
      <GridItem span={12} responsive={{ lg: sidebarWidth === 'sm' ? 9 : sidebarWidth === 'md' ? 8 : 7 }}>
        {main}
      </GridItem>
    </Grid>
  )
}