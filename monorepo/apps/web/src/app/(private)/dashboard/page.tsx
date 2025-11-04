"use client";

export default function DashboardPage() {
  // This page should never be seen because middleware will redirect
  // to /dashboard/creator or /dashboard/student based on user role
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        fontSize: "var(--text-lg)",
        color: "var(--text-secondary)",
      }}
    >
      Carregando dashboard...
    </div>
  );
}
