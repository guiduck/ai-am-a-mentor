import { useAuthStore } from "@/stores/authStore";
import API from "@/lib/api";

// Initialize user data by calling the API (cookies will be sent automatically)
export async function initializeAuthFromAPI() {
  try {
    const response = await API<{
      id: string;
      username: string;
      email: string;
      role: "creator" | "student";
      createdAt: string;
      updatedAt: string;
    }>("users/me", {
      method: "GET",
    });

    if (!response.error && response.data) {
      // Get token from cookies (we need to access it somehow)
      // Since we can't read httpOnly cookies, we'll pass the token from the server action
      useAuthStore.getState().setAuth(response.data, "");
    }
  } catch (error) {
    console.error("Error initializing auth from API:", error);
  }
}
