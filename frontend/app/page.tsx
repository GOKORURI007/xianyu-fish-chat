"use client"

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <Skeleton className={"w-full h-full"}/>
  );
}
