"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParticlesBackgroundProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
  color?: string
  particleColor?: string
  particleSize?: number
  speed?: number
  direction?: "top" | "left" | "bottom" | "right" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
}

export function ParticlesBackground({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  particleColor = "#ffffff",
  particleSize = 1.5,
  speed = 1,
  direction = "topRight",
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const animationRef = useRef<number | null>(null)

  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (canvasContainerRef.current) {
      const { width, height } = canvasContainerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
    })

    if (canvasContainerRef.current) {
      resizeObserver.observe(canvasContainerRef.current)
    }

    resizeObserverRef.current = resizeObserver

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    const getDirectionVector = (dir: string) => {
      switch (dir) {
        case "top":
          return { x: 0, y: -1 }
        case "left":
          return { x: -1, y: 0 }
        case "bottom":
          return { x: 0, y: 1 }
        case "right":
          return { x: 1, y: 0 }
        case "topLeft":
          return { x: -1, y: -1 }
        case "topRight":
          return { x: 1, y: -1 }
        case "bottomLeft":
          return { x: -1, y: 1 }
        case "bottomRight":
          return { x: 1, y: 1 }
        default:
          return { x: 0, y: 0 }
      }
    }

    const directionVector = getDirectionVector(direction)

    particles.current = []

    const getRandomVelocity = () => {
      const baseVelocity = 0.1 * speed
      const randomVelocity = Math.random() * 0.1 * speed
      return baseVelocity + randomVelocity
    }

    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      const vx = directionVector.x * getRandomVelocity()
      const vy = directionVector.y * getRandomVelocity()

      particles.current.push({
        position: { x, y },
        velocity: { x: vx, y: vy },
        size: Math.random() * particleSize + 0.5,
        color: particleColor,
      })
    }

    const animate = () => {
      if (!context.current) return

      context.current.clearRect(0, 0, dimensions.width, dimensions.height)

      for (const particle of particles.current) {
        // Move particles
        particle.position.x += particle.velocity.x
        particle.position.y += particle.velocity.y

        // Handle mouse interaction
        const dx = mouse.current.x - particle.position.x
        const dy = mouse.current.y - particle.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.velocity.x -= ((dx / distance) * force) / staticity
          particle.velocity.y -= ((dy / distance) * force) / staticity
        }

        // Apply ease
        particle.velocity.x *= (100 - ease) / 100
        particle.velocity.y *= (100 - ease) / 100

        // Wrap particles around the screen
        if (particle.position.x < 0) particle.position.x = dimensions.width
        if (particle.position.x > dimensions.width) particle.position.x = 0
        if (particle.position.y < 0) particle.position.y = dimensions.height
        if (particle.position.y > dimensions.height) particle.position.y = 0

        // Draw particle
        context.current.beginPath()
        context.current.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2)
        context.current.fillStyle = particle.color
        context.current.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect()
        mouse.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [dimensions, quantity, staticity, ease, refresh, particleColor, particleSize, speed, direction])

  return (
    <div ref={canvasContainerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ background: color }}
      />
    </div>
  )
}

interface Particle {
  position: {
    x: number
    y: number
  }
  velocity: {
    x: number
    y: number
  }
  size: number
  color: string
}
