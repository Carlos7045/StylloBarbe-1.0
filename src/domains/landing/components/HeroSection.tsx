'use client'

import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/Button'
import { Scissors, Play } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon with animation */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent mb-6 shadow-2xl">
              <Scissors className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          
          {/* Main title with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto text-white">
              <motion.span
                className="block text-primary"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                StylloBarber
              </motion.span>
              <motion.span 
                className="block text-accent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Sistema Completo
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Subtitle with fade in */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4 text-no-break"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            A solução definitiva para gestão de barbearias com agendamentos online, controle financeiro e relatórios inteligentes.
          </motion.p>
          
          {/* CTA Buttons with staggered animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="accent" 
                className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Começar Agora
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Saiba Mais
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Product presentation image/video placeholder */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 1.4 }}
          >
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Mockup header */}
              <div className="bg-gray-700 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-gray-400">styllo-barber.com</div>
              </div>
              
              {/* Mockup content */}
              <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-primary min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Dashboard StylloBarber</h3>
                  <p className="text-muted">Interface intuitiva e moderna</p>
                  
                  {/* Animated elements */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-20 bg-white rounded-lg shadow-sm"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full"
              animate={{ 
                y: [0, 10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}