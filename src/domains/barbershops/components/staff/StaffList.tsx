'use client'

import { useState } from 'react'
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  User, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { LoadingSpinner } from '@/shared/components/ui/Loading'
import { Funcionario, StatusFuncionario } from '../../types/staff'

interface StaffListProps {
  funcionarios: Funcionario[]
  loading: boolean
  error: string | null
  onEditar: (id: string) => void
  onAlterarStatus: (id: string, status: StatusFuncionario) => Promise<void>
  onExcluir: (id: string) => Promise<void>
}

export function StaffList({
  funcionarios,
  loading,
  error,
  onEditar,
  onAlterarStatus,
  onExcluir
}: StaffListProps) {
  const [menuAberto, setMenuAberto] = useState<string | null>(null)
  const [processando, setProcessando] = useState<string | null>(null)

  const handleAlterarStatus = async (id: string, status: StatusFuncionario) => {
    try {
      setProcessando(id)
      await onAlterarStatus(id, status)
      setMenuAberto(null)
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    } finally {
      setProcessando(null)
    }
  }

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        setProcessando(id)
        await onExcluir(id)
        setMenuAberto(null)
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
      } finally {
        setProcessando(null)
      }
    }
  }

  const getStatusIcon = (status: StatusFuncionario) => {
    switch (status) {
      case 'ativo':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'inativo':
        return <XCircle className="h-4 w-4 text-red-400" />
      case 'suspenso':
        return <Pause className="h-4 w-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: StatusFuncionario) => {
    switch (status) {
      case 'ativo':
        return 'text-green-400 bg-green-500/20'
      case 'inativo':
        return 'text-red-400 bg-red-500/20'
      case 'suspenso':
        return 'text-yellow-400 bg-yellow-500/20'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'barbeiro':
        return 'Barbeiro'
      case 'recepcionista':
        return 'Recepcionista'
      case 'admin_barbearia':
        return 'Admin'
      default:
        return tipo
    }
  }

  const formatarHorarios = (funcionario: Funcionario) => {
    const horariosAtivos = funcionario.horarios.filter(h => h.ativo)
    if (horariosAtivos.length === 0) return 'Sem horários definidos'
    
    const primeiro = horariosAtivos[0]
    return `${primeiro.horaInicio} - ${primeiro.horaFim}`
  }

  if (loading) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  if (funcionarios.length === 0) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="text-center">
          <User className="h-12 w-12 text-theme-muted mx-auto mb-4" />
          <p className="text-theme-tertiary mb-4">
            Nenhum funcionário encontrado
          </p>
          <p className="text-sm text-theme-muted">
            Adicione funcionários para começar a gerenciar sua equipe
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      {/* Header */}
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center space-x-3">
          <User className="h-6 w-6 text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-theme-primary">
              Funcionários
            </h2>
            <p className="text-sm text-theme-secondary mt-1">
              {funcionarios.length} funcionário(s) encontrado(s)
            </p>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="p-6 space-y-4">
        {funcionarios.map((funcionario) => (
          <div
            key={funcionario.id}
            className="border border-theme-secondary rounded-lg p-4 hover:border-theme-hover transition-colors bg-theme-tertiary"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Avatar */}
                <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                  {funcionario.avatar ? (
                    <img 
                      src={funcionario.avatar} 
                      alt={funcionario.nome}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-theme-tertiary" />
                  )}
                </div>

                {/* Informações */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-theme-primary">
                      {funcionario.nome}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(funcionario.status)}`}>
                      {funcionario.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {getTipoLabel(funcionario.tipo)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-theme-secondary">
                      <Mail className="h-4 w-4 text-theme-tertiary" />
                      <span>{funcionario.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-theme-secondary">
                      <Phone className="h-4 w-4 text-theme-tertiary" />
                      <span>{funcionario.telefone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-theme-secondary">
                      <Clock className="h-4 w-4 text-theme-tertiary" />
                      <span>{formatarHorarios(funcionario)}</span>
                    </div>
                  </div>

                  {/* Especialidades */}
                  {funcionario.especialidades.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {funcionario.especialidades.map((esp) => (
                          <span
                            key={esp.id}
                            className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                          >
                            {esp.nome}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMenuAberto(menuAberto === funcionario.id ? null : funcionario.id)}
                  disabled={processando === funcionario.id}
                  className="text-theme-tertiary hover:text-theme-primary"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>

                {/* Menu de ações */}
                {menuAberto === funcionario.id && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-theme-secondary border border-theme-primary rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => onEditar(funcionario.id)}
                        className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                      </button>

                      {funcionario.status === 'ativo' ? (
                        <button
                          onClick={() => handleAlterarStatus(funcionario.id, 'inativo')}
                          className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Desativar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAlterarStatus(funcionario.id, 'ativo')}
                          className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Ativar</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleExcluir(funcionario.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-theme-hover flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}