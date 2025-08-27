'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookingFlow } from '@/domains/appointments/components/booking'
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'

export default function AgendamentoPage() {
  const router = useRouter()
  const [agendamentoConcluido, setAgendamentoConcluido] = useState<string | null>(null)

  const handleVoltar = () => {
    // Navegar de volta para a página anterior
    window.history.back()
  }

  const handleAgendamentoConcluido = (agendamentoId: string) => {
    setAgendamentoConcluido(agendamentoId)
  }

  const handleVoltarDashboard = () => {
    router.push('/cliente')
  }

  const handleNovoAgendamento = () => {
    setAgendamentoConcluido(null)
  }

  if (agendamentoConcluido) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Agendamento Confirmado!
            </h1>
            
            <p className="text-gray-400 mb-6">
              Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por e-mail em breve.
            </p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-1">Número do agendamento</p>
              <p className="text-white font-mono font-semibold">
                #{agendamentoConcluido.slice(-8).toUpperCase()}
              </p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleVoltarDashboard}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Ver Meus Agendamentos
              </Button>
              
              <Button
                onClick={handleNovoAgendamento}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Fazer Novo Agendamento
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <BookingFlow
      onVoltar={handleVoltar}
      onAgendamentoConcluido={handleAgendamentoConcluido}
    />
  )
}