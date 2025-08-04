"use client"

import { useState, useEffect } from "react"

export function useSystemStatus() {
  const [status, setStatus] = useState<"online" | "offline">("online")
  const [uptime, setUptime] = useState("99.9%")
  const [threatsBlocked, setThreatsBlocked] = useState(1247)

  useEffect(() => {
    // Simulate real-time status updates
    const interval = setInterval(() => {
      setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 3))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return {
    status,
    uptime,
    threatsBlocked,
  }
}
