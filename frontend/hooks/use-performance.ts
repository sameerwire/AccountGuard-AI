"use client"

import { useCallback } from "react"

export function usePerformance() {
  const startMeasure = useCallback((name: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(`${name}-start`)
    }
  }, [])

  const endMeasure = useCallback((name: string) => {
    if (typeof window !== "undefined" && "performance" in window) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)

      const measure = performance.getEntriesByName(name)[0]
      console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`)
    }
  }, [])

  return { startMeasure, endMeasure }
}
