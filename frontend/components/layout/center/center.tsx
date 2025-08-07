"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * - 一个 React 组件，用于水平和垂直居中其子元素。
 *
 * - 使用流行的 `display: flex` 居中技术，结合 Tailwind CSS 实现。
 *
 * ## ✨ 功能说明
 *
 * - 使用 Tailwind CSS 的 flex 布局实现子元素的水平和垂直居中
 * - 支持 inline 变体，可以切换为 inline-flex 布局
 * - 支持所有标准的 div HTML 属性
 *
 * ## 🧠 实现原理
 *
 * - 使用 flex 布局 (flex, items-center, justify-center) 实现居中
 * - 通过 inline prop 控制是否为 inline-flex
 * - 使用 TypeScript 进行类型检查
 * - 使用 cn 工具函数合并类名
 *
 * ## 🧾 Props
 *
 * @param inline - 是否使用 inline-flex 布局，默认为 false
 *
 * @param className - 额外的 Tailwind 类名
 *
 * @param children - 要居中的内容
 *
 * @param rest - 其他标准 HTMLDivElement 属性
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * <Center className="h-64 bg-gray-100">
 *   <span> 居中内容 </span>
 * </Center>
 * ```
 *
 * ## 📐 功能测试
 */
export function Center(
  {inline = false, className = "", children, ...rest}
  : {
    inline?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        inline ? "inline-flex" : "flex",
        "items-center justify-center",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
