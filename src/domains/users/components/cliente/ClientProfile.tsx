'use client'

import { useState } from 'react'
import { User, Phone, Mail, MapPin, Calendar, Edit2, Save, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { PerfilCliente } from '../../types/cliente-dashboard'

interface ClientProfileProps {
  perfil: PerfilCliente
  onUpdateProfile: (perfil: Partial<PerfilCliente>) => void
}

export function ClientProfile({ perfil, onUpdateProfile }: ClientProfileProps) {
  const [editando, setEditando] = useState(false)
  const [perfilEditado, setPerfilEditado] = useState(perfil)

  const handleSave = () => {
    onUpdateProfile(perfilEditado)
    setEditando(false)
  }

  const handleCancel = () => {
    setPerfilEditado(perfil)
    setEditando(false)
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-theme-primary">
              Meu Perfil
            </h2>
          </div>
          {!editando ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditando(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {perfil.avatar ? (
              <img
                src={perfil.avatar}
                alt={perfil.nome}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-theme-tertiary flex items-center justify-center">
                <User className="h-12 w-12 text-theme-muted" />
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Nome Completo
                </label>
                {editando ? (
                  <input
                    type="text"
                    value={perfilEditado.nome}
                    onChange={(e) => setPerfilEditado({ ...perfilEditado, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-theme-muted" />
                    <span className="text-theme-primary">{perfil.nome}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Email
                </label>
                {editando ? (
                  <input
                    type="email"
                    value={perfilEditado.email}
                    onChange={(e) => setPerfilEditado({ ...perfilEditado, email: e.target.value })}
                    className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-theme-muted" />
                    <span className="text-theme-primary">{perfil.email}</span>
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Telefone
                </label>
                {editando ? (
                  <input
                    type="tel"
                    value={perfilEditado.telefone}
                    onChange={(e) => setPerfilEditado({ ...perfilEditado, telefone: e.target.value })}
                    className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-theme-muted" />
                    <span className="text-theme-primary">{perfil.telefone}</span>
                  </div>
                )}
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Data de Nascimento
                </label>
                {editando ? (
                  <input
                    type="date"
                    value={perfilEditado.dataNascimento?.toISOString().split('T')[0] || ''}
                    onChange={(e) => setPerfilEditado({ 
                      ...perfilEditado, 
                      dataNascimento: e.target.value ? new Date(e.target.value) : undefined 
                    })}
                    className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-theme-muted" />
                    <span className="text-theme-primary">
                      {perfil.dataNascimento?.toLocaleDateString('pt-BR') || 'Não informado'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Endereço */}
            {(editando || perfil.endereco) && (
              <div className="pt-4 border-t border-theme-primary">
                <h3 className="text-lg font-medium text-theme-primary mb-3">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-1">
                      CEP
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfilEditado.endereco?.cep || ''}
                        onChange={(e) => setPerfilEditado({ 
                          ...perfilEditado, 
                          endereco: { ...perfilEditado.endereco!, cep: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-theme-primary">{perfil.endereco?.cep || 'Não informado'}</span>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-theme-secondary mb-1">
                      Rua
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfilEditado.endereco?.rua || ''}
                        onChange={(e) => setPerfilEditado({ 
                          ...perfilEditado, 
                          endereco: { ...perfilEditado.endereco!, rua: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-theme-primary">{perfil.endereco?.rua || 'Não informado'}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-1">
                      Cidade
                    </label>
                    {editando ? (
                      <input
                        type="text"
                        value={perfilEditado.endereco?.cidade || ''}
                        onChange={(e) => setPerfilEditado({ 
                          ...perfilEditado, 
                          endereco: { ...perfilEditado.endereco!, cidade: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-theme-muted" />
                        <span className="text-theme-primary">
                          {perfil.endereco ? `${perfil.endereco.cidade}, ${perfil.endereco.estado}` : 'Não informado'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Informações da conta */}
            <div className="pt-4 border-t border-theme-primary">
              <h3 className="text-lg font-medium text-theme-primary mb-3">Informações da Conta</h3>
              <div className="text-sm text-theme-secondary">
                <p>Cliente desde: {perfil.criadoEm.toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}