'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/shared/components/ui/Button'
import { 
  Check, 
  Star, 
  Users, 
  Calendar, 
  BarChart3, 
  Smartphone,
  CreditCard,
  Shield,
  Headphones,
  Zap,
  Bell
} from 'lucide-react'

const plans = [
  {
    name: 'Básico',
    price: 'R$ 49',
    period: '/mês',
    description: 'Ideal para barbearias iniciantes',
    popular: false,
    features: [
      { text: 'Até 2 barbeiros', icon: Users },
      { text: '500 agendamentos/mês', icon: Calendar },
      { text: 'Agendamentos online', icon: Smartphone },
      { text: 'Notificações WhatsApp', icon: Bell },
      { text: 'Relatórios básicos', icon: BarChart3 },
      { text: 'Suporte por email', icon: Headphones }
    ],
    buttonText: 'Começar Grátis',
    buttonVariant: 'outline' as const
  },
  {
    name: 'Intermediário',
    price: 'R$ 89',
    period: '/mês',
    description: 'Para barbearias em crescimento',
    popular: true,
    features: [
      { text: 'Até 5 barbeiros', icon: Users },
      { text: '2.000 agendamentos/mês', icon: Calendar },
      { text: 'Agendamentos online', icon: Smartphone },
      { text: 'Notificações WhatsApp', icon: Bell },
      { text: 'Pagamentos online', icon: CreditCard },
      { text: 'Relatórios avançados', icon: BarChart3 },
      { text: 'Gestão de estoque', icon: Shield },
      { text: 'Suporte prioritário', icon: Headphones }
    ],
    buttonText: 'Mais Popular',
    buttonVariant: 'accent' as const
  },
  {
    name: 'Avançado',
    price: 'R$ 149',
    period: '/mês',
    description: 'Para barbearias estabelecidas',
    popular: false,
    features: [
      { text: 'Até 10 barbeiros', icon: Users },
      { text: 'Agendamentos ilimitados', icon: Calendar },
      { text: 'Agendamentos online', icon: Smartphone },
      { text: 'Notificações WhatsApp', icon: Bell },
      { text: 'Pagamentos online', icon: CreditCard },
      { text: 'Relatórios completos', icon: BarChart3 },
      { text: 'Gestão de estoque', icon: Shield },
      { text: 'API personalizada', icon: Zap },
      { text: 'Suporte 24/7', icon: Headphones }
    ],
    buttonText: 'Escolher Plano',
    buttonVariant: 'primary' as const
  },
  {
    name: 'Multi-unidade',
    price: 'R$ 299',
    period: '/mês',
    description: 'Para redes de barbearias',
    popular: false,
    features: [
      { text: 'Barbeiros ilimitados', icon: Users },
      { text: 'Múltiplas unidades', icon: Shield },
      { text: 'Agendamentos ilimitados', icon: Calendar },
      { text: 'Dashboard centralizado', icon: BarChart3 },
      { text: 'Pagamentos online', icon: CreditCard },
      { text: 'Relatórios corporativos', icon: BarChart3 },
      { text: 'API personalizada', icon: Zap },
      { text: 'Gerente de conta', icon: Headphones },
      { text: 'Treinamento incluído', icon: Star }
    ],
    buttonText: 'Falar com Vendas',
    buttonVariant: 'primary' as const
  }
]

export function PricingTable() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <section className="py-20 bg-slate-800" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-5xl mx-auto leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Escolha o plano ideal para sua barbearia
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed px-4 text-no-break"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Planos flexíveis que crescem com seu negócio. Comece grátis e faça upgrade quando precisar.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-400 text-primary-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className={`bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 h-full border-2 ${
                plan.popular 
                  ? 'border-accent-500 shadow-accent-500/20 bg-gradient-to-br from-accent-900/20 to-gray-900' 
                  : 'border-gray-700/50'
              }`}>
                {/* Plan header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-300 mb-4 leading-relaxed text-no-break px-2">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl lg:text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-300 text-base lg:text-lg">
                      {plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant={plan.buttonVariant}
                      size="md"
                      className="w-full mb-6 text-sm lg:text-base"
                    >
                      {plan.buttonText}
                    </Button>
                  </motion.div>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start gap-2 px-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.6 + (index * 0.1) + (featureIndex * 0.05) 
                      }}
                    >
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-900/20 flex items-center justify-center mt-1">
                        <Check className="w-2.5 h-2.5 text-green-400" />
                      </div>
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <feature.icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 text-xs lg:text-sm leading-tight text-no-break">
                          {feature.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-accent-500/5 to-accent-400/5' 
                    : 'bg-gradient-to-br from-primary-500/5 to-transparent'
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="bg-gray-900/80 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Não tem certeza qual plano escolher?
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto text-no-break">
              Todos os planos incluem 14 dias de teste grátis. Sem compromisso, sem cartão de crédito necessário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="accent" size="lg">
                  Começar Teste Grátis
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  Falar com Especialista
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}