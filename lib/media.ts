import type { SupabaseClient } from "@supabase/supabase-js";

export const MEDIA_BUCKET = "media";
export const MEDIA_REFERENCE_PREFIX = "media://";

export function toMediaReference(path: string) {
  return `${MEDIA_REFERENCE_PREFIX}${path}`;
}

export function getMediaPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith(MEDIA_REFERENCE_PREFIX)) return null;
  const path = value.slice(MEDIA_REFERENCE_PREFIX.length);
  return path && !path.startsWith("/") && !path.includes("..") ? path : null;
}

export async function signManagedMedia(
  supabase: SupabaseClient,
  value: string | null | undefined,
  expiresIn = 3600
) {
  const path = getMediaPath(value);
  if (!path) return value ?? null;
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, expiresIn);
  if (error) return null;
  return data.signedUrl;
}

export async function removeManagedMedia(supabase: SupabaseClient, values: unknown[]) {
  const paths = [...new Set(values.map(getMediaPath).filter((path): path is string => Boolean(path)))];
  if (!paths.length) return null;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove(paths);
  return error;
}
