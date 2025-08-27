// Sistema de Design - Styllo Barber
export const theme = {
  // Cores principais
  colors: {
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Amarelo principal
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Tema escuro
    dark: {
      bg: {
        primary: '#0f172a',    // slate-900
        secondary: '#1e293b',  // slate-800
        tertiary: '#334155',   // slate-700
        card: '#1e293b',       // slate-800
        hover: '#334155',      // slate-700
      },
      text: {
        primary: '#f8fafc',    // slate-50
        secondary: '#cbd5e1',  // slate-300
        tertiary: '#94a3b8',   // slate-400
        muted: '#64748b',      // slate-500
      },
      border: {
        primary: '#334155',    // slate-700
        secondary: '#475569',  // slate-600
        hover: '#64748b',      // slate-500
      }
    },
    
    // Tema claro
    light: {
      bg: {
        primary: '#ffffff',
        secondary: '#f8fafc',  // slate-50
        tertiary: '#f1f5f9',   // slate-100
        card: '#ffffff',
        hover: '#f8fafc',      // slate-50
      },
      text: {
        primary: '#0f172a',    // slate-900
        secondary: '#334155',  // slate-700
        tertiary: '#475569',   // slate-600
        muted: '#64748b',      // slate-500
      },
      border: {
        primary: '#e2e8f0',    // slate-200
        secondary: '#cbd5e1',  // slate-300
        hover: '#94a3b8',      // slate-400
      }
    },
    
    // Cores semânticas
    semantic: {
      success: {
        light: '#dcfce7',
        DEFAULT: '#16a34a',
        dark: '#15803d',
      },
      warning: {
        light: '#fef3c7',
        DEFAULT: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#fee2e2',
        DEFAULT: '#dc2626',
        dark: '#b91c1c',
      },
      info: {
        light: '#dbeafe',
        DEFAULT: '#2563eb',
        dark: '#1d4ed8',
      }
    }
  },
  
  // Espaçamentos
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  
  // Bordas
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
  },
  
  // Sombras
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  }
}

// Classes CSS usando variáveis CSS customizadas
export const themeClasses = {
  // Backgrounds
  'bg-primary': 'bg-theme-primary',
  'bg-secondary': 'bg-theme-secondary',
  'bg-tertiary': 'bg-theme-tertiary',
  'bg-card': 'bg-theme-secondary',
  'bg-hover': 'hover:bg-theme-hover',
  
  // Textos
  'text-primary': 'text-theme-primary',
  'text-secondary': 'text-theme-secondary',
  'text-tertiary': 'text-theme-tertiary',
  'text-muted': 'text-theme-muted',
  
  // Bordas
  'border-primary': 'border-theme-primary',
  'border-secondary': 'border-theme-secondary',
  'border-hover': 'hover:border-theme-hover',
  
  // Estados
  'focus-ring': 'focus:ring-2 focus:ring-amber-500 focus:border-transparent',
}

// Mapeamento para compatibilidade com código existente
export const darkTheme = themeClasses
export const lightTheme = themeClasses

// Componentes base usando variáveis CSS
export const baseComponents = {
  // Card
  card: 'rounded-lg border border-theme-primary bg-theme-secondary shadow-sm transition-colors',
  
  // Button Primary
  buttonPrimary: 'btn-primary inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  
  // Button Secondary
  buttonSecondary: 'inline-flex items-center justify-center rounded-md text-sm font-medium border border-theme-primary text-theme-secondary hover:bg-theme-hover transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  
  // Input
  input: 'w-full rounded-md border border-theme-primary bg-theme-secondary text-theme-primary px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder:text-theme-muted',
  
  // Badge
  badge: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-theme-tertiary text-theme-secondary',
  
  // Loading
  loading: 'animate-pulse bg-theme-tertiary',
}