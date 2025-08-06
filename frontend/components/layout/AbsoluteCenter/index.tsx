"use client";

import React from "react";
import { cn } from "@/lib/utils";


/**
 * ## 组件功能：
 *
 *  使用 Tailwind CSS 实现子元素在父容器内的绝对居中展示，
 *  支持水平、垂直和双向三种轴向居中方式。
 *
 * ## 实现思路与方法：
 *
 *  - 父容器需设置 position: relative，子元素设置 position: absolute 脱离文档流。
 *  - 使用 Tailwind 的 flex 布局（flex、items-center、justify-center），让子元素内部内容居中。
 *  - 根据 axis 属性值，使用 left-1/2、top-1/2 与 -translate-x-1/2、-translate-y-1/2 完成不同方向上的居中位移。
 *  - 通过 TypeScript 类型约束，确保 axis 只能是 horizontal、vertical 或 both，并设置默认值 both。
 *  - 借助 tailwindcss-dir 插件，添加 ltr:/rtl: 前缀实现双向布局支持
 *  - clsx + tailwindMerge 实现类名拼接。
 *
 * ## props:
 *
 * @param axis - 指定居中轴向，可选值：
 *   - "horizontal"：纯水平居中
 *   - "vertical"：纯垂直居中
 *   - "both"：水平 + 垂直双向居中，默认值
 *
 * @param className - 额外的 Tailwind 类名
 *
 * @param children - 要居中的内容
 *
 * @param rest - 其他标准 HTMLDivElement 属性（如 `id`、`data-*` 等）
 *
 * ## 使用示例：
 *
 * ```tsx
 * <div className="relative w-64 h-64 bg-gray-100" dir="rtl">
 *   <AbsoluteCenter axis="horizontal">
 *     <span className="bg-red-800">RTL 水平居中 </span>
 *   </AbsoluteCenter>
 * </div>
 * ```
 */
export function AbsoluteCenter(
  {axis = "both", className = "", children, ...rest}:
  AbsoluteCenterProps) {
  // axis -> Tailwind 类名映射，支持 LTR/RTL
  const axisClasses = {
    horizontal:
      "ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2",
    vertical: "top-1/2 -translate-y-1/2",
    both:
      "ltr:left-1/2 rtl:right-1/2 top-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2",
  };

  // 基础类名：绝对定位 + flex 居中 + transform 支持位移
  const baseClasses = "absolute flex items-center justify-center transform";
  if (!["horizontal", "vertical", "both"].includes(axis)) axis = "both";
  return (
    <div
      className={cn(baseClasses, axisClasses[axis], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface AbsoluteCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  axis?: "horizontal" | "vertical" | "both";
}