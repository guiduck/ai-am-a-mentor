/**
 * Configurações da Landing Page de Estética
 *
 * IMPORTANTE: Altere estas configurações antes de colocar a página no ar!
 */

export const CONFIG = {
  // ============================================
  // CONTATO - WhatsApp
  // ============================================
  whatsapp: {
    // Número do WhatsApp (formato: código país + DDD + número, SEM espaços ou caracteres especiais)
    // Exemplo: '5511999999999' para (11) 99999-9999 do Brasil
    number: "5511999999999",

    // Mensagens pré-definidas (serão enviadas quando o usuário clicar nos botões)
    messages: {
      hero: "Olá! Tenho interesse no Curso de Estética Avançada. Gostaria de mais informações! 💅",
      cta: "Olá! Quero entrar para a próxima turma do Curso de Estética Avançada! 🎓✨",
    },
  },

  // ============================================
  // INSTAGRAM
  // ============================================
  instagram: {
    // Username do Instagram (com @)
    handle: "@seu_instagram_aqui",

    // Se você configurou a API do Instagram, defina como true
    useAPI: false,

    // Access Token da API (use variável de ambiente em produção)
    // Adicione no arquivo .env.local: INSTAGRAM_ACCESS_TOKEN=seu_token
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || "",

    // User ID do Instagram
    // Adicione no arquivo .env.local: INSTAGRAM_USER_ID=seu_user_id
    userId: process.env.INSTAGRAM_USER_ID || "",
  },

  // ============================================
  // INFORMAÇÕES DA INSTRUTORA
  // ============================================
  instructor: {
    name: "Nome da Instrutora",
    role: "Especialista em Estética Avançada",
    bio: [
      "Com mais de 10 anos de experiência no mercado, sou especializada em procedimentos estéticos faciais como botox, preenchimento dérmico, harmonização facial e técnicas avançadas de rejuvenescimento.",
      "Já realizei mais de 5.000 procedimentos e formei centenas de profissionais que hoje são referência em suas regiões. Minha missão é compartilhar todo meu conhecimento e técnicas para você se tornar uma profissional de sucesso.",
    ],
    stats: {
      yearsExperience: "10+",
      procedures: "5.000+",
      students: "500+",
    },
    // Caminho para foto da instrutora (coloque em /public/estetica/)
    image: "/estetica/instructora.jpg",
  },

  // ============================================
  // IMAGENS
  // ============================================
  images: {
    // Imagem do Hero (coloque em /public/estetica/)
    hero: "/estetica/hero-image.jpg",

    // Imagem OG para compartilhamento em redes sociais (1200x630px)
    // (coloque em /public/estetica/)
    og: "/estetica/og-image.jpg",

    // Logo da marca (opcional)
    logo: "/estetica/logo.png",
  },

  // ============================================
  // TEXTOS DA PÁGINA
  // ============================================
  content: {
    hero: {
      title: "Domine a Arte da Estética Avançada",
      subtitle:
        "Aprenda técnicas profissionais de botox, preenchimento, harmonização facial e muito mais com uma das maiores especialistas do mercado",
      badges: [
        { icon: "✨", text: "Certificado Reconhecido" },
        { icon: "👥", text: "+500 Alunas Formadas" },
        { icon: "🎓", text: "100% Online" },
      ],
      urgency: "🔥 Vagas limitadas • Turma fechando em breve",
    },

    cta: {
      title: "Pronta Para Transformar Sua Carreira?",
      subtitle:
        "Entre para o grupo VIP e receba informações exclusivas sobre a próxima turma",
      trustIndicators: [
        { icon: "✅", text: "Acesso imediato" },
        { icon: "🎁", text: "Bônus exclusivos" },
        { icon: "🔒", text: "Pagamento 100% seguro" },
        { icon: "↩️", text: "7 dias de garantia" },
      ],
    },
  },

  // ============================================
  // SEO
  // ============================================
  seo: {
    title: "Curso de Estética Avançada - Domine Botox, Preenchimento e Mais",
    description:
      "Aprenda técnicas avançadas de estética com profissional experiente. Botox, preenchimento, harmonização facial e muito mais.",
    keywords:
      "curso estética, botox, preenchimento, harmonização facial, estética avançada",
  },

  // ============================================
  // ANALYTICS (Opcional)
  // ============================================
  analytics: {
    // Google Analytics ID
    googleAnalyticsId: "",

    // Facebook Pixel ID
    facebookPixelId: "",

    // Google Tag Manager ID
    googleTagManagerId: "",
  },
};

// Helper function para obter link do WhatsApp
export function getWhatsAppLink(messageKey: "hero" | "cta" = "hero"): string {
  const message = encodeURIComponent(CONFIG.whatsapp.messages[messageKey]);
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${message}`;
}

// Helper function para obter URL do Instagram
export function getInstagramUrl(): string {
  return `https://instagram.com/${CONFIG.instagram.handle.replace("@", "")}`;
}
