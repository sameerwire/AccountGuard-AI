export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "20"
    const threatLevel = searchParams.get("threat_level")

    let url = `http://localhost:8000/logs?limit=${limit}`
    if (threatLevel) {
      url += `&threat_level=${threatLevel}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Backend API error")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    // Fallback response for demo
    const mockLogs = Array.from({ length: 10 }, (_, i) => ({
      _id: `demo_${i}`,
      input_type: Math.random() > 0.5 ? "url" : "text",
      prediction: Math.random() > 0.8 ? "phishing" : "benign",
      confidence_score: Math.random(),
      threat_level: Math.random() > 0.7 ? "high" : "low",
      timestamp: new Date(Date.now() - i * 300000).toISOString(),
    }))

    return Response.json({
      logs: mockLogs,
      total_count: mockLogs.length,
      query_limit: 20,
    })
  }
}
