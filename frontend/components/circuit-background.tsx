"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface CircuitNode {
  x: number
  y: number
  connections: number[]
  active: boolean
  pulseDelay: number
  lastPulse: number
}

interface CircuitLine {
  start: CircuitNode
  end: CircuitNode
  progress: number
  active: boolean
  speed: number
  lastUpdate: number
}

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<CircuitNode[]>([])
  const linesRef = useRef<CircuitLine[]>([])
  const lastFrameTime = useRef<number>(0)
  const fpsCounter = useRef<number>(0)
  const lastFpsUpdate = useRef<number>(0)

  const generateNodes = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = []
    const gridSize = 100
    const cols = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Create more structured grid with some randomness
        if (Math.random() > 0.6) {
          nodes.push({
            x: i * gridSize + (Math.random() - 0.5) * 30,
            y: j * gridSize + (Math.random() - 0.5) * 30,
            connections: [],
            active: Math.random() > 0.7,
            pulseDelay: Math.random() * 3000,
            lastPulse: 0,
          })
        }
      }
    }

    // Create connections between nearby nodes
    nodes.forEach((node, index) => {
      const nearbyNodes = nodes
        .map((otherNode, otherIndex) => ({ node: otherNode, index: otherIndex }))
        .filter(({ node: otherNode, index: otherIndex }) => {
          if (index === otherIndex) return false
          const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
          return distance < 150 && distance > 50
        })
        .sort((a, b) => {
          const distA = Math.sqrt(Math.pow(node.x - a.node.x, 2) + Math.pow(node.y - a.node.y, 2))
          const distB = Math.sqrt(Math.pow(node.x - b.node.x, 2) + Math.pow(node.y - b.node.y, 2))
          return distA - distB
        })
        .slice(0, 3) // Limit connections per node

      nearbyNodes.forEach(({ index: otherIndex }) => {
        if (Math.random() > 0.4) {
          node.connections.push(otherIndex)
        }
      })
    })

    return nodes
  }, [])

  const generateLines = useCallback((nodes: CircuitNode[]) => {
    const lines: CircuitLine[] = []
    const processedConnections = new Set<string>()

    nodes.forEach((node, index) => {
      node.connections.forEach((connectionIndex) => {
        const connectionKey = `${Math.min(index, connectionIndex)}-${Math.max(index, connectionIndex)}`
        if (!processedConnections.has(connectionKey)) {
          processedConnections.add(connectionKey)
          const targetNode = nodes[connectionIndex]
          if (targetNode) {
            lines.push({
              start: node,
              end: targetNode,
              progress: 0,
              active: Math.random() > 0.5,
              speed: 0.3 + Math.random() * 0.7,
              lastUpdate: 0,
            })
          }
        }
      })
    })

    return lines
  }, [])

  const drawCircuitPath = useCallback(
    (ctx: CanvasRenderingContext2D, start: CircuitNode, end: CircuitNode, opacity = 0.3) => {
      const dx = end.x - start.x
      const dy = end.y - start.y

      ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.beginPath()
      ctx.moveTo(start.x, start.y)

      // Create L-shaped paths (circuit board style)
      if (Math.abs(dx) > Math.abs(dy)) {
        const midX = start.x + dx * 0.7
        ctx.lineTo(midX, start.y)
        ctx.lineTo(midX, end.y)
        ctx.lineTo(end.x, end.y)
      } else {
        const midY = start.y + dy * 0.7
        ctx.lineTo(start.x, midY)
        ctx.lineTo(end.x, midY)
        ctx.lineTo(end.x, end.y)
      }

      ctx.stroke()
    },
    [],
  )

  const drawPulse = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, intensity = 1) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12 * intensity)
    gradient.addColorStop(0, `rgba(0, 212, 255, ${0.9 * intensity})`)
    gradient.addColorStop(0.5, `rgba(0, 212, 255, ${0.4 * intensity})`)
    gradient.addColorStop(1, "rgba(0, 212, 255, 0)")

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(x, y, 12 * intensity, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  const drawNode = useCallback((ctx: CanvasRenderingContext2D, node: CircuitNode, currentTime: number) => {
    // Node base
    ctx.beginPath()
    ctx.fillStyle = node.active ? "rgba(0, 212, 255, 0.9)" : "rgba(0, 212, 255, 0.4)"
    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
    ctx.fill()

    // Active node effects
    if (node.active) {
      // Glow effect
      const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15)
      glowGradient.addColorStop(0, "rgba(0, 212, 255, 0.3)")
      glowGradient.addColorStop(1, "rgba(0, 212, 255, 0)")

      ctx.beginPath()
      ctx.fillStyle = glowGradient
      ctx.arc(node.x, node.y, 15, 0, Math.PI * 2)
      ctx.fill()

      // Pulsing ring
      const pulsePhase = (currentTime * 0.002 + node.pulseDelay * 0.001) % (Math.PI * 2)
      const pulseRadius = 8 + Math.sin(pulsePhase) * 3
      const pulseOpacity = 0.6 + Math.sin(pulsePhase) * 0.3

      ctx.beginPath()
      ctx.strokeStyle = `rgba(0, 212, 255, ${pulseOpacity})`
      ctx.lineWidth = 1.5
      ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Connection indicator
    if (node.connections.length > 0) {
      ctx.beginPath()
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let isResizing = false

    const resizeCanvas = () => {
      if (isResizing) return
      isResizing = true

      requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR for performance

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.style.width = rect.width + "px"
        canvas.style.height = rect.height + "px"

        ctx.scale(dpr, dpr)

        // Regenerate nodes and lines
        nodesRef.current = generateNodes(rect.width, rect.height)
        linesRef.current = generateLines(nodesRef.current)

        isResizing = false
      })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Optimized animation loop
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current
      lastFrameTime.current = currentTime

      // FPS limiting for smooth performance
      if (deltaTime < 16.67) {
        // ~60fps
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // FPS counter
      fpsCounter.current++
      if (currentTime - lastFpsUpdate.current > 1000) {
        // console.log(`Circuit Background FPS: ${fpsCounter.current}`)
        fpsCounter.current = 0
        lastFpsUpdate.current = currentTime
      }

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw background gradient
      const gradient = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        0,
        rect.width / 2,
        rect.height / 2,
        Math.max(rect.width, rect.height) / 2,
      )
      gradient.addColorStop(0, "rgba(10, 14, 26, 0.95)")
      gradient.addColorStop(0.5, "rgba(13, 20, 33, 0.98)")
      gradient.addColorStop(1, "rgba(10, 14, 26, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw circuit lines
      linesRef.current.forEach((line) => {
        // Draw base line
        drawCircuitPath(ctx, line.start, line.end, line.active ? 0.4 : 0.2)

        // Animate pulses
        if (line.active && currentTime - line.lastUpdate > 100) {
          line.progress += line.speed * (deltaTime * 0.001)
          line.lastUpdate = currentTime

          if (line.progress > 1.2) {
            line.progress = 0
            line.active = Math.random() > 0.3
            line.speed = 0.3 + Math.random() * 0.7
          }
        }

        // Draw pulse
        if (line.active && line.progress > 0 && line.progress < 1) {
          const dx = line.end.x - line.start.x
          const dy = line.end.y - line.start.y

          let pulseX: number, pulseY: number

          // Calculate pulse position along L-shaped path
          if (Math.abs(dx) > Math.abs(dy)) {
            const midX = line.start.x + dx * 0.7
            if (line.progress < 0.7) {
              pulseX = line.start.x + (midX - line.start.x) * (line.progress / 0.7)
              pulseY = line.start.y
            } else {
              pulseX = midX
              pulseY = line.start.y + (line.end.y - line.start.y) * ((line.progress - 0.7) / 0.3)
            }
          } else {
            const midY = line.start.y + dy * 0.7
            if (line.progress < 0.7) {
              pulseX = line.start.x
              pulseY = line.start.y + (midY - line.start.y) * (line.progress / 0.7)
            } else {
              pulseX = line.start.x + (line.end.x - line.start.x) * ((line.progress - 0.7) / 0.3)
              pulseY = midY
            }
          }

          const intensity = Math.sin(line.progress * Math.PI) * 0.8 + 0.2
          drawPulse(ctx, pulseX, pulseY, intensity)
        }
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        drawNode(ctx, node, currentTime)
      })

      // Randomly activate/deactivate nodes (less frequently)
      if (Math.random() > 0.998) {
        const randomNode = nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)]
        if (randomNode) {
          randomNode.active = !randomNode.active
        }
      }

      // Randomly activate/deactivate lines
      if (Math.random() > 0.995) {
        const randomLine = linesRef.current[Math.floor(Math.random() * linesRef.current.length)]
        if (randomLine && !randomLine.active) {
          randomLine.active = true
          randomLine.progress = 0
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [generateNodes, generateLines, drawCircuitPath, drawPulse, drawNode])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Subtle overlay effects */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 25% 25%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 75% 75%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 25% 75%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 75% 25%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute inset-0 opacity-60"
      />
    </div>
  )
}
