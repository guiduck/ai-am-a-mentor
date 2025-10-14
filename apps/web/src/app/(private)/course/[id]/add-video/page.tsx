"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createVideo } from "@/services/videos";
import API from "@/lib/api";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import styles from "./page.module.css";

const addVideoSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(255, "Título muito longo"),
  duration: z
    .number()
    .int()
    .positive("Duração deve ser um número positivo")
    .optional(),
});

type AddVideoFormData = z.infer<typeof addVideoSchema>;

export default function AddVideoPage() {
  const { id: courseId } = useParams() as { id: string };
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AddVideoFormData>({
    resolver: zodResolver(addVideoSchema),
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("video/")) {
        toast.error("Por favor, selecione um arquivo de vídeo válido");
        return;
      }

      // Validate file size (100MB limit)
      const maxSize = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSize) {
        toast.error("Arquivo muito grande. Tamanho máximo: 100MB");
        return;
      }

      setSelectedFile(file);

      // Auto-fill title from filename if not set
      const currentTitle = watch("title");
      if (!currentTitle) {
        const filename = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        setValue("title", filename);
      }
    }
  };

  const onSubmit = async (data: AddVideoFormData) => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo de vídeo");
      return;
    }

    try {
      setUploading(true);

      // Step 1: Upload file directly to our backend (which uploads to R2)
      toast.info("Enviando arquivo para o servidor...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Use the centralized API service for upload
      const uploadResponse = await API<{
        key: string;
        filename: string;
        contentType: string;
        size: number;
        message: string;
      }>("videos/upload-direct", {
        method: "POST",
        data: formData,
      });

      if (uploadResponse.error || !uploadResponse.data) {
        console.error("Upload failed:", uploadResponse.debug);
        throw new Error(
          `Upload falhou: ${
            uploadResponse.errorUserMessage || "Erro desconhecido"
          }`
        );
      }

      const uploadResult = uploadResponse.data;
      toast.success("Upload concluído!");

      // Step 2: Create video record in database
      toast.info("Salvando informações do vídeo...");
      await createVideo({
        courseId,
        title: data.title,
        r2Key: uploadResult.key,
        duration: data.duration,
      });

      toast.success("Vídeo adicionado com sucesso!");
      router.push(`/course/${courseId}`);
    } catch (error: any) {
      console.error("Error adding video:", error);
      toast.error(error.message || "Erro ao adicionar vídeo");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <div className={styles.header}>
          <Button onClick={handleCancel} variant="outline" size="small">
            ← Voltar ao Curso
          </Button>
          <h1 className={styles.title}>Adicionar Novo Vídeo</h1>
        </div>

        {/* Form */}
        <Card variant="elevated" className={styles.formCard}>
          <CardHeader>
            <CardTitle>Informações do Vídeo</CardTitle>
            <p className={styles.subtitle}>
              Faça upload de um novo vídeo para o curso
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {/* File Upload */}
              <div className={styles.formGroup}>
                <Label htmlFor="video-file">Arquivo de Vídeo</Label>
                <div className={styles.fileUpload}>
                  <input
                    id="video-file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className={styles.fileInput}
                  />
                  <div className={styles.fileUploadArea}>
                    {selectedFile ? (
                      <div className={styles.selectedFile}>
                        <div className={styles.fileIcon}>📹</div>
                        <div className={styles.fileInfo}>
                          <p className={styles.fileName}>{selectedFile.name}</p>
                          <p className={styles.fileSize}>
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.uploadPrompt}>
                        <div className={styles.uploadIcon}>📁</div>
                        <p>Clique para selecionar um arquivo de vídeo</p>
                        <p className={styles.uploadHint}>
                          Formatos suportados: MP4, MOV, AVI (máx. 100MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <div className={styles.formGroup}>
                <Label htmlFor="title">Título do Vídeo</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Digite o título da aula"
                  {...register("title")}
                />
                {errors.title && (
                  <p className={styles.errorMessage}>
                    <span>⚠</span>
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className={styles.formGroup}>
                <Label htmlFor="duration">Duração (segundos) - Opcional</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Ex: 300 (para 5 minutos)"
                  {...register("duration", {
                    setValueAs: (value) =>
                      value === "" ? undefined : parseInt(value),
                  })}
                />
                {errors.duration && (
                  <p className={styles.errorMessage}>
                    <span>⚠</span>
                    {errors.duration.message}
                  </p>
                )}
                <p className={styles.fieldHint}>
                  Se não informado, será detectado automaticamente durante o
                  processamento
                </p>
              </div>

              {/* Submit Buttons */}
              <div className={styles.submitButtons}>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  disabled={isSubmitting || uploading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting || uploading}
                  disabled={!selectedFile}
                >
                  {uploading ? "Fazendo upload..." : "Adicionar Vídeo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {uploading && (
          <Card variant="default" className={styles.progressCard}>
            <CardContent>
              <div className={styles.progressInfo}>
                <div className={styles.progressIcon}>⏳</div>
                <div>
                  <p className={styles.progressTitle}>Processando vídeo...</p>
                  <p className={styles.progressText}>
                    Isso pode levar alguns minutos dependendo do tamanho do
                    arquivo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
