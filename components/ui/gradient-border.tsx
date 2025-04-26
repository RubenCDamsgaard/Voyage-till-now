"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function GradientBorder({
  className,
  children,
  borderRadius = "rounded-full",
  pulsingGlow = false,
}: {
  className?: string;
  children: ReactNode;
  borderRadius?: string;
  pulsingGlow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex gradient-frame",
        borderRadius,
        pulsingGlow && "glow-pulse",
        className
      )}
    >
      {/* Glass content */}
      <div
        className={cn(
          "relative z-10 w-full h-full",
          "backdrop-blur-[4px] backdrop-saturate-[180%]",
          "bg-black/30",
          borderRadius
        )}
      >
        {children}
      </div>
    </div>
  );
} 