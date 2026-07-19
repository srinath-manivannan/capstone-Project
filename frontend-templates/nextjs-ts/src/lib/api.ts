/**
 * ============================================
 * 📄 WHAT : STEP 3 — the ONE fetch wrapper every request goes through.
 * 🎯 WHY  : Next.js runs code in TWO places: the SERVER (server components)
 *           and the BROWSER (client components). Native fetch works in both —
 *           that's why this template uses fetch, not axios. Base URL, headers
 *           and error handling are configured ONCE, here.
 * 🔁 FLOW : lib/todosApi.ts ➜ THIS FILE ➜ the backend
 * ============================================
 */
import { env } from './env';

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${env.API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    // Demo choice: always fetch fresh. Next.js can also CACHE server fetches —
    // change to { next: { revalidate: 60 } } for 60s incremental caching.
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  // DELETE responses may have no body — treat empty as undefined.
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
