'use client'

import { useState, useEffect } from 'react'
import { X, Save, User, Mail, Phone, Clock, Tag } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { 
  CriarFuncionarioData, 
  AtualizarFuncionarioData, 
  Especialidade,
  TipoFuncionario,
  HorarioTrabalho
} from '../../types/staff'
import { StaffService } from '../../services/staff.service'

interface StaffFormProps {
  funcionarioId?: string | null
  especialidades: Especialidade[]
  onSalvar: (data: CriarFuncionarioData | AtualizarFuncionarioData) => Promise<any>
  onCancelar: () => void
}

const diasSemana = [
  { valor: 1, nome: 'Segunda-feira' },
  { valor: 2, nome: 'Terça-feira' },
  { valor: 3, nome: 'Quarta-feira' },
  { valor: 4, nome: 'Quinta-feira' },
  { valor: 5, nome: 'Sexta-feira' },
  { valor: 6, nome: 'Sábado' },
  { valor: 0, nome: 'Domingo' }
]

export function StaffForm({ 
  funcionarioId, 
  especialidades, 
  onSalvar, 
  onCancelar 
}: StaffFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dados do formulário
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [tipo, setTipo] = useState<TipoFuncionario>('barbeiro')
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<string[]>([])
  const [horarios, setHorarios] = useState<Omit<HorarioTrabalho, 'ativo'>[]>([])
  const [observacoes, setObservacoes] = useState('')

  // Carregar dados do funcionário se estiver editando
  useEffect(() => {
    if (funcionarioId) {
      carregarFuncionario()
    } else {
      // Horários padrão para novo funcionário
      setHorarios([
        { diaSemana: 1, horaInicio: '08:00', horaFim: '18:00' },
        { diaSemana: 2, horaInicio: '08:00', horaFim: '18:00' },
        { diaSemana: 3, horaInicio: '08:00', horaFim: '18:00' },
        { diaSemana: 4, horaInicio: '08:00', horaFim: '18:00' },
        { diaSemana: 5, horaInicio: '08:00', horaFim: '18:00' },
        { diaSemana: 6, horaInicio: '08:00', horaFim: '16:00' }
      ])
    }
  }, [funcionarioId])

  const carregarFuncionario = async () => {
    if (!funcionarioId) return
    
    try {
      setLoading(true)
      const funcionario = await StaffService.obterFuncionario(funcionarioId)
      
      if (funcionario) {
        setNome(funcionario.nome)
        setEmail(funcionario.email)
        setTelefone(funcionario.telefone)
        setTipo(funcionario.tipo)
        setEspecialidadesSelecionadas(funcionario.especialidades.map(e => e.id))
        setHorarios(funcionario.horarios.map(h => ({
          diaSemana: h.diaSemana,
          horaInicio: h.horaInicio,
          horaFim: h.horaFim
        })))
        setObservacoes(funcionario.observacoes || '')
      }
    } catch (err) {
      setError('Erro ao carregar dados do funcionário')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      setError('Preencha todos os campos obrigatórios')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        tipo,
        especialidades: especialidadesSelecionadas,
        horarios,
        observacoes: observacoes.trim() || undefined
      }

      await onSalvar(data)
      onCancelar()
    } catch (err) {
      setError('Erro ao salvar funcionário')
    } finally {
      setLoading(false)
    }
  }

  const toggleEspecialidade = (especialidadeId: string) => {
    setEspecialidadesSelecionadas(prev => 
      prev.includes(especialidadeId)
        ? prev.filter(id => id !== especialidadeId)
        : [...prev, especialidadeId]
    )
  }

  const atualizarHorario = (index: number, campo: 'horaInicio' | 'horaFim', valor: string) => {
    setHorarios(prev => prev.map((h, i) => 
      i === index ? { ...h, [campo]: valor } : h
    ))
  }

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 11) {
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return telefone
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-secondary rounded-lg border border-theme-primary w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-theme-primary flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-theme-primary">
              {funcionarioId ? 'Editar Funcionário' : 'Novo Funcionário'}
            </h2>
          </div>
          <Button
            variant="ghost"
            onClick={onCancelar}
            className="text-theme-tertiary hover:text-theme-primary"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <User className="h-5 w-5 text-yellow-500" />
              <span>Informações Básicas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Funcionário *
                </label>
                <Select
                  value={tipo}
                  onChange={(value) => setTipo(value as TipoFuncionario)}
                  required
                >
                  <option value="barbeiro">Barbeiro</option>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="admin_barbearia">Admin</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone *
                </label>
                <Input
                  value={telefone}
                  onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>
          </div>

          {/* Especialidades (apenas para barbeiros) */}
          {tipo === 'barbeiro' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
                <Tag className="h-5 w-5 text-yellow-500" />
                <span>Especialidades</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {especialidades.map((esp) => (
                  <label
                    key={esp.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={especialidadesSelecionadas.includes(esp.id)}
                      onChange={() => toggleEspecialidade(esp.id)}
                      className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-300">{esp.nome}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Horários de Trabalho */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Horários de Trabalho</span>
            </h3>

            <div className="space-y-3">
              {diasSemana.map((dia, index) => {
                const horario = horarios.find(h => h.diaSemana === dia.valor)
                const horarioIndex = horarios.findIndex(h => h.diaSemana === dia.valor)
                
                return (
                  <div key={dia.valor} className="flex items-center space-x-4">
                    <div className="w-32">
                      <span className="text-sm text-gray-300">{dia.nome}</span>
                    </div>
                    
                    {horario && (
                      <>
                        <Input
                          type="time"
                          value={horario.horaInicio}
                          onChange={(e) => atualizarHorario(horarioIndex, 'horaInicio', e.target.value)}
                          className="w-32"
                        />
                        <span className="text-gray-400">até</span>
                        <Input
                          type="time"
                          value={horario.horaFim}
                          onChange={(e) => atualizarHorario(horarioIndex, 'horaFim', e.target.value)}
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary">
              Observações
            </h3>
            
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações adicionais sobre o funcionário..."
              rows={3}
              className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-theme-primary">
            <Button
              type="button"
              variant="outline"
              onClick={onCancelar}
              disabled={loading}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
            >
              {loading ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {funcionarioId ? 'Atualizar' : 'Criar'} Funcionário
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}