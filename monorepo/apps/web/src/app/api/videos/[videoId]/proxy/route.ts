import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await params;
    const cookieStore = await cookies();

    // Get token from cookie
    const accessToken = cookieStore.get("access_token")?.value;

    // Try to get from Authorization header as fallback if no cookie
    const authHeader = request.headers.get("authorization");
    const token = accessToken || authHeader?.replace("Bearer ", "");

    if (!token) {
      console.error("No authentication token found in cookie or header");
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Token found, proxying video request...");

    // Get backend API URL
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 }
      );
    }

    // Remove trailing slash and /api if present to avoid duplication
    const cleanBackendUrl = backendUrl.replace(/\/$/, "").replace(/\/api$/, "");
    const proxyUrl = `${cleanBackendUrl}/api/videos/${videoId}/proxy`;

    // Forward the request to the backend with authentication
    const response = await fetch(proxyUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        // Forward range headers for video seeking
        ...(request.headers.get("range")
          ? { Range: request.headers.get("range")! }
          : {}),
      },
      // Don't follow redirects
      redirect: "manual",
    });

    console.log("Backend response status:", response.status);

    // Build headers object to forward from backend
    const headers = new Headers();
    
    // Copy all relevant headers from backend response
    const contentType = response.headers.get("content-type");
    const contentLength = response.headers.get("content-length");
    const contentRange = response.headers.get("content-range");
    
    if (contentType) headers.set("Content-Type", contentType);
    if (contentLength) headers.set("Content-Length", contentLength);
    if (contentRange) headers.set("Content-Range", contentRange);
    
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "public, max-age=3600");

    // If the response is not ok, return error
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend returned error:", response.status, errorText);
      return NextResponse.json(
        { message: "Failed to fetch video", error: errorText },
        { status: response.status }
      );
    }

    // Stream the video response (don't load entire video into memory)
    const stream = response.body;
    
    if (!stream) {
      console.error("No stream body in backend response");
      return NextResponse.json(
        { message: "No video stream available" },
        { status: 500 }
      );
    }

    console.log("Streaming video with headers:", {
      contentType,
      contentLength,
      contentRange,
      status: response.status,
    });

    // IMPORTANT: Pass the stream directly to NextResponse
    // Next.js handles streaming natively and will properly manage the connection
    // Wrapping the stream causes issues with cancellation and state management
    const videoResponse = new NextResponse(stream, {
      status: response.status, // Preserve 200 or 206
      headers: headers,
    });

    // Log when the response is actually sent (not when it's created)
    console.log("✅ Video response created, streaming will start automatically");

    return videoResponse;
  } catch (error) {
    console.error("Error proxying video:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

