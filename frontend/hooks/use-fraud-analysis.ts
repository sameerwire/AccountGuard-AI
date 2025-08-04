"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface FraudAnalysisInput {
  amount: number
  category: string
  location: string
}

export function useFraudAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [fraudScore, setFraudScore] = useState("0.0")
  const [anomalies, setAnomalies] = useState(0)
  const [riskFactors, setRiskFactors] = useState("Low")
  const { toast } = useToast()

  const analyze = useCallback(
    async (input: FraudAnalysisInput) => {
      setIsAnalyzing(true)

      try {
        // Simulate API call - replace with actual fraud detection API
        await new Promise((resolve) => setTimeout(resolve, 2500))

        const isFraud = Math.random() > 0.8
        const score = (Math.random() * 0.9).toFixed(2)
        const anomalyCount = Math.floor(Math.random() * 3)

        setResult({ isFraud, score })
        setFraudScore(score)
        setAnomalies(anomalyCount)
        setRiskFactors(isFraud ? "High" : "Low")

        toast({
          title: isFraud ? "🚨 Fraud Detected" : "✅ Transaction Safe",
          description: isFraud ? "Fraudulent transaction blocked by AI" : "Transaction verified and approved",
          variant: isFraud ? "destructive" : "default",
        })
      } catch (error) {
        toast({
          title: "Analysis Error",
          description: "Please try again",
          variant: "destructive",
        })
      } finally {
        setIsAnalyzing(false)
      }
    },
    [toast],
  )

  return {
    analyze,
    isAnalyzing,
    result,
    fraudScore,
    anomalies,
    riskFactors,
  }
}
