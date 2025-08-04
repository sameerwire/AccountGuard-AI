import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "AccountGuard AI - Enterprise Security Platform",
  description:
    "Advanced AI-powered threat detection and fraud prevention platform with real-time analysis and enterprise-grade security.",
  keywords: ["AI security", "phishing detection", "fraud prevention", "cybersecurity", "threat intelligence"],
  authors: [{ name: "AccountGuard AI Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#00d4ff",
  openGraph: {
    title: "AccountGuard AI - Enterprise Security Platform",
    description: "Advanced AI-powered threat detection and fraud prevention",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/api/health" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <Suspense fallback={null}>
            <div className="min-h-screen bg-background">{children}</div>
            <Toaster />
            <Analytics />
            <PerformanceMonitor />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
