// until.tsx
// Lightweight API utility for GET / POST / PUT / DELETE using fetch
// Usage examples at the bottom.

type ApiResponse<T> = {
  ok: boolean;
  status: number;
  data?: T | null;
  error?: string | null;
};

export type RequestOptions = {
  baseURL?: string; // overrides defaultBaseURL
  token?: string; // optional bearer token
  signal?: AbortSignal; // optional abort signal
  headers?: Record<string, string>;
  timeoutMs?: number; // optional timeout in ms
  withCredentials?: boolean; // optional with credentials
};

const defaultBaseURL = 'http://localhost:3000/api';
const defaultTimeout = 30_000; // 30s

function buildUrl(base: string, path: string, params?: Record<string, string | number | boolean>) {
  const cleanBase = base?.replace(/\/$/, "");
  const cleanPath = path?.replace(/^\//, "");
  const url = cleanBase ? `${cleanBase}/${cleanPath}` : cleanPath;
  if (!params || Object.keys(params).length === 0) return url;
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    search.append(k, String(v));
  });
  return `${url}?${search.toString()}`;
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, timeoutMs = defaultTimeout) {
  if (init.signal) return fetch(input, init);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const contentType = res.headers.get("content-type") || "";
  const result: ApiResponse<T> = { ok: res.ok, status: res.status };
  try {
    if (contentType.includes("application/json")) {
      const json = await res.json();
      if (res.ok) result.data = json;
      else result.error = json?.message || JSON.stringify(json);
    } else {
      const text = await res.text();
      if (res.ok) result.data = (text as unknown) as T;
      else result.error = text;
    }
  } catch (err: any) {
    // JSON parse error or stream error
    if (res.ok) result.data = null;
    else result.error = err?.message ?? String(err);
  }
  return result;
}

function buildHeaders(token?: string, extra?: Record<string, string>) {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    ...extra,
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function get<T = any>(
  path: string,
  params?: Record<string, string | number | boolean>,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const base = options?.baseURL ?? defaultBaseURL;
  const url = buildUrl(base, path, params as Record<string, string | number | boolean>);
  const headers = buildHeaders(options?.token, options?.headers);
  try {
    const res = await fetchWithTimeout(url, { method: "GET", headers, signal: options?.signal }, options?.timeoutMs ?? defaultTimeout);
    return await handleResponse<T>(res as Response);
  } catch (err: any) {
    return { ok: false, status: 0, error: err.name === 'AbortError' ? 'Request aborted' : String(err) };
  }
}

export async function post<T = any, B = any>(
  path: string,
  body?: B,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const base = options?.baseURL ?? defaultBaseURL;
  const url = buildUrl(base, path);
  const headers = buildHeaders(options?.token, { "Content-Type": "application/json", ...(options?.headers || {}) });
  try {
    const res = await fetchWithTimeout(url, { method: "POST", headers, body: body ? JSON.stringify(body) : undefined, signal: options?.signal,credentials: options?.withCredentials ? "include" : "same-origin" }, options?.timeoutMs ?? defaultTimeout);
    return await handleResponse<T>(res as Response);
  } catch (err: any) {
    return { ok: false, status: 0, error: err.name === 'AbortError' ? 'Request aborted' : String(err) };
  }
}

export async function put<T = any, B = any>(
  path: string,
  body?: B,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const base = options?.baseURL ?? defaultBaseURL;
  const url = buildUrl(base, path);
  const headers = buildHeaders(options?.token, { "Content-Type": "application/json", ...(options?.headers || {}) });
  try {
    const res = await fetchWithTimeout(url, { method: "PUT", headers, body: body ? JSON.stringify(body) : undefined, signal: options?.signal }, options?.timeoutMs ?? defaultTimeout);
    return await handleResponse<T>(res as Response);
  } catch (err: any) {
    return { ok: false, status: 0, error: err.name === 'AbortError' ? 'Request aborted' : String(err) };
  }
}

export async function del<T = any>(
  path: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const base = options?.baseURL ?? defaultBaseURL;
  const url = buildUrl(base, path);
  const headers = buildHeaders(options?.token, options?.headers);
  try {
    const res = await fetchWithTimeout(url, { method: "DELETE", headers, signal: options?.signal }, options?.timeoutMs ?? defaultTimeout);
    return await handleResponse<T>(res as Response);
  } catch (err: any) {
    return { ok: false, status: 0, error: err.name === 'AbortError' ? 'Request aborted' : String(err) };
  }
}

export async function patch<T = any, B = any>(
  path: string,
  body?: B,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const base = options?.baseURL ?? defaultBaseURL;
  const url = buildUrl(base, path);
  const headers = buildHeaders(options?.token, { "Content-Type": "application/json", ...(options?.headers || {}) });

  try {
    const res = await fetchWithTimeout(
      url,
      { method: "PATCH", headers, body: body ? JSON.stringify(body) : undefined, signal: options?.signal },
      options?.timeoutMs ?? defaultTimeout
    );
    return await handleResponse<T>(res as Response);
  } catch (err: any) {
    return { ok: false, status: 0, error: err.name === "AbortError" ? "Request aborted" : String(err) };
  }
}