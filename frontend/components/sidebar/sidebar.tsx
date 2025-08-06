'use client'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageCircle, Store, SunMoon } from "lucide-react"
import { useId } from "react";
import { cn } from "@/lib/utils";

const sidebarMenuItems = [
  {id: "msg", text: "消息", icon: MessageCircle},
  {id: "store", text: "商品", icon: Store}
]

export function Sidebar() {
  const id = useId()
  return (
    <div className={cn("flex", "flex-col")}>
      <RadioGroup className={cn("flex", "flex-col", "items-center")} defaultValue="msg">
        {sidebarMenuItems.map((item, i) => (
          <div
            className={cn(
              "relative flex cursor-pointer flex-col place-content-center",
              "h-12 w-12 border",
              // "has-data-[state=checked]:border-primary/50",
              // "has-focus-visible:border-ring",
              // "has-focus-visible:ring-ring/50",
              "items-center rounded-md transition-[color,box-shadow]"
            )}>
            <label
              htmlFor={`${id}-${i}`}
              className="text-foreground cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
            >
            <RadioGroupItem id={`${id}-${i}`} value={item.id} className="peer sr-only"/>
            <item.icon className={cn(
              "opacity-60 size-6",
              "peer-data-[state=checked]:fill-green-500",
              "peer-data-[state=checked]:stroke-background",
            )}
                       aria-hidden="true"/>
            </label>
          </div>
        ))}
      </RadioGroup>

      <div className={cn("flex", "flex-col", "align-middle")}>
        <div
          className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
          <MessageCircle className="opacity-60" size={20} aria-hidden="true"/>
        </div>
      </div>
    </div>
  );
}
