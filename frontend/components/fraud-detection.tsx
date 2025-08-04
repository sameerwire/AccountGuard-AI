"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, Rocket, Shield, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ThreatLevelIndicator } from "@/components/threat-level-indicator"
import { AnalyticsChart } from "@/components/analytics-chart"
import { ActivityFeed } from "@/components/activity-feed"
import { useFraudAnalysis } from "@/hooks/use-fraud-analysis"
import { useToast } from "@/hooks/use-toast"

export function FraudDetection() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")

  const { analyze, isAnalyzing, result, fraudScore, anomalies, riskFactors } = useFraudAnalysis()

  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!amount || !category || !location) {
      toast({
        title: "Input Required",
        description: "Please fill in all transaction details",
        variant: "destructive",
      })
      return
    }

    try {
      await analyze({
        amount: Number.parseFloat(amount),
        category,
        location,
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
        {/* Transaction Input */}
        <motion.div variants={itemVariants}>
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Calculator className="w-6 h-6 text-primary" />
                </motion.div>
                Transaction Analysis
              </CardTitle>
              <Badge variant="outline" className="w-fit bg-success/10 text-success border-success/50">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-success rounded-full mr-2"
                />
                Real-time Processing
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-semibold">
                  Transaction Amount ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="1000.00"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-surface/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold">
                  Merchant Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-surface/50 border-border/50 focus:border-primary/50">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grocery">Grocery & Food</SelectItem>
                    <SelectItem value="gas">Gas & Fuel</SelectItem>
                    <SelectItem value="restaurant">Restaurant & Dining</SelectItem>
                    <SelectItem value="online">Online Commerce</SelectItem>
                    <SelectItem value="atm">ATM & Banking</SelectItem>
                    <SelectItem value="other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold">
                  Transaction Location
                </Label>
                <Input
                  id="location"
                  placeholder="New York, NY, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5 mr-2" />
                      Analyze Transaction
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
                <Shield className="w-6 h-6 text-primary" />
                Fraud Assessment
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <ThreatLevelIndicator level={riskFactors} isAnalyzing={isAnalyzing} type="fraud" />

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-surface/30 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-gradient mb-1">{fraudScore}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Fraud Score</div>
                </div>

                <div className="text-center p-4 bg-surface/30 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-gradient mb-1">{anomalies}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Anomalies</div>
                </div>

                <div className="text-center p-4 bg-surface/30 rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-gradient mb-1">{riskFactors}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Risk Level</div>
                </div>
              </div>

              <AnalyticsChart type="fraud" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Section */}
      <motion.div variants={itemVariants} className="dashboard-grid">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Transaction Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart type="patterns" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed type="fraud" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
