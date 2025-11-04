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
  const fullUrl = `${BASE_URL}/${url}`;

  const isFormData = data instanceof FormData;

  try {
    const response = await fetch(fullUrl, {
      method,
      next,
      credentials: "include", // This ensures cookies are sent with requests
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
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
