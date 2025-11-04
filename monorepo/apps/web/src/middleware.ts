import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/landing", "/login", "/register", "/estetica"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const userRole = req.cookies.get("user_role")?.value;
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const pathname = req.nextUrl.pathname;

  // AUTHENTICATION: Redirect to login if no token and not on public route
  if (!token && !isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // AUTHENTICATION: Redirect to dashboard if has token and on public route
  if (token && isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ROLE-BASED ROUTING: Only if authenticated and has role
  if (token && userRole) {
    // Handle /dashboard redirect based on user role
    if (pathname === "/dashboard") {
      const url = req.nextUrl.clone();
      if (userRole === "creator") {
        url.pathname = "/dashboard/creator";
      } else if (userRole === "student") {
        url.pathname = "/dashboard/student";
      }
      return NextResponse.redirect(url);
    }

    // Handle role-based routing protection
    if (pathname.startsWith("/dashboard/creator") && userRole !== "creator") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/student";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/dashboard/student") && userRole !== "student") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard/creator";
      return NextResponse.redirect(url);
    }

    // Handle courses creation - only creators
    if (pathname.startsWith("/courses/create") && userRole !== "creator") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
