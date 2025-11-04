import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();

    // Delete all auth-related cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token"); // in case we add this later
    cookieStore.delete("user_role");
    cookieStore.delete("user_data");

    // Create response with redirect
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Also set cookies to expire immediately as backup
    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("user_role", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    response.cookies.set("user_data", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, redirect to login
    return NextResponse.redirect(
      new URL(
        "/login",
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      )
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
