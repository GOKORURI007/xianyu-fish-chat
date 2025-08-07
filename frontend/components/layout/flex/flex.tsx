"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { BoxProps } from "@/components/layout/box";

/**
 * - 基于 Tailwind CSS 的灵活布局组件，用于创建各种 flex 布局容器。
 * - 提供简洁的 API 来控制 flex 布局的各个方面，如方向、对齐、换行等。
 *
 * ## ✨ 功能说明
 *
 * - 使用 Tailwind CSS 类名实现所有 flex 布局功能
 * - 支持行 / 列方向、对齐方式、换行设置等
 * - 可设置 flex-grow、flex-shrink 和 flex-basis 属性
 * - 支持内联 flex 布局 (inline-flex)
 * - 支持自定义类名、额外 HTML 属性透传
 *
 * ## 🧠 实现原理
 *
 * - 将组件 props 映射到对应的 Tailwind CSS 类名
 * - 使用 cn() 函数合并和优化类名，避免冲突
 * - 通过 forwardRef 支持引用传递
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
 * @param direction - flex 方向，对应 flexDirection，可选值：'row'|'row-reverse'|'column'|'column-reverse'
 *
 * @param align - 交叉轴对齐方式，对应 alignItems，可选值：'start'|'end'|'center'|'baseline'|'stretch'
 *
 * @param justify - 主轴对齐方式，对应 justifyContent，可选值：'start'|'end'|'center'|'between'|'around'|'evenly'
 *
 * @param wrap - 换行方式，对应 flexWrap，可选值：'nowrap'|'wrap'|'wrap-reverse'
 *
 * @param basis - flex 基础尺寸，对应 flexBasis
 *
 * @param grow - 扩展比例，对应 flexGrow
 *
 * @param shrink - 收缩比例，对应 flexShrink
 *
 * @param inline - 是否使用 inline-flex 而不是 flex
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
 * // 基本行布局，居中对齐
 * <Flex align="center" justify="between" className="p-4 bg-gray-100">
 *   <div> 左侧内容 </div>
 *   <div> 右侧内容 </div>
 * </Flex>
 *
 * // 列布局，自动增长
 * <Flex direction="column" grow={1} className="h-full gap-2">
 *   <div> 顶部内容 </div>
 *   <div> 中间内容 </div>
 *   <div> 底部内容 </div>
 * </Flex>
 * ```
 */
export function Flex(
  {
    as: Tag = "div",
    direction,
    align,
    justify,
    wrap,
    basis,
    grow,
    shrink,
    inline = false,
    className,
    children,
    ...rest
  }: FlexProps
) {

  // 映射 direction 到 Tailwind 类名
  const directionClasses = {
    "row": "flex-row",
    "row-reverse": "flex-row-reverse",
    "column": "flex-col",
    "column-reverse": "flex-col-reverse",
  };

  // 映射 align 到 Tailwind 类名
  const alignClasses = {
    "start": "items-start",
    "end": "items-end",
    "center": "items-center",
    "baseline": "items-baseline",
    "stretch": "items-stretch",
  };

  // 映射 justify 到 Tailwind 类名
  const justifyClasses = {
    "start": "justify-start",
    "end": "justify-end",
    "center": "justify-center",
    "between": "justify-between",
    "around": "justify-around",
    "evenly": "justify-evenly",
  };

  // 映射 wrap 到 Tailwind 类名
  const wrapClasses = {
    "nowrap": "flex-nowrap",
    "wrap": "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse",
  };

  // 构建样式类名
  const flexClasses = cn(
    inline ? "inline-flex" : "flex",
    direction && directionClasses[direction],
    align && alignClasses[align],
    justify && justifyClasses[justify],
    wrap && wrapClasses[wrap],
    basis && `basis-[${basis}]`,
    grow && `grow-[${basis}]`,
    shrink && `shrink-[${basis}]`,
    className
  );

  return (
    <Tag
      className={flexClasses}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface FlexProps extends BoxProps {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  basis?: string;
  grow?: number | string;
  shrink?: number | string;
  inline?: boolean;
}
