"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"
import { useState } from "react"

interface SilverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function SilverButton({ children, className, ...props }: SilverButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={cn(
        "relative flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 active:scale-95",
        className,
      )}
      style={{
        background: "linear-gradient(to right, #777, #e0e0e0, #777, #777, #e0e0e0, #777)",
        backgroundSize: "250%",
        backgroundPosition: isHovered ? "right" : "left",
        color: "#e0e0e0",
        transitionDuration: "1s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span
        className="absolute flex h-[90%] w-[97%] items-center justify-center rounded-md bg-black/90 text-sm font-medium text-gray-300"
        style={{
          backgroundSize: "200%",
          backgroundPosition: isHovered ? "right" : "left",
          transitionDuration: "1s",
        }}
      >
        {children}
      </span>
    </button>
  )
}
