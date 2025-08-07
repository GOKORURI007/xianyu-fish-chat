import React from "react";
import { cn } from "@/lib/utils";

/**
 * - 基础布局组件，提供灵活的 HTML 元素渲染选择，支持多种语义化标签。
 * - 简化布局开发，允许统一样式管理和属性传递，保持代码整洁。
 * - 支持完整的 HTML 属性透传，实现高度定制化的 UI 构建。
 *
 * ## ✨ 功能说明
 *
 * - 允许指定渲染的 HTML 元素类型（div、span、section 等）
 * - 支持自定义类名合并，利用 cn 工具函数处理类名组合
 * - 透传所有标准 HTML 属性到渲染的元素
 * - 提供类型安全的接口，确保只能使用支持的 HTML 元素类型
 *
 * ## 🧠 实现原理
 *
 * - 使用 React 的 JSX 语法动态渲染指定的 HTML 元素
 * - 通过解构赋值和属性展开运算符实现属性透传
 * - 利用 TypeScript 接口确保类型安全和开发时的代码提示
 * - 默认渲染为 div 元素，可通过 as 属性指定其他支持的元素类型
 *
 * ## 🧾 Props
 *
 * @param as - 指定要渲染的 HTML 元素类型，可选值：
 *   - `div`：默认值，通用容器
 *   - `span`：行内元素
 *   - `section`：文档区块
 *   - `header`：页头区域
 *   - `footer`：页脚区域
 *   - `aside`：侧边栏
 *
 * @param className - 额外的 Tailwind CSS 类名，用于自定义元素样式
 *
 * @param children - 子元素，可以是任何有效的 React 节点
 *
 * @param rest - 其他标准 HTML 属性（如 id、data-*、aria-* 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * // 基本用法
 * <Box as="div" className="p-4 bg-gray-100">
 *   基本容器
 * </Box>
 *
 * // 语义化标签
 * <Box as="section" className="my-8">
 *   <h2>Section Title</h2>
 *   <p>Section content goes here</p>
 * </Box>
 *
 * // 行内元素
 * <p>
 *   This is a paragraph with <Box as="span" className="font-bold text-blue-500">highlighted text</Box>.
 * </p>
 *
 * // 页面结构
 * <Box as="header" className="sticky top-0 bg-white shadow-md">
 *   页面头部
 * </Box>
 * ```
 */
export function Box(
  {
    as: Tag = "div",
    className = "",
    children,
    ...rest
  }: BoxProps
) {
  return (
    <Tag className={
      cn(
        className,
      )}
         {...rest}
    >
      {children}
    </Tag>
  );
}

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "span" | "section" | "header" | "footer" | "aside";
}
