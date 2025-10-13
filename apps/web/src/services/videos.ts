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
export async function getVideoStreamUrl(videoId: string): Promise<{
  streamUrl: string;
  video: { id: string; title: string; duration?: number };
} | null> {
  try {
    const response = await API<{
      streamUrl: string;
      video: { id: string; title: string; duration?: number };
    }>(`videos/${videoId}/stream`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      console.error("Error getting stream URL:", response.errorUserMessage);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error getting stream URL:", error);
    return null;
  }
}
