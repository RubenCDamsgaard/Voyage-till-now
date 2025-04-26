"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

export function GradientBorder({
  children,
  border = 1,          // px
  glow = false,
  pulsingGlow = false,
  className,
}: {
  children: ReactNode;
  border?: number;
  glow?: boolean;
  pulsingGlow?: boolean;
  className?: string;
}) {
  const style: CSSProperties = { "--g-border": `${border}px` } as CSSProperties;
  
  return (
    <div 
      style={style} 
      className={cn(
        "gradient-frame", 
        glow && "has-glow", 
        pulsingGlow && "glow-pulse", 
        className
      )}
    >
      <div className="relative z-10 rounded-full backdrop-blur-[4px] backdrop-saturate-[180%] bg-black/30">
        {children}
      </div>
    </div>
  );
} 