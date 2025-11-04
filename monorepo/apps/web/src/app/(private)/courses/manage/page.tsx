"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCoursesByCreator } from "@/services/courses";
import { deleteCourse } from "@/actions/courses";
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
  creatorId: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  course: Course | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

function DeleteModal({
  isOpen,
  course,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteModalProps) {
  if (!isOpen || !course) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Confirmar Exclusão</h2>
        </div>
        <div className={styles.modalContent}>
          <p>
            Tem certeza que deseja deletar o curso{" "}
            <strong>"{course.title}"</strong>?
          </p>
          <p className={styles.warning}>
            ⚠️ Esta ação irá deletar permanentemente:
          </p>
          <ul className={styles.warningList}>
            <li>O curso e todas suas informações</li>
            <li>Todos os vídeos associados ao curso</li>
            <li>Todas as inscrições de estudantes</li>
          </ul>
          <p className={styles.warning}>Esta ação não pode ser desfeita!</p>
        </div>
        <div className={styles.modalActions}>
          <Button onClick={onCancel} variant="outline" disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            loading={isDeleting}
            style={{ backgroundColor: "var(--color-error)" }}
          >
            {isDeleting ? "Deletando..." : "Sim, Deletar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreatorCoursesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    course: Course | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    course: null,
    isDeleting: false,
  });

  useEffect(() => {
    if (user?.role === "creator") {
      loadCourses();
    } else if (user?.role === "student") {
      router.replace("/dashboard/student");
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

  const handleDeleteClick = (course: Course) => {
    setDeleteModal({
      isOpen: true,
      course,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.course) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      const result = await deleteCourse(deleteModal.course.id);

      if (result?.error) {
        toast.error(result.errorUserMessage);
      } else {
        toast.success("Curso deletado com sucesso!");
        // Remove course from local state
        setCourses((prev) =>
          prev.filter((c) => c.id !== deleteModal.course?.id)
        );
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Erro ao deletar curso");
    } finally {
      setDeleteModal({
        isOpen: false,
        course: null,
        isDeleting: false,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      course: null,
      isDeleting: false,
    });
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
            <p>Gerencie todos os seus cursos</p>
          </div>
          <Button
            onClick={() => router.push("/courses/create")}
            variant="primary"
          >
            Criar Novo Curso
          </Button>
        </div>

        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <Card variant="default">
              <CardContent>
                <h2>Nenhum curso criado</h2>
                <p>Você ainda não criou nenhum curso. Que tal começar agora?</p>
                <Button
                  onClick={() => router.push("/courses/create")}
                  variant="primary"
                >
                  Criar Primeiro Curso
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
                  <p className={styles.courseDate}>
                    Criado em:{" "}
                    {new Date(course.createdAt).toLocaleDateString("pt-BR")}
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
                        onClick={() => router.push(`/course/${course.id}`)}
                        variant="outline"
                        size="small"
                      >
                        Ver Curso
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(course)}
                        variant="outline"
                        size="small"
                        style={{
                          color: "var(--color-error)",
                          borderColor: "var(--color-error)",
                        }}
                      >
                        Deletar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        course={deleteModal.course}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isDeleting={deleteModal.isDeleting}
      />
    </div>
  );
}
