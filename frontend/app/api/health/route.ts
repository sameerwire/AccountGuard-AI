export async function GET() {
  try {
    const response = await fetch("http://localhost:8000/health")
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({
      status: "demo",
      message: "Backend unavailable - running in demo mode",
    })
  }
}
