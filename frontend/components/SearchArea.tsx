import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { cn } from "@/utils/cn";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

// 搜索区域组件属性接口
interface SearchAreaProps {
  showButton?: boolean; // 是否显示添加按钮
}

// 搜索区域组件
export function SearchArea({ showButton = false }: SearchAreaProps) {
  return (
    <Flex
      className={cn("bg-gray-800/50")}
      gap={"2"}
      align={"center"}
      justify={"center"}
      // pb={"2"}
      px={"2"}
    >
      {/* 搜索输入框 */}
      <TextField.Root placeholder="搜索" variant="soft">
        <TextField.Slot>
          <MagnifyingGlassIcon className={cn("size-4")}/>
        </TextField.Slot>
      </TextField.Root>

      {/* 添加按钮（根据showButton属性控制显示） */}
      <IconButton className={cn("not-hover:bg-gray-900", showButton?"":"!hidden")}>
        <PlusIcon className={cn("size-6")}></PlusIcon>
      </IconButton>
    </Flex>
  );
}