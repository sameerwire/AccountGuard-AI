"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, Ban } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ThreatLevelIndicatorProps {
  level: string
  isAnalyzing: boolean
  type?: "phishing" | "fraud"
}

export function ThreatLevelIndicator({ level, isAnalyzing, type = "phishing" }: ThreatLevelIndicatorProps) {
  const getThreatConfig = () => {
    if (isAnalyzing) {
      return {
        icon: Shield,
        color: "text-muted-foreground",
        bgColor: "bg-muted/20",
        borderColor: "border-muted/50",
        text: "Analyzing...",
      }
    }

    const isHighRisk = level === "High" || level === "danger" || level === "phishing"
    const isMediumRisk = level === "Medium" || level === "warning"

    if (isHighRisk) {
      return {
        icon: type === "fraud" ? Ban : AlertTriangle,
        color: "text-danger",
        bgColor: "bg-danger/20",
        borderColor: "border-danger/50",
        text: type === "fraud" ? "Fraudulent Transaction" : "Phishing Threat Detected",
      }
    } else if (isMediumRisk) {
      return {
        icon: AlertTriangle,
        color: "text-warning",
        bgColor: "bg-warning/20",
        borderColor: "border-warning/50",
        text: "Suspicious Activity",
      }
    } else {
      return {
        icon: Shield,
        color: "text-success",
        bgColor: "bg-success/20",
        borderColor: "border-success/50",
        text: type === "fraud" ? "Transaction Verified" : "Content Verified Safe",
      }
    }
  }

  const config = getThreatConfig()
  const Icon = config.icon

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Badge
        className={`
          w-full justify-center py-4 px-6 text-base font-semibold
          ${config.bgColor} ${config.color} ${config.borderColor}
          shadow-glow transition-all duration-300
        `}
      >
        <motion.div
          animate={isAnalyzing ? { rotate: 360 } : { scale: [1, 1.1, 1] }}
          transition={
            isAnalyzing
              ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
              : { duration: 2, repeat: Number.POSITIVE_INFINITY }
          }
          className="mr-3"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {config.text}
      </Badge>
    </motion.div>
  )
}
