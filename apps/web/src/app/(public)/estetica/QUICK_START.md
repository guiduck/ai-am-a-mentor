# 🚀 Guia Rápido - Landing Page de Estética

Siga este guia para colocar a página no ar em **15 minutos**!

## ✅ Configuração Mínima (Obrigatório)

### 1. Configurar WhatsApp (2 minutos)

Edite o arquivo: `config.ts`

```typescript
export const CONFIG = {
  whatsapp: {
    number: "5511999999999", // ⬅️ MUDE AQUI! Seu número real
    // ...
  },
};
```

**Formato do número:**

- Brasil: `55` + `DDD` + `número`
- Exemplo: `5511987654321` para (11) 98765-4321

### 2. Configurar Instagram (2 minutos)

Edite o arquivo: `config.ts`

```typescript
export const CONFIG = {
  instagram: {
    handle: "@seu_instagram", // ⬅️ MUDE AQUI! Seu @ do Instagram
    // ...
  },
};
```

### 3. Testar a Página (1 minuto)

```bash
# Na pasta raiz do projeto
cd /home/guiduck/video-learning-platform/apps/web
npm run dev
```

Acesse: http://localhost:3000/estetica

**✅ Pronto! A página já está funcionando!**

---

## 🎨 Personalização Básica (Opcional - 10 minutos)

### 4. Adicionar Informações da Instrutora

Edite o arquivo: `config.ts`

```typescript
instructor: {
  name: 'Dra. Maria Silva', // ⬅️ Nome real
  role: 'Especialista em Estética Avançada',
  bio: [
    'Coloque aqui a biografia...',
    'Segundo parágrafo...'
  ],
  stats: {
    yearsExperience: '15+', // ⬅️ Anos de experiência
    procedures: '10.000+',  // ⬅️ Procedimentos realizados
    students: '1.000+'      // ⬅️ Alunas formadas
  }
}
```

### 5. Personalizar Textos Principais

Edite o arquivo: `config.ts`

```typescript
content: {
  hero: {
    title: 'Seu Título Principal Aqui',
    subtitle: 'Seu subtítulo explicativo...',
    urgency: '🔥 Sua mensagem de urgência'
  }
}
```

---

## 📸 Adicionar Fotos Reais (15 minutos)

### 6. Preparar as Imagens

**Imagens necessárias:**

1. **Hero** (800x1000px) - Foto principal da página
2. **Instrutora** (600x800px) - Foto profissional da professora
3. **OG Image** (1200x630px) - Para compartilhamento em redes sociais
4. **Posts Instagram** (6 fotos, 1080x1080px cada)

### 7. Salvar as Imagens

Crie a pasta e salve suas imagens:

```bash
mkdir -p /home/guiduck/video-learning-platform/apps/web/public/estetica
mkdir -p /home/guiduck/video-learning-platform/apps/web/public/estetica/instagram
```

**Estrutura de arquivos:**

```
public/
└── estetica/
    ├── hero-image.jpg           ← Foto principal
    ├── instructora.jpg          ← Foto da professora
    ├── og-image.jpg             ← Compartilhamento redes sociais
    └── instagram/
        ├── post1.jpg            ← Posts do Instagram
        ├── post2.jpg
        ├── post3.jpg
        ├── post4.jpg
        ├── post5.jpg
        └── post6.jpg
```

### 8. Atualizar Componentes com Fotos

**Hero Section** - `components/HeroSection.tsx`:

```tsx
// Encontre a linha 35-43 e substitua por:
<div className="hero-image">
  <img
    src="/estetica/hero-image.jpg"
    alt="Procedimento de estética"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
```

**Instrutora** - `components/InstructorSection.tsx`:

```tsx
// Encontre a linha 6-14 e substitua por:
<div className="instructor-image">
  <img
    src="/estetica/instructora.jpg"
    alt="Instrutora"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
```

**Instagram** - `components/InstagramFeed.tsx`:

```tsx
// Encontre o array mockPosts (linha 11) e atualize com suas fotos:
const mockPosts = [
  {
    id: 1,
    image: "/estetica/instagram/post1.jpg",
    likes: 234,
    comments: 12,
    caption: "Legenda do seu post",
  },
  // ... adicione os outros 5 posts
];
```

