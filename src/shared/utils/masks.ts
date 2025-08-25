/**
 * Utilitários para máscaras de input
 */

/**
 * Aplica máscara de telefone brasileiro
 * Formato: (11) 99999-9999
 */
export function phoneMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  }
  
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

/**
 * Aplica máscara de CPF
 * Formato: 999.999.999-99
 */
export function cpfMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
}

/**
 * Remove todos os caracteres não numéricos
 */
export function removeNonNumbers(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Aplica máscara de CEP
 * Formato: 99999-999
 */
export function cepMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers.replace(/(\d{5})(\d{0,3})/, '$1-$2')
}