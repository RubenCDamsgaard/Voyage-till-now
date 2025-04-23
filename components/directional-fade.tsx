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
  duration = 1.2,
  delay = 0,
  className,
}: DirectionalFadeProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    // Set initial state based on direction
    const initialX = direction === "left" ? -distance : direction === "right" ? distance : 0
    const initialY = direction === "center" ? 50 : 0

    // Store the original transform if any
    const computedStyle = window.getComputedStyle(section)
    const originalTransform = computedStyle.transform !== 'none' ? computedStyle.transform : ''

    // Apply initial state
    gsap.set(section, {
      x: initialX,
      y: initialY,
      opacity: 0,
      scale: direction === "center" ? 1 : 0.95,
    })

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      onEnter: () => {
        // Kill any existing animation
        if (animationRef.current) {
          animationRef.current.kill()
        }
        
        // Animate in when scrolled into view
        animationRef.current = gsap.to(section, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: duration,
          delay: delay,
          ease: "power2.out",
          onComplete: () => {
            // Don't clear any props to prevent jumping
          }
        })
      },
      onLeaveBack: () => {
        // Kill any existing animation
        if (animationRef.current) {
          animationRef.current.kill()
        }
        
        // Reset when scrolling back up
        animationRef.current = gsap.to(section, {
          x: initialX,
          y: initialY,
          opacity: 0,
          scale: direction === "center" ? 1 : 0.95,
          duration: duration / 1.5,
          ease: "power1.in",
        })
      },
    })

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      trigger.kill()
    }
  }, [direction, distance, duration, delay])

  return (
    <div 
      ref={sectionRef} 
      className={cn(
        "overflow-visible will-change-transform", 
        direction === "center" ? "z-10" : "z-0", 
        className
      )}
    >
      {children}
    </div>
  )
}
