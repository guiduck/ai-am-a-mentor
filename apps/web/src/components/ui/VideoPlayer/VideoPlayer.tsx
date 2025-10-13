"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  src?: string;
  title?: string;
  onLoadStart?: () => void;
  onLoadedData?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function VideoPlayer({
  src,
  title,
  onLoadStart,
  onLoadedData,
  onError,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
      onLoadStart?.();
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      onLoadedData?.();
    };

    const handleError = () => {
      setIsLoading(false);
      const errorMessage =
        "Erro ao carregar o vídeo. O arquivo pode não existir ou estar inacessível.";
      setError(errorMessage);
      onError?.(errorMessage);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Add a timeout to catch videos that never load
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        handleError();
      }
    }, 10000); // 10 second timeout

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      clearTimeout(loadTimeout);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [src, onLoadStart, onLoadedData, onError, isLoading]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  if (!src) {
    return (
      <div className={`${styles.videoContainer} ${className || ""}`}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>📹</div>
          <p>Nenhum vídeo disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.videoContainer} ${className || ""}`}>
      {error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorDetails}>
            <p className={styles.errorHint}>Possíveis causas:</p>
            <ul className={styles.errorList}>
              <li>O vídeo ainda não foi enviado para o servidor</li>
              <li>O arquivo não existe no armazenamento</li>
              <li>Problema de conectividade</li>
            </ul>
            <p className={styles.errorNote}>
              <strong>Nota:</strong> Se você acabou de criar este vídeo, você
              precisa fazer o upload do arquivo primeiro.
            </p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className={styles.video}
            controls
            preload="metadata"
            crossOrigin="anonymous"
            aria-label={title || "Vídeo da aula"}
          >
            <source src={src} type="video/mp4" />
            <source src={src} type="video/webm" />
            <source src={src} type="video/ogg" />
            Seu navegador não suporta o elemento de vídeo.
          </video>

          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <p>Carregando vídeo...</p>
            </div>
          )}

          {/* Custom play button overlay for better UX */}
          {!isPlaying && !isLoading && !error && (
            <div className={styles.playOverlay} onClick={handlePlayPause}>
              <div className={styles.playButton}>
                <div className={styles.playIcon}>▶</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
