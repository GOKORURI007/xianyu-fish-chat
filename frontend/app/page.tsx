"use client";

import React from "react";
import { Anchor } from "@/components/layout/anchor";

export default function Home() {
  return (
    // <Skeleton className={"w-full h-full"}/>
    <div
      className="relative m-10 w-64 h-64 border border-chart-1 rounded-md flex items-center justify-center">
      <div className="p-4"> 主要内容</div>
      <Anchor placement={"top-end"}>
        <div className={`p-2 border rounded-md border-chart-2`}>
          测试
        </div>
      </Anchor>
    </div>
  );
}
