"use server";

import { cookies } from "next/headers";
import { registerUser } from "@/services/auth/register";
import { loginUser } from "@/services/auth/login";
import { APIResponse } from "@/lib/api";
import API from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
  role: "creator" | "student";
  createdAt: string;
  updatedAt: string;
}

export async function registerAndLogin(data: {
  email: string;
  password: string;
  username: string;
}): Promise<APIResponse<{ access_token: string }>> {
  // First register the user
  const registerRes = await registerUser(data);

  if (registerRes.error) {
    return {
      status: registerRes.status,
      error: true,
      errorUserMessage: registerRes.errorUserMessage,
      data: null,
      headers: registerRes.headers,
    };
  }

  // Then login automatically
  const loginRes = await loginUser({
    email: data.email,
    password: data.password,
  });

  if (loginRes.error || !loginRes.data?.token) {
    return {
      status: loginRes.status,
      error: true,
      errorUserMessage: loginRes.errorUserMessage || "Falha no login.",
      data: null,
      headers: loginRes.headers,
    };
  }

  const token = loginRes.data.token;
  const cookieStore = await cookies();

  // Set the access token cookie first
  cookieStore.set("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  // Fetch user data using the token directly
  try {
    const userResponse = await API<User>("users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.error && userResponse.data) {
      const userData = userResponse.data;

      // Set user role and data cookies
      cookieStore.set("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      cookieStore.set("user_role", userData.role, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      cookieStore.set("user_data", JSON.stringify(userData), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return {
        ...loginRes,
        error: false,
        data: { access_token: token },
        errorUserMessage: "",
      };
    } else {
      return {
        data: null,
        error: true,
        errorUserMessage: "Erro ao buscar dados do usuário",
        status: 500,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      data: null,
      error: true,
      errorUserMessage: "Erro ao buscar dados do usuário",
      status: 500,
    };
  }
}
