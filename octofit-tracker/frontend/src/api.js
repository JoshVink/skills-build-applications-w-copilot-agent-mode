/**
 * Returns the OctoFit backend API base URL.
 *
 * Reads VITE_CODESPACE_NAME from the Vite environment.
 * Define it in .env.local:
 *   VITE_CODESPACE_NAME=your-codespace-name
 *
 * Falls back to http://localhost:8000 when unset so local dev always works
 * and avoids the "https://undefined-8000..." broken URL.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL =
  codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

/**
 * Extracts an array from a response object that may be either:
 *   { users: [...] }          – direct key
 *   { data: [...], total: N } – paginated wrapper
 *   [...]                     – raw array
 */
export function extractRows(data, key) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data[key])) return data[key];
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}
