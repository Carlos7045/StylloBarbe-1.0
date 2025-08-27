'use client'

import { ReactNode } from 'react'
import { Button } from '@/shared/components/ui/Button'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'

interface PublicLayoutProps {
  children: ReactNode
  className?: string
}

export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", className)}>
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-slate-900 font-black text-lg">S</span>
              </div>
              <div>
                <span className="text-white font-black text-xl tracking-tight">STYLLO</span>
                <span className="text-amber-400 font-black text-xl tracking-tight">BARBER</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors font-medium">
                Benefícios
              </a>
              <a href="#precos" className="text-gray-300 hover:text-white transition-colors font-medium">
                Preços
              </a>
              <a href="#depoimentos" className="text-gray-300 hover:text-white transition-colors font-medium">
                Depoimentos
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors font-medium">
                FAQ
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white border-gray-600 hover:border-gray-400">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-amber-500/20">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-slate-900 font-black text-lg">S</span>
                </div>
                <div>
                  <span className="text-white font-black text-xl tracking-tight">STYLLO</span>
                  <span className="text-amber-400 font-black text-xl tracking-tight">BARBER</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Sistema completo para gestão de barbearias com agendamentos online, 
                controle financeiro e muito mais. Transforme sua barbearia em um negócio digital.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/cadastro">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold"
                  >
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-white font-bold mb-6">Produto</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#beneficios" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#precos" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-amber-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="text-white font-bold mb-6">Suporte</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                    Status do Sistema
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 StylloBarber. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}