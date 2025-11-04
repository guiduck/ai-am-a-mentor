"use client";

export function HeroSection() {
  const whatsappNumber = "5511999999999"; // CONFIGURE: Número do WhatsApp
  const whatsappMessage = encodeURIComponent(
    "Olá! Tenho interesse no Curso de Estética Avançada. Gostaria de mais informações! 💅"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Domine a Arte da
              <br />
              Estética Avançada
            </h1>
            <p className="subtitle">
              Aprenda técnicas profissionais de botox, preenchimento,
              harmonização facial e muito mais com uma das maiores especialistas
              do mercado
            </p>

            <div className="hero-badges">
              <span className="badge">
                <span>✨</span> Certificado Reconhecido
              </span>
              <span className="badge">
                <span>👥</span> +500 Alunas Formadas
              </span>
              <span className="badge">
                <span>🎓</span> 100% Online
              </span>
            </div>

            <a
              href={whatsappLink}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              Quero Participar Agora
            </a>

            <p
              style={{
                marginTop: "20px",
                fontSize: "0.9rem",
                color: "#999",
              }}
            >
              🔥 Vagas limitadas • Turma fechando em breve
            </p>
          </div>

          <div className="hero-image">
            {/* CONFIGURE: Adicione uma imagem da profissional fazendo um procedimento */}
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                background: "linear-gradient(135deg, #f8f0f5 0%, #e8e0f0 100%)",
              }}
            >
              💆‍♀️
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrar em contato pelo WhatsApp"
      >
        💬
      </a>
    </>
  );
}
