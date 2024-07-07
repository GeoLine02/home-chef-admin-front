// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function http(uri: string, options: any) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  return fetch(`${apiBaseUrl}${uri || ""}`, options);
}
