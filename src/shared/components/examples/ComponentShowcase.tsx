'use client'

import * as React from 'react'
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Loading,
  Skeleton,
  SkeletonCard,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '../ui'
import { Container, Section, Grid, GridItem } from '../layout'
import { useToast } from '../../hooks/useToast'
import { Mail, Phone, User } from 'lucide-react'

/**
 * Componente de demonstração dos componentes UI
 * Este arquivo serve como exemplo de como usar os componentes criados
 */
export function ComponentShowcase() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const handleToast = (variant: 'default' | 'success' | 'warning' | 'destructive') => {
    toast({
      title: 'Notificação de teste',
      description: `Esta é uma notificação do tipo ${variant}`,
      variant,
    })
  }

  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Section spacing="xl">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-h1 text-primary-800 dark:text-white mb-4">
              Componentes StylloBarber
            </h1>
            <p className="text-body-lg text-gray-600 dark:text-gray-400">
              Demonstração dos componentes UI e de layout do sistema
            </p>
          </div>

          {/* Botões */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Botões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="destructive">Destrutivo</Button>
                <Button variant="primary" loading={loading} onClick={handleLoading}>
                  {loading ? 'Carregando...' : 'Testar Loading'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={1} responsive={{ md: 2 }} gap="md">
                <Input
                  label="Nome completo"
                  placeholder="Digite seu nome"
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                />
                <Input
                  label="Telefone"
                  mask="phone"
                  placeholder="(11) 99999-9999"
                  leftIcon={<Phone className="h-4 w-4" />}
                />
                <Input
                  label="CPF"
                  mask="cpf"
                  placeholder="000.000.000-00"
                />
              </Grid>
            </CardContent>
          </Card>

          {/* Toasts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Notificações (Toast)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => handleToast('default')}>
                  Toast Padrão
                </Button>
                <Button onClick={() => handleToast('success')}>
                  Toast Sucesso
                </Button>
                <Button onClick={() => handleToast('warning')}>
                  Toast Aviso
                </Button>
                <Button onClick={() => handleToast('destructive')}>
                  Toast Erro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading e Skeleton */}
          <Grid cols={1} responsive={{ md: 2 }} gap="lg">
            <Card>
              <CardHeader>
                <CardTitle>Loading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Loading size="sm" text="Pequeno" />
                <Loading size="md" text="Médio" />
                <Loading size="lg" text="Grande" />
                <Loading size="xl" text="Extra Grande" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="mt-6">
                  <SkeletonCard />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Modal */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Modal</CardTitle>
            </CardHeader>
            <CardContent>
              <Modal>
                <ModalTrigger asChild>
                  <Button>Abrir Modal</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Exemplo de Modal</ModalTitle>
                    <ModalDescription>
                      Este é um exemplo de como usar o componente Modal.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Conteúdo do modal aqui. Você pode adicionar formulários,
                      informações ou qualquer outro conteúdo.
                    </p>
                  </div>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>

          {/* Grid System */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Sistema de Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={1} responsive={{ sm: 2, md: 3, lg: 4 }} gap="md">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-accent-100 dark:bg-accent-900/20 p-4 rounded-lg text-center"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </div>
  )
}