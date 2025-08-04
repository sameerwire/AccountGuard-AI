export async function GET() {
  try {
    const response = await fetch("http://localhost:8000/analytics")

    if (!response.ok) {
      throw new Error("Backend API error")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    // Fallback response for demo
    return Response.json({
      analytics: {
        total_scans: 15847,
        phishing_detected: 1247,
        high_threats: 89,
        recent_scans_24h: 2847,
        detection_rate: 7.87,
        scan_distribution: {
          url_scans: 8924,
          text_scans: 6923,
        },
      },
      timestamp: new Date().toISOString(),
    })
  }
}
