import { clsx, type ClassValue } from 'clsx';
import deburr from 'lodash.deburr';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return deburr(str.normalize('NFKD'))
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]/g, '') // Remove non-word characters and hyphens
    .replace(/--+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens;
}

export function scrollToTop() {
  const isBrowser = () => typeof window !== 'undefined';
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
