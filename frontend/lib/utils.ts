import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * ## cn
 * 合并并优化 Tailwind CSS 的类名工具函数
 *
 * ### 功能说明
 * - 先使用 clsx() 将任意格式的类名输入统一为一个字符串，并过滤掉无效值（如 false、undefined、null 等）
 * - 再使用 twMerge() 自动识别并移除冲突的 Tailwind CSS 类，例如重复的颜色、间距、字体大小等
 * - <p class="!text-green-600"> 后定义的 className 覆盖前定义的 </p>
 *
 * ### 适用场景
 * - 动态拼接类名时避免样式冲突
 * - 配合条件渲染和状态类（如 hover、disabled）使用
 * - 在组件库中作为标准 class 合并方法，提升代码可读性与稳定性
 *
 * ### 参数
 * @param inputs - 多个 className 值，可以是字符串、数组、布尔判断语句等
 *
 * @returns 处理后的 className 字符串，已去除无效值并优化 Tailwind 冲突类
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
