'use client'

// import { PWAInstallPrompt, OfflineIndicator, ShareButton } from '@/shared/components/ui'
import { PublicLayout } from '@/shared/components/layout'
import { HeroSection, BenefitsGrid, PricingTable, TestimonialsCarousel, FAQSection, CTASection } from '@/domains/landing/components'
import { 
  Smartphone, 
  Wifi, 
  Bell,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  return (
    <PublicLayout>
      {/* <OfflineIndicator /> */}
      
      {/* Hero Section */}
      <HeroSection />

      {/* PWA Install Prompt */}
      {/* <div className="container-custom py-8">
        <PWAInstallPrompt variant="card" />
      </div> */}

      {/* Benefits Section */}
      <BenefitsGrid />

      {/* PWA Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 pwa-section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight px-4">
                Experiência de App Nativo
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4 text-no-break">
                Instale nosso PWA e tenha a melhor experiência possível
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle,
                      title: 'Instalação Simples',
                      description: 'Instale diretamente do navegador, sem precisar de app store.'
                    },
                    {
                      icon: Smartphone,
                      title: 'Acesso Rápido',
                      description: 'Ícone na tela inicial para acesso instantâneo.'
                    },
                    {
                      icon: Wifi,
                      title: 'Funciona Offline',
                      description: 'Continue usando mesmo sem conexão com a internet.'
                    },
                    {
                      icon: Bell,
                      title: 'Notificações Push',
                      description: 'Receba lembretes e atualizações importantes.'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/30 hover:bg-gray-900/70 transition-all duration-300 pwa-card">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2 text-lg">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-gray-600/50 shadow-xl pwa-card">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Smartphone className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Instale Agora
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Tenha o StylloBarber sempre à mão com nosso Progressive Web App
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingTable />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <CTASection />

      {/* PWA Install Banner */}
      {/* <PWAInstallPrompt variant="banner" /> */}
    </PublicLayout>
  )
}