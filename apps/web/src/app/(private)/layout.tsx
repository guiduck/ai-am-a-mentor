import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <div className="min-h-screen bg-secondary">{children}</div>;
}
