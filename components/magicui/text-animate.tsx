"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface TextAnimateProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
  as?: React.ElementType
}

export function TextAnimate({
  children,
  className,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.05,
  as: Component = "span",
}: TextAnimateProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Split text into words
  const words = typeof children === "string" ? children.split(" ") : []

  return (
    <Component ref={containerRef} className={cn("inline-block", className)}>
      {typeof children === "string" ? (
        <span className="inline-block">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="inline-block opacity-0"
                  style={{
                    animation: isInView
                      ? `fadeIn ${duration}s ${delay + (wordIndex * words.length + charIndex) * staggerDelay}s forwards`
                      : "none",
                  }}
                >
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span
                  className="inline-block opacity-0"
                  style={{
                    animation: isInView
                      ? `fadeIn ${duration}s ${
                          delay + (wordIndex * words.length + word.length) * staggerDelay
                        }s forwards`
                      : "none",
                  }}
                >
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </span>
      ) : (
        children
      )}
    </Component>
  )
}
