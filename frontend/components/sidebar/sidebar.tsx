"use client";

import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group";
import { Menu, MessageCircle, Store } from "lucide-react";
import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Flex, FlexProps } from "@/components/layout/flex";
import { Center } from "@/components/layout/center";
import { Spacer } from "@/components/layout/spacer";
import { Avatar, AvatarFallback } from "@/components/shadcn-ui/avatar";

const sidebarMenuItems = [
  {id: "msg", text: "消息", icon: MessageCircle},
  {id: "store", text: "商品", icon: Store}
];

export function Sidebar(
  {
    className = "",
    ...rest
  }: FlexProps
) {
  const id = useId();
  return (
    <Flex
      direction={"column"}
      className={cn("h-full", "py-3", "gap-3", className)}
      {...rest}
    >
      <Center>
        <Avatar asChild className={cn("size-10", "rounded-md", "cursor-pointer")}>
          {/*<AvatarImage src="https://github.com/shadcn.png" />*/}
          <AvatarFallback className={"select-none"}>K</AvatarFallback>
        </Avatar>
      </Center>
      <RadioGroup className={cn("flex", "flex-col", "items-center", "gap-3")}
                  defaultValue="msg">
        {sidebarMenuItems.map((item, i) => (
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            className={cn(
              "relative cursor-pointer",
              "h-12 w-12 border",
              "rounded-md",
              "hover:bg-accent"
            )}
            aria-label={item.text}
          >
            <label
              htmlFor={`${id}-${i}`}
              className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
            >
              <RadioGroupItem
                id={`${id}-${i}`}
                value={item.id}
                className="peer sr-only"
              />
              <item.icon
                aria-hidden="true"
                className={cn(
                  "size-6 stroke-foreground stroke-1",
                  "peer-data-[state=checked]:size-7",
                  "peer-data-[state=checked]:fill-green-500",
                  "peer-data-[state=checked]:stroke-background",
                  "transition-colors duration-100 ease-in-out"
                )}
              />
            </label>
          </Flex>
        ))}
      </RadioGroup>
      <Spacer/>
      <Flex
        direction={"column"}
        align={"center"}
        className={cn()}>
        <Center
          className={cn("w-12 h-12 border rounded-md border-input", "cursor-pointer", "hover:bg-accent")}>
          <Menu className="opacity-60 size-6" aria-hidden="true"/>
        </Center>
      </Flex>
    </Flex>
  );
}
