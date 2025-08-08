"use client";

import "./globals.css";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme";
import { Grid } from "@/components/layout/grid";
import { Sidebar } from "@/components/sidebar";
import { TitleBar } from "@/components/titlebar";

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
      <Grid
        templateColumns={"3.75rem 1fr"}
        templateRows={"1.75rem 1fr"}
        className={cn("h-screen", "gap-2", "place-content-center")}
      >
        <TitleBar className="w-full h-full col-span-2 bg-transparent"/>
        <Sidebar className={"bg-background/40"}/>
        {/*<Skeleton className="w-full h-full"/>*/}
        {/*<Skeleton className="w-full h-full" />*/}
        {children}
      </Grid>
    </ThemeProvider>
    </body>
    </html>
  );
}
