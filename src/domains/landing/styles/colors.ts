// Cores específicas para a Landing Page
// Estas cores são independentes do sistema de temas do dashboard

export const landingColors = {
  // Backgrounds da landing page
  background: {
    primary: 'bg-slate-900',
    secondary: 'bg-slate-800', 
    tertiary: 'bg-slate-700',
    card: 'bg-gray-800',
    cardHover: 'bg-gray-700',
    overlay: 'bg-black/20',
    gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
  },

  // Textos da landing page
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    tertiary: 'text-gray-400',
    muted: 'text-gray-500',
    accent: 'text-amber-400'
  },

  // Bordas da landing page
  border: {
    primary: 'border-gray-700',
    secondary: 'border-gray-600',
    accent: 'border-amber-500/20',
    hover: 'border-gray-400'
  },

  // Cores de destaque (amarelo)
  accent: {
    primary: 'bg-amber-500',
    hover: 'bg-amber-600',
    gradient: 'bg-gradient-to-r from-amber-500 to-amber-600',
    gradientHover: 'bg-gradient-to-r from-amber-600 to-amber-700',
    text: 'text-amber-400',
    textOnAccent: 'text-slate-900'
  }
}

// Classes CSS prontas para uso
export const landingClasses = {
  // Containers
  section: 'py-20 bg-slate-900',
  container: 'container-custom',
  
  // Títulos
  heroTitle: 'text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight',
  sectionTitle: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6',
  cardTitle: 'text-xl font-semibold text-white',
  
  // Textos
  heroSubtitle: 'text-xl text-gray-300 leading-relaxed',
  sectionSubtitle: 'text-lg sm:text-xl text-gray-300 leading-relaxed',
  cardText: 'text-gray-300',
  
  // Botões
  primaryButton: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105',
  secondaryButton: 'border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition-all',
  
  // Cards
  card: 'bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm',
  cardHover: 'bg-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm hover:bg-gray-700 transition-all',
  
  // Mockup do dashboard
  mockupContainer: 'bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700',
  mockupHeader: 'bg-gray-700 px-4 py-3 flex items-center gap-2 border-b border-gray-600',
  mockupContent: 'p-4 bg-gray-900',
  mockupCard: 'bg-gray-800 rounded-lg p-2 shadow-sm border border-gray-700',
  mockupChart: 'bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-700'
}