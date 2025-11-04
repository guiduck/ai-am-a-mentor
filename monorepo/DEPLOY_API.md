# 🚀 Deploy API - Render Backend + Database

## O Que Você Precisa

Deploy da API Fastify no Render com PostgreSQL como banco de dados.

---

## 1. Criar PostgreSQL Database no Render

### Passo 1: Criar Database

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `ai-am-a-mentor-db`
   - **Database:** `ai_am_a_mentor`
   - **User:** `ai_am_a_mentor_user`
   - **Region:** `Oregon (US West)` (ou mais próxima)
4. Clique em **"Create Database"**

### Passo 2: Obter Connection String

1. Após criação, vá em **"Info"** da sua database
2. Copie a **"External Database URL"** (algo como):
   ```
   postgresql://ai_am_a_mentor_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/ai_am_a_mentor
   ```

---

## 2. Deploy da API no Render

### Passo 1: Preparar o Repositório

1. Faça push do seu código para GitHub
2. Certifique-se que o `apps/api` está na raiz ou acessível
3. **IMPORTANTE:** Crie o arquivo `.env.production` no `apps/api/` com as variáveis de produção:

```bash
# apps/api/.env.production
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
PORT=10000
NODE_ENV="production"
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_ACCESS_KEY_ID="your-r2-access-key-id"
CLOUDFLARE_SECRET_ACCESS_KEY="your-r2-secret-access-key"
CLOUDFLARE_BUCKET_NAME="ai-am-a-mentor"
CLOUDFLARE_R2_ENDPOINT="https://your-account-id.r2.cloudflarestorage.com"
OPENAI_API_KEY="sk-proj-your-openai-api-key-here"
```

### Passo 2: Criar Web Service

1. Render Dashboard → **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Configure:

#### Build & Deploy

- **Name:** `ai-am-a-mentor-api`
- **Environment:** `Node`
- **Root Directory:** `apps/api` (se o projeto estiver em monorepo)
- **Build Command:**

  ```bash
  # Se usar pnpm (recomendado para monorepo)
  npm install -g pnpm && pnpm install && pnpm run db:generate && pnpm run db:migrate:prod

  # OU se usar npm
  npm install && npm run db:generate && npm run db:migrate:prod
  ```

- **Start Command:**

  ```bash
  # Se usar pnpm
  pnpm run prod

  # OU se usar npm
  npm run prod
  ```

#### Environment Variables

Adicione estas variáveis em **"Environment"**:

```bash
# Database
DATABASE_URL=postgresql://ai_am_a_mentor_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/ai_am_a_mentor

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Server
PORT=10000
NODE_ENV=production

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_BUCKET_NAME=ai-am-a-mentor
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# OpenAI
OPENAI_API_KEY=sk-proj-your-openai-key
```

### Passo 3: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build e deploy (pode levar 5-10 minutos)

---

## 3. Configurar CORS para Produção

Após o deploy, você precisará atualizar o CORS no seu código:

```typescript
// apps/api/src/server.ts
fastify.register(require("@fastify/cors"), {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://seu-frontend.vercel.app", // Adicione sua URL de produção
    "https://seu-frontend.netlify.app", // Se usar Netlify
  ],
  credentials: true,
});
```

---

## 4. Testar a API

### Health Check

```bash
curl https://sua-api.onrender.com/health
```

### Teste de Database

```bash
curl https://sua-api.onrender.com/api/creators/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'
```

---

## 5. Atualizar Frontend

No seu frontend (Vercel/Netlify), adicione a variável:

```bash
NEXT_PUBLIC_API_BASE_URL=https://sua-api.onrender.com
```

---

## 6. Monitoramento

### Render Dashboard

- **Logs:** Acesse sua API → **"Logs"**
- **Metrics:** CPU, Memory, Response Time
- **Database:** Acesse sua PostgreSQL → **"Info"** para connection details

### Health Checks

- Render faz health checks automáticos
- Se a API não responder em 30s, Render reinicia o serviço

---

## 7. Troubleshooting

### Build Fails

```bash
# Verifique os logs no Render Dashboard
# Problemas comuns:
# - Variáveis de ambiente faltando
# - Dependências não instaladas
# - Erro no build do TypeScript
```

### Database Connection

```bash
# Teste a connection string localmente:
psql "postgresql://user:pass@host:port/db"
```

### CORS Issues

```bash
# Adicione sua URL de produção no CORS
# Verifique se credentials: true está habilitado
```

---

## 8. Otimizações para Produção

### Dockerfile Otimizado (Opcional)

Se quiser usar Docker, otimize o `apps/api/Dockerfile`:

```dockerfile
# Use a Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --prod

# Copy source code
COPY . .

# Generate migrations and build
RUN pnpm run db:generate

# Expose port
EXPOSE 10000

# Start the application
CMD ["pnpm", "run", "prod"]
```

### Performance Tips

- **Database Indexes:** Adicione índices nas colunas mais consultadas
- **Connection Pooling:** Configure pool de conexões no Drizzle
- **Caching:** Considere Redis para cache de sessões

## 9. Próximos Passos

1. **SSL:** Render fornece SSL automático
2. **Custom Domain:** Configure se necessário
3. **Scaling:** Render escala automaticamente
4. **Backups:** PostgreSQL no Render tem backup automático
5. **Monitoring:** Configure alertas no Render Dashboard

---

## ✅ Pronto!

Sua API estará rodando em:

- **API:** `https://sua-api.onrender.com`
- **Database:** PostgreSQL gerenciado no Render
- **Health Check:** `https://sua-api.onrender.com/health`

Agora você pode conectar seu frontend à API de produção!
