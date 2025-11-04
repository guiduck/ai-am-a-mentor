"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import {
  getCourseById,
  Course,
  enrollInCourse,
  checkEnrollmentStatus,
  EnrollmentStatus,
} from "@/services/courses";
import { getCourseVideos, Video } from "@/services/videos";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function CourseDetailPage() {
  const { id: courseId } = useParams() as { id: string };
  const { user } = useAuthStore();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [enrollmentStatus, setEnrollmentStatus] =
    useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (courseId && user) {
      loadCourseData();
    }
  }, [courseId, user]);

  const loadCourseData = async () => {
    try {
      setLoading(true);

      // Load course details
      const courseData = await getCourseById(courseId);
      if (!courseData) {
        toast.error("Curso não encontrado");
        router.push("/courses");
        return;
      }
      setCourse(courseData);

      // Load videos if user has access
      if (user?.role === "creator" && courseData.creatorId === user.id) {
        // Creator can always see their own course videos
        const courseVideos = await getCourseVideos(courseId);
        setVideos(courseVideos);
      } else if (user?.role === "student") {
        // Check enrollment status first
        const status = await checkEnrollmentStatus(courseId);
        setEnrollmentStatus(status);

        if (status?.isEnrolled) {
          // Student is enrolled, load videos
          const courseVideos = await getCourseVideos(courseId);
          setVideos(courseVideos);
        }
      }
    } catch (error) {
      console.error("Error loading course data:", error);
      toast.error("Erro ao carregar dados do curso");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user || user.role !== "student") return;

    try {
      setEnrolling(true);
      await enrollInCourse(courseId);
      toast.success("Inscrição realizada com sucesso!");

      // Reload course data to show videos
      await loadCourseData();
    } catch (error: any) {
      toast.error(error.message || "Erro ao se inscrever no curso");
    } finally {
      setEnrolling(false);
    }
  };

  const handleAddVideo = () => {
    router.push(`/course/${courseId}/add-video`);
  };

  const handleWatchVideo = (videoId: string) => {
    router.push(`/course/${courseId}/lesson/${videoId}`);
  };

  const handleEditVideo = (videoId: string) => {
    router.push(`/course/${courseId}/edit-video/${videoId}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando curso...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Curso não encontrado</div>
      </div>
    );
  }

  const isCreator = user?.role === "creator" && course.creatorId === user.id;
  const isStudent = user?.role === "student";
  const isEnrolled = enrollmentStatus?.isEnrolled || false;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Course Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.description}>{course.description}</p>
            <div className={styles.courseInfo}>
              <span className={styles.price}>R$ {course.price}</span>
              <span className={styles.videoCount}>
                {videos.length} {videos.length === 1 ? "vídeo" : "vídeos"}
              </span>
              {course.creator && (
                <span className={styles.creator}>
                  por {course.creator.username}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            {isCreator && (
              <Button onClick={handleAddVideo} variant="primary">
                Adicionar Vídeo
              </Button>
            )}

            {isStudent && !isEnrolled && (
              <Button
                onClick={handleEnroll}
                variant="primary"
                loading={enrolling}
              >
                {enrolling ? "Inscrevendo..." : "Se Inscrever"}
              </Button>
            )}
          </div>
        </div>

        {/* Videos Section */}
        {(isCreator || (isStudent && isEnrolled)) && (
          <div className={styles.videosSection}>
            <h2 className={styles.sectionTitle}>
              {isCreator ? "Gerenciar Vídeos" : "Aulas do Curso"}
            </h2>

            {videos.length === 0 ? (
              <Card variant="default">
                <CardContent>
                  <p className={styles.emptyMessage}>
                    {isCreator
                      ? "Nenhum vídeo adicionado ainda. Clique em 'Adicionar Vídeo' para começar."
                      : "Este curso ainda não possui vídeos."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className={styles.videoGrid}>
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    variant="elevated"
                    className={styles.videoCard}
                  >
                    <CardHeader>
                      <CardTitle className={styles.videoTitle}>
                        {video.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={styles.videoInfo}>
                        {video.duration && (
                          <span className={styles.duration}>
                            {Math.floor(video.duration / 60)}:
                            {(video.duration % 60).toString().padStart(2, "0")}
                          </span>
                        )}
                        <span className={styles.createdAt}>
                          {new Date(video.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>

                      <div className={styles.videoActions}>
                        {isCreator ? (
                          <>
                            <Button
                              onClick={() => handleWatchVideo(video.id)}
                              variant="outline"
                              size="small"
                            >
                              Visualizar
                            </Button>
                            <Button
                              onClick={() => handleEditVideo(video.id)}
                              variant="primary"
                              size="small"
                            >
                              Editar
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleWatchVideo(video.id)}
                            variant="primary"
                            size="small"
                            fullWidth
                          >
                            Assistir Aula
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Not Enrolled Message for Students */}
        {isStudent && !isEnrolled && (
          <Card variant="default" className={styles.enrollmentCard}>
            <CardContent>
              <h3>Inscreva-se para acessar o conteúdo</h3>
              <p>
                Para ter acesso a todas as aulas deste curso, você precisa se
                inscrever. Clique no botão "Se Inscrever" acima para começar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
