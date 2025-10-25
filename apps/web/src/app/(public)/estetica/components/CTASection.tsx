export function CTASection() {
  const whatsappNumber = "5511999999999"; // CONFIGURE: Número do WhatsApp
  const whatsappMessage = encodeURIComponent(
    "Olá! Quero entrar para a próxima turma do Curso de Estética Avançada! 🎓✨"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>
          Pronta Para Transformar
          <br />
          Sua Carreira?
        </h2>
        <p>
          Entre para o grupo VIP e receba informações exclusivas sobre a próxima
          turma
        </p>

        <a
          href={whatsappLink}
          className="cta-button-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>💬</span>
          Entrar no Grupo VIP Agora
        </a>

        <div className="trust-indicators">
          <span className="trust-indicator">
            <span>✅</span> Acesso imediato
          </span>
          <span className="trust-indicator">
            <span>🎁</span> Bônus exclusivos
          </span>
          <span className="trust-indicator">
            <span>🔒</span> Pagamento 100% seguro
          </span>
          <span className="trust-indicator">
            <span>↩️</span> 7 dias de garantia
          </span>
        </div>
      </div>
    </section>
  );
}
