"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SilverGradientTextProps {
  children: React.ReactNode
  className?: string
  duration?: number
  staggerDelay?: number
  delay?: number
}

export function SilverGradientText({
  children,
  className,
  duration = 0.8,
  staggerDelay = 0.03,
  delay = 0,
}: SilverGradientTextProps) {
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
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Split text into words if it's a string
  const words = typeof children === "string" ? children.split(" ") : []

  // Function to check if a character is a descender (g, j, p, q, y)
  const hasDescender = (char: string) => /[gjpqy]/.test(char.toLowerCase());

  return (
    <span 
      ref={containerRef} 
      className={cn("inline-block overflow-visible", className)}
    >
      {typeof children === "string" ? (
        <span className="inline-block overflow-visible">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block overflow-visible">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`inline-block silver-gradient-text overflow-visible ${hasDescender(char) ? 'has-descender' : ''}`}
                  data-char={char.toLowerCase()}
                  style={{
                    opacity: 0,
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
                  className="inline-block"
                  style={{
                    opacity: 0,
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
    </span>
  )
} 