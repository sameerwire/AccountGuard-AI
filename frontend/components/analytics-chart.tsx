"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnalyticsChartProps {
  type: "phishing" | "fraud" | "threat-intelligence" | "patterns"
}

export function AnalyticsChart({ type }: AnalyticsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Chart data based on type
    const getChartData = () => {
      switch (type) {
        case "phishing":
          return {
            labels: ["Secure", "Suspicious", "Malicious", "Unknown"],
            data: [75, 15, 8, 2],
            colors: ["#10b981", "#f59e0b", "#ef4444", "#6366f1"],
          }
        case "threat-intelligence":
          return {
            labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
            data: [12, 19, 8, 15, 22, 18],
            colors: ["#00d4ff"],
          }
        case "fraud":
          return {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            data: [0.1, 0.3, 0.2, 0.8, 0.4, 0.2],
            colors: ["#00d4ff"],
          }
        case "patterns":
          return {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            data: [65, 59, 80, 81],
            data2: [28, 48, 40, 19],
            colors: ["#10b981", "#ef4444"],
          }
        default:
          return { labels: [], data: [], colors: [] }
      }
    }

    const chartData = getChartData()

    // Simple chart rendering
    ctx.clearRect(0, 0, rect.width, rect.height)

    if (type === "phishing") {
      // Doughnut chart
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) / 3

      let currentAngle = 0
      const total = chartData.data.reduce((sum, value) => sum + value, 0)

      chartData.data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        ctx.arc(centerX, centerY, radius * 0.6, currentAngle + sliceAngle, currentAngle, true)
        ctx.closePath()
        ctx.fillStyle = chartData.colors[index]
        ctx.fill()

        currentAngle += sliceAngle
      })
    } else {
      // Line/Bar chart
      const padding = 40
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2
      const maxValue = Math.max(...chartData.data, ...(chartData.data2 || []))

      if (type === "threat-intelligence" || type === "fraud") {
        // Line chart
        ctx.strokeStyle = chartData.colors[0]
        ctx.lineWidth = 3
        ctx.beginPath()

        chartData.data.forEach((value, index) => {
          const x = padding + (index / (chartData.data.length - 1)) * chartWidth
          const y = padding + chartHeight - (value / maxValue) * chartHeight

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Add glow effect
        ctx.shadowColor = chartData.colors[0]
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0
      } else if (type === "patterns") {
        // Multi-line chart
        ;[chartData.data, chartData.data2].forEach((data, seriesIndex) => {
          if (!data) return

          ctx.strokeStyle = chartData.colors[seriesIndex]
          ctx.lineWidth = 2
          ctx.beginPath()

          data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth
            const y = padding + chartHeight - (value / maxValue) * chartHeight

            if (index === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          })

          ctx.stroke()
        })
      }
    }

    // Animation frame for real-time updates
    const animate = () => {
      // Add subtle animation effects here if needed
      requestAnimationFrame(animate)
    }
    animate()
  }, [type])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 bg-surface/20 rounded-lg border border-border/30 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </motion.div>
  )
}
