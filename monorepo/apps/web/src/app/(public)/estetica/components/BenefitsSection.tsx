export function BenefitsSection() {
  const benefits = [
    {
      icon: "💉",
      title: "Técnicas de Botox",
      description:
        "Aprenda a aplicar botox com segurança e precisão, dominando pontos de aplicação e dosagens corretas.",
    },
    {
      icon: "💎",
      title: "Preenchimento Facial",
      description:
        "Domine técnicas de preenchimento com ácido hialurônico para lábios, maçãs do rosto e mandíbula.",
    },
    {
      icon: "✨",
      title: "Harmonização Facial",
      description:
        "Entenda proporções faciais e aprenda a criar harmonia e equilíbrio no rosto de seus clientes.",
    },
    {
      icon: "🎯",
      title: "Anatomia Aplicada",
      description:
        "Estude anatomia facial detalhada para realizar procedimentos com máxima segurança.",
    },
    {
      icon: "🛡️",
      title: "Protocolos de Segurança",
      description:
        "Aprenda todos os protocolos de biossegurança e como lidar com possíveis intercorrências.",
    },
    {
      icon: "💰",
      title: "Gestão de Clínica",
      description:
        "Aprenda a precificar serviços, atrair clientes e montar sua clínica de estética de sucesso.",
    },
    {
      icon: "📱",
      title: "Marketing Digital",
      description:
        "Descubra como usar redes sociais para divulgar seu trabalho e atrair mais clientes.",
    },
    {
      icon: "📚",
      title: "Material Completo",
      description:
        "Acesso vitalício a videoaulas, apostilas, protocolos e atualizações constantes do conteúdo.",
    },
    {
      icon: "🎓",
      title: "Certificado Reconhecido",
      description:
        "Receba certificado de conclusão reconhecido para comprovar sua qualificação profissional.",
    },
  ];

  return (
    <section className="benefits-section">
      <div className="section-header">
        <h2>O Que Você Vai Aprender</h2>
        <p>
          Um curso completo que vai transformar você em uma especialista em
          estética avançada
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
