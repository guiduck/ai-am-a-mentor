'use client'

import { useState } from 'react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Preciso ter experiência prévia para fazer o curso?',
      answer: 'Não! O curso foi desenvolvido para atender desde iniciantes até profissionais que querem se especializar. Começamos do básico e evoluímos até técnicas avançadas.'
    },
    {
      question: 'O curso é 100% online?',
      answer: 'Sim! Todas as aulas são gravadas em alta qualidade e você pode assistir quando e onde quiser. Além disso, oferecemos suporte direto via WhatsApp para tirar suas dúvidas.'
    },
    {
      question: 'Recebo certificado ao concluir o curso?',
      answer: 'Sim! Ao concluir todas as aulas e atividades, você recebe um certificado digital reconhecido que comprova sua qualificação profissional.'
    },
    {
      question: 'Por quanto tempo tenho acesso ao conteúdo?',
      answer: 'Seu acesso é vitalício! Você pode assistir as aulas quantas vezes quiser e ainda recebe todas as atualizações futuras do curso sem pagar nada a mais.'
    },
    {
      question: 'Existe alguma garantia?',
      answer: 'Sim! Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeita, devolvemos 100% do seu investimento.'
    },
    {
      question: 'Como funciona o pagamento?',
      answer: 'Você pode pagar via PIX, cartão de crédito (em até 12x) ou boleto bancário. Após a confirmação do pagamento, você recebe acesso imediato ao curso.'
    },
    {
      question: 'O curso ensina sobre materiais e fornecedores?',
      answer: 'Sim! Você aprende tudo sobre os materiais necessários, marcas recomendadas, onde comprar com segurança e como escolher produtos de qualidade.'
    },
    {
      question: 'Posso tirar dúvidas durante o curso?',
      answer: 'Com certeza! Você tem acesso direto ao nosso grupo de suporte no WhatsApp, onde pode tirar todas as suas dúvidas diretamente com a professora e trocar experiências com outras alunas.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="section-header">
        <h2>Perguntas Frequentes</h2>
        <p>
          Tire suas dúvidas sobre o curso
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

