"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

type Direction = "left" | "right" | "center"

interface DirectionalFadeProps {
  children: React.ReactNode
  direction: Direction
  distance?: number
  duration?: number
  delay?: number
  className?: string
}

export function DirectionalFade({
  children,
  direction = "center",
  distance = 100,
  duration = 1.2, // Increased from 0.8 to 1.2 for smoother animation
  delay = 0,
  className,
}: DirectionalFadeProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    // Set initial state based on direction
    const initialX = direction === "left" ? -distance : direction === "right" ? distance : 0
    const initialY = direction === "center" ? 50 : 0

    gsap.set(section, {
      x: initialX,
      y: initialY,
      opacity: 0,
      scale: direction === "center" ? 1 : 0.95,
    })

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%", // Start animation a bit earlier (changed from 80% to 85%)
      onEnter: () => {
        // Animate in when scrolled into view
        gsap.to(section, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: "power2.out", // Using power2.out for smoother animation
          clearProps: "transform", // Clear transform properties after animation completes
        })
      },
      onLeaveBack: () => {
        // Reset when scrolling back up
        gsap.to(section, {
          x: initialX,
          y: initialY,
          opacity: 0,
          scale: direction === "center" ? 1 : 0.95,
          duration: duration / 1.5, // Slightly faster reset animation
          ease: "power1.in", // Using power1.in for smoother reset
        })
      },
    })

    // Cleanup
    return () => {
      trigger.kill()
    }
  }, [direction, distance, duration, delay])

  return (
    <div ref={sectionRef} className={cn("overflow-visible", direction === "center" ? "z-10" : "z-0", className)}>
      {children}
    </div>
  )
}
