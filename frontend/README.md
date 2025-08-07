## Prompts: chakra 转 tailwind

把下面的 component 改成 tailwindcss 形式，参考 @aspect-ratio.tsx

```chakra component
"use client"

import {type HTMLChakraProps, chakra} from "../../styled-system"

export interface CenterProps extends HTMLChakraProps<"div"> {}

/**
 * React component used to horizontally and vertically center its child.
 * It uses the popular `display: flex` centering technique.
 *
 * @see Docs https://chakra-ui.com/docs/components/center
 */
export const Center = chakra("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
})

Center.displayName = "Center"
```

同样参考 @aspect-ratio.stories.tsx 在同一文件夹下生成 stories 文件，并在同一文件夹下用
index.ts 导出 component

从这个 chakra component 生成基于 tailwindcss 的 react component，使用 function 模式，在
index.ts 中导出, 命名为 ***，放在 ***。

### Prompts 创建 Stories

参考 @aspect-ratio.stories.tsx，写一个 @... 的 stories，在同一文件夹下生成 stories
文件，并在同一文件夹下用 index.ts 导出 component。

### Prompts 补充注释

参考 @aspect-ratio.tsx 补充 @... 的组件注释。