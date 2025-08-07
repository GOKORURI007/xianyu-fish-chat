## Prompts: chakra 转 tailwind

把下面的 chakra component 改成 tailwindcss 形式，参考 @flex.tsx

```typescript
"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"

export interface GridBaseProps {
  templateColumns?: SystemStyleObject["gridTemplateColumns"] | undefined
  autoFlow?: SystemStyleObject["gridAutoFlow"] | undefined
  autoRows?: SystemStyleObject["gridAutoRows"] | undefined
  autoColumns?: SystemStyleObject["gridAutoColumns"] | undefined
  templateRows?: SystemStyleObject["gridTemplateRows"] | undefined
  templateAreas?: SystemStyleObject["gridTemplateAreas"] | undefined
  column?: SystemStyleObject["gridColumn"] | undefined
  row?: SystemStyleObject["gridRow"] | undefined
  inline?: boolean | undefined
}

export interface GridProps extends HTMLChakraProps<"div", GridBaseProps> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  function Grid(props, ref) {
    const {
      templateAreas,
      column,
      row,
      autoFlow,
      autoRows,
      templateRows,
      autoColumns,
      templateColumns,
      inline,
      ...rest
    } = props

    return (
      <chakra.div
        {...rest}
    ref={ref}
    css={[
        {
          display: inline ? "inline-grid" : "grid",
          gridTemplateAreas: templateAreas,
          gridAutoColumns: autoColumns,
          gridColumn: column,
          gridRow: row,
          gridAutoFlow: autoFlow,
          gridAutoRows: autoRows,
          gridTemplateRows: templateRows,
          gridTemplateColumns: templateColumns,
        },
      props.css,
  ]}
    />
  )
  },
)

"use client"

import { forwardRef, useMemo } from "react"
import {
  type ConditionalValue,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { compact, mapObject } from "../../utils"
import type { BoxProps } from "../box"

export interface GridItemProps extends BoxProps {
  area?: SystemStyleObject["gridArea"] | undefined
  colSpan?: ConditionalValue<number | "auto"> | undefined
  colStart?: ConditionalValue<number | "auto"> | undefined
  colEnd?: ConditionalValue<number | "auto"> | undefined
  rowStart?: ConditionalValue<number | "auto"> | undefined
  rowEnd?: ConditionalValue<number | "auto"> | undefined
  rowSpan?: ConditionalValue<number | "auto"> | undefined
}

function spanFn(span?: ConditionalValue<number | "auto">) {
  return mapObject(span, (value) =>
    value === "auto" ? "auto" : `span ${value}/span ${value}`,
  )
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  function GridItem(props, ref) {
    const {
      area,
      colSpan,
      colStart,
      colEnd,
      rowEnd,
      rowSpan,
      rowStart,
      ...rest
    } = props

    const styles = useMemo(
      () =>
        compact({
          gridArea: area,
          gridColumn: spanFn(colSpan),
          gridRow: spanFn(rowSpan),
          gridColumnStart: colStart,
          gridColumnEnd: colEnd,
          gridRowStart: rowStart,
          gridRowEnd: rowEnd,
        }),
      [area, colSpan, colStart, colEnd, rowEnd, rowSpan, rowStart],
    )

    return <chakra.div ref={ref} css={[styles, props.css]} {...rest} />
  },
)
```

同样参考 @flex.stories.tsx 在同一文件夹下生成 stories 文件，不要设置任何背景色和前景色，只能用 border-chart-[1-5] 调整 border 颜色并用border设置border宽度，并在同一文件夹下用index.ts 导出 component

从这个 chakra component 生成基于 tailwindcss 的 react component，使用 function 模式，在index.ts 中导出, 命名为 grid.tsx/grid-item.tsx，放在 layout/grid 中。

### Prompts 创建 Stories

参考 @aspect-ratio.stories.tsx，写一个 @... 的 stories，在同一文件夹下生成 stories文件，并在同一文件夹下用 index.ts 导出 component。

### Prompts 修改 Stories

修改 @...，去掉 className 中设定的背景颜色和前景颜色，可以用 border-chart-[1-5] 设定 border 的颜色，记得设定border宽度。

### Prompts 补充注释

参考 @aspect-ratio.tsx 补充 @... 的组件注释。