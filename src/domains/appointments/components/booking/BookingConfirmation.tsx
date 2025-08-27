'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Scissors, 
  DollarSign, 
  Phone, 
  Mail, 
  MessageSquare,
  Bell,
  CreditCard,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { SelecaoAgendamento, DadosCliente } from '../../types/booking'

interface BookingConfirmationProps {
  selecao: SelecaoAgendamento
  onConfirmar: (dadosCliente: DadosCliente, observacoes?: string, notificacoes?: string[]) => Promise<void>
  onVoltar: () => void
  loading?: boolean
  usuarioLogado?: {
    nome: string
    email: string
    telefone: string
  }
}

export function BookingConfirmation({
  selecao,
  onConfirmar,
  onVoltar,
  loading = false,
  usuarioLogado
}: BookingConfirmationProps) {
  const [dadosCliente, setDadosCliente] = useState<DadosCliente>({
    nome: usuarioLogado?.nome || '',
    telefone: usuarioLogado?.telefone || '',
    email: usuarioLogado?.email || '',
    cpf: ''
  })
  
  const [observacoes, setObservacoes] = useState('')
  const [notificacoes, setNotificacoes] = useState<string[]>(['email'])
  const [confirmando, setConfirmando] = useState(false)

  const valorTotal = selecao.servico?.preco || 0
  const tempoEstimado = selecao.servico?.duracao || 0

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const formatarDuracao = (duracao: number) => {
    if (duracao < 60) {
      return `${duracao} min`
    }
    const horas = Math.floor(duracao / 60)
    const minutos = duracao % 60
    return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`
  }

  const formatarDataHora = (dataHora: Date) => {
    return {
      data: dataHora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      hora: dataHora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const calcularHorarioFim = (dataInicio: Date, duracao: number) => {
    const dataFim = new Date(dataInicio.getTime() + duracao * 60000)
    return dataFim.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleToggleNotificacao = (tipo: string) => {
    setNotificacoes(prev => 
      prev.includes(tipo)
        ? prev.filter(n => n !== tipo)
        : [...prev, tipo]
    )
  }

  const handleConfirmar = async () => {
    setConfirmando(true)
    try {
      await onConfirmar(dadosCliente, observacoes, notificacoes)
    } finally {
      setConfirmando(false)
    }
  }

  const isFormValido = dadosCliente.nome && dadosCliente.telefone

  if (!selecao.barbearia || !selecao.servico || !selecao.barbeiro || !selecao.dataHora) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Informações incompletas para confirmação</p>
      </div>
    )
  }

  const { data, hora } = formatarDataHora(selecao.dataHora)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Confirmar Agendamento
        </h2>
        <p className="text-gray-400">
          Revise os detalhes e confirme seu agendamento
        </p>
      </div>

      {/* Resumo do agendamento */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
          Resumo do Agendamento
        </h3>

        <div className="space-y-4">
          {/* Barbearia */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-white font-medium">{selecao.barbearia.nome}</p>
              <p className="text-gray-400 text-sm">{selecao.barbearia.endereco}</p>
              <p className="text-gray-400 text-sm">{selecao.barbearia.telefone}</p>
            </div>
          </div>

          {/* Serviço */}
          <div className="flex items-start space-x-3">
            <Scissors className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">{selecao.servico.nome}</p>
                  <p className="text-gray-400 text-sm">{selecao.servico.descricao}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">{formatarPreco(selecao.servico.preco)}</p>
                  <p className="text-gray-400 text-sm">{formatarDuracao(selecao.servico.duracao)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barbeiro */}
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-white font-medium">
                {selecao.barbeiro === 'qualquer' 
                  ? 'Qualquer barbeiro disponível'
                  : selecao.barbeiro.nome
                }
              </p>
              {selecao.barbeiro !== 'qualquer' && selecao.barbeiro.especialidades && (
                <p className="text-gray-400 text-sm">
                  {selecao.barbeiro.especialidades.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Data e Horário */}
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-white font-medium capitalize">{data}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {hora} - {calcularHorarioFim(selecao.dataHora, tempoEstimado)}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  ({formatarDuracao(tempoEstimado)})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-700 mt-6 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-green-400">
              {formatarPreco(valorTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Dados do cliente */}
      {!usuarioLogado && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-yellow-500" />
            Seus Dados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome completo"
              value={dadosCliente.nome}
              onChange={(e) => setDadosCliente(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Seu nome completo"
              required
            />

            <Input
              label="Telefone"
              value={dadosCliente.telefone}
              onChange={(e) => setDadosCliente(prev => ({ ...prev, telefone: e.target.value }))}
              placeholder="(11) 99999-9999"
              mask="phone"
              required
            />

            <Input
              label="E-mail"
              type="email"
              value={dadosCliente.email}
              onChange={(e) => setDadosCliente(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
            />

            <Input
              label="CPF (opcional)"
              value={dadosCliente.cpf}
              onChange={(e) => setDadosCliente(prev => ({ ...prev, cpf: e.target.value }))}
              placeholder="000.000.000-00"
              mask="cpf"
            />
          </div>
        </div>
      )}

      {/* Observações */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-yellow-500" />
          Observações (Opcional)
        </h3>

        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Alguma preferência ou observação especial?"
          className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Notificações */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-yellow-500" />
          Notificações
        </h3>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificacoes.includes('email')}
              onChange={() => handleToggleNotificacao('email')}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
            />
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-white">Receber confirmação por e-mail</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificacoes.includes('sms')}
              onChange={() => handleToggleNotificacao('sms')}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
            />
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-white">Receber lembrete por SMS</span>
            </div>
          </label>
        </div>
      </div>

      {/* Forma de pagamento */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-yellow-500" />
          Forma de Pagamento
        </h3>

        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
          <p className="text-blue-400 font-medium mb-1">
            Pagamento no local
          </p>
          <p className="text-gray-300 text-sm">
            O pagamento será realizado diretamente na barbearia. 
            Aceitamos dinheiro, PIX e cartão.
          </p>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onVoltar}
          disabled={confirmando}
          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Voltar
        </Button>

        <Button
          onClick={handleConfirmar}
          disabled={!isFormValido || confirmando}
          loading={confirmando}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
        >
          {confirmando ? 'Confirmando...' : 'Confirmar Agendamento'}
        </Button>
      </div>

      {/* Termos */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Ao confirmar, você concorda com nossos{' '}
          <a href="#" className="text-yellow-500 hover:underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-yellow-500 hover:underline">
            política de privacidade
          </a>
        </p>
      </div>
    </div>
  )
}