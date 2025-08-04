"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"

interface ChartProps {
  type: "line" | "bar" | "doughnut" | "radar" | "area"
  data: number[]
  labels: string[]
  title: string
  color?: string
  secondaryData?: number[]
  realTime?: boolean
}

export function InteractiveChart({
  type,
  data,
  labels,
  title,
  color = "#00d4ff",
  secondaryData,
  realTime = false,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const animationRef = useRef<number>()
  const [currentData, setCurrentData] = useState(data)

  // Real-time data updates
  useEffect(() => {
    if (!realTime) return

    const interval = setInterval(() => {
      setCurrentData((prevData) => {
        const newData = [...prevData]
        // Update last few data points
        for (let i = Math.max(0, newData.length - 3); i < newData.length; i++) {
          newData[i] = Math.max(0, newData[i] + (Math.random() - 0.5) * 20)
        }
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [realTime])

  const drawChart = useCallback(
    (ctx: CanvasRenderingContext2D, progress: number, rect: { width: number; height: number }) => {
      const padding = 40
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2

      ctx.clearRect(0, 0, rect.width, rect.height)

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const x = padding + (i / 10) * chartWidth
        const y = padding + (i / 10) * chartHeight

        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, padding + chartHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(padding + chartWidth, y)
        ctx.stroke()
      }

      const maxValue = Math.max(...currentData, ...(secondaryData || []))

      if (type === "line" || type === "area") {
        drawLineChart(ctx, currentData, chartWidth, chartHeight, padding, maxValue, color, progress, type === "area")
        if (secondaryData) {
          drawLineChart(ctx, secondaryData, chartWidth, chartHeight, padding, maxValue, "#8b5cf6", progress, false)
        }
      } else if (type === "bar") {
        drawBarChart(ctx, currentData, chartWidth, chartHeight, padding, maxValue, color, progress)
      } else if (type === "doughnut") {
        drawDoughnutChart(
          ctx,
          currentData,
          rect.width / 2,
          rect.height / 2,
          Math.min(rect.width, rect.height) / 3,
          color,
          progress,
        )
      } else if (type === "radar") {
        drawRadarChart(
          ctx,
          currentData,
          rect.width / 2,
          rect.height / 2,
          Math.min(rect.width, rect.height) / 3,
          color,
          progress,
        )
      }

      // Interactive hover effects
      if (hoveredIndex !== null && (type === "line" || type === "bar")) {
        drawHoverEffect(ctx, hoveredIndex, currentData, chartWidth, chartHeight, padding, maxValue, type)
      }
    },
    [currentData, secondaryData, type, color, hoveredIndex],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isInView || hasAnimated) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Single animation when component comes into view
    const startTime = Date.now()
    const animationDuration = 1500

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      drawChart(ctx, easedProgress, rect)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, hasAnimated, drawChart])

  // Handle real-time updates after initial animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hasAnimated) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    drawChart(ctx, 1, rect)
  }, [currentData, hasAnimated, drawChart])

  // Mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (type === "line" || type === "bar") {
        const padding = 40
        const chartWidth = rect.width - padding * 2
        const segmentWidth = chartWidth / (currentData.length - (type === "line" ? 1 : 0))
        const index = Math.round((x - padding) / segmentWidth)
        if (index >= 0 && index < currentData.length) {
          setHoveredIndex(index)
        } else {
          setHoveredIndex(null)
        }
      }
    }

    const handleMouseLeave = () => {
      setHoveredIndex(null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [currentData.length, type])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 bg-surface/20 rounded-lg border border-border/30 overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {realTime && (
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success">Live</span>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" style={{ width: "100%", height: "100%" }} />

      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm border border-border/50 rounded-lg p-2 text-xs"
        >
          <div className="text-foreground font-semibold">{labels[hoveredIndex]}</div>
          <div className="text-primary">{Math.round(currentData[hoveredIndex])}</div>
          {secondaryData && <div className="text-accent">{Math.round(secondaryData[hoveredIndex])}</div>}
        </motion.div>
      )}
    </motion.div>
  )
}

