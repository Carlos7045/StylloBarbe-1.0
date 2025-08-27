import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domains/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-primary': 'var(--bg-primary)',
        'theme-secondary': 'var(--bg-secondary)',
        'theme-tertiary': 'var(--bg-tertiary)',
        'theme-hover': 'var(--bg-hover)',
        'text-theme-primary': 'var(--text-primary)',
        'text-theme-secondary': 'var(--text-secondary)',
        'text-theme-tertiary': 'var(--text-tertiary)',
        'text-theme-muted': 'var(--text-muted)',
        'border-theme-primary': 'var(--border-primary)',
        'border-theme-secondary': 'var(--border-secondary)',
        'border-theme-hover': 'var(--border-hover)',
      },
      fontFamily: {
        primary: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config