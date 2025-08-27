'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'Como funciona o período de teste gratuito?',
    answer: 'Oferecemos 14 dias de teste gratuito completo, sem limitações. Você pode testar todas as funcionalidades do plano escolhido sem precisar informar cartão de crédito. Após o período, você pode escolher continuar com a assinatura ou cancelar sem custos.'
  },
  {
    id: 2,
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente na próxima cobrança.'
  },
  {
    id: 3,
    question: 'O sistema funciona offline?',
    answer: 'Sim, o StylloBarber é um PWA (Progressive Web App) que funciona offline. Você pode continuar agendando e consultando informações mesmo sem internet. Quando a conexão for restabelecida, todos os dados são sincronizados automaticamente.'
  },
  {
    id: 4,
    question: 'Como funciona a integração com pagamentos?',
    answer: 'Integramos com a Asaas, uma das principais plataformas de pagamento do Brasil. Seus clientes podem pagar via PIX, cartão de crédito ou boleto bancário. O dinheiro cai diretamente na sua conta, com taxas competitivas.'
  },
  {
    id: 5,
    question: 'Preciso de conhecimento técnico para usar?',
    answer: 'Não! O StylloBarber foi desenvolvido para ser extremamente intuitivo. Oferecemos treinamento gratuito, tutoriais em vídeo e suporte técnico para garantir que você aproveite ao máximo todas as funcionalidades.'
  },
  {
    id: 6,
    question: 'Meus dados ficam seguros?',
    answer: 'Absolutamente! Utilizamos criptografia de ponta, backup automático e seguimos todas as normas da LGPD. Seus dados e os dos seus clientes estão completamente protegidos em servidores seguros.'
  },
  {
    id: 7,
    question: 'Posso cancelar a assinatura quando quiser?',
    answer: 'Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. Você continuará tendo acesso até o final do período já pago.'
  },
  {
    id: 8,
    question: 'Há limite de agendamentos nos planos?',
    answer: 'Depende do plano escolhido. O plano Básico tem limite de 500 agendamentos/mês, o Intermediário 2.000/mês, e os planos Avançado e Multi-unidade têm agendamentos ilimitados.'
  }
]

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
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
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-800 mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HelpCircle className="w-8 h-8 text-accent" />
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4 max-w-4xl mx-auto leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 text-no-break"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Tire suas dúvidas sobre o StylloBarber e descubra como podemos ajudar sua barbearia
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-expanded={openItems.includes(faq.id)}
                >
                  <span className="text-lg font-semibold text-black dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="text-muted dark:text-gray-400 leading-relaxed text-no-break">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-lg mb-6 opacity-90 text-no-break">
              Nossa equipe está pronta para ajudar você a escolher o melhor plano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-accent text-primary px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Falar com Especialista
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Demonstração
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}