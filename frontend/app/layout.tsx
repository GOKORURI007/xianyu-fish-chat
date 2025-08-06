"use client"

import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLayout(
  {children}:
  Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <body className={"h-screen bg-[image:var(--app-background)]"}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={cn('grid', 'grid-cols-[3.75rem_1fr]', 'grid-rows-[1.75rem_1fr]', "h-screen",'gap-2','place-content-center')}>
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        {/*<Skeleton className="w-full h-full" />*/}
        {children}
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}
