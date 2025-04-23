"use client"

import { useEffect, useRef } from "react"

export function ShimmerArrow() {
  const arrowRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const arrow = arrowRef.current
    if (!arrow) return

    const createShimmerEffect = () => {
      const shimmer = document.createElement("span")
      shimmer.className = "shimmer-effect"
      shimmer.style.position = "absolute"
      shimmer.style.top = "0"
      shimmer.style.left = "-100%"
      shimmer.style.width = "100%"
      shimmer.style.height = "100%"
      shimmer.style.background = "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)"
      shimmer.style.zIndex = "1"
      shimmer.style.pointerEvents = "none"

      arrow.appendChild(shimmer)

      // Animate the shimmer
      const animate = () => {
        shimmer.style.transition = "transform 1.5s linear"
        shimmer.style.transform = "translateX(200%)"

        setTimeout(() => {
          shimmer.style.transition = "none"
          shimmer.style.transform = "translateX(-100%)"

          // Small delay before next animation
          setTimeout(animate, 50)
        }, 1500)
      }

      animate()
    }

    createShimmerEffect()

    // Cleanup
    return () => {
      const shimmerElements = arrow.querySelectorAll(".shimmer-effect")
      shimmerElements.forEach((el) => el.remove())
    }
  }, [])

  return (
    <span
      ref={arrowRef}
      className="inline-block relative text-silver ml-1 overflow-hidden"
      style={{ color: "#c0c0c0" }}
    >
      →
    </span>
  )
}
