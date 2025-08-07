"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * - 基于 Tailwind CSS 的浮动定位组件，用于创建相对于容器的浮动元素。
 * - 提供简洁的 API 来控制元素的位置。
 *
 * ## ✨ 功能说明
 *
 * - 使用 Tailwind CSS 类名实现所有浮动定位功能
 * - 支持多种预设位置：顶部、底部、中间，以及开始、中心、结束对齐
 * - 支持自定义类名、额外 HTML 属性透传
 *
 * ## 🧠 实现原理
 *
 * - 将组件 props 映射到对应的静态 Tailwind CSS 类名
 * - 使用静态类名确保 Tailwind JIT 能正确识别所有类名
 * - 使用 cn() 函数合并和优化类名，避免冲突
 * - 不使用内联样式，确保用户可以通过 className 完全覆盖组件样式
 *
 * ## 🧾 Props
 *
 * @param placement - 位置，可选值：'top-start'|'top-end'|'top-center'|'bottom-start'|
 * 'bottom-end'|'bottom-center'|'middle-start'|'middle-end'|'middle-center'
 *
 * @param className - 额外的 Tailwind CSS 类名，用于自定义容器样式
 *
 * @param children - 子元素
 *
 * @param rest - 其他标准 HTMLDivElement 属性（如 id、data-* 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * // 基本用法，右上角定位
 * <div className="relative">
 *   <Anchor placement="top-end">
 *     <div className="p-2 bg-red-500 text-white">New</div>
 *   </Anchor>
 *   <div> 主要内容 </div>
 * </div>
 *
 * // 使用自定义类名添加偏移
 * <div className="relative">
 *   <Anchor placement="bottom-start" className="mb-2 ml-2">
 *     <div className="p-2 bg-blue-500 text-white"> 提示 </div>
 *   </Anchor>
 *   <div> 主要内容 </div>
 * </div>
 * ```
 */
export function Anchor(
  {
    placement = "top-end",
    className,
    ...rest
  }: AnchorProps
) {
  // 解析位置参数
  const [side, align] = placement.split("-");

  // 使用静态类名
  const positionClasses = cn(
    "inline-flex justify-center items-center absolute",
    // 垂直位置类
    {
      "top-0": side === "top",
      "top-1/2": side === "middle",
      "bottom-0": side === "bottom",
    },
    // 水平位置类
    {
      "left-0": align === "start",
      "left-1/2": align === "center",
      "right-0": align === "end",
    },
    // 变换类
    {
      "transform": true, // 始终应用 transform
      "-translate-y-1/2": side === "middle" || side === "top",
      "translate-y-1/2": side === "bottom",

      "-translate-x-1/2": align === "center" || align === "start",
      "translate-x-1/2": align === "end",
    },
    className
  );

  return (
    <div
      className={positionClasses}
      {...rest}
    />
  );
}

export interface AnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "top-end"
    | "top-start"
    | "bottom-center"
    | "top-center"
    | "middle-center"
    | "middle-end"
    | "middle-start"
    | undefined;
}
