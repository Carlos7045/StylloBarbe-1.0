'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { BarbeiroBooking, ServicoBooking } from '../../types/booking'

interface TimeSlot {
  hora: string
  disponivel: boolean
  barbeiro?: BarbeiroBooking
  conflito?: string
}

interface TimeSlotPickerProps {
  barbeiroSelecionado: BarbeiroBooking | 'qualquer'
  servicoSelecionado: ServicoBooking
  dataHoraSelecionada?: Date
  onSelecionarDataHora: (dataHora: Date) => void
  loading?: boolean
}

export function TimeSlotPicker({
  barbeiroSelecionado,
  servicoSelecionado,
  dataHoraSelecionada,
  onSelecionarDataHora,
  loading = false
}: TimeSlotPickerProps) {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<TimeSlot[]>([])
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  // Gerar próximos 14 dias
  const gerarProximosDias = () => {
    const dias = []
    const hoje = new Date()
    
    for (let i = 0; i < 14; i++) {
      const data = new Date(hoje)
      data.setDate(hoje.getDate() + i)
      dias.push(data)
    }
    
    return dias
  }

  const proximosDias = gerarProximosDias()

  // Simular carregamento de horários disponíveis
  const carregarHorariosDisponiveis = async (data: Date) => {
    setCarregandoHorarios(true)
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const horarios: TimeSlot[] = []
    const horaInicio = 8 // 8h
    const horaFim = 18 // 18h
    const intervalo = 30 // 30 minutos
    
    for (let hora = horaInicio; hora < horaFim; hora++) {
      for (let minuto = 0; minuto < 60; minuto += intervalo) {
        const horaFormatada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`
        
        // Simular disponibilidade baseada em alguns critérios
        const agora = new Date()
        const dataHorario = new Date(data)
        dataHorario.setHours(hora, minuto, 0, 0)
        
        // Não permitir horários no passado
        const naoPassado = dataHorario > agora
        
        // Simular alguns horários ocupados (aleatório para demo)
        const ocupado = Math.random() < 0.3 // 30% de chance de estar ocupado
        
        // Horário de almoço (12h-13h)
        const horarioAlmoco = hora === 12
        
        const disponivel = naoPassado && !ocupado && !horarioAlmoco
        
        horarios.push({
          hora: horaFormatada,
          disponivel,
          conflito: horarioAlmoco ? 'Horário de almoço' : ocupado ? 'Horário ocupado' : undefined
        })
      }
    }
    
    setHorariosDisponiveis(horarios)
    setCarregandoHorarios(false)
  }

  // Carregar horários quando a data mudar
  useEffect(() => {
    carregarHorariosDisponiveis(dataSelecionada)
  }, [dataSelecionada, barbeiroSelecionado, servicoSelecionado])

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    })
  }

  const formatarDataCompleta = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleSelecionarHorario = (horario: TimeSlot) => {
    if (!horario.disponivel) return
    
    const [hora, minuto] = horario.hora.split(':').map(Number)
    const dataHora = new Date(dataSelecionada)
    dataHora.setHours(hora, minuto, 0, 0)
    
    onSelecionarDataHora(dataHora)
  }

  const isHorarioSelecionado = (horario: TimeSlot) => {
    if (!dataHoraSelecionada) return false
    
    const [hora, minuto] = horario.hora.split(':').map(Number)
    const dataHorario = new Date(dataSelecionada)
    dataHorario.setHours(hora, minuto, 0, 0)
    
    return dataHorario.getTime() === dataHoraSelecionada.getTime()
  }

  const calcularHorarioFim = (horarioInicio: string) => {
    const [hora, minuto] = horarioInicio.split(':').map(Number)
    const dataInicio = new Date()
    dataInicio.setHours(hora, minuto, 0, 0)
    
    const dataFim = new Date(dataInicio.getTime() + servicoSelecionado.duracao * 60000)
    
    return dataFim.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-600 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha Data e Horário
        </h2>
        <p className="text-gray-400">
          Selecione o melhor horário para seu {servicoSelecionado.nome.toLowerCase()}
        </p>
      </div>

      {/* Informações do serviço */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-white font-medium">Duração estimada</p>
              <p className="text-gray-400 text-sm">
                {servicoSelecionado.duracao} minutos
              </p>
            </div>
          </div>
          
          {barbeiroSelecionado !== 'qualquer' && (
            <div className="text-right">
              <p className="text-white font-medium">Barbeiro</p>
              <p className="text-gray-400 text-sm">
                {barbeiroSelecionado.nome}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Seletor de data */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
          Selecione a Data
        </h3>
        
        <div className="grid grid-cols-7 gap-2">
          {proximosDias.map((dia, index) => {
            const isSelected = dia.toDateString() === dataSelecionada.toDateString()
            const isToday = dia.toDateString() === new Date().toDateString()
            
            return (
              <button
                key={index}
                onClick={() => setDataSelecionada(dia)}
                className={`p-3 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-yellow-500 text-gray-900 font-semibold'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="text-xs mb-1">
                  {formatarData(dia).split(' ')[0]}
                </div>
                <div className="text-lg font-semibold">
                  {dia.getDate()}
                </div>
                <div className="text-xs">
                  {formatarData(dia).split(' ')[1]}
                </div>
                {isToday && (
                  <div className="text-xs mt-1 text-yellow-400">
                    Hoje
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Horários disponíveis */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Horários Disponíveis - {formatarDataCompleta(dataSelecionada)}
        </h3>
        
        {carregandoHorarios ? (
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {horariosDisponiveis.map((horario, index) => {
              const isSelected = isHorarioSelecionado(horario)
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelecionarHorario(horario)}
                  disabled={!horario.disponivel}
                  className={`p-3 rounded-lg text-center transition-all ${
                    isSelected
                      ? 'bg-yellow-500 text-gray-900 font-semibold'
                      : horario.disponivel
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-600 text-gray-500 cursor-not-allowed'
                  }`}
                  title={horario.conflito}
                >
                  <div className="font-medium">
                    {horario.hora}
                  </div>
                  {isSelected && (
                    <div className="text-xs mt-1">
                      até {calcularHorarioFim(horario.hora)}
                    </div>
                  )}
                  {!horario.disponivel && horario.conflito && (
                    <AlertCircle className="h-3 w-3 mx-auto mt-1" />
                  )}
                </button>
              )
            })}
          </div>
        )}
        
        {horariosDisponiveis.filter(h => h.disponivel).length === 0 && !carregandoHorarios && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Nenhum horário disponível nesta data
            </p>
            <p className="text-sm text-gray-500">
              Tente selecionar outra data
            </p>
          </div>
        )}
      </div>

      {/* Sugestões alternativas */}
      {dataHoraSelecionada && (
        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-400 font-medium mb-1">
                Horário selecionado
              </p>
              <p className="text-white">
                {dataHoraSelecionada.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: '2-digit',
                  month: 'long'
                })} às {dataHoraSelecionada.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                Duração: {servicoSelecionado.duracao} minutos
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botão de continuar */}
      {dataHoraSelecionada && (
        <div className="flex justify-center pt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8">
            Continuar para Confirmação
          </Button>
        </div>
      )}
    </div>
  )
}