"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "@/services/courses";
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
  creatorId: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    username: string;
  };
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const allCourses = await getCourses();
      setCourses(allCourses);
    } catch (error) {
      console.error("Error loading courses:", error);
      toast.error("Erro ao carregar cursos");
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId: string) => {
    router.push(`/course/${courseId}`);
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
          <h1>Todos os Cursos</h1>
          <p>Descubra cursos incríveis com mentoria de IA</p>
        </div>

        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <Card variant="default">
              <CardContent>
                <h2>Nenhum curso encontrado</h2>
                <p>Ainda não há cursos disponíveis na plataforma.</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <Card key={course.id} variant="elevated">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <p className={styles.creator}>
                    Por: {course.creator?.username || "Autor desconhecido"}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className={styles.description}>{course.description}</p>
                  <div className={styles.courseFooter}>
                    <span className={styles.price}>
                      R$ {parseFloat(course.price).toFixed(2)}
                    </span>
                    <Button
                      onClick={() => handleViewCourse(course.id)}
                      variant="primary"
                      size="small"
                    >
                      Ver Curso
                    </Button>
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
