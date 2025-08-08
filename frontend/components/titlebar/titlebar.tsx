"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Flex } from "@/components/layout/flex";
import { Spacer } from "@/components/layout/spacer";
import { Center } from "@/components/layout/center";
import { TitlebarControlButton } from "@/components/titlebar/titlebar-control-button";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";

/**
 * - 自定义窗口标题栏组件，提供应用程序标题显示和窗口控制按钮。
 * - 支持最小化、最大化和关闭三个标准窗口控制按钮。
 * - 基于 Flex 布局实现，支持自定义样式和行为。
 *
 * ## ✨ 功能说明
 *
 * - 提供完整的窗口标题栏界面，包括标题文本和控制按钮
 * - 支持自定义标题内容、按钮行为和外观样式
 * - 可配置按钮显示 / 隐藏状态，适应不同平台和需求
 * - 支持拖拽区域设置，便于实现窗口拖动功能
 * - 完全响应式，适应不同尺寸的窗口
 *
 * ## 🧠 实现原理
 *
 * - 使用 Flex 组件实现水平布局，左侧为标题，右侧为控制按钮
 * - 利用 shadcn Button 组件实现窗口控制按钮，支持不同的视觉样式
 * - 通过 props 控制组件行为和外观，实现高度可定制性
 * - 支持事件回调函数，处理窗口控制操作
 *
 * ## 🧾 Props
 *
 * @param title - 窗口标题文本，显示在标题栏正中间
 *
 * @param appIcon - 窗口 Icon，显示在标题栏左侧
 *
 * @param showMinimize - 是否显示最小化按钮，默认为 true
 *
 * @param showMaximize - 是否显示最大化按钮，默认为 true
 *
 * @param showClose - 是否显示关闭按钮，默认为 true
 *
 * @param onMinimize - 最小化按钮点击事件处理函数
 *
 * @param onMaximize - 最大化按钮点击事件处理函数
 *
 * @param onClose - 关闭按钮点击事件处理函数
 *
 * @param isDraggable - 是否启用标题栏拖拽功能，默认为 true
 *
 * @param isMaximized - 当前窗口是否处于最大化状态，影响最大化按钮的图标显示
 *
 * @param className - 额外的 Tailwind CSS 类名，用于自定义标题栏样式
 *
 * @param children - 可选的子元素，将显示在标题文本位置
 *
 * @param as - 指定要渲染的 HTML 元素类型，默认为 "header"
 *
 * @param rest - 其他标准 HTML 属性（如 id、data-* 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * // 基本用法
 * <TitleBar
 *   title="我的应用"
 *   onMinimize={() => console.log('最小化')}
 *   onMaximize={() => console.log('最大化')}
 *   onClose={() => console.log('关闭')}
 * />
 *
 * // 自定义样式
 * <TitleBar
 *   title="自定义标题栏"
 *   className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
 *   showMinimize={false}
 * />
 *
 * // 使用自定义内容
 * <TitleBar onClose={()=> window.close()}>
 *   <Flex align="center" className="gap-2">
 *     <img src="/logo.png" alt="Logo" className="w-5 h-5" />
 *     <span className="font-bold"> 高级应用 </span>
 *   </Flex>
 * </TitleBar>
 * ```
 */
export function TitleBar(
  {
    title,
    appIcon,
    showMinimize = true,
    showMaximize = true,
    showClose = true,
    onMinimize,
    onMaximize,
    onClose,
    isDraggable = true,
    isMaximized = false,
    className,
    children,
    ...rest
  }: TitleBarProps
) {
  return (
    <Flex
      justify="between"
      align="center"
      className={cn(
        "h-7 bg-background",
        isDraggable && "app-drag-region pywebview-drag-region",
        className
      )}
      {...(isDraggable && {"data-tauri-drag-region": true})}
      {...rest}
    >
      <Flex className={cn("w-1/5", "pl-3", "truncate")}>
        {appIcon}
      </Flex>

      <Spacer
        className={cn("truncate", "px-6")}>
        <Center>
          {children || title}
        </Center>
      </Spacer>

      <Flex justify="end" align="center"
            className={cn("h-full", "w-1/5", "gap-2", "pr-2")}>

        {showMinimize && (
          <TitlebarControlButton
            className="h-1/2 w-auto aspect-square rounded-full bg-yellow-500 hover:bg-yellow-500/80 group relative"
            onClick={onMinimize}
            aria-label="最小化"
          >
            <Minus
              className="size-3/4 opacity-0 group-hover:opacity-100 text-yellow-900"/>
          </TitlebarControlButton>
        )}

        {showMaximize && (
          <TitlebarControlButton
            className="h-1/2 aspect-square rounded-full bg-green-500 hover:bg-green-500/80 group relative"
            onClick={onMaximize}
            aria-label={isMaximized ? "还原" : "最大化"}
          >
            {isMaximized ? (
              <Minimize2
                className="size-3/4 opacity-0 group-hover:opacity-100 text-green-900"/>
            ) : (
              <Maximize2
                className="size-3/4 opacity-0 group-hover:opacity-100 text-green-900"/>
            )}
          </TitlebarControlButton>
        )}

        {showClose && (
          <TitlebarControlButton
            className="h-1/2 aspect-square rounded-full bg-red-500 hover:bg-red-500/80 group relative"
            onClick={onClose}
            aria-label="关闭"
          >
            <X
              className="size-3/4 opacity-0 group-hover:opacity-100 text-red-900"/>
          </TitlebarControlButton>
        )}
      </Flex>
    </Flex>
  );
}

export interface TitleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  appIcon?: React.ReactNode;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isDraggable?: boolean;
  isMaximized?: boolean;
}
