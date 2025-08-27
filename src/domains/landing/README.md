# Landing Page - Guia de Cores

## Importante: Separação de Cores

A landing page usa um sistema de cores **INDEPENDENTE** do sistema de temas do dashboard para evitar conflitos quando mudanças são feitas em um ou outro.

## Cores da Landing Page

### Backgrounds
- **Primário**: `bg-slate-900` - Fundo principal escuro
- **Secundário**: `bg-slate-800` - Fundo de seções alternativas  
- **Terciário**: `bg-slate-700` - Elementos de destaque
- **Cards**: `bg-gray-800` - Fundo de cards e elementos
- **Overlay**: `bg-black/20` - Sobreposições e headers

### Textos
- **Primário**: `text-white` - Títulos principais
- **Secundário**: `text-gray-300` - Subtítulos e textos importantes
- **Terciário**: `text-gray-400` - Textos de apoio e labels
- **Muted**: `text-gray-500` - Textos desabilitados
- **Accent**: `text-amber-400` - Textos de destaque

### Bordas
- **Primário**: `border-gray-700` - Bordas principais
- **Secundário**: `border-gray-600` - Bordas secundárias
- **Accent**: `border-amber-500/20` - Bordas de destaque
- **Hover**: `border-gray-400` - Estados de hover

### Cores de Destaque (Amarelo)
- **Primário**: `bg-amber-500` - Botões principais
- **Hover**: `bg-amber-600` - Estados de hover
- **Gradiente**: `from-amber-500 to-amber-600` - Gradientes
- **Texto**: `text-amber-400` - Texto amarelo
- **Texto sobre amarelo**: `text-slate-900` - Para contraste

## Sistema de Temas do Dashboard

O dashboard usa um sistema de temas dinâmico com variáveis CSS:
- `text-theme-primary`
- `bg-theme-secondary`
- `border-theme-primary`
- etc.

## Regras Importantes

1. **NUNCA** use classes `text-theme-*` na landing page
2. **SEMPRE** use cores específicas (`text-white`, `text-gray-300`, etc.)
3. **IMPORTE** as constantes de `./styles/colors.ts` quando possível
4. **TESTE** mudanças de tema no dashboard para garantir que não afetam a landing page

## Exemplo de Uso Correto

```tsx
// ✅ CORRETO - Landing Page
<h1 className="text-white font-bold">Título</h1>
<p className="text-gray-300">Subtítulo</p>

// ❌ ERRADO - Não usar no landing
<h1 className="text-theme-primary font-bold">Título</h1>
<p className="text-theme-secondary">Subtítulo</p>

// ✅ MELHOR - Usando constantes
import { landingClasses } from './styles/colors'
<h1 className={landingClasses.heroTitle}>Título</h1>
```

## Mockup do Dashboard na Landing

O mockup do dashboard na landing page deve usar cores fixas que representem o tema escuro do sistema, mas sem depender das variáveis CSS do tema:

```tsx
// ✅ CORRETO - Cores fixas para o mockup
<div className="bg-gray-800 border-gray-700">
  <span className="text-white">Dashboard</span>
</div>

// ❌ ERRADO - Variáveis de tema
<div className="bg-theme-secondary border-theme-primary">
  <span className="text-theme-primary">Dashboard</span>
</div>
```

Isso garante que o mockup sempre mostre o tema escuro, independente do tema atual do usuário.