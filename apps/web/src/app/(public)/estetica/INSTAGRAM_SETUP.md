# 📸 Guia de Integração com Instagram

Este guia explica como conectar o Instagram real na landing page de estética.

## 🎯 O que você precisa

### Informações Básicas (Obrigatórias)

1. **Username do Instagram**
   - Formato: `@seu_usuario`
   - Exemplo: `@clinicaestetica`
   - Onde configurar: `components/InstagramFeed.tsx` linha 7

### Para Integração Automática (Opcional mas Recomendado)

2. **Access Token da API do Instagram**
3. **User ID ou Business Account ID**

---

## 🔧 Métodos de Integração

### 📱 Método 1: Integração Manual (Atual - Simples)

**Vantagens**: Fácil, sem APIs, funciona imediatamente  
**Desvantagens**: Precisa atualizar manualmente

**Como fazer:**

1. Salve suas melhores fotos do Instagram
2. Coloque em `/apps/web/public/instagram/`
3. Atualize o array em `components/InstagramFeed.tsx`:

```tsx
const posts = [
  {
    id: 1,
    image: "/instagram/post1.jpg",
    likes: 234,
    comments: 12,
    caption: "Resultado incrível de harmonização! ✨",
  },
  // Adicione mais posts...
];
```

---

### 🚀 Método 2: Instagram Basic Display API (Recomendado)

**Vantagens**: Oficial, gratuito, atualiza automaticamente  
**Desvantagens**: Requer configuração no Facebook Developers

#### Passo 1: Criar App no Facebook

1. Acesse: https://developers.facebook.com/
2. Clique em "Meus Apps" → "Criar App"
3. Escolha tipo: "Consumidor"
4. Preencha nome do app
5. Adicione produto: "Instagram Basic Display"

#### Passo 2: Configurar App

1. Em "Basic Display" → "User Token Generator"
2. Adicione sua conta do Instagram
3. Copie o "User Token" gerado

#### Passo 3: Obter Access Token de Longa Duração

```bash
curl -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={CLIENT_SECRET}
  &access_token={SHORT_LIVED_TOKEN}"
```

#### Passo 4: Implementar na Aplicação

**Informações necessárias:**

- ✅ Access Token
- ✅ User ID (fornecido junto com o token)

**Implementação:**

1. Crie arquivo `.env.local` na raiz de `/apps/web/`:

```env
INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
INSTAGRAM_USER_ID=seu_user_id_aqui
```

2. Crie API Route em `/apps/web/src/app/api/instagram/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${accessToken}`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
```

3. Atualize `components/InstagramFeed.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

