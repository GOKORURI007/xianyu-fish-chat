import { Container, Flex, Grid, IconButton, Skeleton } from "@radix-ui/themes";
import { cn } from "@/utils/cn";
import {
  MinusIcon,
  Square2StackIcon,
  StopIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

/**
 * 模拟全屏状态检测函数
 * @param full 是否全屏（默认 true）
 * @returns 当前是否全屏状态
 * 注意：此函数仅用于测试阶段，正式部署后应由 API 返回实际状态
 */
function isFullScreen(full = true) {
  return true;
}

/**
 * 标题栏组件
 * @param leftArea 左侧区域自定义内容（可选）
 * @returns 标题栏 JSX 元素
 */
export function Titlebar({leftArea}: { leftArea?: ReactNode }) {
  return (
    <Grid columns={"14rem 1fr"} gap={"2"} className={cn()}>
      {/* 左侧区域：显示自定义内容或占位容器 */}
      {leftArea ? leftArea : <Container/>}

      {/* 右侧操作按钮区域 */}
      <Flex direction={"row-reverse"} className={cn("border-amber-600")}>
        {/* 关闭按钮 */}
        <IconButton
          variant={"soft"}
          radius={"none"}
          className={cn("not-hover:!bg-transparent", "hover:!bg-[var(--ruby-9)]", "!w-10 !h-6")}
        >
          <XMarkIcon className={cn("size-5")}/>
        </IconButton>

        {/* 全屏 / 还原按钮 */}
        <IconButton
          variant={"soft"}
          radius={"none"}
          className={cn("not-hover:!bg-transparent", "!w-10 !h-6")}
        >
          {isFullScreen() ? (
            <StopIcon className={cn("size-5")}/>
          ) : (
            <Square2StackIcon className={cn("size-5")}/>
          )}
        </IconButton>

        {/* 最小化按钮 */}
        <IconButton
          variant={"soft"}
          radius={"none"}
          className={cn("not-hover:!bg-transparent", "!w-10 !h-6")}
        >
          <MinusIcon className={cn("size-5")}/>
        </IconButton>
      </Flex>
    </Grid>
  );
}