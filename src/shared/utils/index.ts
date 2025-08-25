// Funções utilitárias

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Função para combinar classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatação de moeda brasileira
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

// Formatação de data brasileira
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

// Formatação de telefone brasileiro
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

// Validação de CPF
export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')

  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }

  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0

  return remainder === parseInt(cleaned.charAt(10))
}