// Optimized chart drawing functions
function drawLineChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  width: number,
  height: number,
  padding: number,
  maxValue: number,
  color: string,
  progress: number,
  filled = false,
) {
  const points: { x: number; y: number }[] = []

  data.forEach((value, index) => {
    const x = padding + (index / (data.length - 1)) * width
    const y = padding + height - (value / maxValue) * height
    points.push({ x, y })
  })

  // Only draw up to progress point
  const visiblePoints = points.slice(0, Math.ceil(points.length * progress))

  if (filled && visiblePoints.length > 1) {
    ctx.beginPath()
    ctx.moveTo(visiblePoints[0].x, padding + height)
    visiblePoints.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(visiblePoints[visiblePoints.length - 1].x, padding + height)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, padding, 0, padding + height)
    gradient.addColorStop(0, color + "40")
    gradient.addColorStop(1, color + "10")
    ctx.fillStyle = gradient
    ctx.fill()
  }

  if (visiblePoints.length > 1) {
    // Line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    visiblePoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Glowing effect
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // Data points
  visiblePoints.forEach((point) => {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "#ffffff"
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
    ctx.fill()
  })
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  width: number,
  height: number,
  padding: number,
  maxValue: number,
  color: string,
  progress: number,
) {
  const barWidth = (width / data.length) * 0.8
  const barSpacing = (width / data.length) * 0.2

  data.forEach((value, index) => {
    const x = padding + index * (width / data.length) + barSpacing / 2
    const fullBarHeight = (value / maxValue) * height
    const barHeight = fullBarHeight * progress
    const y = padding + height - barHeight

    // Bar gradient
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, color + "60")

    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth, barHeight)

    // Bar glow
    ctx.shadowColor = color
    ctx.shadowBlur = 5
    ctx.fillRect(x, y, barWidth, barHeight)
    ctx.shadowBlur = 0
  })
}

function drawDoughnutChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  centerX: number,
  centerY: number,
  radius: number,
  baseColor: string,
  progress: number,
) {
  const total = data.reduce((sum, value) => sum + value, 0)
  const colors = [baseColor, "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]

  let currentAngle = -Math.PI / 2

  data.forEach((value, index) => {
    const fullSliceAngle = (value / total) * 2 * Math.PI
    const sliceAngle = fullSliceAngle * progress

    if (sliceAngle > 0) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.arc(centerX, centerY, radius * 0.6, currentAngle + sliceAngle, currentAngle, true)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Glow effect
      ctx.shadowColor = colors[index % colors.length]
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0
    }

    currentAngle += fullSliceAngle
  })
}

function drawRadarChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  centerX: number,
  centerY: number,
  radius: number,
  color: string,
  progress: number,
) {
  const sides = data.length
  const maxValue = Math.max(...data)

  // Draw grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  ctx.lineWidth = 1

  for (let i = 1; i <= 5; i++) {
    ctx.beginPath()
    const gridRadius = (radius / 5) * i

    for (let j = 0; j < sides; j++) {
      const angle = (j / sides) * 2 * Math.PI - Math.PI / 2
      const x = centerX + Math.cos(angle) * gridRadius
      const y = centerY + Math.sin(angle) * gridRadius

      if (j === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.stroke()
  }

  // Draw axes
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 2 * Math.PI - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
    ctx.stroke()
  }

  // Draw data
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.fillStyle = color + "20"
  ctx.lineWidth = 2

  data.forEach((value, index) => {
    const angle = (index / sides) * 2 * Math.PI - Math.PI / 2
    const dataRadius = (value / maxValue) * radius * progress
    const x = centerX + Math.cos(angle) * dataRadius
    const y = centerY + Math.sin(angle) * dataRadius

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Data points
  data.forEach((value, index) => {
    const angle = (index / sides) * 2 * Math.PI - Math.PI / 2
    const dataRadius = (value / maxValue) * radius * progress
    const x = centerX + Math.cos(angle) * dataRadius
    const y = centerY + Math.sin(angle) * dataRadius

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

function drawHoverEffect(
  ctx: CanvasRenderingContext2D,
  index: number,
  data: number[],
  width: number,
  height: number,
  padding: number,
  maxValue: number,
  type: string,
) {
  if (type === "line") {
    const x = padding + (index / (data.length - 1)) * width
    const y = padding + height - (data[index] / maxValue) * height

    // Highlight line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, padding + height)
    ctx.stroke()
    ctx.setLineDash([])

    // Highlight point
    ctx.beginPath()
    ctx.fillStyle = "#ffffff"
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
  } else if (type === "bar") {
    const barWidth = (width / data.length) * 0.8
    const barSpacing = (width / data.length) * 0.2
    const x = padding + index * (width / data.length) + barSpacing / 2
    const barHeight = (data[index] / maxValue) * height
    const y = padding + height - barHeight

    // Highlight bar
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, barWidth, barHeight)
  }
}
