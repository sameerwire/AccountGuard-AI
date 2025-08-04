"use client"

import { motion } from "framer-motion"
import { Shield, Activity, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSystemStatus } from "@/hooks/use-system-status"

export function Header() {
  const { status, uptime, threatsBlocked } = useSystemStatus()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="flex items-center gap-4"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 212, 255, 0.4)",
                    "0 0 40px rgba(0, 212, 255, 0.6)",
                    "0 0 20px rgba(0, 212, 255, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl opacity-20 blur-sm"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gradient">AccountGuard AI</h1>
              <p className="text-sm text-muted-foreground font-medium">Enterprise Security Platform</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden md:flex items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Uptime:</span>
                <span className="font-mono text-success">{uptime}</span>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" />
                <span className="text-muted-foreground">Threats Blocked:</span>
                <span className="font-mono text-warning">{threatsBlocked.toLocaleString()}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Badge
                variant={status === "online" ? "default" : "destructive"}
                className={`
                  px-4 py-2 font-semibold
                  ${
                    status === "online"
                      ? "bg-success/20 text-success border-success/50 shadow-glow"
                      : "bg-danger/20 text-danger border-danger/50"
                  }
                `}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className={`w-2 h-2 rounded-full mr-2 ${status === "online" ? "bg-success" : "bg-danger"}`}
                />
                AI Systems {status === "online" ? "Online" : "Offline"}
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
