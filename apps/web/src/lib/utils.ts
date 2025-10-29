import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString()
}

export function isOverdue(dueDate?: number): boolean {
  if (!dueDate) return false
  return dueDate < Date.now()
}
