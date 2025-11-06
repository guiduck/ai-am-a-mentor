type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export interface APIResponse<T> {
  data: T | null;
  error: boolean;
  errorUserMessage: string;
  debug?: any;
  status: number;
  headers?: Headers | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Helper function to get token from cookie or Zustand store
function getAuthToken(): string | null {
  // Only works in browser (client-side)
  if (typeof document === "undefined") {
    return null;
  }

  // Try to get token from cookie first
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("access_token=")
  );

  if (accessTokenCookie) {
    // Extract token value (handles URL encoding)
    const tokenValue = accessTokenCookie.split("=").slice(1).join("=").trim();
    return decodeURIComponent(tokenValue);
  }

  // Fallback: try to get from Zustand store
  try {
    // Dynamic import to avoid SSR issues
    const { useAuthStore } = require("@/stores/authStore");
    const token = useAuthStore.getState().token;
    if (token) return token;
  } catch (e) {
    // Zustand store not available or error, continue
  }

  return null;
}

export default async function API<T = any>(
  url: string,
  options: {
    method?: "GET" | "POST" | "DELETE" | "PUT";
    headers?: Record<string, string>;
    data?: any;
    next?: NextFetchRequestConfig;
  } = {}
): Promise<APIResponse<T>> {
  const { method = "GET", headers = {}, data, next } = options;
  
  // Build full URL: remove trailing slash from BASE_URL
  const baseUrl = BASE_URL.replace(/\/$/, "");
  
  // Determine if we need to add /api prefix
  // If BASE_URL already ends with /api, don't add it again
  // If URL already starts with /api, don't add it again
  // If URL starts with /, treat as absolute path and use as-is
  let apiUrl: string;
  
  if (url.startsWith("/")) {
    // Absolute path - use as-is
    apiUrl = url;
  } else if (url.startsWith("api/")) {
    // Already has api/ prefix
    apiUrl = `/${url}`;
  } else if (baseUrl.endsWith("/api")) {
    // BASE_URL already has /api, just add the path
    apiUrl = `/${url}`;
  } else {
    // Need to add /api prefix
    apiUrl = `/api/${url}`;
  }
  
  const fullUrl = `${baseUrl}${apiUrl}`;

  // Get auth token and add to headers if available
  const token = getAuthToken();

  const isFormData = data instanceof FormData;

  // Build headers object
  const requestHeaders: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers, // Allow headers to override auth headers if needed
  };

  try {
    const response = await fetch(fullUrl, {
      method,
      next,
      credentials: "include", // This ensures cookies are sent with requests
      headers: requestHeaders,
      ...(method !== "GET" && data
        ? { body: isFormData ? data : JSON.stringify(data) }
        : {}),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: true,
        errorUserMessage: responseData?.message || "Erro desconhecido.",
        debug: responseData,
      };
    }

    return {
      status: response.status,
      data: responseData,
      error: false,
      errorUserMessage: "",
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      status: error.status ?? 500,
      data: null,
      error: true,
      errorUserMessage: "Erro no servidor.",
      headers: null,
      debug: error,
    };
  }
}
