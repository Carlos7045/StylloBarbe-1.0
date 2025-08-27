// Hook para gerenciar dados do dashboard do cliente

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clienteDashboardService } from '../services/cliente-dashboard.service'
import { 
  PerfilCliente, 
  AgendamentoCliente, 
  BarbeiroFavorito, 
  ServicoFavorito, 
  MetricasCliente,
  NotificacaoCliente 
} from '../types/cliente-dashboard'

export function useCliente(clienteId: string) {
  const queryClient = useQueryClient()

  // Query para buscar perfil
  const {
    data: perfil,
    isLoading: carregandoPerfil,
    error: erroPerfil
  } = useQuery({
    queryKey: ['cliente', 'perfil', clienteId],
    queryFn: () => clienteDashboardService.buscarPerfil(clienteId),
    enabled: !!clienteId
  })

  // Query para buscar agendamentos
  const {
    data: agendamentos = [],
    isLoading: carregandoAgendamentos,
    error: erroAgendamentos
  } = useQuery({
    queryKey: ['cliente', 'agendamentos', clienteId],
    queryFn: () => clienteDashboardService.buscarAgendamentos(clienteId),
    enabled: !!clienteId
  })

  // Query para buscar barbeiros favoritos
  const {
    data: barbeirosFavoritos = [],
    isLoading: carregandoBarbeirosFavoritos
  } = useQuery({
    queryKey: ['cliente', 'barbeiros-favoritos', clienteId],
    queryFn: () => clienteDashboardService.buscarBarbeirosFavoritos(clienteId),
    enabled: !!clienteId
  })

  // Query para buscar serviços favoritos
  const {
    data: servicosFavoritos = [],
    isLoading: carregandoServicosFavoritos
  } = useQuery({
    queryKey: ['cliente', 'servicos-favoritos', clienteId],
    queryFn: () => clienteDashboardService.buscarServicosFavoritos(clienteId),
    enabled: !!clienteId
  })

  // Query para buscar métricas
  const {
    data: metricas,
    isLoading: carregandoMetricas
  } = useQuery({
    queryKey: ['cliente', 'metricas', clienteId],
    queryFn: () => clienteDashboardService.buscarMetricas(clienteId),
    enabled: !!clienteId
  })

  // Query para buscar notificações
  const {
    data: notificacoes = [],
    isLoading: carregandoNotificacoes
  } = useQuery({
    queryKey: ['cliente', 'notificacoes', clienteId],
    queryFn: () => clienteDashboardService.buscarNotificacoes(clienteId),
    enabled: !!clienteId
  })

  // Mutation para atualizar perfil
  const mutationAtualizarPerfil = useMutation({
    mutationFn: (dados: Partial<PerfilCliente>) => 
      clienteDashboardService.atualizarPerfil(clienteId, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cliente', 'perfil', clienteId] })
    }
  })

  // Mutation para reagendar agendamento
  const mutationReagendar = useMutation({
    mutationFn: ({ agendamentoId, novaDataHora }: { agendamentoId: string, novaDataHora: Date }) =>
      clienteDashboardService.reagendarAgendamento(agendamentoId, novaDataHora),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cliente', 'agendamentos', clienteId] })
    }
  })

  // Mutation para cancelar agendamento
  const mutationCancelar = useMutation({
    mutationFn: ({ agendamentoId, motivo }: { agendamentoId: string, motivo?: string }) =>
      clienteDashboardService.cancelarAgendamento(agendamentoId, motivo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cliente', 'agendamentos', clienteId] })
    }
  })

  // Mutation para gerenciar barbeiros favoritos
  const mutationBarbeiroFavorito = useMutation({
    mutationFn: ({ barbeiroId, acao }: { barbeiroId: string, acao: 'adicionar' | 'remover' }) => {
      if (acao === 'adicionar') {
        return clienteDashboardService.adicionarBarbeiroFavorito(clienteId, barbeiroId)
      } else {
        return clienteDashboardService.removerBarbeiroFavorito(clienteId, barbeiroId)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cliente', 'barbeiros-favoritos', clienteId] })
    }
  })

  // Mutation para gerenciar serviços favoritos
  const mutationServicoFavorito = useMutation({
    mutationFn: ({ servicoId, acao }: { servicoId: string, acao: 'adicionar' | 'remover' }) => {
      if (acao === 'adicionar') {
        return clienteDashboardService.adicionarServicoFavorito(clienteId, servicoId)
      } else {
        return clienteDashboardService.removerServicoFavorito(clienteId, servicoId)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cliente', 'servicos-favoritos', clienteId] })
    }
  })

  // Separar agendamentos por status
  const agendamentosFuturos = agendamentos.filter(a => 
    a.status === 'agendado' || a.status === 'confirmado'
  )
  
  const historicoAgendamentos = agendamentos.filter(a => 
    a.status === 'concluido' || a.status === 'cancelado'
  )

  const proximoAgendamento = agendamentosFuturos
    .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime())[0]

  // Funções de ação
  const atualizarPerfil = (dados: Partial<PerfilCliente>) => {
    mutationAtualizarPerfil.mutate(dados)
  }

  const reagendarAgendamento = (agendamentoId: string, novaDataHora: Date) => {
    mutationReagendar.mutate({ agendamentoId, novaDataHora })
  }

  const cancelarAgendamento = (agendamentoId: string, motivo?: string) => {
    mutationCancelar.mutate({ agendamentoId, motivo })
  }

  const toggleBarbeiroFavorito = (barbeiroId: string) => {
    const jaEFavorito = barbeirosFavoritos.some(b => b.id === barbeiroId)
    const acao = jaEFavorito ? 'remover' : 'adicionar'
    mutationBarbeiroFavorito.mutate({ barbeiroId, acao })
  }

  const toggleServicoFavorito = (servicoId: string) => {
    const jaEFavorito = servicosFavoritos.some(s => s.id === servicoId)
    const acao = jaEFavorito ? 'remover' : 'adicionar'
    mutationServicoFavorito.mutate({ servicoId, acao })
  }

  return {
    // Dados
    perfil,
    agendamentos,
    agendamentosFuturos,
    historicoAgendamentos,
    proximoAgendamento,
    barbeirosFavoritos,
    servicosFavoritos,
    metricas,
    notificacoes,

    // Estados de carregamento
    carregandoPerfil,
    carregandoAgendamentos,
    carregandoBarbeirosFavoritos,
    carregandoServicosFavoritos,
    carregandoMetricas,
    carregandoNotificacoes,

    // Estados de loading das mutations
    atualizandoPerfil: mutationAtualizarPerfil.isPending,
    reagendando: mutationReagendar.isPending,
    cancelando: mutationCancelar.isPending,
    alterandoBarbeiroFavorito: mutationBarbeiroFavorito.isPending,
    alterandoServicoFavorito: mutationServicoFavorito.isPending,

    // Erros
    erroPerfil,
    erroAgendamentos,

    // Ações
    atualizarPerfil,
    reagendarAgendamento,
    cancelarAgendamento,
    toggleBarbeiroFavorito,
    toggleServicoFavorito
  }
}