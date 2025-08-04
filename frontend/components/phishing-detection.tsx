"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Rocket, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThreatLevelIndicator } from "@/components/threat-level-indicator"
import { MetricsGrid } from "@/components/metrics-grid"
import { AnalyticsChart } from "@/components/analytics-chart"
import { ActivityFeed } from "@/components/activity-feed"
import { usePhishingAnalysis } from "@/hooks/use-phishing-analysis"
import { useToast } from "@/hooks/use-toast"

export function PhishingDetection() {
  const [emailContent, setEmailContent] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [smsContent, setSmsContent] = useState("")

  const { analyze, isAnalyzing, result, confidence, riskLevel, indicators } = usePhishingAnalysis()

  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!emailContent && !urlInput && !smsContent) {
      toast({
        title: "Input Required",
        description: "Please enter content to analyze",
        variant: "destructive",
      })
      return
    }

    try {
      await analyze({
        emailContent,
        urlInput,
        smsContent,
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      })
    }
  }

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <div className="dashboard-grid">
        {/* Analysis Input */}
        <motion.div variants={itemVariants}>
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Brain className="w-6 h-6 text-primary" />
                </motion.div>
                AI Threat Analysis
              </CardTitle>
              <Badge variant="outline" className="w-fit bg-success/10 text-success border-success/50">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-success rounded-full mr-2"
                />
                Real-time AI Processing
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-content" className="text-sm font-semibold">
                  Email Content Analysis
                </Label>
                <Textarea
                  id="email-content"
                  placeholder="Paste email content for advanced AI analysis..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="min-h-[120px] bg-surface/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url-input" className="text-sm font-semibold">
                  URL Security Scan
                </Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-surface/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms-content" className="text-sm font-semibold">
                  SMS Pattern Recognition
                </Label>
                <Textarea
                  id="sms-content"
                  placeholder="Enter SMS content for behavioral analysis..."
                  value={smsContent}
                  onChange={(e) => setSmsContent(e.target.value)}
                  className="bg-surface/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full btn-glow bg-gradient-to-r from-primary to-secondary hover:shadow-glow-intense transition-all duration-300"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Launch AI Analysis
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div variants={itemVariants}>
          <Card className="glass-intense h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                Analysis Results
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <ThreatLevelIndicator level={riskLevel} isAnalyzing={isAnalyzing} />

              <MetricsGrid
                confidence={confidence}
                riskLevel={riskLevel}
                indicators={indicators}
                isAnalyzing={isAnalyzing}
              />

              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Confidence Score
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Confidence</span>
                    <span className="font-mono">{confidence}%</span>
                  </div>
                  <Progress value={confidence} className="h-2" />
                </div>
              </div>

              <AnalyticsChart type="phishing" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Section */}
      <motion.div variants={itemVariants} className="dashboard-grid">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              Live Threat Intelligence
            </CardTitle>
            <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/50">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-primary rounded-full mr-2"
              />
              Live Data Feed
            </Badge>
          </CardHeader>
          <CardContent>
            <AnalyticsChart type="threat-intelligence" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed type="phishing" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
