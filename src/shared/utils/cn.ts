import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilitário para combinar classes CSS com Tailwind CSS
 * Combina clsx e tailwind-merge para resolver conflitos de classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}