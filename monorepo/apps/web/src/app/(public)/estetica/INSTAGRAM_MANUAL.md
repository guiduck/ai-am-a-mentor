# 📸 Guia: Adicionar Fotos do Instagram Manualmente

Este guia mostra como adicionar fotos reais do Instagram na landing page **sem precisar usar APIs**.

⏱️ **Tempo estimado:** 15 minutos  
🎯 **Dificuldade:** Fácil (copiar e colar)

---

## 📋 Visão Geral

Você vai:

1. ✅ Baixar 6 fotos do Instagram
2. ✅ Salvar na pasta do projeto
3. ✅ Atualizar o código para exibir as fotos
4. ✅ Testar e ver funcionando!

---

## 🎯 Passo 1: Escolher as Fotos

### O que escolher?

Selecione **6 fotos** do Instagram que mostrem:

- ✨ Resultados de procedimentos (antes/depois)
- 💅 Trabalhos realizados
- 😊 Clientes satisfeitas
- 🎓 Você realizando procedimentos
- 📚 Bastidores do trabalho
- 🏆 Certificados ou conquistas

### Dicas para escolher:

✅ **Escolha fotos que:**

- Tenham boa qualidade (não pixelizadas)
- Mostrem resultados reais
- Sejam atraentes visualmente
- Gerem confiança e credibilidade

❌ **Evite fotos:**

- Muito escuras ou com baixa qualidade
- Apenas texto (prefira imagens reais)
- Que não representem bem seu trabalho

---

## 💾 Passo 2: Baixar as Fotos do Instagram

### Opção A: Pelo Navegador (Mais Fácil)

**Para cada foto que você escolheu:**

1. Abra o Instagram no navegador: https://instagram.com
2. Faça login na sua conta
3. Vá até o post que deseja baixar
4. **No Desktop:**
   - Clique com botão direito na foto
   - Selecione "Salvar imagem como..." ou "Save image as..."
5. **No Mobile:**

   - Mantenha o dedo pressionado na foto
   - Selecione "Salvar imagem" ou "Download"

6. Salve com um nome organizado:
   - `post1.jpg`
   - `post2.jpg`
   - `post3.jpg`
   - `post4.jpg`
   - `post5.jpg`
   - `post6.jpg`

### Opção B: Usando Ferramentas Online

Se não conseguir baixar pelo navegador, use sites como:

