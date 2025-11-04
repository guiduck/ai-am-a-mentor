import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button/Button";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/landing" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="text-white font-bold">AI</span>
            </div>
            <span className={styles.logoText}>Am A Mentor</span>
          </Link>
          <div className={styles.navActions}>
            <ButtonLink href="/login" variant="ghost">
              Entrar
            </ButtonLink>
            <ButtonLink href="/register" variant="primary">
              Começar Grátis
            </ButtonLink>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Aprenda qualquer assunto com{" "}
            <span className={styles.heroHighlight}>mentoria de IA</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Desenvolva novas habilidades em qualquer área do conhecimento com
            cursos práticos, projetos reais e feedback personalizado de
            inteligência artificial.
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/register" variant="primary" size="large">
              Começar Agora - Grátis
            </ButtonLink>
            <ButtonLink href="#features" variant="outline" size="large">
              Explorar Cursos
            </ButtonLink>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>50k+</div>
            <div className={styles.statLabel}>Estudantes</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Cursos</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>4.9</div>
            <div className={styles.statLabel}>Avaliação</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>95%</div>
            <div className={styles.statLabel}>Satisfação</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className={styles.categoriesContainer}>
          <h2 className={styles.categoriesTitle}>Explore nossas categorias</h2>
          <p className={styles.categoriesSubtitle}>
            Encontre o curso perfeito para desenvolver suas habilidades
          </p>
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>💼</div>
              <div className={styles.categoryName}>Negócios</div>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>💻</div>
              <div className={styles.categoryName}>Tecnologia</div>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>🎨</div>
              <div className={styles.categoryName}>Design</div>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>📈</div>
              <div className={styles.categoryName}>Marketing</div>
            </div>
            <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>📸</div>
              <div className={styles.categoryName}>Fotografia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.featuresTitle}>
            Por que escolher nossa plataforma?
          </h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3 className={styles.featureTitle}>Mentoria de IA</h3>
              <p className={styles.featureDescription}>
                Assistente de IA treinado com o conteúdo dos cursos para tirar
                suas dúvidas em tempo real.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎥</div>
              <h3 className={styles.featureTitle}>Cursos em Vídeo</h3>
              <p className={styles.featureDescription}>
                Conteúdo em vídeo de alta qualidade sobre diversas áreas do
                conhecimento.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📚</div>
              <h3 className={styles.featureTitle}>Todas as Áreas</h3>
              <p className={styles.featureDescription}>
                Cursos de programação, design, marketing, negócios e muito mais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Pronto para começar?</h2>
          <p className={styles.ctaSubtitle}>
            Junte-se a milhares de estudantes que já estão aprendendo com nossa
            IA.
          </p>
          <ButtonLink href="/register" variant="secondary" size="large">
            Criar Conta Gratuita
          </ButtonLink>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            &copy; 2024 AI Am A Mentor. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
