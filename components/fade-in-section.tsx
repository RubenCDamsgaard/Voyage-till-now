"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
}

export function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const element = sectionRef.current
    if (!element) return

    // Set initial state
    gsap.set(element, {
      y: 50,
      opacity: 0,
    })

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        // Fade in up animation when scrolled into view
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        // Reset when scrolling back up
        gsap.to(element, {
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
  }, [delay])

  return <div ref={sectionRef}>{children}</div>
}
