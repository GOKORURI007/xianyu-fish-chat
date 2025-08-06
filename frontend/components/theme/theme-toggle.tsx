"use client";

import * as React from "react";
import { Moon, Sun, MonitorCog } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


/**
 * - 在 ThemeProvider 的包裹下点击切换主题
 *
 * ## ✨ 功能说明
 *
 * - 提供三种主题模式切换：`light`、`dark`、`system`
 * - 使用 `next-themes` 实现客户端主题状态管理
 * - 图标根据当前主题动态显示，具备过渡动画效果
 * - 使用 Tailwind CSS 实现样式控制与状态响应
 * - 支持通过 `className` 自定义外层容器和按钮样式
 *
 * ## 🧠 实现原理
 *
 * - 使用 `useTheme()` 获取当前主题状态与设置方法
 * - 点击按钮时，按顺序循环切换主题：`dark → light → system → dark`
 * - 使用 `lucide-react` 图标库展示不同主题图标
 * - 每个图标通过 `scale` 和 `opacity` 控制显隐，并添加 `transition-all` 实现平滑切换
 * - 使用 `cn()` 工具函数合并 Tailwind 类名，支持动态样式拼接
 * - `Button` 组件使用 `data-[state=on]` 状态类名响应交互样式
 *
 * ## 🧾 Props
 *
 * @param className - 外层容器的额外 Tailwind 类名
 *
 * @param ...rest - 其他标准 HTMLDivElement 属性（如 `id`、`data-*` 等）
 *
 * ## 📦 使用示例
 *
 * ```tsx
 * <ThemeProvider>
 *  <ThemeToggle className="absolute top-4 right-4" />
 * </ThemeProvider>
 * ```
 *
 * ## 📐 功能测试
 */
export function ThemeToggle(
  {className = "", ...rest}:
  React.HTMLAttributes<HTMLDivElement>
) {
  const {theme, setTheme} = useTheme();

  return (
    <div className={cn(className)} {...rest}>
      <Button
        name={cn({
          "theme-system": theme === "system",
          "theme-dark": theme === "dark",
          "theme-light": theme === "light",
          }
        )}
        aria-label={"Theme toggle button"}
        className={cn(
          "size-9",
          "hover:bg-muted",
          className
        )}
        variant="outline"
        size="icon"
        onClick={() => setTheme((prev) => {
          let theme = "system";
          if (prev === "dark") theme = "light";
          if (prev === "light") theme = "system";
          if (prev === "system") theme = "dark";
          return theme;
        })}
      >
        <MonitorCog
          size={16}
          className={cn("shrink-0", "transition-all", {
            "scale-100 opacity-100": theme === "system",
            "scale-0 opacity-0 hidden": theme !== "system"
          })}
          aria-hidden="true"
        />
        <Moon
          size={16}
          className={cn("shrink-0", "transition-all", {
            "scale-100 opacity-100": theme === "dark",
            "scale-0 opacity-0 hidden": theme !== "dark"
          })}
          aria-hidden="true"
        />
        <Sun
          size={16}
          className={cn("shrink-0", "transition-all", {
            "scale-100 opacity-100": theme === "light",
            "scale-0 opacity-0 hidden": theme !== "light"
          })}
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}