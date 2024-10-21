'use client'
export default function getFromLocalStorage(key: string) {
  if (!key || typeof window === 'undefined') {
    return ''
  }
  return localStorage.getItem(key)
}
