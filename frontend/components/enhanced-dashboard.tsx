"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { InteractiveChart } from "./interactive-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Shield, Zap, AlertTriangle, CheckCircle } from "lucide-react"
import { useRef } from "react"

export function EnhancedDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  const [realTimeData, setRealTimeData] = useState({
    threatDetection: [65, 78, 82, 95, 88, 92, 85, 90],
    fraudPrevention: [45, 52, 48, 65, 58, 72, 68, 75],
    systemPerformance: [88, 92, 85, 90, 94, 89, 91, 87],
    networkActivity: [120, 150, 180, 165, 200, 175, 190, 210],
  })

  const [systemMetrics, setSystemMetrics] = useState({
    threatsBlocked: 1247,
    fraudPrevented: 89,
    systemUptime: 99.9,
    activeConnections: 2847,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        threatDetection: [...prev.threatDetection.slice(1), Math.floor(Math.random() * 40) + 60],
        fraudPrevention: [...prev.fraudPrevention.slice(1), Math.floor(Math.random() * 30) + 45],
        systemPerformance: [...prev.systemPerformance.slice(1), Math.floor(Math.random() * 15) + 85],
        networkActivity: [...prev.networkActivity.slice(1), Math.floor(Math.random() * 100) + 150],
      }))

      setSystemMetrics((prev) => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        activeConnections: Math.max(2000, prev.activeConnections + Math.floor(Math.random() * 10) - 5),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const chartLabels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-8"
    >
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="glass relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  <motion.p
                    key={systemMetrics.threatsBlocked}
                    initial={{ scale: 1.1, color: "#00d4ff" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold text-gradient"
                  >
                    {systemMetrics.threatsBlocked.toLocaleString()}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="p-3 bg-danger/20 rounded-full"
                >
                  <Shield className="w-6 h-6 text-danger" />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-success">+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fraud Prevented</p>
                  <p className="text-3xl font-bold text-gradient">{systemMetrics.fraudPrevented}</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="p-3 bg-warning/20 rounded-full"
                >
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-success">All systems operational</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-3xl font-bold text-gradient">{systemMetrics.systemUptime}%</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="p-3 bg-success/20 rounded-full"
                >
                  <Activity className="w-6 h-6 text-success" />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-success">Excellent performance</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass relative overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Connections</p>
                  <motion.p
                    key={systemMetrics.activeConnections}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl font-bold text-gradient"
                  >
                    {systemMetrics.activeConnections.toLocaleString()}
                  </motion.p>
                </div>
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 212, 255, 0.3)",
                      "0 0 40px rgba(0, 212, 255, 0.6)",
                      "0 0 20px rgba(0, 212, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="p-3 bg-primary/20 rounded-full"
                >
                  <Zap className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50">
                  Real-time
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Threat Detection Analytics
                <Badge variant="outline" className="bg-success/10 text-success border-success/50">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="area"
                data={realTimeData.threatDetection}
                labels={chartLabels}
                title="Threats Detected (24h)"
                color="#00d4ff"
                realTime={true}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Fraud Prevention Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="line"
                data={realTimeData.fraudPrevention}
                labels={chartLabels}
                title="Fraud Attempts Blocked"
                color="#f59e0b"
                realTime={true}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-success" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="bar"
                data={realTimeData.systemPerformance}
                labels={chartLabels}
                title="Performance Score"
                color="#10b981"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent" />
                Network Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="line"
                data={realTimeData.networkActivity}
                secondaryData={realTimeData.threatDetection.map((v) => v * 2)}
                labels={chartLabels}
                title="Network Traffic vs Threats"
                color="#8b5cf6"
                realTime={true}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="doughnut"
                data={[45, 25, 20, 10]}
                labels={["Phishing", "Malware", "Fraud", "Other"]}
                title="Threat Types"
                color="#00d4ff"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Security Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="radar"
                data={[85, 92, 78, 88, 95, 82]}
                labels={["Email", "Web", "Network", "Mobile", "Cloud", "IoT"]}
                title="Security Coverage"
                color="#00d4ff"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass">
            <CardHeader>
              <CardTitle>Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                type="bar"
                data={[120, 85, 95, 110, 75, 90, 105, 80]}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                title="Average Response (ms)"
                color="#10b981"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
