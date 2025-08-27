'use client'

import { useState } from 'react'
import { Clock, Calendar, Settings, Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { useScheduleSettings } from '../../hooks/useScheduleSettings'
import { WorkingHours } from './WorkingHours'
import { WorkBreaks } from './WorkBreaks'
import { BookingSettings } from './BookingSettings'
import { TemporaryBlocks } from './TemporaryBlocks'
import { BlockForm } from './BlockForm'

interface ScheduleSettingsProps {
  barbeariaId: string
}

export function ScheduleSettings({ barbeariaId }: ScheduleSettingsProps) {
  const {
    configuracao,
    barbeiros,
    loading,
    error,
    atualizarHorariosFuncionamento,
    atualizarIntervalos,
    atualizarConfiguracaoAgendamento,
    criarBloqueio,
    atualizarBloqueio,
    excluirBloqueio
  } = useScheduleSettings(barbeariaId)

  const [activeTab, setActiveTab] = useState<'horarios' | 'intervalos' | 'configuracao' | 'bloqueios'>('horarios')
  const [mostrarFormularioBloqueio, setMostrarFormularioBloqueio] = useState(false)
  const [bloqueioEditando, setBloqueioEditando] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
          <div className="text-center">
            <p className="text-theme-secondary">
              Carregando configurações...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !configuracao) {
    return (
      <div className="space-y-8">
        <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
          <div className="text-center">
            <p className="text-red-500">
              {error || 'Erro ao carregar configurações'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'horarios', nome: 'Horários de Funcionamento', icone: Clock },
    { id: 'intervalos', nome: 'Intervalos', icone: Calendar },
    { id: 'configuracao', nome: 'Configurações', icone: Settings },
    { id: 'bloqueios', nome: 'Bloqueios Temporários', icone: Calendar }
  ]

  return (
    <div className="space-y-8">
      {/* Botão Novo Bloqueio - Aparece apenas na aba de bloqueios */}
      {activeTab === 'bloqueios' && (
        <div className="flex justify-end">
          <Button 
            onClick={() => setMostrarFormularioBloqueio(true)}
            className="btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Bloqueio
          </Button>
        </div>
      )}

      <div className="space-y-8">
        {/* Tabs */}
        <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icone = tab.icone
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'btn-primary'
                      : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary'
                  }`}
                >
                  <Icone className="h-4 w-4" />
                  <span>{tab.nome}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'horarios' && (
          <WorkingHours
            horarios={configuracao.horariosFuncionamento}
            onSalvar={atualizarHorariosFuncionamento}
          />
        )}

        {activeTab === 'intervalos' && (
          <WorkBreaks
            intervalos={configuracao.intervalos}
            onSalvar={atualizarIntervalos}
          />
        )}

        {activeTab === 'configuracao' && (
          <BookingSettings
            configuracao={configuracao.configuracaoAgendamento}
            onSalvar={atualizarConfiguracaoAgendamento}
          />
        )}

        {activeTab === 'bloqueios' && (
          <TemporaryBlocks
            bloqueios={configuracao.bloqueios}
            barbeiros={barbeiros}
            onEditar={(id) => {
              setBloqueioEditando(id)
              setMostrarFormularioBloqueio(true)
            }}
            onExcluir={excluirBloqueio}
          />
        )}
      </div>

      {/* Modal do Formulário de Bloqueio */}
      {mostrarFormularioBloqueio && (
        <BlockForm
          bloqueioId={bloqueioEditando}
          barbeiros={barbeiros}
          onSalvar={bloqueioEditando ? atualizarBloqueio : criarBloqueio}
          onCancelar={() => {
            setMostrarFormularioBloqueio(false)
            setBloqueioEditando(null)
          }}
        />
      )}
    </div>
  )
}