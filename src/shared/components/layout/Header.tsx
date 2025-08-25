'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { Button } from '../ui/Button'
import { useUser, useAuth } from '@/domains/auth'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '../ui/Modal'

interface HeaderProps {
  showAuthButtons?: boolean
}

export function Header({ showAuthButtons = true }: HeaderProps) {
  const { user, isAuthenticated } = useUser()
  const { logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const getRoleLabel = (role: string) => {
    const labels = {
      admin_saas: 'Admin SaaS',
      admin_barbearia: 'Admin Barbearia',
      barbeiro: 'Barbeiro',
      cliente: 'Cliente',
    }
    return labels[role as keyof typeof labels] || role
  }

  const getNavigationLinks = () => {
    if (!user) return []

    switch (user.role) {
      case 'admin_saas':
        return [
          { href: '/admin-saas', label: 'Dashboard' },
          { href: '/admin-saas/barbearias', label: 'Barbearias' },
          { href: '/admin-saas/assinaturas', label: 'Assinaturas' },
          { href: '/admin-saas/relatorios', label: 'Relatórios' },
        ]
      case 'admin_barbearia':
        return [
          { href: '/admin-barbearia', label: 'Dashboard' },
          { href: '/admin-barbearia/agenda', label: 'Agenda' },
          { href: '/admin-barbearia/funcionarios', label: 'Funcionários' },
          { href: '/admin-barbearia/servicos', label: 'Serviços' },
          { href: '/admin-barbearia/configuracoes', label: 'Configurações' },
        ]
      case 'barbeiro':
        return [
          { href: '/barbeiro', label: 'Minha Agenda' },
          { href: '/barbeiro/clientes', label: 'Clientes' },
          { href: '/barbeiro/perfil', label: 'Perfil' },
        ]
      case 'cliente':
        return [
          { href: '/cliente', label: 'Meus Agendamentos' },
          { href: '/agendamento', label: 'Novo Agendamento' },
          { href: '/cliente/perfil', label: 'Perfil' },
        ]
      default:
        return []
    }
  }

  const navigationLinks = getNavigationLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <span className="text-primary-900 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-black dark:text-white">
                StylloBarber
              </span>
            </Link>
          </div>

          {/* Navegação Desktop */}
          {isAuthenticated && user && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Ações do usuário */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle temporariamente removido */}
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                {/* Menu do usuário */}
                <Modal>
                  <ModalTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.nome}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-accent-500 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary-900" />
                        </div>
                      )}
                      <span className="hidden sm:block text-sm font-medium">
                        {user.nome}
                      </span>
                    </Button>
                  </ModalTrigger>
                  <ModalContent className="sm:max-w-[300px]">
                    <ModalHeader>
                      <ModalTitle>Minha Conta</ModalTitle>
                    </ModalHeader>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.nome}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-accent-500 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-900" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{user.nome}</p>
                          <p className="text-xs text-gray-500">{getRoleLabel(user.role)}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/perfil">
                            <Settings className="mr-2 h-4 w-4" />
                            Configurações
                          </Link>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={logout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </Button>
                      </div>
                    </div>
                  </ModalContent>
                </Modal>
              </div>
            ) : (
              showAuthButtons && (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button variant="primary" asChild>
                    <Link href="/cadastro">Cadastrar</Link>
                  </Button>
                </div>
              )
            )}

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && isAuthenticated && user && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}