E dentro do map, substitua o emoji por:

```tsx
<img
  src={post.image}
  alt={post.caption}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
```

---

## 🌐 Colocar no Ar (Produção)

### 9. Build e Deploy

```bash
# Fazer build
cd /home/guiduck/video-learning-platform/apps/web
npm run build

# Fazer deploy (exemplo com Vercel)
vercel deploy --prod
```

**Sua página estará disponível em:**

- Desenvolvimento: `http://localhost:3000/estetica`
- Produção: `https://seudominio.com/estetica`

---

## 📊 Próximos Passos (Opcional)

### 10. Adicionar Analytics

Para rastrear visitantes e conversões:

**Google Analytics:**

1. Crie uma propriedade no Google Analytics
2. Copie o ID (formato: G-XXXXXXXXXX)
3. Adicione no `config.ts`:

```typescript
analytics: {
  googleAnalyticsId: 'G-XXXXXXXXXX',
}
```

**Facebook Pixel:**

1. Crie um pixel no Facebook Business
2. Copie o ID
3. Adicione no `config.ts`:

```typescript
analytics: {
  facebookPixelId: '123456789012345',
}
```

### 11. Integração Automática com Instagram

Quer que os posts atualizem automaticamente?

👉 Siga o guia completo: `INSTAGRAM_SETUP.md`

---

## 🎯 Checklist Final

Antes de divulgar sua página, verifique:

- [ ] ✅ WhatsApp configurado e testado
- [ ] ✅ Instagram @ configurado e link funcionando
- [ ] ✅ Fotos reais adicionadas (hero, instrutora, Instagram)
- [ ] ✅ Textos personalizados (nome, bio, estatísticas)
- [ ] ✅ Página testada no celular e desktop
- [ ] ✅ Todos os botões de CTA funcionando
- [ ] ✅ Link compartilhado no Instagram da clínica
- [ ] ✅ URL personalizada (se possível)

---

## 🆘 Problemas Comuns

### "Página não carrega"

```bash
# Reinicie o servidor
npm run dev
```

### "Imagens não aparecem"

- Verifique se salvou na pasta `/public/estetica/`
- Verifique se o caminho no código está correto
- Caminho deve começar com `/estetica/` (sem `public`)

### "WhatsApp não abre"

- Verifique se o número está no formato correto
- Teste o link diretamente: `https://wa.me/5511999999999`

### "Instagram não carrega posts"

- Atualize o array `mockPosts` com seus dados
- Ou siga o guia de integração automática

---

## 💡 Dicas de Marketing

### Divulgação Inicial

1. **Instagram Stories**

   - Faça story com link "Ver mais"
   - Use call-to-action clara
   - Adicione contagem regressiva

2. **Posts no Feed**

   - Crie carrossel explicando o curso
   - Último slide com link na bio
   - Use hashtags relevantes

3. **WhatsApp Status**

   - Compartilhe nos status
   - Envie para grupos (com permissão)

4. **Tráfego Pago**
   - Facebook/Instagram Ads
   - Google Ads
   - TikTok Ads

### Otimização de Conversão

- **Teste diferentes CTAs**

  - "Quero me inscrever"
  - "Garantir minha vaga"
  - "Saber mais"

- **Use urgência**

  - Vagas limitadas
  - Promoção por tempo limitado
  - Bônus para primeiras inscritas

- **Prova social**
  - Compartilhe resultados
  - Mostre depoimentos
  - Exiba número de alunas

---

## 📞 Suporte

Encontrou algum problema? Entre em contato!

**Arquivos importantes:**

- `config.ts` - Configurações principais
- `README.md` - Documentação completa
- `INSTAGRAM_SETUP.md` - Guia de integração Instagram
- `components/` - Componentes da página

---

## 🎉 Pronto!

Sua landing page está configurada e pronta para capturar leads!

**Próximos passos:**

1. Divulgue o link nas redes sociais
2. Monitore as conversões
3. Ajuste textos conforme necessário
4. Responda rapidamente no WhatsApp

**Boa sorte com o lançamento! 🚀✨**
