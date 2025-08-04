"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Initialize analytics
    if (typeof window !== "undefined") {
      // Add your analytics initialization here
      console.log("Analytics initialized")
    }
  }, [])

  return null
}
