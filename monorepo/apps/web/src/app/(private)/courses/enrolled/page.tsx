"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEnrolledCourses } from "@/services/courses";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import styles from "./page.module.css";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  createdAt: string;
  enrolledAt: string;
}

export default function EnrolledCoursesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "student") {
      loadEnrolledCourses();
    } else if (user?.role === "creator") {
      router.replace("/dashboard/creator");
    }
  }, [user, router]);

  const loadEnrolledCourses = async () => {
    try {
      const enrolledCourses = await getEnrolledCourses();
      setCourses(enrolledCourses);
    } catch (error) {
      console.error("Error loading enrolled courses:", error);
      toast.error("Erro ao carregar cursos inscritos");
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const handleBrowseCourses = () => {
    router.push("/courses");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h1>Carregando cursos...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Meus Cursos</h1>
            <p>Cursos em que você está inscrito</p>
          </div>
          <Button onClick={handleBrowseCourses} variant="primary">
            Explorar Mais Cursos
          </Button>
        </div>

        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <Card variant="default">
              <CardContent>
                <h2>Nenhum curso inscrito</h2>
                <p>
                  Você ainda não se inscreveu em nenhum curso. Que tal explorar
                  nossa seleção?
                </p>
                <Button onClick={handleBrowseCourses} variant="primary">
                  Explorar Cursos
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <Card key={course.id} variant="elevated">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <p className={styles.enrollmentDate}>
                    Inscrito em:{" "}
                    {new Date(course.enrolledAt).toLocaleDateString("pt-BR")}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className={styles.description}>{course.description}</p>
                  <div className={styles.courseFooter}>
                    <span className={styles.price}>
                      R$ {parseFloat(course.price).toFixed(2)}
                    </span>
                    <div className={styles.courseActions}>
                      <Button
                        onClick={() => handleViewCourse(course.id)}
                        variant="primary"
                        size="small"
                      >
                        Continuar Estudos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
