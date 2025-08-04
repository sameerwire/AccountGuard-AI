export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    const response = await fetch("http://localhost:8000/phishing/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error("Backend API error")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    // Fallback response for demo
    return Response.json({
      result: {
        label: Math.random() > 0.7 ? "phishing" : "benign",
        score: Math.random(),
        reason: "Demo mode - backend unavailable",
        risk_indicators: ["Demo indicator"],
      },
    })
  }
}
