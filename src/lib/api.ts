/**
 * GadgetHub API client.
 *
 * ── HOW BACKEND INTEGRATION WORKS ─────────────────────────────────────────
 * Every page consumes data through the service functions in `src/services/`.
 * Today those services resolve local mock data (src/data/*) so the frontend
 * is fully browsable without a backend.
 *
 * When the backend is ready:
 *   1. Set VITE_API_URL in .env (e.g. http://localhost:5000)
 *   2. Replace each service function body with the corresponding
 *      `api.get/post` call listed in API_INTEGRATION.md.
 *
 * The `request` helper below already handles base URL, JSON, auth token
 * headers and error normalisation — services only pass a path.
 * ──────────────────────────────────────────────────────────────────────────
 */

const BASE_URL: string = import.meta.env.VITE_API_URL ?? '';

const TOKEN_KEY = 'gadgethub_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text || res.statusText);
  }
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

/** Format a Naira amount the way the designs do: ₦1.4M, ₦950k, ₦180k */
export function formatNaira(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `₦${m % 1 === 0 ? m : m.toFixed(m * 10 % 1 === 0 ? 1 : 2)}M`;
  }
  if (amount >= 1_000) return `₦${Math.round(amount / 1_000)}k`;
  return `₦${amount}`;
}

export function formatRange(min: number, max: number): string {
  return `${formatNaira(min)} – ${formatNaira(max)}`;
}
