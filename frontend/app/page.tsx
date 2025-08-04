"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { PhishingDetection } from "@/components/phishing-detection"
import { FraudDetection } from "@/components/fraud-detection"
import { CircuitBackground } from "@/components/circuit-background"
import { EnhancedDashboard } from "@/components/enhanced-dashboard"
import { RealTimeIndicator } from "@/components/real-time-indicator"
import { useToast } from "@/hooks/use-toast"
import { usePerformance } from "@/hooks/use-performance"

type TabType = "dashboard" | "phishing" | "fraud"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [backendStatus, setBackendStatus] = useState<"online" | "offline" | "demo">("demo")
  const { toast } = useToast()
  const { startMeasure, endMeasure } = usePerformance()

  useEffect(() => {
    startMeasure("dashboard-load")

    // Check backend status
    const checkBackend = async () => {
      try {
        const response = await fetch("/api/health")
        const data = await response.json()
        setBackendStatus(data.status === "healthy" ? "online" : "demo")
      } catch (error) {
        setBackendStatus("demo")
      }
    }

    checkBackend()

    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
      endMeasure("dashboard-load")
      toast({
        title: "🚀 AccountGuard AI Ready",
        description: `Advanced threat detection systems are ${backendStatus === "online" ? "online" : "running in demo mode"}.`,
        duration: 4000,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [toast, startMeasure, endMeasure, backendStatus])

  const handleTabChange = (tab: TabType) => {
    startMeasure(`tab-switch-${tab}`)
    setActiveTab(tab)
    endMeasure(`tab-switch-${tab}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CircuitBackground />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10"
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gradient mb-2">Initializing AccountGuard AI</h2>
          <p className="text-muted-foreground">Loading advanced security systems...</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary">Connecting to neural networks</span>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background"
    >
      <CircuitBackground />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Enterprise Security Dashboard</h1>
              <p className="text-muted-foreground text-lg">Real-time AI-powered threat detection and analysis</p>
              {backendStatus === "demo" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-warning/20 border border-warning/50 rounded-full text-sm text-warning">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                    Demo Mode - Backend Offline
                  </div>
                </motion.div>
              )}
            </div>
            <RealTimeIndicator />
          </div>

          <NavigationTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabs={[
              { id: "dashboard", label: "Dashboard", icon: "activity" },
              { id: "phishing", label: "Phishing Detection", icon: "mail" },
              { id: "fraud", label: "Fraud Detection", icon: "credit-card" },
            ]}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && <EnhancedDashboard />}
              {activeTab === "phishing" && <PhishingDetection />}
              {activeTab === "fraud" && <FraudDetection />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </motion.div>
  )
}
