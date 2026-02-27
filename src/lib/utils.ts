import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const storage = {
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(`arb_${key}`, JSON.stringify(value))
    } catch (e) {
      console.error('Storage error:', e)
    }
  },
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(`arb_${key}`)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(`arb_${key}`)
  },
}

export const generateId = (): string =>
  Math.random().toString(36).substring(2) + Date.now().toString(36)

export const formatDate = (date: string): string => {
  if (!date) return 'Present'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', year: 'numeric',
  })
}

export const truncate = (str: string, n: number): string =>
  str.length > n ? str.slice(0, n - 1) + '…' : str