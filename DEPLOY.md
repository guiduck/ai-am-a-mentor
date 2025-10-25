# 🚀 Deploy - Configuração API

## O Que Você Precisa

Configurar a variável `NEXT_PUBLIC_API_BASE_URL` para apontar para sua API em produção.

---

## Desenvolvimento (.env.local)

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## Produção (Vercel/Netlify)

### Vercel

1. Dashboard → Seu projeto
2. **Settings** → **Environment Variables**
3. Adicionar:
   - **Name:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** `https://sua-api.onrender.com` (ou sua URL do Render)
4. **Redeploy**

### Netlify

1. Site settings
2. **Environment variables**
3. Add a variable:
   - **Key:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** `https://sua-api.onrender.com`
4. **Redeploy**

---

## Pronto! ✅

Seu `/apps/web/src/lib/api.ts` já usa essa variável:

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
```

Funciona automaticamente em dev e prod.
