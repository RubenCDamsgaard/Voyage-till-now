"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  children: string
  typingSpeed?: number
  delayBeforeRestart?: number
  cursorBlinkSpeed?: number
}

export function TypingAnimation({
  children,
  typingSpeed = 150,
  delayBeforeRestart = 1000,
  cursorBlinkSpeed = 500,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Typing effect
  useEffect(() => {
    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + children[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("")
        setCurrentIndex(0)
      }, delayBeforeRestart)

      return () => clearTimeout(timeout)
    }
  }, [children, currentIndex, delayBeforeRestart, typingSpeed])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(interval)
  }, [cursorBlinkSpeed])

  return (
    <span className="inline-block">
      {displayedText}
      <span
        className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent`}
      >
        |
      </span>
    </span>
  )
}
