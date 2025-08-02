import { Avatar, Box, Flex, IconButton } from "@radix-ui/themes";
import { cn } from "@/utils/cn";
import { Bars3Icon, ChatBubbleOvalLeftIcon, UsersIcon } from "@heroicons/react/24/solid";

// 顶部导航按钮配置
const topItems = [
  {
    icon: ChatBubbleOvalLeftIcon, // 聊天图标
  },
  {
    icon: UsersIcon, // 用户图标
  }
];

// 底部导航按钮配置
const bottomItems = [
  {
    icon: Bars3Icon, // 菜单图标
  }
]

export function Sidebar({className}: { className?: string }) {
  return (
    <Flex
      // height={"100vh"}
      direction={"column"}
      gapY={"2"}
      align={"center"}
      pb={"4"}
      className={className ?? ""}
    >
      {/* 用户头像区域 */}
      <Avatar fallback={"A"} className={cn("!w-11 !h-11")}> </Avatar>

      {/* 顶部按钮组 */}
      <Flex direction={"column"} mt={"4"} gapY={"2"}>
        {
          topItems.map((btn, index) => (
            <IconButton
              key={index}
              size={"3"}
              variant="soft"
              className={cn("not-hover:!bg-transparent")}
            >
              <btn.icon
                color={"var(--grass-9)"}
                className={cn("size-6")}
              />
            </IconButton>
          ))
        }
      </Flex>

      {/* 中间空白区域 */}
      <Box flexGrow={"1"}/>

      {/* 底部按钮组 */}
      <Flex direction={"column"} gapY={"2"}>
        {
          bottomItems.map((btn, index) => (
            <IconButton
              key={index}
              size={"3"}
              variant="soft"
              className={cn("not-hover:!bg-transparent")}
            >
              <btn.icon
                color={"var(--grass-9)"}
                className={cn("size-6")}
              />
            </IconButton>
          ))
        }
      </Flex>
    </Flex>
  );
}