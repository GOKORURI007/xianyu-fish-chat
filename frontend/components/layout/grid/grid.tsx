"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { BoxProps } from "@/components/layout/box";

/**
 * - 基于 Tailwind CSS 的网格布局组件，用于创建各种 grid 布局容器。
 * - 提供简洁的 API 来控制 grid 布局的各个方面，如模板列、模板行、区域等。
 *
 * ## ✨ 功能说明
 *
 * - 使用 Tailwind CSS 类名实现所有 grid 布局功能
 * - 支持设置网格模板列、行、区域
 * - 支持自动流、自动行、自动列设置
 * - 支持内联网格布局 (inline-grid)
 * - 支持自定义类名、额外 HTML 属性透传
 *
 * ## 🧠 实现原理
 *
 * - 将组件 props 映射到对应的 Tailwind CSS 类名
 * - 使用 cn() 函数合并和优化类名，避免冲突
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
 * @param templateColumns - 网格模板列，对应 gridTemplateColumns
 *
 * @param templateRows - 网格模板行，对应 gridTemplateRows
 *
 * @param templateAreas - 网格模板区域，对应 gridTemplateAreas
 *
 * @param autoFlow - 自动流方向，对应 gridAutoFlow，可选值：'row'|'column'|'row dense'|'column dense'
 *
 * @param autoRows - 自动行大小，对应 gridAutoRows
 *
 * @param autoColumns - 自动列大小，对应 gridAutoColumns
 *
 * @param column - 网格列位置，对应 gridColumn
 *
 * @param row - 网格行位置，对应 gridRow
 *
 * @param inline - 是否使用 inline-grid 而不是 grid
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
 * // 基本网格布局
 * <Grid templateColumns="repeat(3, 1fr)" gap="4" className="p-4 bg-gray-100">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 *
 * // 使用网格区域
 * <Grid
 *   templateAreas={`"header header"
 *                   "nav main"
 *                   "footer footer"`}
 *   templateColumns="200px 1fr"
 *   className="h-screen"
 * >
 *   <div style={{ gridArea: "header" }}>Header</div>
 *   <div style={{ gridArea: "nav" }}>Navigation</div>
 *   <div style={{ gridArea: "main" }}>Main Content</div>
 *   <div style={{ gridArea: "footer" }}>Footer</div>
 * </Grid>
 * ```
 */
export function Grid(
  {
    as: Tag = "div",
    templateColumns,
    templateRows,
    templateAreas,
    autoFlow,
    autoRows,
    autoColumns,
    column,
    row,
    inline = false,
    className,
    children,
    ...rest
  }: GridProps
) {
  // 映射 autoFlow 到 Tailwind 类名
  const autoFlowClasses = {
    "row": "grid-flow-row",
    "column": "grid-flow-col",
    "row dense": "grid-flow-row-dense",
    "column dense": "grid-flow-col-dense",
  };

  // 构建样式类名
  const gridClasses = cn(
    inline ? "inline-grid" : "grid",
    autoFlow && autoFlowClasses[autoFlow as keyof typeof autoFlowClasses],
    className
  );

  // 构建内联样式对象，用于处理Tailwind不直接支持的grid属性
  const gridStyles: React.CSSProperties = {
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    gridTemplateAreas: templateAreas,
    gridAutoRows: autoRows,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
  };

  return (
    <Tag
      className={gridClasses}
      style={gridStyles}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface GridProps extends BoxProps {
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
  autoFlow?: "row" | "column" | "row dense" | "column dense";
  autoRows?: string;
  autoColumns?: string;
  column?: string;
  row?: string;
  inline?: boolean;
}
