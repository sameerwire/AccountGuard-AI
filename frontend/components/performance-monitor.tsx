"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    function monitorPerformance() {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 5000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        console.log(`Dashboard Performance: ${fps} FPS`)
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(monitorPerformance)
    }

    monitorPerformance()
  }, [])

  return null
}
