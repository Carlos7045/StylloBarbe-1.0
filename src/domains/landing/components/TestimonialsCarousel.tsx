'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Proprietário',
    business: 'Barbearia Premium',
    content: 'O StylloBarber revolucionou minha barbearia. Agora tenho controle total dos agendamentos e finanças. Meus clientes adoram agendar pelo app e eu consigo focar no que realmente importa: o atendimento.',
    rating: 5,
    avatar: '/avatars/carlos.jpg',
    location: 'São Paulo, SP'
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Barbeiro',
    business: 'Studio Masculino',
    content: 'App incrível! Funciona perfeitamente offline e os clientes adoram agendar pelo celular. Aumentei minha clientela em 40% desde que comecei a usar. Recomendo para todos os colegas.',
    rating: 5,
    avatar: '/avatars/joao.jpg',
    location: 'Rio de Janeiro, RJ'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    role: 'Gerente',
    business: 'Rede de Barbearias',
    content: 'Conseguimos gerenciar todas as nossas 5 unidades de forma centralizada. Os relatórios são fantásticos e nos ajudam a tomar decisões estratégicas. Excelente sistema!',
    rating: 5,
    avatar: '/avatars/pedro.jpg',
    location: 'Belo Horizonte, MG'
  },
  {
    id: 4,
    name: 'Rafael Oliveira',
    role: 'Proprietário',
    business: 'Barber Shop Elite',
    content: 'A integração com pagamentos online foi um divisor de águas. Agora recebo até mesmo quando não estou na barbearia. O suporte é excepcional, sempre prontos para ajudar.',
    rating: 5,
    avatar: '/avatars/rafael.jpg',
    location: 'Brasília, DF'
  },
  {
    id: 5,
    name: 'Lucas Ferreira',
    role: 'Barbeiro',
    business: 'Cortes & Estilo',
    content: 'Desde que uso o StylloBarber, minha agenda está sempre cheia. Os lembretes automáticos reduziram drasticamente as faltas. É uma ferramenta indispensável para qualquer profissional.',
    rating: 5,
    avatar: '/avatars/lucas.jpg',
    location: 'Porto Alegre, RS'
  }
]

export function TestimonialsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-black" ref={ref}>
      <div className="container-custom">
        {/* Header */}
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
            O que nossos clientes dizem
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed text-no-break"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mais de 1.000 barbearias já transformaram seus negócios com o StylloBarber
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Main testimonial card */}
          <div className="relative bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-accent-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic text-no-break">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-300">
                      {testimonials[currentIndex].role} - {testimonials[currentIndex].business}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 shadow-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-6 h-6 text-gray-300" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 shadow-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { number: '1.000+', label: 'Barbearias Ativas' },
            { number: '50.000+', label: 'Agendamentos/Mês' },
            { number: '98%', label: 'Satisfação dos Clientes' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}