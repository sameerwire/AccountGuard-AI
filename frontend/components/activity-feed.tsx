"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, Shield, CreditCard } from "lucide-react"

interface ActivityItem {
  id: string
  type: "success" | "warning" | "danger"
  title: string
  timestamp: string
  icon: "check" | "warning" | "shield" | "card"
}

interface ActivityFeedProps {
  type: "phishing" | "fraud"
}

export function ActivityFeed({ type }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Initial activities
    const initialActivities: ActivityItem[] =
      type === "phishing"
        ? [
            {
              id: "1",
              type: "success",
              title: "AI Analysis Complete",
              timestamp: "2 minutes ago",
              icon: "check",
            },
            {
              id: "2",
              type: "danger",
              title: "Threat Neutralized",
              timestamp: "5 minutes ago",
              icon: "shield",
            },
            {
              id: "3",
              type: "success",
              title: "Email Scan Complete",
              timestamp: "8 minutes ago",
              icon: "check",
            },
          ]
        : [
            {
              id: "1",
              type: "success",
              title: "Transaction Verified",
              timestamp: "1 minute ago",
              icon: "check",
            },
            {
              id: "2",
              type: "danger",
              title: "Anomaly Detected",
              timestamp: "3 minutes ago",
              icon: "warning",
            },
            {
              id: "3",
              type: "success",
              title: "Payment Processed",
              timestamp: "6 minutes ago",
              icon: "card",
            },
          ]

    setActivities(initialActivities)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? "danger" : "success",
        title:
          type === "phishing"
            ? Math.random() > 0.5
              ? "Suspicious URL Blocked"
              : "Email Verified Safe"
            : Math.random() > 0.5
              ? "Transaction Flagged"
              : "Payment Approved",
        timestamp: "Just now",
        icon: Math.random() > 0.5 ? "check" : "warning",
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 4)])
    }, 30000) // Add new activity every 30 seconds

    return () => clearInterval(interval)
  }, [type])

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "check":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "shield":
        return Shield
      case "card":
        return CreditCard
      default:
        return CheckCircle
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-success bg-success/20 border-success/50"
      case "warning":
        return "text-warning bg-warning/20 border-warning/50"
      case "danger":
        return "text-danger bg-danger/20 border-danger/50"
      default:
        return "text-success bg-success/20 border-success/50"
    }
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.icon)

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ x: 4, scale: 1.02 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-surface/30 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  w-10 h-10 rounded-lg border flex items-center justify-center
                  ${getIconColor(activity.type)}
                  group-hover:shadow-glow transition-all duration-300
                `}
              >
                <Icon className="w-4 h-4" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {activity.title}
                </div>
                <div className="text-sm text-muted-foreground">{activity.timestamp}</div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