**InstagramSave** (https://www.instagramsave.com/)

1. Cole o link do post do Instagram
2. Clique em "Download"
3. Baixe a imagem

**SnapInsta** (https://snapinsta.app/)

1. Cole a URL do post
2. Clique em "Download"
3. Salve a imagem

---

## 📁 Passo 3: Organizar as Fotos no Projeto

### 3.1 Criar a Pasta

```bash
# No terminal, execute:
cd /home/guiduck/video-learning-platform/apps/web
mkdir -p public/estetica/instagram
```

### 3.2 Copiar as Fotos

**Opção A: Usando o Terminal**

```bash
# Copie as fotos baixadas para a pasta do projeto
# Substitua /caminho/Downloads pelo local onde você salvou as fotos

cp ~/Downloads/post1.jpg public/estetica/instagram/
cp ~/Downloads/post2.jpg public/estetica/instagram/
cp ~/Downloads/post3.jpg public/estetica/instagram/
cp ~/Downloads/post4.jpg public/estetica/instagram/
cp ~/Downloads/post5.jpg public/estetica/instagram/
cp ~/Downloads/post6.jpg public/estetica/instagram/
```

**Opção B: Usando o Explorador de Arquivos**

1. Abra o explorador de arquivos
2. Navegue até: `/home/guiduck/video-learning-platform/apps/web/public/estetica/instagram/`
3. Arraste as 6 fotos para essa pasta

### 3.3 Verificar se as Fotos Estão no Lugar

```bash
# Liste os arquivos para confirmar
ls -lh public/estetica/instagram/
```

Você deve ver algo como:

```
post1.jpg
post2.jpg
post3.jpg
post4.jpg
post5.jpg
post6.jpg
```

---

## 💻 Passo 4: Atualizar o Código

### 4.1 Abrir o Arquivo

Abra o arquivo: `/apps/web/src/app/(public)/estetica/components/InstagramFeed.tsx`

### 4.2 Atualizar o Array de Posts

Encontre a seção `mockPosts` (aproximadamente na linha 11) e substitua por:

```tsx
// CONFIGURE: Adicione informações reais dos seus posts
const mockPosts = [
  {
    id: 1,
    image: "/estetica/instagram/post1.jpg",
    likes: 234, // ← Coloque o número real de likes (opcional)
    comments: 12, // ← Coloque o número real de comentários (opcional)
    caption: "Resultado incrível de harmonização facial! ✨", // ← Legenda real do post
  },
  {
    id: 2,
    image: "/estetica/instagram/post2.jpg",
    likes: 456,
    comments: 23,
    caption: "Preenchimento labial com resultado natural 💋",
  },
  {
    id: 3,
    image: "/estetica/instagram/post3.jpg",
    likes: 189,
    comments: 8,
    caption: "Botox: técnica perfeita para um olhar descansado 👁️",
  },
  {
    id: 4,
    image: "/estetica/instagram/post4.jpg",
    likes: 567,
    comments: 34,
    caption: "Mais uma cliente feliz com o resultado! 💖",
  },
  {
    id: 5,
    image: "/estetica/instagram/post5.jpg",
    likes: 321,
    comments: 15,
    caption: "Harmonização facial completa - antes e depois 🌟",
  },
  {
    id: 6,
    image: "/estetica/instagram/post6.jpg",
    likes: 445,
    comments: 28,
    caption: "Procedimento de preenchimento com ácido hialurônico 💎",
  },
];
```

### 4.3 Atualizar a Renderização das Imagens

Encontre o loop `mockPosts.map()` (aproximadamente na linha 40) e **substitua** esta seção:

```tsx
// ANTES (com emoji):
<div
  style={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    background: `linear-gradient(${
      135 + post.id * 30
    }deg, #f8f0f5 0%, #e8e0f0 100%)`,
  }}
>
  {["💅", "✨", "💄", "🌸", "💖", "⭐"][post.id - 1]}
</div>
```

Por:

```tsx
// DEPOIS (com foto real):
<img
  src={post.image}
  alt={post.caption}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>
```

---

## ✅ Passo 5: Testar

### 5.1 Iniciar o Servidor

```bash
cd /home/guiduck/video-learning-platform/apps/web
npm run dev
```

### 5.2 Acessar a Página

Abra no navegador: http://localhost:3000/estetica

### 5.3 Verificar

Você deve ver:

- ✅ As 6 fotos do Instagram carregando
- ✅ Hover com overlay funcionando
- ✅ Link para o Instagram ao clicar
- ✅ Layout 2x3 responsivo

### 5.4 Problemas?

**Se as fotos não aparecerem:**

1. **Verifique o caminho dos arquivos:**

```bash
ls public/estetica/instagram/
```

2. **Confirme que os nomes batem:**

   - Arquivo: `post1.jpg`
   - Código: `image: '/estetica/instagram/post1.jpg'`
   - ⚠️ Cuidado com maiúsculas/minúsculas!

3. **Limpe o cache do navegador:**

   - Pressione `Ctrl + Shift + R` (Windows/Linux)
   - Ou `Cmd + Shift + R` (Mac)

4. **Reinicie o servidor:**

```bash
# Pressione Ctrl+C para parar
# Depois rode novamente:
npm run dev
```

---

## 🎨 Passo 6: Personalizar (Opcional)

### Adicionar Mais Informações nos Posts

Você pode adicionar campos extras:

```tsx
const mockPosts = [
  {
    id: 1,
    image: "/estetica/instagram/post1.jpg",
    likes: 234,
    comments: 12,
    caption: "Harmonização facial",
    date: "2024-01-15", // ← Data do post
    hashtags: "#estetica #botox", // ← Hashtags
    location: "São Paulo, SP", // ← Local
  },
  // ...
];
```

### Ajustar Número de Fotos

Quer mostrar mais ou menos fotos?

```tsx
// Para 9 fotos (3x3)
const mockPosts = [
  // ... adicione 3 posts a mais
];

// Para 4 fotos (2x2)
const mockPosts = [
  // ... use apenas 4 posts
];
```

### Mudar Layout da Grade

No arquivo `styles.css`, encontre `.instagram-grid`:

```css
/* Para 2 colunas (mobile-friendly) */
.instagram-grid {
  grid-template-columns: repeat(2, 1fr);
}

/* Para 3 colunas */
.instagram-grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Para 4 colunas */
.instagram-grid {
  grid-template-columns: repeat(4, 1fr);
}
```

---

## 🔄 Passo 7: Atualizar as Fotos Periodicamente

Para manter a página sempre atualizada:

### Opção 1: Manual (Recomendado no início)

A cada 1-2 semanas:

1. Selecione novos posts que tiveram boa performance
2. Baixe as imagens
3. Substitua as fotos antigas em `public/estetica/instagram/`
4. Atualize as legendas e números no código

### Opção 2: Semi-Automática

Crie um script para facilitar:

```bash
#!/bin/bash
# update-instagram.sh

echo "🔄 Atualizando fotos do Instagram..."

# Faça backup das fotos antigas
cp -r public/estetica/instagram/ public/estetica/instagram-backup/

# Copie as novas fotos
# (você baixa manualmente e coloca em ~/Downloads/novos-posts/)
cp ~/Downloads/novos-posts/*.jpg public/estetica/instagram/

echo "✅ Fotos atualizadas! Lembre-se de atualizar o código também."
```

---

## 📊 Dicas para Escolher os Melhores Posts

### Análise de Performance

Escolha posts que tiveram:

- 🔥 Mais likes (maior engajamento)
- 💬 Mais comentários (maior interação)
- 📈 Mais salvamentos (melhor qualidade)
- 👁️ Mais visualizações (maior alcance)

### Mix de Conteúdo

Balance os tipos de posts:

- 2-3 fotos de resultados (antes/depois)
- 1-2 fotos de procedimentos sendo feitos
- 1-2 fotos de clientes satisfeitas
- 1 foto educativa ou bastidores

### Qualidade Visual

Priorize fotos com:

- ✅ Boa iluminação
- ✅ Alta resolução
- ✅ Cores vibrantes
- ✅ Composição profissional
- ✅ Foco na transformação/resultado

---

## 🎯 Checklist Final

Antes de considerar concluído:

**Arquivos:**

- [ ] Pasta `public/estetica/instagram/` criada
- [ ] 6 fotos salvas (post1.jpg até post6.jpg)
- [ ] Fotos em boa qualidade (não pixelizadas)

**Código:**

- [ ] Array `mockPosts` atualizado
- [ ] Caminhos das imagens corretos
- [ ] Legendas personalizadas (opcional)
- [ ] Números de likes/comments realistas (opcional)
- [ ] Código de renderização usando `<img>` (não emoji)

**Testes:**

- [ ] Servidor rodando (`npm run dev`)
- [ ] Página acessível em http://localhost:3000/estetica
- [ ] 6 fotos carregando corretamente
- [ ] Hover funcionando (overlay aparece)
- [ ] Links para Instagram funcionando
- [ ] Layout responsivo em mobile

**Extras:**

- [ ] Instagram @ configurado em `config.ts`
- [ ] WhatsApp configurado em `config.ts`
- [ ] Testado em diferentes navegadores
- [ ] Testado em mobile e desktop

---

## 🆘 Resolução de Problemas

### Problema: "Foto não aparece"

**Causas comuns:**

1. Caminho errado no código
2. Nome do arquivo não bate
3. Foto na pasta errada
4. Cache do navegador

**Solução:**

```bash
# 1. Verificar se o arquivo existe
ls public/estetica/instagram/post1.jpg

# 2. Se não existir, verifique o nome correto
ls public/estetica/instagram/

# 3. Renomeie se necessário
mv public/estetica/instagram/foto.jpg public/estetica/instagram/post1.jpg

# 4. Limpe cache e reinicie servidor
# Ctrl+C para parar, depois:
npm run dev
```

### Problema: "Foto aparece cortada ou distorcida"

**Solução:**

Ajuste o `objectFit`:

```tsx
<img
  src={post.image}
  alt={post.caption}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover", // Tenta 'contain' se estiver cortando muito
  }}
/>
```

### Problema: "Layout quebrado no mobile"

**Solução:**

Edite `styles.css`:

```css
.instagram-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* Ajusta automaticamente o número de colunas */
}
```

### Problema: "Fotos muito pesadas (site lento)"

**Solução:**

Otimize as fotos antes de adicionar:

**Online:** Use https://tinypng.com/

1. Faça upload das fotos
2. Baixe as versões otimizadas
3. Use essas versões no projeto

**Terminal:**

```bash
# Se tiver ImageMagick instalado
cd public/estetica/instagram/
mogrify -resize 1080x1080 -quality 85 *.jpg
```

---

## 📈 Próximos Passos

Depois de ter as fotos manuais funcionando:

1. **Curto Prazo (Esta Semana):**

   - ✅ Adicionar fotos reais (você está aqui!)
   - ⏳ Configurar WhatsApp
   - ⏳ Personalizar textos
   - ⏳ Divulgar o link

2. **Médio Prazo (Este Mês):**

   - ⏳ Adicionar mais fotos (hero, instrutora)
   - ⏳ Otimizar SEO
   - ⏳ Adicionar analytics
   - ⏳ A/B testing de CTAs

3. **Longo Prazo (Próximos Meses):**
   - ⏳ Migrar para Instagram API (atualização automática)
   - ⏳ Adicionar depoimentos em vídeo
   - ⏳ Criar blog integrado
   - ⏳ Sistema de agendamento

---

## 💡 Dicas de Produtividade

### Organize um Workflow

1. **Toda segunda-feira:**

   - Revise posts da semana anterior
   - Selecione os 6 melhores
   - Baixe e atualize na landing page

2. **Use ferramentas:**

   - Airtable/Notion para rastrear performance dos posts
   - Canva para criar templates de posts
   - Later/Hootsuite para agendar posts

3. **Documente:**
   - Mantenha uma planilha com:
     - Link do post
     - Data
     - Likes/Comments
     - Está na landing page? (Sim/Não)

---

## 🎉 Conclusão

Parabéns! 🎊

Você agora tem:

- ✅ Fotos reais do Instagram na landing page
- ✅ Prova social visual
- ✅ Conteúdo atualizado e profissional
- ✅ Controle total sobre o que exibir

**Vantagens deste método:**

- ✅ Simples e direto
- ✅ Sem dependência de APIs
- ✅ Sem custos extras
- ✅ Controle total do conteúdo
- ✅ Funciona mesmo se API cair

**Próximo passo:**

- Divulgue sua landing page! 🚀
- Monitore as conversões
- Ajuste conforme necessário

---

## 📞 Precisa de Ajuda?

**Outros guias disponíveis:**

- 📄 `QUICK_START.md` - Configuração em 15 minutos
- 📄 `INSTAGRAM_SETUP.md` - Integração com API (automática)
- 📄 `README.md` - Documentação completa
- 📄 `RESUMO.md` - Visão geral do projeto

**Comandos úteis:**

```bash
# Ver estrutura de arquivos
tree public/estetica/

# Verificar tamanho das fotos
du -sh public/estetica/instagram/*

# Fazer backup
cp -r public/estetica/ public/estetica-backup/
```

---

**Boa sorte com suas fotos! 📸✨**
