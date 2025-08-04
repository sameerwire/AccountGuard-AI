"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisInput {
  emailContent?: string
  urlInput?: string
  smsContent?: string
}

interface AnalysisResult {
  label: string
  score: number
  reason: string
  risk_indicators?: string[]
}

export function usePhishingAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [riskLevel, setRiskLevel] = useState("Low")
  const [indicators, setIndicators] = useState(0)
  const { toast } = useToast()

  const analyze = useCallback(
    async (input: AnalysisInput) => {
      setIsAnalyzing(true)

      try {
        let response: Response

        if (input.urlInput) {
          response = await fetch("/api/phishing/url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: input.urlInput }),
          })
        } else {
          const content = input.emailContent || input.smsContent || ""
          response = await fetch("/api/phishing/text", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: content,
          })
        }

        if (!response.ok) {
          throw new Error("Analysis failed")
        }

        const data = await response.json()
        const analysisResult = data.result

        setResult(analysisResult)
        setConfidence(Math.round(analysisResult.score * 100))
        setRiskLevel(analysisResult.label === "phishing" ? "High" : "Low")
        setIndicators(analysisResult.risk_indicators?.length || 0)

        toast({
          title: analysisResult.label === "phishing" ? "⚠️ Threat Detected" : "✅ Content Safe",
          description:
            analysisResult.label === "phishing"
              ? "Phishing threat identified and blocked"
              : "Content verified as safe by AI analysis",
          variant: analysisResult.label === "phishing" ? "destructive" : "default",
        })
      } catch (error) {
        // Fallback to demo mode
        const isPhishing = Math.random() > 0.7
        const mockResult = {
          label: isPhishing ? "phishing" : "benign",
          score: Math.random(),
          reason: "Demo mode analysis",
          risk_indicators: isPhishing ? ["Suspicious keywords", "External links"] : [],
        }

        setResult(mockResult)
        setConfidence(Math.round(mockResult.score * 100))
        setRiskLevel(isPhishing ? "High" : "Low")
        setIndicators(mockResult.risk_indicators?.length || 0)

        toast({
          title: "Demo Mode",
          description: "Using simulated analysis results",
          variant: "default",
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
    confidence,
    riskLevel,
    indicators,
  }
}
