import { forwardRef, LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        style={{
          display: "block",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-medium)",
          color: "var(--text-primary)",
          marginBottom: "var(--space-1)",
        }}
        className={className}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
