import API from "@/lib/api";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "creator" | "student";
  createdAt: string;
  updatedAt: string;
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await API<User>(`users/${userId}`, {
      method: "GET",
    });

    if (response.error || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await API<User>("users/me", {
      method: "GET",
    });

    if (response.error || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
