"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { logoutUser } from "@/actions/logout";
import { getEnrolledCourses, Course } from "@/services/courses";
import { initializeAuthFromAPI } from "@/lib/auth-utils";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import styles from "./page.module.css";
import { toast } from "sonner";

export default function StudentDashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth from API if user is null
    if (!user) {
      initializeAuthFromAPI();
    }
  }, [user]);

  useEffect(() => {
    // Redirect if not student
    if (user && user.role !== "student") {
      router.replace("/dashboard/creator");
      return;
    }

    // Load courses if we have user data
    if (user) {
      loadEnrolledCourses();
    }
  }, [user, router]);

  const loadEnrolledCourses = async () => {
    try {
      const courses = await getEnrolledCourses();
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error loading enrolled courses:", error);
      toast.error("Erro ao carregar cursos inscritos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/logout";
    }
  };

  const handleBrowseCourses = () => {
    router.push("/courses");
  };

  const handleViewMyCourses = () => {
    router.push("/courses/enrolled");
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Dashboard do Estudante</h1>
            <p>Bem-vindo de volta, {user?.username || "Estudante"}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        <div className={styles.cardsGrid}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Meus Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.cardDescription}>
                {loading
                  ? "Carregando..."
                  : `Você está inscrito em ${enrolledCourses.length} curso${
                      enrolledCourses.length !== 1 ? "s" : ""
                    }.`}
              </p>
              <Button
                onClick={handleViewMyCourses}
                variant="primary"
                size="small"
              >
                Ver Meus Cursos
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Explorar Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.cardDescription}>
                Descubra novos cursos e expanda seus conhecimentos.
              </p>
              <Button
                onClick={handleBrowseCourses}
                variant="primary"
                size="small"
              >
                Explorar
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.cardDescription}>
                Acompanhe seu progresso nos cursos e conquistas.
              </p>
              <Button variant="primary" size="small">
                Ver Progresso
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className={styles.accountInfo}>
          <Card variant="default">
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.infoList}>
                <p className={styles.infoItem}>
                  <span className={styles.infoLabel}>ID:</span> {user?.id}
                </p>
                <p className={styles.infoItem}>
                  <span className={styles.infoLabel}>Nome:</span>{" "}
                  {user?.username}
                </p>
                <p className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span> {user?.email}
                </p>
                <p className={styles.infoItem}>
                  <span className={styles.infoLabel}>Tipo:</span> Estudante
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
