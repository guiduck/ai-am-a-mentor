export function InstructorSection() {
  return (
    <section className="instructor-section">
      <div className="instructor-content">
        <div className="instructor-image">
          {/* CONFIGURE: Adicione foto profissional da instrutora */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "5rem",
            }}
          >
            👩‍⚕️
          </div>
        </div>

        <div className="instructor-text">
          <h2>Conheça Sua Instrutora</h2>
          <p className="role">Especialista em Estética Avançada</p>

          <p>
            Com mais de 10 anos de experiência no mercado, sou especializada em
            procedimentos estéticos faciais como botox, preenchimento dérmico,
            harmonização facial e técnicas avançadas de rejuvenescimento.
          </p>

          <p>
            Já realizei mais de 5.000 procedimentos e formei centenas de
            profissionais que hoje são referência em suas regiões. Minha missão
            é compartilhar todo meu conhecimento e técnicas para você se tornar
            uma profissional de sucesso.
          </p>

          <div className="instructor-stats">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5.000+</span>
              <span className="stat-label">Procedimentos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Alunas Formadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
