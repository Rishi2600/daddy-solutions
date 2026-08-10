export type ClassValue = string | number | null | undefined | false;

/** Tiny className joiner — keeps the bundle free of extra dependencies. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
