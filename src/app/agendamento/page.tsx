'use client'

import { useBooking } from '@/domains/appointments/hooks/useBooking'
import { BarbershopSelector } from '@/domains/appointments/components/BarbershopSelector'
import { ServiceSelector } from '@/domains/appointments/components/ServiceSelector'
import { BarberSelector } from '@/domains/appointments/components/BarberSelector'
import { Button } from '@/shared/components/ui/Button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function AgendamentoPage() {
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
    voltarEtapa,
    carregarBarbearias,
    carregarServicos,
    carregarBarbeiros,
    obterEtapaAtual,
    podeAvancar,
    obterResumo
  } = useBooking()

  const etapaAtual = obterEtapaAtual()
  const resumo = obterResumo()

  const renderizarEtapa = () => {
    switch (etapaAtual) {
      case 'barbearia':
        return (
          <BarbershopSelector
            barbearias={barbearias}
            loading={loadingBarbearias}
            onSelect={selecionarBarbearia}
            onLoadBarbearias={carregarBarbearias}
            selectedBarbearia={selecao.barbearia}
          />
        )
      
      case 'servico':
        return selecao.barbearia ? (
          <ServiceSelector
            barbearia={selecao.barbearia}
            servicos={servicos}
            loading={loadingServicos}
            onSelect={selecionarServico}
            onLoadServicos={carregarServicos}
            selectedServico={selecao.servico}
          />
        ) : null
      
      case 'barbeiro':
        return selecao.barbearia && selecao.servico ? (
          <BarberSelector
            barbearia={selecao.barbearia}
            servico={selecao.servico}
            barbeiros={barbeiros}
            loading={loadingBarbeiros}
            onSelect={selecionarBarbeiro}
            onLoadBarbeiros={carregarBarbeiros}
            selectedBarbeiro={selecao.barbeiro}
          />
        ) : null
      
      case 'horario':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Seleção de Horário
            </h2>
            <p className="text-gray-400 mb-8">
              Esta funcionalidade será implementada na próxima tarefa
            </p>
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Resumo da Seleção</h3>
              <div className="space-y-2 text-left">
                {resumo.itens.map((item, index) => (
                  <p key={index} className="text-gray-300">{item}</p>
                ))}
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-yellow-500 font-semibold">
                    Total: R$ {resumo.valorTotal.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Duração: {resumo.tempoEstimado} minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const obterTituloEtapa = () => {
    switch (etapaAtual) {
      case 'barbearia': return 'Escolha a Barbearia'
      case 'servico': return 'Escolha o Serviço'
      case 'barbeiro': return 'Escolha o Barbeiro'
      case 'horario': return 'Escolha o Horário'
      case 'confirmacao': return 'Confirmação'
      default: return 'Agendamento'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Novo Agendamento
              </h1>
              <p className="text-gray-400">
                {obterTituloEtapa()}
              </p>
            </div>
            
            {/* Indicador de Progresso */}
            <div className="flex items-center space-x-2">
              {['barbearia', 'servico', 'barbeiro', 'horario'].map((etapa, index) => (
                <div key={etapa} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    etapa === etapaAtual 
                      ? 'bg-yellow-500 text-gray-900'
                      : index < ['barbearia', 'servico', 'barbeiro', 'horario'].indexOf(etapaAtual)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      index < ['barbearia', 'servico', 'barbeiro', 'horario'].indexOf(etapaAtual)
                        ? 'bg-green-500'
                        : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {erro && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400">{erro}</p>
          </div>
        )}

        {renderizarEtapa()}

        {/* Navegação */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
          <Button
            onClick={voltarEtapa}
            variant="outline"
            disabled={etapaAtual === 'barbearia'}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Etapa {['barbearia', 'servico', 'barbeiro', 'horario'].indexOf(etapaAtual) + 1} de 4
            </p>
          </div>

          <Button
            disabled={!podeAvancar() || etapaAtual === 'horario'}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
          >
            {etapaAtual === 'horario' ? 'Continuar' : 'Próximo'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
