'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar,
  Users,
  BarChart3,
  Smartphone,
  CreditCard,
  Clock,
  Bell,
  Shield,
  TrendingUp
} from 'lucide-react'

const benefits = [
  {
    icon: Calendar,
    title: 'Agendamentos Online',
    description: 'Sistema completo de agendamentos com confirmação automática, lembretes por WhatsApp e sincronização em tempo real.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: BarChart3,
    title: 'Gestão Financeira',
    description: 'Controle total das finanças com relatórios detalhados, análises de performance e acompanhamento de receitas.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: TrendingUp,
    title: 'Relatórios Inteligentes',
    description: 'Dashboards com métricas importantes, gráficos de crescimento e insights para otimizar seu negócio.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Gestão de Clientes',
    description: 'Cadastro completo de clientes com histórico de serviços, preferências e sistema de fidelização.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Smartphone,
    title: 'App Mobile PWA',
    description: 'Acesse de qualquer lugar com nosso app PWA que funciona offline e pode ser instalado como app nativo.',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: CreditCard,
    title: 'Pagamentos Online',
    description: 'Integração com Asaas para receber pagamentos via PIX, cartão de crédito e boleto bancário.',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Clock,
    title: 'Gestão de Horários',
    description: 'Configure horários de funcionamento, intervalos, férias e bloqueios de forma flexível e intuitiva.',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: Bell,
    title: 'Notificações Push',
    description: 'Receba notificações em tempo real sobre novos agendamentos, cancelamentos e lembretes importantes.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Dados protegidos com criptografia, backup automático e conformidade com LGPD para total segurança.',
    color: 'from-slate-500 to-slate-600'
  }
]

export function BenefitsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <section className="py-20 bg-slate-800 benefits-section" ref={ref}>
      <div className="container-custom">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Por que escolher o StylloBarber?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed px-4 text-no-break"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Uma solução completa que revoluciona a gestão de barbearias com tecnologia de ponta, interface intuitiva e recursos que realmente fazem a diferença no seu negócio.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 h-full benefit-card">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Floating animation elements */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-base text-no-break">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-accent to-accent rounded-2xl p-8 text-primary shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Pronto para transformar sua barbearia?
            </h3>
            <p className="text-lg mb-6 opacity-90 text-primary">
              Junte-se a centenas de profissionais que já revolucionaram seus negócios
            </p>
            <motion.button
              className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Começar Agora - Grátis
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}