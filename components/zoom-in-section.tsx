"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ZoomInSectionProps {
  children: React.ReactNode
}

export function ZoomInSection({ children }: ZoomInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    // Set initial state
    gsap.set(section, {
      y: 50,
      opacity: 0,
    })

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        // Fade in up animation when scrolled into view
        gsap.to(section, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        // Reset when scrolling back up
        gsap.to(section, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
      },
    })

    // Cleanup
    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="overflow-hidden">
      {children}
    </div>
  )
}
