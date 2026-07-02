import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolve an image/asset path for the current deploy base.
 * - absolute URLs (http/https) are returned unchanged
 * - a leading "/" is stripped, then `import.meta.env.BASE_URL` is prefixed
 */
export function assetUrl(path?: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}

/**
 * Build a responsive `srcset` for a resolved .webp URL, pairing the 640px
 * variant (`foo-640.webp`, generated at build-prep time) with the full image.
 * Returns undefined for non-webp (e.g. placeholder.svg) so callers can spread it.
 */
export function imgSrcSet(url?: string): string | undefined {
  if (!url || !/\.webp$/i.test(url)) return undefined;
  const sm = url.replace(/\.webp$/i, "-640.webp");
  return `${sm} 640w, ${url} 1600w`;
}
