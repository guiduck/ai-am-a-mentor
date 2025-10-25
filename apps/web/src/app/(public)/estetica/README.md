# Landing Page - Curso de Estética Avançada

Uma landing page moderna e profissional para captura de leads do curso de estética.

## 🎯 Objetivo

Capturar leads e direcionar interessados para um grupo VIP no WhatsApp, onde receberão informações sobre o curso.

## 🎨 Design

A página foi desenvolvida com foco em:

- Design moderno e elegante (cores rosa/roxo para estética)
- Alta taxa de conversão
- Responsivo (mobile-first)
- Otimizado para SEO
- Integração com Instagram e WhatsApp

## 📋 Seções da Página

1. **Hero Section** - Título impactante + CTA principal
2. **Instrutora** - Apresentação da profissional + credenciais
3. **Benefícios** - O que será aprendido no curso (9 módulos)
4. **Instagram Feed** - Galeria de posts do Instagram (prova social)
5. **Depoimentos** - Testemunhos de alunas (6 depoimentos)
6. **FAQ** - Perguntas frequentes (8 perguntas)
7. **CTA Final** - Última chamada para ação
8. **Botão Flutuante WhatsApp** - Sempre visível

## ⚙️ Configurações Necessárias

### 1. Número do WhatsApp

Edite os arquivos:

- `components/HeroSection.tsx` (linha 4)
- `components/CTASection.tsx` (linha 2)

```typescript
const whatsappNumber = "5511999999999"; // Substitua pelo número real
```

**Formato**: Código do país (55) + DDD + número (sem espaços ou caracteres especiais)

### 2. Instagram

#### A) Configurar @ do Instagram

Edite o arquivo `components/InstagramFeed.tsx` (linha 7):

```typescript
const instagramHandle = "@seu_instagram_aqui";
```

#### B) Integração de Feed do Instagram

**Opções de integração:**

##### Opção 1: Instagram Basic Display API (Recomendado)

1. Crie um app no [Facebook Developers](https://developers.facebook.com/)
2. Configure o Instagram Basic Display
3. Obtenha um Access Token
4. Use a API para buscar posts reais:

```typescript
// Exemplo de implementação
const response = await fetch(
  `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,timestamp,media_type&access_token=${ACCESS_TOKEN}`
);
```

##### Opção 2: Instagram Graph API (Para contas Business/Creator)

1. Converta a conta para Business/Creator
2. Conecte ao Facebook Page
3. Use a Graph API para buscar mídia

##### Opção 3: Serviços de Terceiros

- **EmbedSocial** - https://embedsocial.com/
- **Instafeed.js** - https://instafeedjs.com/
- **Juicer** - https://www.juicer.io/

##### Opção 4: Embed Manual (Atual - Mock)

Atualmente a página usa posts mockados. Para adicionar posts reais:

1. Acesse cada post no Instagram
2. Clique em "..." → "Embed" → Copie o código
3. Ou salve as imagens e atualize o array `mockPosts`:

```typescript
const posts = [
  {
    id: 1,
    image: "/instagram/post1.jpg", // Adicione imagens em /public/instagram/
    likes: 234,
    comments: 12,
    caption: "Legenda do post",
  },
  // ...
];
```

**Informações necessárias para integração automática:**

- ✅ @ do Instagram (username)
- ✅ Access Token da API (se usar API oficial)
- ✅ Facebook Page ID (se usar Graph API)
- ✅ Imagens dos posts (se usar integração manual)

### 3. Imagens Profissionais

Substitua os placeholders por fotos reais:

#### Hero Section

- Arquivo: `components/HeroSection.tsx`
- Local: Linha 35-43
- Dimensões recomendadas: 800x1000px
- Conteúdo: Foto da profissional realizando procedimento

#### Instrutora

- Arquivo: `components/InstructorSection.tsx`
- Local: Linha 6-14
- Dimensões recomendadas: 600x800px
- Conteúdo: Foto profissional da instrutora

**Como adicionar:**

1. Coloque as imagens em `/apps/web/public/estetica/`
2. Substitua os divs de placeholder por tags `<img>`:

```tsx
<img
  src="/estetica/hero-image.jpg"
  alt="Descrição da imagem"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
```

### 4. Informações Personalizadas

Edite os seguintes arquivos com as informações reais:

#### InstructorSection.tsx

- Nome da instrutora
- Biografia
- Anos de experiência
- Número de procedimentos
- Número de alunas formadas

#### TestimonialsSection.tsx

- Nomes reais das alunas (ou manter genéricos)
- Depoimentos reais
- Profissões das alunas

#### FAQSection.tsx

- Adapte as perguntas e respostas conforme o curso real
- Adicione informações específicas sobre preços, duração, etc.

### 5. SEO e Redes Sociais

Edite o arquivo `page.tsx` (linhas 10-17):

```typescript
export const metadata: Metadata = {
  title: "Seu título SEO aqui",
  description: "Sua descrição SEO aqui",
  openGraph: {
    title: "Título para compartilhamento",
    description: "Descrição para compartilhamento",
    images: ["/estetica/og-image.jpg"], // Criar imagem 1200x630px
  },
};
```

## 🚀 Como Acessar

A página estará disponível em:

```
http://localhost:3000/estetica
```

Em produção:

```
https://seudominio.com/estetica
```

## 📱 Próximos Passos

1. ✅ Configurar número do WhatsApp
2. ✅ Adicionar @ do Instagram
3. ⏳ Escolher método de integração do Instagram
4. ⏳ Adicionar fotos profissionais reais
5. ⏳ Personalizar textos e informações
6. ⏳ Criar imagem OG para compartilhamento
7. ⏳ Testar em dispositivos móveis
8. ⏳ Configurar Google Analytics (opcional)
9. ⏳ Configurar Facebook Pixel (opcional)

## 🎨 Personalização de Cores

As cores principais estão definidas no arquivo `styles.css`:

```css
/* Gradiente principal */
linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)

/* Para mudar as cores, edite: */
#e91e63 - Rosa principal
#9c27b0 - Roxo secundário
```

## 📊 Métricas Recomendadas

Configure ferramentas de análise para monitorar:

- Número de visitantes
- Taxa de clique no botão WhatsApp
- Tempo na página
- Taxa de rejeição
- Conversão de leads

## 💡 Dicas de Otimização

1. **Imagens**: Otimize todas as imagens com ferramentas como TinyPNG
2. **Velocidade**: Use Next.js Image component para otimização automática
3. **Mobile**: Teste em vários dispositivos móveis (maioria do tráfego)
4. **A/B Testing**: Teste diferentes CTAs e títulos
5. **Urgência**: Adicione contadores ou indicadores de vagas limitadas

## 🔒 Privacidade

Lembre-se de adicionar:

- Política de Privacidade
- Termos de Uso
- Cookie Notice (se aplicável na LGPD)

## 📞 Suporte

Para dúvidas sobre implementação ou personalização, entre em contato.
