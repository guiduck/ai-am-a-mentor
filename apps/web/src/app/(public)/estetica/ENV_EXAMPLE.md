# 🔐 Variáveis de Ambiente

Para integração automática com Instagram, crie um arquivo `.env.local` na raiz de `/apps/web/`:

## Arquivo: `/apps/web/.env.local`

```bash
# ========================================
# Instagram API Configuration
# ========================================
# Obtenha estas informações seguindo o guia em:
# /apps/web/src/app/(public)/estetica/INSTAGRAM_SETUP.md

# Access Token do Instagram Basic Display API
INSTAGRAM_ACCESS_TOKEN=your_access_token_here

# Instagram User ID
INSTAGRAM_USER_ID=your_user_id_here

# ========================================
# Analytics (Opcional)
# ========================================

# Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Facebook Pixel
# NEXT_PUBLIC_FB_PIXEL_ID=123456789012345

# Google Tag Manager
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## ⚠️ IMPORTANTE

- Nunca commite o arquivo `.env.local` no Git
- Use valores reais apenas em produção
- Para desenvolvimento, pode manter os valores mockados
- O arquivo `.env.local` já está no `.gitignore` por padrão

## 🔧 Como Usar

1. Crie o arquivo `.env.local` na raiz de `/apps/web/`
2. Copie o conteúdo acima
3. Substitua os valores `your_*_here` pelos valores reais
4. Reinicie o servidor de desenvolvimento

```bash
npm run dev
```

## 📖 Onde Obter os Valores

### INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID

Siga o guia completo em: `INSTAGRAM_SETUP.md`

Resumo:

1. Acesse: https://developers.facebook.com/
2. Crie um app do tipo "Consumidor"
3. Adicione o produto "Instagram Basic Display"
4. Gere um token de usuário
5. Troque por token de longa duração (60 dias)

### Google Analytics ID

1. Acesse: https://analytics.google.com/
2. Crie uma propriedade
3. Copie o ID (formato: G-XXXXXXXXXX)

### Facebook Pixel ID

1. Acesse: https://business.facebook.com/
2. Vá em "Eventos > Pixels"
3. Crie ou copie o ID do pixel existente

## 🚀 Deploy em Produção

### Vercel

No painel da Vercel:

1. Vá em Settings > Environment Variables
2. Adicione cada variável individualmente
3. Faça redeploy

### Outras Plataformas

Consulte a documentação específica da sua plataforma de hospedagem sobre como adicionar variáveis de ambiente.
