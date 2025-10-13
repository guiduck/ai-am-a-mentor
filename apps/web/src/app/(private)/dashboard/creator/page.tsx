"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { logoutUser } from "@/actions/logout";
import { getCoursesByCreator, Course } from "@/services/courses";
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

export default function CreatorDashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    // Initialize auth from API if user is null
    if (!user) {
      initializeAuthFromAPI();
    }
  }, [user]);

  useEffect(() => {
    // Redirect if not creator
    if (user && user.role !== "creator") {
      router.replace("/dashboard/student");
      return;
    }

    // Load courses if we have user data
    if (user) {
      loadCourses();
    }
  }, [user, router]);

  const loadCourses = async () => {
    try {
      const creatorCourses = await getCoursesByCreator();
      setCourses(creatorCourses);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast.error("Erro ao carregar cursos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  const handleCreateCourse = () => {
    router.push("/courses/create");
  };

  const handleViewCourses = () => {
    router.push("/courses/manage");
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Dashboard do Criador</h1>
            <p>Bem-vindo de volta, {user?.username || "Criador"}!</p>
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
                  : `Você tem ${courses.length} curso${
                      courses.length !== 1 ? "s" : ""
                    } criado${courses.length !== 1 ? "s" : ""}.`}
              </p>
              <Button
                onClick={handleViewCourses}
                variant="primary"
                size="small"
              >
                Ver Cursos
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Criar Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.cardDescription}>
                Crie um novo curso com vídeos e mentoria de IA.
              </p>
              <Button
                onClick={handleCreateCourse}
                variant="primary"
                size="small"
              >
                Novo Curso
              </Button>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={styles.cardDescription}>
                Veja o desempenho dos seus cursos e estudantes.
              </p>
              <Button variant="primary" size="small">
                Ver Stats
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
                  <span className={styles.infoLabel}>Tipo:</span> Criador
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
