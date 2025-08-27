import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider'
import { QueryProvider } from '@/shared/components/providers/QueryProvider'
import { AuthProvider } from '@/domains/auth'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'StylloBarber - Sistema de Gestão para Barbearias',
    template: '%s | StylloBarber'
  },
  description: 'Sistema completo para gestão de barbearias com agendamentos online, controle financeiro e muito mais.',
  keywords: ['barbearia', 'agendamento', 'gestão', 'salão', 'barbeiro', 'corte', 'barba'],
  authors: [{ name: 'StylloBarber Team' }],
  creator: 'StylloBarber',
  publisher: 'StylloBarber',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://styllobarber.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://styllobarber.com',
    title: 'StylloBarber - Sistema de Gestão para Barbearias',
    description: 'Sistema completo para gestão de barbearias com agendamentos online, controle financeiro e muito mais.',
    siteName: 'StylloBarber',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StylloBarber - Sistema de Gestão para Barbearias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StylloBarber - Sistema de Gestão para Barbearias',
    description: 'Sistema completo para gestão de barbearias com agendamentos online, controle financeiro e muito mais.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StylloBarber',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4af37' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('styllo-theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const effectiveTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.className = effectiveTheme;
              } catch (e) {
                document.documentElement.className = 'dark';
              }
            `,
          }}
        />
        
        <meta name="application-name" content="StylloBarber" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="StylloBarber" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#d4af37" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://styllobarber.com" />
        <meta name="twitter:title" content="StylloBarber" />
        <meta name="twitter:description" content="Sistema completo para gestão de barbearias" />
        <meta name="twitter:image" content="https://styllobarber.com/og-image.png" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="StylloBarber" />
        <meta property="og:description" content="Sistema completo para gestão de barbearias" />
        <meta property="og:site_name" content="StylloBarber" />
        <meta property="og:url" content="https://styllobarber.com" />
        <meta property="og:image" content="https://styllobarber.com/og-image.png" />
      </head>
      <body className={`${inter.variable} font-primary antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="styllo-theme">
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
