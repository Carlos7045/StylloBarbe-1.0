import { useCallback, useEffect } from 'react'
import { useUser } from '@/domains/auth'
import { useBooking } from './useBooking'
import { FiltrosBarbearia } from '../types/booking'

/**
 * Hook específico para clientes que automaticamente filtra
 * barbearias pela rede/admin correto baseado no cliente logado
 */
export function useClientBooking() {
  const { user } = useUser()
  const booking = useBooking()

  // Determinar a rede do cliente baseado no seu perfil
  // Em um cenário real, isso viria do backend baseado no histórico do cliente
  // ou seria configurado durante o cadastro
  const obterRedeCliente = useCallback(() => {
    if (!user) return null
    
    // Por enquanto, vamos usar uma lógica simples:
    // - Se o cliente tem barbeariaId, usar o adminId dessa barbearia
    // - Caso contrário, usar uma rede padrão baseada no domínio do email ou região
    
    if (user.barbeariaId) {
      // Cliente já tem uma barbearia associada
      return {
        adminId: 'admin-styllo-1', // Em produção, buscar do backend
        redeId: 'rede-styllo'
      }
    }
    
    // Lógica para determinar rede baseada no email ou outros critérios
    // Por exemplo, clientes com email @empresa.com vão para rede corporativa
    if (user.email.includes('styllo') || user.email.includes('premium')) {
      return {
        adminId: 'admin-styllo-1',
        redeId: 'rede-styllo'
      }
    }
    
    // Rede padrão (primeira rede disponível)
    return {
      adminId: 'admin-styllo-1',
      redeId: 'rede-styllo'
    }
  }, [user])

  // Carregar barbearias da rede do cliente
  const carregarBarbeariasDaRede = useCallback(async (filtrosAdicionais?: Omit<FiltrosBarbearia, 'redeId' | 'adminId'>) => {
    const redeInfo = obterRedeCliente()
    if (!redeInfo) {
      console.error('Usuário não autenticado ou sem rede associada')
      return
    }

    const filtros: FiltrosBarbearia = {
      ...filtrosAdicionais,
      redeId: redeInfo.redeId,
      adminId: redeInfo.adminId
    }

    await booking.carregarBarbearias(filtros)
  }, [booking, obterRedeCliente])

  // Carregar barbearias automaticamente quando o usuário estiver disponível
  useEffect(() => {
    if (user && booking.barbearias.length === 0) {
      carregarBarbeariasDaRede()
    }
  }, [user, booking.barbearias.length, carregarBarbeariasDaRede])

  return {
    ...booking,
    carregarBarbearias: carregarBarbeariasDaRede,
    redeInfo: obterRedeCliente()
  }
}