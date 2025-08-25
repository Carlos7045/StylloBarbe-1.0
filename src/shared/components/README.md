# Componentes StylloBarber

Este diretório contém todos os componentes reutilizáveis do sistema StylloBarber, organizados por categoria.

## Estrutura

```
src/shared/components/
├── ui/                 # Componentes UI fundamentais
├── layout/            # Componentes de layout
├── forms/             # Componentes de formulário
├── calendar/          # Componentes de calendário
├── charts/            # Componentes de gráficos
├── providers/         # Providers e contextos
└── examples/          # Exemplos de uso
```

## Componentes UI Fundamentais

### Button
Componente de botão com múltiplas variantes e estados.

```tsx
import { Button } from '@/shared/components/ui'

<Button variant="primary" size="md" loading={false}>
  Clique aqui
</Button>
```

**Variantes:** `primary`, `secondary`, `outline`, `ghost`, `accent`, `destructive`
**Tamanhos:** `sm`, `md`, `lg`, `icon`

### Input
Componente de input com validação, máscaras e ícones.

```tsx
import { Input } from '@/shared/components/ui'

<Input
  label="Telefone"
  mask="phone"
  placeholder="(11) 99999-9999"
  leftIcon={<Phone className="h-4 w-4" />}
  error="Campo obrigatório"
/>
```

**Máscaras disponíveis:** `phone`, `cpf`, `cep`

### Card
Componente de cartão para organizar conteúdo.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui'

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo do card aqui
  </CardContent>
</Card>
```

### Modal
Componente de modal baseado em Radix UI.

```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle } from '@/shared/components/ui'

<Modal>
  <ModalTrigger asChild>
    <Button>Abrir Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Título do Modal</ModalTitle>
    </ModalHeader>
    <p>Conteúdo do modal</p>
  </ModalContent>
</Modal>
```

### Toast
Sistema de notificações toast.

```tsx
import { useToast } from '@/shared/hooks/useToast'

const { toast } = useToast()

toast({
  title: "Sucesso!",
  description: "Operação realizada com sucesso",
  variant: "success"
})
```

**Variantes:** `default`, `success`, `warning`, `destructive`

### Loading
Componentes de loading e skeleton.

```tsx
import { Loading, LoadingScreen, Skeleton, SkeletonCard } from '@/shared/components/ui'

<Loading size="md" text="Carregando..." />
<LoadingScreen text="Processando..." />
<Skeleton className="h-4 w-full" />
<SkeletonCard />
```

## Componentes de Layout

### Container e Section
Componentes para estruturar o layout da página.

```tsx
import { Container, Section } from '@/shared/components/layout'

<Section spacing="lg" background="gray">
  <Container size="lg" padding="md">
    Conteúdo da seção
  </Container>
</Section>
```

### Grid
Sistema de grid responsivo.

```tsx
import { Grid, GridItem } from '@/shared/components/layout'

<Grid cols={1} responsive={{ md: 2, lg: 3 }} gap="md">
  <GridItem span={2}>Item que ocupa 2 colunas</GridItem>
  <GridItem>Item normal</GridItem>
</Grid>
```

### Header, Sidebar e Footer
Componentes de navegação e estrutura.

```tsx
import { Header, Sidebar, Footer } from '@/shared/components/layout'

<Header user={user} onLogout={handleLogout} />
<Sidebar userRole="admin_barbearia" />
<Footer variant="minimal" />
```

### MainLayout
Layout principal que combina todos os componentes.

```tsx
import { MainLayout, DashboardLayout, PublicLayout } from '@/shared/components/layout'

// Layout com sidebar para usuários logados
<MainLayout user={user} onLogout={handleLogout}>
  <div>Conteúdo da página</div>
</MainLayout>

// Layout específico para dashboards
<DashboardLayout 
  user={user} 
  title="Dashboard" 
  description="Visão geral do sistema"
  actions={<Button>Nova ação</Button>}
>
  <div>Conteúdo do dashboard</div>
</DashboardLayout>

// Layout para páginas públicas
<PublicLayout showHeader={true} showFooter={true}>
  <div>Conteúdo público</div>
</PublicLayout>
```

## Providers

### ThemeProvider
Provider para gerenciamento de tema claro/escuro.

```tsx
import { ThemeProvider, useTheme } from '@/shared/components/providers'

// No layout raiz
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Em qualquer componente
const { theme, setTheme, toggleTheme, isDark } = useTheme()
```

## Sistema de Cores e Tipografia

### Cores
O sistema usa uma paleta de cores masculina premium:

- **Primárias:** Tons de cinza escuro (#0f0f0f a #f8f8f8)
- **Accent:** Tons dourados (#d4af37, #daa520, #ffd700)
- **Status:** Verde (sucesso), Amarelo (aviso), Vermelho (erro), Azul (info)

### Tipografia
Hierarquia tipográfica usando a fonte Inter:

```css
.text-display  /* 60px, weight 900 */
.text-h1       /* 48px, weight 800 */
.text-h2       /* 36px, weight 700 */
.text-h3       /* 30px, weight 600 */
.text-h4       /* 24px, weight 600 */
.text-h5       /* 20px, weight 500 */
.text-h6       /* 18px, weight 500 */
.text-body-lg  /* 18px, weight 400 */
.text-body     /* 16px, weight 400 */
.text-body-sm  /* 14px, weight 400 */
.text-caption  /* 12px, weight 400 */
```

## Utilitários

### cn (className utility)
Função para combinar classes CSS com Tailwind.

```tsx
import { cn } from '@/shared/utils/cn'

<div className={cn('base-class', condition && 'conditional-class', className)} />
```

### Máscaras
Utilitários para aplicar máscaras em inputs.

```tsx
import { phoneMask, cpfMask, cepMask } from '@/shared/utils/masks'

const maskedPhone = phoneMask('11999999999') // (11) 99999-9999
```

## Exemplo Completo

Veja o arquivo `examples/ComponentShowcase.tsx` para um exemplo completo de como usar todos os componentes.

## Acessibilidade

Todos os componentes seguem as diretrizes WCAG 2.1 AA:

- Suporte completo a navegação por teclado
- ARIA labels e roles adequados
- Contraste mínimo de 4.5:1
- Indicadores visuais de foco
- Semântica HTML apropriada

## Responsividade

O sistema é mobile-first e totalmente responsivo:

- **sm:** 640px+
- **md:** 768px+
- **lg:** 1024px+
- **xl:** 1280px+
- **2xl:** 1536px+