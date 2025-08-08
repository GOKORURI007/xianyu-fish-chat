"use client";

import * as React from "react";

import { cn } from "@/lib/utils";


function TitlebarControlButton(
  {
    className,
    asChild = false,
    ...props
  }: React.ComponentProps<"button"> & {
    asChild?: boolean
  }) {
  const Comp = "button";
  return (
    <Comp
      data-slot="button"
      className={cn(
        "flex",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-full",
        "transition-all",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "[&_svg]:pointer-events-none",
        "[&_svg:not([class*='size-'])]:size-1/2",
        "[&_svg]:shrink-0",
        "shrink-0",
        "outline-none",
        "aria-invalid:ring-destructive/20",
        "dark:aria-invalid:ring-destructive/40",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { TitlebarControlButton };
