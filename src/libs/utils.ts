// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

import type { ClassValue } from 'clsx';
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  return initials;
}
