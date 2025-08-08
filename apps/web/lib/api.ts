export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

type JsonRequestInit = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  headers?: HeadersInit | Record<string, string>;
};

export async function jsonFetch<T>(
  url: string,
  options: JsonRequestInit = {}
): Promise<{ ok: boolean; status: number; data?: T; error?: unknown }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const payload = isJson ? await res.json().catch(() => undefined) : undefined;

    return {
      ok: res.ok,
      status: res.status,
      data: res.ok ? (payload as T) : undefined,
      error: res.ok ? undefined : payload ?? (await res.text().catch(() => undefined)),
    };
  } catch (error) {
    return { ok: false, status: 0, error };
  }
}
