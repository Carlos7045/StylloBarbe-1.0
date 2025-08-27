'use client'

import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/Button'
import { Scissors, Play, Calendar, DollarSign, BarChart3, Users } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.04),transparent_50%)]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-8"
            >
              <Scissors className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Sistema Completo para Barbearias</span>
            </motion.div>

            {/* Main Title */}
            <motion.div 
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight hero-title-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="hero-title-line">
                <span className="text-theme-primary">Transforme sua </span>
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Barbearia
                </span>
              </div>
              <br className="hidden sm:block" />
              <div className="hero-title-line">
                <span className="text-theme-primary">em um negócio </span>
                <span className="text-amber-400">digital</span>
              </div>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl text-theme-secondary mb-8 max-w-2xl leading-relaxed hero-paragraph"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sistema completo para gestão de barbearias com agendamentos online, controle financeiro, relatórios inteligentes e muito mais. 
              <br className="hidden sm:block" />
              Tudo que você precisa para modernizar sua barbearia.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/cadastro">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Começar Grátis
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-theme-primary text-theme-secondary hover:text-theme-primary hover:border-theme-secondary text-lg px-8 py-4 transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div>
                <div className="text-2xl font-bold text-theme-primary">500+</div>
                <div className="text-sm text-theme-tertiary">Barbearias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-theme-primary">10k+</div>
                <div className="text-sm text-theme-tertiary">Agendamentos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-theme-primary">98%</div>
                <div className="text-sm text-theme-tertiary">Satisfação</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:pl-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-lg mx-auto lg:mx-0"
            >
              {/* Main Dashboard Mockup */}
              <div className="relative bg-theme-secondary rounded-2xl shadow-2xl overflow-hidden border border-theme-primary">
                {/* Browser Header */}
                <div className="bg-theme-tertiary px-4 py-3 flex items-center gap-2 border-b border-theme-primary">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-sm text-theme-tertiary font-mono">styllobarber.com/dashboard</div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-4 bg-theme-primary">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                        <span className="text-slate-900 font-bold text-sm">S</span>
                      </div>
                      <span className="text-theme-primary font-bold">Dashboard</span>
                    </div>
                    <div className="w-8 h-8 bg-theme-tertiary rounded-full"></div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { icon: Calendar, label: 'Agendamentos', value: '24', color: 'blue' },
                      { icon: DollarSign, label: 'Receita', value: 'R$ 2.4k', color: 'green' },
                      { icon: Users, label: 'Clientes', value: '156', color: 'purple' },
                      { icon: BarChart3, label: 'Crescimento', value: '+12%', color: 'amber' }
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        className="bg-theme-secondary rounded-lg p-2 shadow-sm border border-theme-primary"
                        animate={{ 
                          scale: [1, 1.02, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          delay: index * 0.2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <metric.icon className={`w-4 h-4 text-${metric.color}-500`} />
                          <span className="text-xs text-theme-tertiary">{metric.label}</span>
                        </div>
                        <div className="text-base font-bold text-theme-primary">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="bg-theme-secondary rounded-lg p-3 shadow-sm border border-theme-primary">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-theme-primary">Agendamentos da Semana</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-16 bg-theme-tertiary rounded flex items-end justify-between px-2 pb-2">
                      {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-t from-amber-500 to-amber-400 rounded-sm w-3"
                          style={{ height: `${height}%` }}
                          animate={{ 
                            height: [`${height * 0.5}%`, `${height}%`, `${height * 0.8}%`]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: index * 0.1,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Calendar className="w-5 h-5 text-slate-900" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, 8, 0],
                  x: [0, 3, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <DollarSign className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
