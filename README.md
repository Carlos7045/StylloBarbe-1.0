# StylloBarber - Sistema de Agendamento para Barbearias

Sistema SaaS frontend para gestão completa de barbearias, desenvolvido com Next.js 15.4.4 e TypeScript.

## 🚀 Tecnologias

### Core
- **Next.js 15.4.4** - Framework React com App Router
- **TypeScript 5+** - Tipagem estática
- **Tailwind CSS 4** - Estilização utilitária
- **React 19.1.0** - Biblioteca de interface

### UI e Animações
- **Framer Motion 12+** - Animações fluidas
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

### Gerenciamento de Estado
- **Zustand 5+** - Estado global simples
- **React Hook Form 7+** - Formulários performáticos
- **Zod** - Validação de schemas
- **TanStack Query 5+** - Cache de dados do servidor

### Integrações
- **Recharts** - Gráficos e visualizações
- **API Asaas** - Processamento de pagamentos

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Rotas de autenticação
│   ├── (dashboard)/              # Dashboards por tipo de usuário
│   └── agendamento/              # Agendamento público
├── domains/                      # Domínios de negócio
│   ├── auth/                     # Autenticação
│   ├── appointments/             # Agendamentos
│   ├── users/                    # Usuários
│   ├── barbershops/              # Barbearias
│   ├── services/                 # Serviços
│   ├── payments/                 # Pagamentos
│   └── notifications/            # Notificações
└── shared/                       # Código compartilhado
    ├── components/               # Componentes reutilizáveis
    ├── hooks/                    # Hooks genéricos
    ├── services/                 # Services base
    ├── utils/                    # Utilitários
    ├── constants/                # Constantes
    └── types/                    # Tipos TypeScript
```

## 🎨 Design System

### Paleta de Cores
- **Primárias**: Tons escuros masculinos (#0f0f0f a #525252)
- **Acentos**: Dourado premium (#d4af37, #daa520, #ffd700)
- **Status**: Success, Warning, Error, Info

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Hierarquia**: H1, H2, H3, Body, Small

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build        # Build de produção
npm start           # Inicia servidor de produção

# Qualidade de Código
npm run lint        # Executa ESLint
npm run lint:fix    # Corrige problemas do ESLint
npm run format      # Formata código com Prettier
npm run type-check  # Verifica tipos TypeScript
```

## 🚦 Como Executar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Acessar aplicação**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📋 Tipos de Usuário

- **Admin SaaS**: Gestão da plataforma e assinaturas
- **Admin Barbearia**: Gestão completa da barbearia
- **Barbeiro**: Agenda pessoal e atendimentos
- **Cliente**: Agendamentos e histórico

## 🔧 Configurações

### ESLint
- Configuração Next.js + TypeScript
- Regras customizadas para qualidade de código

### Prettier
- Formatação consistente
- Single quotes, sem semicolons
- Tab width: 2 espaços

### TypeScript
- Strict mode habilitado
- Path mapping configurado (@/*)
- Tipos globais definidos

## 📦 Dependências Principais

```json
{
  "next": "15.4.4",
  "react": "19.1.0",
  "typescript": "^5",
  "framer-motion": "^12.0.0",
  "zustand": "^5.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^4.0.17",
  "@tanstack/react-query": "^5.0.0"
}
```

## 🎯 Próximos Passos

1. Implementar sistema de design e componentes base
2. Desenvolver landing page institucional
3. Criar sistema de autenticação
4. Implementar dashboards por tipo de usuário
5. Desenvolver módulo de agendamento
6. Integrar sistema de pagamentos Asaas

## 📄 Licença

Este projeto é propriedade privada da StylloBarber.