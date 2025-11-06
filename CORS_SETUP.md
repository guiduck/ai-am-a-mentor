# 🔒 Configuração de CORS no Cloudflare R2

Este guia explica como configurar CORS no Cloudflare R2 para permitir que o frontend acesse vídeos diretamente via presigned URLs.

## Por que precisamos de CORS?

Quando o frontend tenta carregar um vídeo diretamente do Cloudflare R2 usando presigned URLs, o navegador verifica se o R2 permite requisições cross-origin. Sem a configuração de CORS adequada, o navegador bloqueará as requisições.

## Passo a Passo

### 1. Acesse o Cloudflare Dashboard

1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navegue até **R2** no menu lateral
3. Selecione seu bucket (provavelmente `ai-am-a-mentor`)

### 2. Configure CORS no Bucket

1. No bucket, vá para **Settings** (Configurações)
2. Procure por **CORS Policy** ou **CORS Configuration**
3. Clique em **Edit** ou **Configure CORS**

### 3. Adicione a Política CORS

Adicione a seguinte configuração JSON:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://seu-dominio-producao.com"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "Content-Length",
      "Content-Range",
      "Content-Type",
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

**Importante:**
- Substitua `https://seu-dominio-producao.com` pelo domínio do seu frontend em produção
- Adicione todos os domínios onde o frontend será hospedado
- `MaxAgeSeconds: 3600` significa que o navegador cacheará a resposta CORS por 1 hora

### 4. Configuração Alternativa (Interface Web)

Se a interface do Cloudflare não aceitar JSON, você pode usar a interface visual:

- **Allowed Origins**: Adicione cada origem (ex: `http://localhost:3000`, `https://seu-dominio.com`)
- **Allowed Methods**: Selecione `GET` e `HEAD`
- **Allowed Headers**: Selecione `*` (todos) ou liste: `Content-Type`, `Range`, `Authorization`
- **Exposed Headers**: Adicione: `Content-Length`, `Content-Range`, `Content-Type`, `ETag`
- **Max Age**: `3600` segundos

### 5. Salvar e Testar

1. Salve a configuração
2. Aguarde alguns minutos para a propagação
3. Teste o vídeo no frontend

## Verificação

Após configurar, você pode verificar se está funcionando:

1. Abra o DevTools do navegador (F12)
2. Vá para a aba **Network**
3. Tente carregar um vídeo
4. Verifique a requisição ao R2:
   - Deve retornar status `200` ou `206` (para range requests)
   - Os headers de resposta devem incluir `Access-Control-Allow-Origin`

## Troubleshooting

### Erro: "CORS policy blocked"

- Verifique se o domínio do frontend está na lista de `AllowedOrigins`
- Certifique-se de que o protocolo está correto (`http://` vs `https://`)
- Verifique se não há espaços extras ou erros de digitação

### Erro: "Method not allowed"

- Certifique-se de que `GET` e `HEAD` estão em `AllowedMethods`
- O presigned URL do R2 já inclui o método na URL, mas o CORS precisa permitir

### Vídeo não carrega, mas não há erros CORS

- Verifique se o presigned URL está válido (não expirou)
- Verifique se o arquivo existe no bucket
- Verifique os logs do backend para garantir que o URL está sendo gerado corretamente

## Configuração Recomendada para Produção

Para produção, seja mais restritivo:

```json
[
  {
    "AllowedOrigins": [
      "https://seu-dominio-producao.com"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "Range",
      "Content-Type"
    ],
    "ExposeHeaders": [
      "Content-Length",
      "Content-Range",
      "Content-Type",
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

## Referências

- [Cloudflare R2 CORS Documentation](https://developers.cloudflare.com/r2/buckets/cors/)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

