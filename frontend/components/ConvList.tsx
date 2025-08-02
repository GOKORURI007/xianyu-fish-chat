// TODO 从接口获取数据
"use client"
import { Avatar, Card, Flex, Grid, ScrollArea, Text } from "@radix-ui/themes";
import { cn } from "@/utils/cn";

/**
 * 测试用的对话数据
 * 实际项目中会从接口获取
 */
const conv = [
  {user: "张三", msg: "你好，最近怎么样？", time: "08:30", mute: false},
  {user: "李四", msg: "项目进展如何？", time: "09:15", mute: true},
  {user: "王五", msg: "记得下午开会", time: "10:00", mute: false},
  {user: "赵六", msg: "文件已发送", time: "11:45", mute: false},
  {user: "钱七", msg: "周末一起吃饭吗？", time: "12:30", mute: true},
  {user: "孙八", msg: "代码已提交", time: "14:20", mute: false},
  {user: "周九", msg: "需要帮忙吗？", time: "15:10", mute: true},
  {user: "吴十", msg: "明天请假一天", time: "16:05", mute: false},
  {user: "郑十一", msg: "会议纪要已整理", time: "17:30", mute: false},
  {user: "王十二", msg: "预算已审批", time: "18:15", mute: true},
  {user: "刘十三", msg: "新需求讨论", time: "19:00", mute: false},
  {user: "陈十四", msg: "服务器维护通知", time: "20:45", mute: true},
  {user: "杨十五", msg: "假期安排确认", time: "21:30", mute: false},
  {user: "朱十六", msg: "紧急bug修复", time: "22:10", mute: false},
  {user: "林十七", msg: "下周工作计划", time: "23:00", mute: true}
]

/**
 * 对话列表组件
 * 显示所有对话的滚动列表
 */
export function ConvList() {
  return (
    <ScrollArea
      type="hover"
      radius={"full"}
      size={"1"}
      scrollbars="vertical"
      className={cn("h-full w-full")}
    >
      <Flex
        className={cn("bg-gray-800/50")}
        direction={"column"}
        gap={"1"}
        align={"center"}
        p={"1"}
      >
        {conv.map((item, index) => (
          <ConvCard
            key={index}
            user={item.user}
            message={item.msg}
            time={item.time}
            mute={item.mute}
          />
        ))}
      </Flex>
    </ScrollArea>
  );
}

/**
 * 单个对话卡片组件
 * @param user - 用户名
 * @param message - 消息内容
 * @param time - 消息时间
 * @param mute - 是否静音
 */
function ConvCard({user, message, time, mute = false}: {
  user: string;
  message: string;
  time: string;
  mute: boolean
}) {
  return (
    <Card asChild className={cn("h-20 !flex")}>
      <a className={cn("!w-full")} href={"#"} onClick={(e) => e.preventDefault()}>
        <Grid
          columns={"auto 1fr 2rem"}
          rows={"1fr 1fr"}
          width={"100%"}
          gapX={"2"}
          align={"center"}
          justify={"center"}
        >
          {/* 用户头像 */}
          <Avatar fallback={"U"} size={"4"} className={"row-span-2"}/>

          {/* 用户信息和时间 */}
          <Grid
            columns={"auto auto"}
            align={"center"}
            justify={"between"}
            gapX={"2"}
            mt={"1"}
            className={cn("col-span-2")}
          >
            <Text as={"div"} weight={"bold"} truncate={true}
                  className={cn("text-[0.75rem]")}>{user}</Text>
            <Text
              as={"div"}
              weight={"light"}
              className={cn("text-[0.5rem]")}
            >
              {time}
            </Text>
          </Grid>

          {/* 消息内容和静音状态 */}
          <Text as={"div"} size={"1"} weight={"light"} truncate={true}
                mb={"1"}>{message}</Text>
          <Text as={"div"} size={"1"} weight={"light"} align={"right"}
                mb={"1"}> {mute ? "M" : ""}</Text>
        </Grid>
      </a>
    </Card>
  );
}