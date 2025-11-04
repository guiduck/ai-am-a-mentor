"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { AuthService } from "@/lib/services/auth";

export function useAuthInitialization() {
  const { user, token } = useAuthStore();

  useEffect(() => {
    // Initialize user data from cookies on app startup
    if (!user && !token && typeof document !== 'undefined') {
      AuthService.initializeUserFromCookies();
    }
  }, [user, token]);

  useEffect(() => {
    // If we have a token but no user data, try cookies first, then API
    if (token && !user) {
      const userFromCookies = AuthService.getUserFromCookies();
      if (userFromCookies) {
        useAuthStore.getState().setAuth(userFromCookies, token);
      } else {
        // Fallback: fetch from API and update cookies
        AuthService.getCurrentUser().then((userData) => {
          if (userData) {
            // Update cookies with fresh data
            document.cookie = `user_data=${JSON.stringify(userData)}; path=/; max-age=3600`;
            document.cookie = `user_role=${userData.role}; path=/; max-age=3600`;
            
            useAuthStore.getState().setAuth(userData, token);
          }
        }).catch((error) => {
          console.error("Failed to fetch user data:", error);
          // If API fails, clear invalid token
          useAuthStore.getState().clearAuth();
          window.location.href = "/login";
        });
      }
    }
  }, [token, user]);

  return { user, token, isLoading: token && !user };
}
