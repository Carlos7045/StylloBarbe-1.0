'use client'

import { useEffect } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { useUser } from '@/domains/auth'
import { useBooking } from '../../hooks/useBooking'
import { useClientBooking } from '../../hooks/useClientBooking'
import { BarbershopSelector } from './BarbershopSelector'
import { ServiceSelector } from './ServiceSelector'
import { BarberSelector } from './BarberSelector'
import { TimeSlotPicker } from './TimeSlotPicker'
import { BookingConfirmation } from './BookingConfirmation'
import { DadosCliente } from '../../types/booking'

interface BookingFlowProps {
  onVoltar?: () => void
  onProximaEtapa?: () => void
  onAgendamentoConcluido?: (agendamentoId: string) => void
}

export function BookingFlow({ onVoltar, onProximaEtapa, onAgendamentoConcluido }: BookingFlowProps) {
  const { user } = useUser()
  
  // Usar hook específico para clientes ou hook geral para outros usuários
  const isClient = user?.role === 'cliente'
  const clientBooking = useClientBooking()
  const generalBooking = useBooking()
  
  const booking = isClient ? clientBooking : generalBooking
  
  const {
    selecao,
    barbearias,
    servicos,
    barbeiros,
    loadingBarbearias,
    loadingServicos,
    loadingBarbeiros,
    erro,
    selecionarBarbearia,
    selecionarServico,
    selecionarBarbeiro,
    selecionarDataHora,
    voltarEtapa,
    carregarBarbearias,
    carregarServicos,
    carregarBarbeiros,
    obterEtapaAtual,
    podeAvancar,
  } = booking

  const etapaAtual = obterEtapaAtual()

  // Carregar barbearias na inicialização
  useEffect(() => {
    if (barbearias.length === 0) {
      carregarBarbearias()
    }
  }, [barbearias.length, carregarBarbearias])

  // Carregar serviços quando barbearia for selecionada
  useEffect(() => {
    if (selecao.barbearia && servicos.length === 0) {
      carregarServicos(selecao.barbearia.id)
    }
  }, [selecao.barbearia, servicos.length, carregarServicos])

  // Carregar barbeiros quando serviço for selecionado
  useEffect(() => {
    if (selecao.barbearia && selecao.servico && barbeiros.length === 0) {
      carregarBarbeiros(selecao.barbearia.id, selecao.servico.id)
    }
  }, [selecao.barbearia, selecao.servico, barbeiros.length, carregarBarbeiros])

  const handleSelecionarBarbearia = (barbearia: typeof selecao.barbearia) => {
    selecionarBarbearia(barbearia!)
  }

  const handleSelecionarServico = (servico: typeof selecao.servico) => {
    selecionarServico(servico!)
  }

  const handleSelecionarBarbeiro = (barbeiro: typeof selecao.barbeiro) => {
    selecionarBarbeiro(barbeiro!)
  }

  const handleConfirmarAgendamento = async (dadosCliente: DadosCliente, observacoes?: string, notificacoes?: string[]) => {
    try {
      // Simular criação do agendamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Em produção, aqui faria a chamada para a API
      const agendamentoId = 'agendamento-' + Date.now()
      
      console.log('Agendamento criado:', {
        agendamentoId,
        selecao,
        dadosCliente,
        observacoes,
        notificacoes
      })
      
      onAgendamentoConcluido?.(agendamentoId)
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      throw error
    }
  }

  const handleVoltarEtapa = () => {
    if (etapaAtual === 'barbearia') {
      onVoltar?.()
    } else {
      voltarEtapa()
    }
  }

  const renderEtapaAtual = () => {
    switch (etapaAtual) {
      case 'barbearia':
        return (
          <BarbershopSelector
            barbearias={barbearias}
            barbeariaSelecionada={selecao.barbearia}
            loading={loadingBarbearias}
            onSelecionarBarbearia={handleSelecionarBarbearia}
            onFiltrar={carregarBarbearias}
          />
        )

      case 'servico':
        return (
          <ServiceSelector
            servicos={servicos}
            servicoSelecionado={selecao.servico}
            loading={loadingServicos}
            onSelecionarServico={handleSelecionarServico}
            onFiltrar={(filtros) => carregarServicos(selecao.barbearia!.id, filtros)}
          />
        )

      case 'barbeiro':
        return (
          <BarberSelector
            barbeiros={barbeiros}
            barbeiroSelecionado={selecao.barbeiro}
            loading={loadingBarbeiros}
            onSelecionarBarbeiro={handleSelecionarBarbeiro}
            onFiltrar={(filtros) => carregarBarbeiros(
              selecao.barbearia!.id,
              selecao.servico!.id,
              filtros
            )}
          />
        )

      case 'horario':
        return (
          <TimeSlotPicker
            barbeiroSelecionado={selecao.barbeiro!}
            servicoSelecionado={selecao.servico!}
            dataHoraSelecionada={selecao.dataHora}
            onSelecionarDataHora={selecionarDataHora}
          />
        )

      case 'confirmacao':
        return (
          <BookingConfirmation
            selecao={selecao}
            onConfirmar={handleConfirmarAgendamento}
            onVoltar={voltarEtapa}
            usuarioLogado={user ? {
              nome: user.nome,
              email: user.email,
              telefone: user.telefone || ''
            } : undefined}
          />
        )

      default:
        return null
    }
  }

  const obterTituloEtapa = () => {
    switch (etapaAtual) {
      case 'barbearia':
        return 'Escolha uma Barbearia'
      case 'servico':
        return 'Escolha um Serviço'
      case 'barbeiro':
        return 'Escolha um Barbeiro'
      case 'horario':
        return 'Escolha Data e Horário'
      case 'confirmacao':
        return 'Confirmar Agendamento'
      default:
        return 'Agendamento'
    }
  }

  const obterNumeroEtapa = () => {
    switch (etapaAtual) {
      case 'barbearia':
        return 1
      case 'servico':
        return 2
      case 'barbeiro':
        return 3
      case 'horario':
        return 4
      case 'confirmacao':
        return 5
      default:
        return 1
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header com navegação */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleVoltarEtapa}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">
                Etapa {obterNumeroEtapa()} de 5
              </div>
              <h1 className="text-2xl font-bold text-white">
                {obterTituloEtapa()}
              </h1>
            </div>

            <div className="w-20"> {/* Espaçador para centralizar o título */}
            </div>
          </div>

          {/* Indicador de progresso */}
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= obterNumeroEtapa()
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <ChevronRight
                    className={`h-4 w-4 mx-1 ${
                      step < obterNumeroEtapa()
                        ? 'text-yellow-500'
                        : 'text-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Resumo da seleção atual */}
        {(selecao.barbearia || selecao.servico) && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Resumo da Seleção
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {selecao.barbearia && (
                <div>
                  <span className="text-gray-400">Barbearia:</span>
                  <p className="text-white font-medium">{selecao.barbearia.nome}</p>
                </div>
              )}
              {selecao.servico && (
                <div>
                  <span className="text-gray-400">Serviço:</span>
                  <p className="text-white font-medium">{selecao.servico.nome}</p>
                  <p className="text-green-400">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(selecao.servico.preco)}
                  </p>
                </div>
              )}
              {selecao.barbeiro && (
                <div>
                  <span className="text-gray-400">Barbeiro:</span>
                  <p className="text-white font-medium">
                    {selecao.barbeiro === 'qualquer' 
                      ? 'Qualquer barbeiro disponível'
                      : selecao.barbeiro.nome
                    }
                  </p>
                </div>
              )}
              {selecao.dataHora && (
                <div>
                  <span className="text-gray-400">Data e Horário:</span>
                  <p className="text-white font-medium">
                    {selecao.dataHora.toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short'
                    })} às {selecao.dataHora.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">{erro}</p>
          </div>
        )}

        {/* Etapa atual */}
        {renderEtapaAtual()}


      </div>
    </div>
  )
}