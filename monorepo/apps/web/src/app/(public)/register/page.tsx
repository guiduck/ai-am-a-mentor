import Link from "next/link";
import FormRegister from "@/components/forms/form-register";
import styles from "./page.module.css";

export default function RegisterPage() {
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

        <FormRegister />

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Já tem uma conta?{" "}
            <Link href="/login" className={styles.footerLink}>
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
