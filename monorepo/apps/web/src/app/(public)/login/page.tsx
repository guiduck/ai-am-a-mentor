import Link from "next/link";
import FormLogin from "@/components/forms/form-login";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <Link href="/landing" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <span className="text-white font-bold">AI</span>
            </div>
            <span className={styles.logoText}>AI Am A Mentor</span>
          </Link>
        </div>

        <FormLogin />

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Não tem uma conta?{" "}
            <Link href="/register" className={styles.footerLink}>
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
