import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Grid } from "./index";
import React from "react";

export default {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    as: {
      control: "select",
      options: ["div", "span", "section", "header", "footer", "aside"],
    },
    templateColumns: {
      control: {type: "text"},
      description: "网格模板列",
    },
    templateRows: {
      control: {type: "text"},
      description: "网格模板行",
    },
    templateAreas: {
      control: {type: "text"},
      description: "网格模板区域",
    },
    autoFlow: {
      control: {type: "select"},
      options: ["row", "column", "row dense", "column dense"],
      description: "自动流方向",
    },
    autoRows: {
      control: {type: "text"},
      description: "自动行大小",
    },
    autoColumns: {
      control: {type: "text"},
      description: "自动列大小",
    },
    column: {
      control: {type: "text"},
      description: "网格列位置",
    },
    row: {
      control: {type: "text"},
      description: "网格行位置",
    },
    inline: {
      control: {type: "boolean"},
      description: "是否使用inline-grid",
    },
    className: {
      control: {type: "text"},
      description: "额外的Tailwind类名",
    },
    children: {
      control: false,
      description: "子元素",
    },
  },
  args: {
    templateColumns: "repeat(3, 1fr)",
    inline: false,
  },
} as Meta<typeof Grid>;

// 创建一个示例项目，用于展示在 Grid 容器中
const GridBox = ({children, className = ""}: {
  children: React.ReactNode;
  className?: string
}) => (
  <div className={`p-4 border rounded-md border-chart-1 ${className}`}>
    {children}
  </div>
);

const Template: StoryFn<typeof Grid> = (args) => (
  <Grid {...args}>
    {args.children || (
      <>
        <GridBox>Item 1</GridBox>
        <GridBox>Item 2</GridBox>
        <GridBox>Item 3</GridBox>
        <GridBox>Item 4</GridBox>
        <GridBox>Item 5</GridBox>
        <GridBox>Item 6</GridBox>
      </>
    )}
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  className: "gap-4 p-4 border border-chart-1 rounded-lg",
};

export const TemplateColumns = Template.bind({});
TemplateColumns.args = {
  templateColumns: "repeat(3, 1fr)",
  className: "gap-4 p-4 border border-chart-2 rounded-lg",
};

export const TemplateRows = Template.bind({});
TemplateRows.args = {
  templateColumns: "repeat(3, 1fr)",
  templateRows: "100px 150px",
  className: "gap-4 p-4 border border-chart-3 rounded-lg",
};

export const AutoFlow = Template.bind({});
AutoFlow.args = {
  templateRows: "repeat(2, 100px)",
  autoFlow: "column",
  className: "gap-4 p-4 border border-chart-4 rounded-lg",
};

export const DenseAutoFlow = Template.bind({});
DenseAutoFlow.args = {
  templateColumns: "repeat(3, 1fr)",
  templateRows: "repeat(3, 100px)",
  autoFlow: "row dense",
  className: "gap-4 p-4 border border-chart-5 rounded-lg",
  children: (
    <>
      <div style={{gridColumn: "span 2 / span 2", gridRow: "span 2 / span 2"}}>
        <GridBox className="h-full">Span 2x2</GridBox>
      </div>
      <GridBox>Item 2</GridBox>
      <GridBox>Item 3</GridBox>
      <GridBox>Item 4</GridBox>
      <GridBox>Item 5</GridBox>
    </>
  ),
};

export const GridAreas = () => (
  <Grid
    templateAreas={`"header header"
                    "nav main"
                    "footer footer"`}
    templateColumns="200px 1fr"
    templateRows="80px 1fr 80px"
    className="gap-4 p-4 border border-chart-1 rounded-lg h-96"
  >
    <div style={{gridArea: "header"}}>
      <GridBox className="border-chart-2">Header</GridBox>
    </div>
    <div style={{gridArea: "nav"}}>
      <GridBox className="border-chart-3 h-full">Navigation</GridBox>
    </div>
    <div style={{gridArea: "main"}}>
      <GridBox className="border-chart-4 h-full">Main Content</GridBox>
    </div>
    <div style={{gridArea: "footer"}}>
      <GridBox className="border-chart-5">Footer</GridBox>
    </div>
  </Grid>
);

export const GridItemPositioning = () => (
  <Grid
    templateColumns="repeat(4, 1fr)"
    templateRows="repeat(3, 100px)"
    className="gap-4 p-4 border border-chart-1 rounded-lg"
  >
    <div style={{gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 2}}>
      <GridBox className="border-chart-2 h-full">colStart=1 colEnd=3 rowStart=1
        rowEnd=2</GridBox>
    </div>
    <div style={{gridColumnStart: 3, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 2}}>
      <GridBox className="border-chart-3 h-full">colStart=3 colEnd=5 rowStart=1
        rowEnd=2</GridBox>
    </div>
    <div style={{gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 2, gridRowEnd: 4}}>
      <GridBox className="border-chart-4 h-full">colStart=1 colEnd=2 rowStart=2
        rowEnd=4</GridBox>
    </div>
    <div style={{gridColumnStart: 2, gridColumnEnd: 5, gridRowStart: 2, gridRowEnd: 3}}>
      <GridBox className="border-chart-5 h-full">colStart=2 colEnd=5 rowStart=2
        rowEnd=3</GridBox>
    </div>
    <div style={{gridColumnStart: 2, gridColumnEnd: 5, gridRowStart: 3, gridRowEnd: 4}}>
      <GridBox className="border-chart-1 h-full">colStart=2 colEnd=5 rowStart=3
        rowEnd=4</GridBox>
    </div>
  </Grid>
);

export const GridSpan = () => (
  <Grid
    templateColumns="repeat(3, 1fr)"
    className="gap-4 p-4 border border-chart-1 rounded-lg"
  >
    <div style={{gridColumn: "span 3 / span 3"}}>
      <GridBox className="border-chart-2">colSpan=3</GridBox>
    </div>
    <div style={{gridColumn: "span 2 / span 2"}}>
      <GridBox className="border-chart-3">colSpan=2</GridBox>
    </div>
    <div>
      <GridBox className="border-chart-4"> 默认 </GridBox>
    </div>
    <div>
      <GridBox className="border-chart-5"> 默认 </GridBox>
    </div>
    <div style={{gridColumn: "auto"}}>
      <GridBox className="border-chart-1">auto</GridBox>
    </div>
  </Grid>
);

export const InlineGrid = Template.bind({});
InlineGrid.args = {
  inline: true,
  templateColumns: "repeat(2, 100px)",
  className: "gap-4 p-4 border border-chart-1 rounded-lg",
  children: (
    <>
      <GridBox>Item 1</GridBox>
      <GridBox>Item 2</GridBox>
      <GridBox>Item 3</GridBox>
      <GridBox>Item 4</GridBox>
    </>
  ),
};
