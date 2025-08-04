"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function RealTimeIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Badge variant="outline" className="bg-success/10 text-success border-success/50 px-4 py-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-2 h-2 bg-success rounded-full mr-2"
        />
        <span className="font-semibold">Real-time Monitoring Active</span>
      </Badge>
    </motion.div>
  )
}
