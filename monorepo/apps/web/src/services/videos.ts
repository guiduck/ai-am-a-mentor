import API from "@/lib/api";

export interface Video {
  id: string;
  courseId: string;
  title: string;
  r2Key: string;
  transcriptR2Key?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
  course?: {
    id: string;
    title: string;
    description: string;
    creatorId: string;
  };
}

export interface UploadUrlResponse {
  uploadUrl: string;
  fields: Record<string, string>;
  key: string;
  filename: string;
  contentType: string;
  bucket: string;
}

export interface CreateVideoData {
  courseId: string;
  title: string;
  r2Key: string;
  duration?: number;
}

export interface UpdateVideoData {
  title?: string;
  duration?: number;
}

// Create a new video/lesson
export async function createVideo(
  videoData: CreateVideoData
): Promise<Video | null> {
  try {
    const response = await API<{ message: string; video: Video }>("videos", {
      method: "POST",
      data: videoData,
    });

    if (response.error || !response.data) {
      throw new Error(response.errorUserMessage || "Erro ao criar vídeo");
    }

    return response.data.video;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
}

// Get videos for a specific course
export async function getCourseVideos(courseId: string): Promise<Video[]> {
  try {
    const response = await API<Video[]>(`courses/${courseId}/videos`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching course videos:", error);
    return [];
  }
}

// Get a specific video by ID
export async function getVideoById(videoId: string): Promise<Video | null> {
  try {
    const response = await API<Video>(`videos/${videoId}`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

// Update a video
export async function updateVideo(
  videoId: string,
  updateData: UpdateVideoData
): Promise<Video | null> {
  try {
    const response = await API<{ message: string; video: Video }>(
      `videos/${videoId}`,
      {
        method: "PUT",
        data: updateData,
      }
    );

    if (response.error || !response.data) {
      throw new Error(response.errorUserMessage || "Erro ao atualizar vídeo");
    }

    return response.data.video;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
}

// Delete a video
export async function deleteVideo(
  videoId: string
): Promise<{ message: string } | null> {
  try {
    const response = await API<{ message: string }>(`videos/${videoId}`, {
      method: "DELETE",
    });

    if (response.error || !response.data) {
      throw new Error(response.errorUserMessage || "Erro ao deletar vídeo");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
}

// Generate upload URL for video upload to Cloudflare R2
export async function generateUploadUrl(
  filename: string,
  contentType: string
): Promise<UploadUrlResponse> {
  try {
    const response = await API<UploadUrlResponse>("videos/upload-url", {
      method: "POST",
      data: { filename, contentType },
    });

    if (response.error || !response.data) {
      throw new Error(
        response.errorUserMessage || "Erro ao gerar URL de upload"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error generating upload URL:", error);
    throw error;
  }
}

// Get streaming URL for a video
// Uses proxy endpoint to avoid CORS issues with Cloudflare R2
export async function getVideoStreamUrl(videoId: string): Promise<{
  streamUrl: string;
  video: { id: string; title: string; duration?: number };
} | null> {
  try {
    // First get video metadata from /stream endpoint
    const response = await API<{
      streamUrl: string;
      video: { id: string; title: string; duration?: number };
    }>(`videos/${videoId}/stream`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      console.error("Error getting stream URL:", {
        error: response.error,
        errorMessage: response.errorUserMessage,
        status: response.status,
        debug: response.debug,
      });
      return null;
    }

    // Use presigned URL directly from R2 (requires CORS configuration in Cloudflare R2)
    // This is simpler and more performant than proxying through our servers
    const streamUrl = response.data.streamUrl;

    console.log(
      "Using direct R2 presigned URL for video streaming:",
      streamUrl.substring(0, 100) + "..."
    );

    // Return presigned URL directly with video metadata
    return {
      streamUrl: streamUrl,
      video: response.data.video,
    };
  } catch (error) {
    console.error("Error getting stream URL:", error);
    return null;
  }
}

// Get video as blob URL (for authenticated streaming)
// This function fetches the video with authentication and creates a blob URL
// This is necessary because <video> elements don't send cookies automatically in cross-origin requests
export async function getVideoBlobUrl(videoId: string): Promise<string | null> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const baseUrl = BASE_URL.replace(/\/$/, "");
    const proxyUrl = `${baseUrl}/api/videos/${videoId}/proxy`;

    // Get auth token from cookie or Zustand store
    const getAuthToken = (): string | null => {
      if (typeof document === "undefined") return null;

      // Try to get token from cookie first
      const cookies = document.cookie.split(";");
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("access_token=")
      );

      if (accessTokenCookie) {
        const tokenValue = accessTokenCookie
          .split("=")
          .slice(1)
          .join("=")
          .trim();
        return decodeURIComponent(tokenValue);
      }

      // Fallback: try to get from Zustand store
      try {
        const { useAuthStore } = require("@/stores/authStore");
        const token = useAuthStore.getState().token;
        if (token) return token;
      } catch (e) {
        // Zustand store not available
      }

      return null;
    };

    const token = getAuthToken();

    if (!token) {
      console.error("No authentication token available for video streaming");
      return null;
    }

    console.log("Fetching video with authentication...");

    // Fetch video with authentication headers
    const videoResponse = await fetch(proxyUrl, {
      method: "GET",
      credentials: "include", // Include cookies
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!videoResponse.ok) {
      console.error("Failed to fetch video:", {
        status: videoResponse.status,
        statusText: videoResponse.statusText,
      });
      return null;
    }

    // Convert response to blob
    const blob = await videoResponse.blob();

    // Create blob URL
    const blobUrl = URL.createObjectURL(blob);

    console.log("Video blob URL created successfully");

    return blobUrl;
  } catch (error) {
    console.error("Error creating video blob URL:", error);
    return null;
  }
}
