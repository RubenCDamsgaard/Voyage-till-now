"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function ShineBorder({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex rounded-full shiny-border", // CSS class with ::before pseudo-element
        className
      )}
    >
      {/* Glass content */}
      <span className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-[2px] backdrop-saturate-[180%] bg-black/10 border border-white/20">
        {children}
      </span>
    </div>
  );
} 