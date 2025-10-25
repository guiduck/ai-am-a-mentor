import { Metadata } from 'next'
import {
  HeroSection,
  InstructorSection,
  BenefitsSection,
  InstagramFeed,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from './components'
import './styles.css'

export const metadata: Metadata = {
  title: 'Curso de Estética Avançada - Domine Botox, Preenchimento e Mais',
  description: 'Aprenda técnicas avançadas de estética com profissional experiente. Botox, preenchimento, harmonização facial e muito mais.',
  openGraph: {
    title: 'Curso de Estética Avançada',
    description: 'Transforme sua carreira na estética',
    images: ['/og-estetica.jpg'],
  },
}

export default function EsteticaLandingPage() {
  return (
    <main className="landing-page">
      <HeroSection />
      <InstructorSection />
      <BenefitsSection />
      <InstagramFeed />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}

