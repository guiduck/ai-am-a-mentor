import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{
          width: "100%",
          padding: "var(--space-3) var(--space-4)",
          border: "2px solid var(--color-gray-200)",
          borderRadius: "var(--radius-lg)",
          fontSize: "var(--text-base)",
          fontFamily: "inherit",
          transition: "var(--transition-base)",
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          e.target.style.outline = "none";
          e.target.style.borderColor = "var(--color-primary)";
          e.target.style.boxShadow = "0 0 0 3px rgba(255, 144, 232, 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--color-gray-200)";
          e.target.style.boxShadow = "none";
        }}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
