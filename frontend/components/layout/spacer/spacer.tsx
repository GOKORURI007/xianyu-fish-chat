"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * - 一个灵活的弹性空间占位组件，沿其包含的 flex 布局的主轴扩展。
 * - 默认渲染为 `div` 元素，并占据任何可用空间。
 * - 常用于 Flex 布局中创建动态间距或推动元素到容器边缘。
 *
 * ## ✨ 功能说明
 *
 * - 使用 `flex: 1` 自动扩展占据可用空间
 * - 设置 `justifySelf: stretch` 和 `alignSelf: stretch` 确保在 Grid 布局中也能正常工作
 * - 支持自定义类名、额外 HTML 属性透传
 *
 * ## 🧠 实现原理
 *
 * - 利用 Flexbox 的 `flex-grow` 属性自动填充可用空间
 * - 在 Flex 容器中放置此组件可以将其他元素推向两端
 * - 可以放置多个 Spacer 组件来均匀分布元素
 *
 * ## 🧾 Props
 *
 * @param className - 额外的 Tailwind CSS 类名，用于自定义样式
 *
 * @param rest - 其他标准 HTMLDivElement 属性（如 `id`、`data-*` 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * // 将元素推向容器两端
 * <Flex>
 *   <Button> 左侧 </Button>
 *   <Spacer />
 *   <Button> 右侧 </Button>
 * </Flex>
 *
 * // 均匀分布多个元素
 * <Flex>
 *   <Button> 左 </Button>
 *   <Spacer />
 *   <Button> 中 </Button>
 *   <Spacer />
 *   <Button> 右 </Button>
 * </Flex>
 * ```
 */
export function Spacer({className, ...rest}: SpacerProps) {
  return (
    <div
      className={cn("flex-1 self-stretch justify-self-stretch", className)}
      {...rest}
    />
  );
}

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
}
