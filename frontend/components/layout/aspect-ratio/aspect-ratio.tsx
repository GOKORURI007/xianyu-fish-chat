"use client";
import React, { Children, cloneElement, isValidElement, ReactElement } from "react";
import { cn } from "@/lib/utils";


/**
 * - 用于嵌入具有固定宽高比的响应式内容，如视频、地图、图片等。
 * - 自动适配容器宽度，保持指定比例的高度，适用于各种媒体展示场景。
 * - <p class="!text-green-600">仅支持通过 width 调整容器大小</p>
 *
 * ## ✨ 功能说明
 *
 * - 使用 `padding-bottom` 技巧实现响应式宽高比容器
 * - 子元素绝对定位填满容器，支持居中展示
 * - 自动为 `<img>` / `<video>` 等媒体元素添加 `object-cover`，实现裁剪填充
 * - 支持自定义类名、额外 HTML 属性透传
 *
 * ## 🧠 实现原理
 *
 * - 外层容器设置 `position: relative` 和 `width: 100%`
 * - 内部插入一个空块元素，设置 `padding-bottom: (1 / ratio) * 100%`，撑起高度
 * - 内容容器使用 `absolute inset-0` 填满父容器，并设置 `flex` 居中
 * - 使用 `React.cloneElement` 注入 `className`，确保子元素填满并裁剪
 *
 * ## 🧾 Props
 *
 * @param ratio - 宽高比（默认值为 4/3），例如：
 *   - `16 / 9`：常见视频比例
 *   - `1`：正方形
 *   - `4 / 3`：默认比例
 *
 * @param className - 额外的 Tailwind CSS 类名，用于自定义容器样式
 *
 * @param children - 仅支持一个子元素，通常为 `<img>`、`<video>` 或嵌套内容
 *
 * @param rest - 其他标准 HTMLDivElement 属性（如 `id`、`data-*` 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="rounded-lg shadow-md">
 *   <img src="https://placekitten.com/800/450" alt="Kitten" />
 * </AspectRatio>
 *
 * <AspectRatio ratio={1}>
 *   <video src="/demo.mp4" autoPlay muted loop />
 * </AspectRatio>
 * ```
 *
 * ## 📐 功能测试
 */
export function AspectRatio(
  {ratio = 4 / 3, children, className, ...rest}: AspectRatioProps
) {
  // 确保只传入一个子元素
  const child = Children.only(children);

  return (
    <div
      className={cn("relative w-full", className)}
      {...rest}
    >

      {/* 利用 padding-bottom 实现宽高比 */}
      <div
        className="block w-full"
        style={{paddingBottom: `${(1 / ratio) * 100}%`}}
      />

      {/* 使用 `React.cloneElement` 注入 `className`*/}
      <div
        className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden">
        {isValidElement(child) &&
          cloneElement(child as ReactElement<any>, {
            className: cn("w-full h-full object-cover", (child.props as any).className),
          })}
      </div>

    </div>
  );
}

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}