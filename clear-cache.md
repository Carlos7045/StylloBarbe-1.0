# Como Limpar Cache e Service Workers

## Para resolver o erro 404 de /auth/login:

### 1. No Chrome/Edge:
1. Abra as DevTools (F12)
2. Vá para a aba "Application"
3. No menu lateral, clique em "Storage"
4. Clique em "Clear site data"
5. Marque todas as opções e clique "Clear site data"

### 2. Limpar Service Workers:
1. Nas DevTools, vá para "Application" > "Service Workers"
2. Se houver algum service worker registrado, clique em "Unregister"

### 3. Hard Refresh:
- Pressione Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

### 4. Modo Incógnito:
- Teste a aplicação em uma janela incógnita para verificar se o problema persiste

## Para resolver os ícones PWA:

Os ícones foram temporariamente substituídos por um SVG. Para uma solução completa:

1. Crie ícones PNG nos tamanhos: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
2. Coloque-os na pasta `/public/icons/`
3. Restaure o manifest.json original com as referências aos PNGs