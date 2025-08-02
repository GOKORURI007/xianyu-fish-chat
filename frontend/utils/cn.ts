import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

/**
 * 合并多个Tailwind CSS类名
 * @param inputs 可选的CSS类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}