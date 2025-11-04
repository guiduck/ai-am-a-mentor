import API from "@/lib/api";

export interface Course {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  price: string; // Backend returns as string
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    username: string;
  };
  videos?: Video[];
  enrolledAt?: string; // For enrolled courses
}

export interface Video {
  id: string;
  courseId: string;
  title: string;
  r2Key: string;
  transcriptR2Key?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
}

export interface EnrollmentStatus {
  isEnrolled: boolean;
  enrolledAt: string | null;
}

// Get all courses (public)
export async function getCourses(): Promise<Course[]> {
  try {
    const response = await API<Course[]>("courses", {
      method: "GET",
    });

    if (response.error || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Get course by ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const response = await API<Course>(`courses/${courseId}`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

// Create new course (creators only)
export async function createCourse(
  courseData: CreateCourseData
): Promise<Course | null> {
  try {
    const response = await API<{ message: string; course: Course }>("courses", {
      method: "POST",
      data: courseData,
    });

    if (response.error || !response.data) {
      throw new Error(response.errorUserMessage || "Erro ao criar curso");
    }

    return response.data.course;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

// Get courses by creator (creators only)
export async function getCoursesByCreator(): Promise<Course[]> {
  try {
    const response = await API<Course[]>("creators/courses", {
      method: "GET",
    });

    if (response.error || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching creator courses:", error);
    return [];
  }
}

// Get enrolled courses (students only)
export async function getEnrolledCourses(): Promise<Course[]> {
  try {
    const response = await API<Course[]>("students/courses", {
      method: "GET",
    });

    if (response.error || !response.data) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
}

// Enroll in course (students only)
export async function enrollInCourse(
  courseId: string
): Promise<{ message: string; enrollment: any }> {
  try {
    const response = await API<{ message: string; enrollment: any }>(
      `students/enroll/${courseId}`,
      {
        method: "POST",
      }
    );

    if (response.error || !response.data) {
      throw new Error(
        response.errorUserMessage || "Erro ao se inscrever no curso"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
}

// Check enrollment status (students only)
export async function checkEnrollmentStatus(
  courseId: string
): Promise<EnrollmentStatus | null> {
  try {
    const response = await API<EnrollmentStatus>(
      `students/enrollment/${courseId}`,
      {
        method: "GET",
      }
    );

    if (response.error || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return null;
  }
}