export function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setPosts(data.data.slice(0, 6)); // Pega os 6 primeiros
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading Instagram:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando posts do Instagram...</div>;
  }

  return (
    <section className="instagram-section">
      {/* ... resto do componente */}
      <div className="instagram-grid">
        {posts.map((post: any) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-post"
          >
            {post.media_type === "VIDEO" ? (
              <img
                src={post.thumbnail_url || post.media_url}
                alt={post.caption}
              />
            ) : (
              <img src={post.media_url} alt={post.caption} />
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
```

---

### 💼 Método 3: Instagram Graph API (Para Contas Business)

**Vantagens**: Mais recursos, analytics  
**Desvantagens**: Requer conta Business conectada a uma Página do Facebook

#### Requisitos:

1. Converter conta Instagram para Business ou Creator
2. Conectar a uma Página do Facebook
3. Criar app no Facebook Developers
4. Obter permissões: `instagram_basic`, `pages_show_list`

**Informações necessárias:**

- ✅ Page Access Token
- ✅ Instagram Business Account ID
- ✅ Facebook Page ID

#### Endpoint da API:

```
GET https://graph.facebook.com/v18.0/{instagram-business-account-id}/media
  ?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp
  &access_token={access-token}
```

---

### 🎁 Método 4: Serviços de Terceiros (Mais Fácil)

Serviços que fazem toda a integração por você:

#### EmbedSocial (https://embedsocial.com/)

- ✅ Fácil de usar
- ✅ Widget pronto
- ✅ Atualização automática
- ❌ Pago (a partir de $29/mês)

**Como usar:**

1. Crie conta no EmbedSocial
2. Conecte seu Instagram
3. Copie código de embed
4. Cole no componente

#### Juicer (https://www.juicer.io/)

- ✅ Plano gratuito disponível
- ✅ Suporta múltiplas redes sociais
- ✅ Customizável

#### Instafeed.js (https://instafeedjs.com/)

- ✅ Biblioteca JavaScript
- ✅ Open source
- ❌ Requer Access Token

---

### 📱 Método 5: Instagram oEmbed API (Limitado)

Para posts públicos específicos:

```javascript
fetch(
  `https://graph.facebook.com/v18.0/instagram_oembed?url=${postUrl}&access_token=${token}`
);
```

**Limitações:**

- Só funciona para posts individuais
- Não lista posts automaticamente
- Requer token de app

---

## 🎯 Método Recomendado por Cenário

### Para começar rápido (hoje mesmo):

➡️ **Método 1 - Integração Manual**

- Configure em 5 minutos
- Use fotos já publicadas
- Perfeito para MVP/teste

### Para solução profissional:

➡️ **Método 2 - Instagram Basic Display API**

- Gratuito
- Oficial do Instagram
- Atualização automática

### Para clínicas/negócios estabelecidos:

➡️ **Método 4 - Serviços de Terceiros**

- Sem dor de cabeça técnica
- Suporte profissional
- Analytics inclusos

---

## 📋 Checklist de Configuração

### Configuração Básica (5 minutos)

- [ ] Adicionar @ do Instagram no código
- [ ] Verificar se @ está correto e público
- [ ] Testar link para o Instagram

### Integração Manual (15 minutos)

- [ ] Selecionar 6 melhores posts
- [ ] Baixar imagens (alta qualidade)
- [ ] Salvar em `/public/instagram/`
- [ ] Atualizar array de posts
- [ ] Testar galeria

### Integração com API (1-2 horas)

- [ ] Criar app no Facebook Developers
- [ ] Configurar Instagram Basic Display
- [ ] Obter Access Token
- [ ] Criar arquivo .env.local
- [ ] Criar API Route
- [ ] Atualizar componente
- [ ] Testar integração
- [ ] Verificar atualização automática

---

## 🔒 Segurança

### Proteção do Access Token

**NUNCA** exponha seu token no código front-end!

✅ **Correto:**

```typescript
// API Route (server-side)
const token = process.env.INSTAGRAM_ACCESS_TOKEN;
```

❌ **Errado:**

```typescript
// Componente React (client-side)
const token = "seu_token_aqui"; // NUNCA FAÇA ISSO!
```

### Renovação de Tokens

- Tokens de curta duração: 1 hora
- Tokens de longa duração: 60 dias
- Configure renovação automática antes de expirar

---

## 🆘 Problemas Comuns

### "Invalid Access Token"

**Solução:** Token expirou, gere um novo token de longa duração

### "Instagram User Not Found"

**Solução:** Verifique se o User ID está correto e a conta é pública

### "Rate Limit Exceeded"

**Solução:** Instagram limita requisições. Implemente cache:

```typescript
// Cache por 1 hora
const CACHE_TIME = 3600000; // 1 hora em ms
let cachedPosts = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  if (cachedPosts && now - lastFetch < CACHE_TIME) {
    return NextResponse.json(cachedPosts);
  }

  // Buscar novos posts...
  lastFetch = now;
  cachedPosts = data;

  return NextResponse.json(data);
}
```

### CORS Errors

**Solução:** Use API Routes do Next.js (server-side) em vez de fetch direto no client

---

## 📚 Links Úteis

- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [Facebook Developers Console](https://developers.facebook.com/)
- [Instafeed.js Documentation](https://instafeedjs.com/)

---

## 💡 Próximos Passos

1. Escolha o método de integração adequado para você
2. Siga o guia passo a passo
3. Teste em ambiente de desenvolvimento
4. Configure em produção
5. Monitore e ajuste conforme necessário

---

## 🎨 Personalização

Após integrar, você pode personalizar:

- Número de posts exibidos (atualmente 6)
- Layout da grade (atualmente 3 colunas)
- Filtros de posts (por hashtag, data, etc.)
- Adicionar overlay com informações
- Lightbox para visualização ampliada

---

**Dúvidas?** Consulte a documentação oficial do Instagram ou entre em contato com suporte técnico.
