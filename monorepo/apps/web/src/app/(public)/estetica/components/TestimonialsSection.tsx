export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Esteticista",
      avatar: "M",
      text: "O curso mudou completamente minha carreira! Aprendi técnicas que me fizeram ganhar 5x mais. A professora é incrível e ensina com muita didática.",
    },
    {
      id: 2,
      name: "Ana Costa",
      role: "Proprietária de Clínica",
      avatar: "A",
      text: "Depois do curso consegui abrir minha própria clínica. O conteúdo é completo e atual, com tudo que você precisa para se destacar no mercado.",
    },
    {
      id: 3,
      name: "Julia Santos",
      role: "Biomédica Esteta",
      avatar: "J",
      text: "Já fiz vários cursos, mas este é o mais completo. A parte de anatomia e segurança é excepcional. Me sinto muito mais confiante nos procedimentos.",
    },
    {
      id: 4,
      name: "Carla Mendes",
      role: "Esteticista",
      avatar: "C",
      text: "Investimento que vale cada centavo! Em 3 meses já recuperei o valor do curso. Os clientes amam os resultados e sempre voltam.",
    },
    {
      id: 5,
      name: "Beatriz Lima",
      role: "Empreendedora",
      avatar: "B",
      text: "Saí do zero e hoje tenho agenda lotada. O curso ensina não só a técnica, mas também como divulgar e precificar seus serviços.",
    },
    {
      id: 6,
      name: "Patricia Rocha",
      role: "Enfermeira Esteta",
      avatar: "P",
      text: "Professora maravilhosa que realmente se importa com o aprendizado. Suporte incrível e material atualizado constantemente.",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>O Que Nossas Alunas Dizem</h2>
        <p>Histórias reais de profissionais que transformaram suas carreiras</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
