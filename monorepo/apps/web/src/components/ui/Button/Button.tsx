import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${fullWidth ? styles.fullWidth : ""} 
        ${loading ? styles.loading : ""} 
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${fullWidth ? styles.fullWidth : ""} 
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
