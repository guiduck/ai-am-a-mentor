"use server";

import { cookies } from "next/headers";
import { APIResponse } from "@/lib/api";
import API from "@/lib/api";

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

interface CreateCourseData {
  title: string;
  description: string;
  price: number;
}

// Create a new course (creators only)
export async function createCourse(
  courseData: CreateCourseData
): Promise<APIResponse<Course> | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return {
        data: null,
        error: true,
        errorUserMessage: "Você precisa estar logado para criar um curso",
        status: 401,
      };
    }

    const response = await API<{ message: string; course: Course }>("courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: courseData,
    });

    if (response.error || !response.data) {
      return {
        data: null,
        error: true,
        errorUserMessage: response.errorUserMessage || "Erro ao criar curso",
        status: response.status,
      };
    }

    return {
      data: response.data.course,
      error: false,
      errorUserMessage: "",
      status: response.status,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      data: null,
      error: true,
      errorUserMessage: "Erro interno do servidor",
      status: 500,
    };
  }
}

// Delete a course (creators only)
export async function deleteCourse(
  courseId: string
): Promise<APIResponse<{ message: string }> | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return {
        data: null,
        error: true,
        errorUserMessage: "Você precisa estar logado para deletar um curso",
        status: 401,
      };
    }

    const response = await API<{ message: string }>(`courses/${courseId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.error || !response.data) {
      return {
        data: null,
        error: true,
        errorUserMessage: response.errorUserMessage || "Erro ao deletar curso",
        status: response.status,
      };
    }

    return {
      data: response.data,
      error: false,
      errorUserMessage: "",
      status: response.status,
    };
  } catch (error) {
    console.error("Error deleting course:", error);
    return {
      data: null,
      error: true,
      errorUserMessage: "Erro interno do servidor",
      status: 500,
    };
  }
}

// Enroll in a course (students only)
export async function enrollInCourse(
  courseId: string
): Promise<APIResponse<{ message: string }> | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return {
        data: null,
        error: true,
        errorUserMessage:
          "Você precisa estar logado para se inscrever em um curso",
        status: 401,
      };
    }

    const response = await API<{ message: string }>(
      `students/enroll/${courseId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.error || !response.data) {
      return {
        data: null,
        error: true,
        errorUserMessage:
          response.errorUserMessage || "Erro ao se inscrever no curso",
        status: response.status,
      };
    }

    return {
      data: response.data,
      error: false,
      errorUserMessage: "",
      status: response.status,
    };
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return {
      data: null,
      error: true,
      errorUserMessage: "Erro interno do servidor",
      status: 500,
    };
  }
}
