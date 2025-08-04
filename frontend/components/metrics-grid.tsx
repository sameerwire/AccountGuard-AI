"use client"

import { motion } from "framer-motion"
import { TrendingUp, AlertCircle, Shield } from "lucide-react"

interface MetricsGridProps {
  confidence: number
  riskLevel: string
  indicators: number
  isAnalyzing: boolean
}

export function MetricsGrid({ confidence, riskLevel, indicators, isAnalyzing }: MetricsGridProps) {
  const metrics = [
    {
      label: "AI Confidence",
      value: isAnalyzing ? "..." : `${confidence}%`,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Risk Level",
      value: isAnalyzing ? "..." : riskLevel,
      icon: Shield,
      color: "text-secondary",
    },
    {
      label: "Threat Indicators",
      value: isAnalyzing ? "..." : indicators.toString(),
      icon: AlertCircle,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="text-center p-4 bg-surface/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
          >
            <motion.div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <motion.div
              animate={isAnalyzing ? { rotate: 360 } : {}}
              transition={isAnalyzing ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
              className={`${metric.color} mb-2 flex justify-center`}
            >
              <Icon className="w-5 h-5" />
            </motion.div>

            <motion.div
              key={metric.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-gradient mb-1"
            >
              {metric.value}
            </motion.div>

            <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{metric.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
