'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/shared/components/ui/Button'
import { 
  Scissors, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Zap
} from 'lucide-react'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const benefits = [
    'Teste grátis por 14 dias',
    'Sem cartão de crédito necessário',
    'Suporte especializado incluído',
    'Configuração em menos de 5 minutos'
  ]

  return (
    <section className="py-20 bg-gray-800 text-white relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-500 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-400 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-yellow-300 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon with animation */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-500 mb-6 shadow-2xl relative">
              <Scissors className="w-10 h-10 text-gray-900" />
              
              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-5xl mx-auto px-4">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Pronto para revolucionar
              </motion.span>
              <motion.span 
                className="block text-yellow-500"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                sua barbearia?
              </motion.span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-5xl mx-auto leading-relaxed px-4 text-no-break"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Junte-se a mais de 1.000 barbearias que já transformaram seus negócios com o StylloBarber. Comece hoje mesmo e veja a diferença!
          </motion.p>

          {/* Benefits list */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold text-lg px-8 py-4 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 group"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Começar Teste Grátis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-900 transition-all duration-300"
              >
                Falar com Especialista
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <p className="text-gray-400 text-sm mb-4">
              Mais de 50.000 agendamentos processados mensalmente
            </p>
            
            {/* Animated counter */}
            <div className="flex justify-center items-center gap-8 text-yellow-400">
              <motion.div
                className="text-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0
                }}
              >
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-xs text-gray-400">Barbearias</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-gray-400">Satisfação</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-gray-400">Suporte</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}