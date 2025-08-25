import * as React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

interface FooterProps {
  variant?: 'default' | 'minimal'
}

export function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span className="text-primary-900 font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-primary-800 dark:text-white">
                StylloBarber
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 StylloBarber. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span className="text-primary-900 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-primary-800 dark:text-black">
                StylloBarber
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A solução completa para gestão de barbearias. Agendamentos online,
              controle financeiro e muito mais.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary-800 dark:text-white">
              Produto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#recursos"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#planos"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Demonstração
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary-800 dark:text-white">
              Suporte
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ajuda"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link
                  href="/documentacao"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Documentação
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-600 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                >
                  Status do Sistema
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary-800 dark:text-white">
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  contato@styllobarber.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  (11) 99999-9999
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  São Paulo, SP<br />
                  Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 StylloBarber. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacidade"
                className="text-gray-500 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-gray-500 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-accent-500 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}