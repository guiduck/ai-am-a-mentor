"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutUser() {
  const cookieStore = await cookies();
  
  // Delete all auth-related cookies
  cookieStore.delete("access_token");
  cookieStore.delete("user_role");
  cookieStore.delete("user_data");
  cookieStore.delete("refresh_token");
  
  // Redirect to login
  redirect("/login");
}
