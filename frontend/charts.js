import { Chart } from "@/components/ui/chart"

class ChartManager {
  constructor() {
    this.charts = {}
    this.realTimeData = {
      threatDetection: [65, 78, 82, 95, 88, 92, 85, 90],
      fraudPrevention: [45, 52, 48, 65, 58, 72, 68, 75],
      systemPerformance: [88, 92, 85, 90, 94, 89, 91, 87],
      networkActivity: [120, 150, 180, 165, 200, 175, 190, 210],
    }
    this.chartLabels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"]
    this.observers = new Map()
    this.animationQueue = []
    this.isAnimating = false
    this.performanceMode = "optimized" // optimized for 30 FPS

    this.initCharts()
    this.startOptimizedRealTimeUpdates()
  }

  initCharts() {
    setTimeout(() => {
      this.createOptimizedThreatChart()
      this.createOptimizedFraudChart()
      this.createOptimizedPerformanceChart()
      this.createOptimizedNetworkChart()
      this.createOptimizedThreatDistributionChart()
      this.createOptimizedSecurityRadarChart()
      this.createOptimizedResponseTimesChart()
      this.createOptimizedThreatIntelligenceChart()
      this.createOptimizedTransactionPatternsChart()
    }, 300)
  }

  createOptimizedIntersectionObserver(chartId, callback) {
    const element = document.getElementById(chartId)
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.observers.get(chartId)?.animated) {
            this.queueOptimizedAnimation(() => {
              callback()
              this.observers.set(chartId, { ...this.observers.get(chartId), animated: true })
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: "-20px" },
    )

    observer.observe(element.parentElement)
    this.observers.set(chartId, { observer, animated: false })
  }

  queueOptimizedAnimation(animationFn) {
    this.animationQueue.push(animationFn)
    if (!this.isAnimating) {
      this.processOptimizedAnimationQueue()
    }
  }

  processOptimizedAnimationQueue() {
    if (this.animationQueue.length === 0) {
      this.isAnimating = false
      return
    }

    this.isAnimating = true
    const nextAnimation = this.animationQueue.shift()

    nextAnimation()

    setTimeout(() => {
      this.processOptimizedAnimationQueue()
    }, 120) // Optimized stagger timing
  }

  createOptimizedThreatChart() {
    const ctx = document.getElementById("threat-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("threat-chart", () => {
      this.charts.threat = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Threats Detected",
              data: this.realTimeData.threatDetection,
              borderColor: "rgb(0, 212, 255)",
              backgroundColor: "rgba(0, 212, 255, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(0, 212, 255)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
          ],
        },
        options: this.getOptimizedLineChartOptions(),
      })
    })
  }

  createOptimizedFraudChart() {
    const ctx = document.getElementById("fraud-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("fraud-chart", () => {
      this.charts.fraud = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Fraud Prevented",
              data: this.realTimeData.fraudPrevention,
              borderColor: "rgb(245, 158, 11)",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(245, 158, 11)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
          ],
        },
        options: this.getOptimizedLineChartOptions(),
      })
    })
  }

  createOptimizedPerformanceChart() {
    const ctx = document.getElementById("performance-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("performance-chart", () => {
      this.charts.performance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Performance Score",
              data: this.realTimeData.systemPerformance,
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: this.getOptimizedBarChartOptions(),
      })
    })
  }

  createOptimizedNetworkChart() {
    const ctx = document.getElementById("network-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("network-chart", () => {
      this.charts.network = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Network Activity",
              data: this.realTimeData.networkActivity,
              borderColor: "rgb(139, 92, 246)",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(139, 92, 246)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
            {
              label: "Threat Level",
              data: this.realTimeData.threatDetection.map((v) => v * 2),
              borderColor: "rgb(0, 212, 255)",
              backgroundColor: "rgba(0, 212, 255, 0.05)",
              fill: false,
              tension: 0.4,
              pointBackgroundColor: "rgb(0, 212, 255)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 2,
              pointHoverRadius: 5,
              borderWidth: 2,
              borderDash: [4, 4],
            },
          ],
        },
        options: this.getOptimizedLineChartOptions(),
      })
    })
  }

  createOptimizedThreatDistributionChart() {
    const ctx = document.getElementById("threat-distribution-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("threat-distribution-chart", () => {
      this.charts.threatDistribution = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Phishing", "Malware", "Fraud", "Other"],
          datasets: [
            {
              data: [45, 25, 20, 10],
              backgroundColor: [
                "rgba(0, 212, 255, 0.8)",
                "rgba(139, 92, 246, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(245, 158, 11, 0.8)",
              ],
              borderColor: ["rgb(0, 212, 255)", "rgb(139, 92, 246)", "rgb(16, 185, 129)", "rgb(245, 158, 11)"],
              borderWidth: 2,
              hoverBorderWidth: 3,
              hoverOffset: 6,
            },
          ],
        },
        options: this.getOptimizedDoughnutChartOptions(),
      })
    })
  }

  createOptimizedSecurityRadarChart() {
    const ctx = document.getElementById("security-radar-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("security-radar-chart", () => {
      this.charts.securityRadar = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Email", "Web", "Network", "Mobile", "Cloud", "IoT"],
          datasets: [
            {
              label: "Security Coverage",
              data: [85, 92, 78, 88, 95, 82],
              borderColor: "rgb(0, 212, 255)",
              backgroundColor: "rgba(0, 212, 255, 0.2)",
              pointBackgroundColor: "rgb(0, 212, 255)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
          ],
        },
        options: this.getOptimizedRadarChartOptions(),
      })
    })
  }

  createOptimizedResponseTimesChart() {
    const ctx = document.getElementById("response-times-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("response-times-chart", () => {
      this.charts.responseTimes = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Response Time (ms)",
              data: [120, 85, 95, 110, 75, 90, 105],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "rgb(16, 185, 129)",
              borderWidth: 2,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: this.getOptimizedBarChartOptions(),
      })
    })
  }

  createOptimizedThreatIntelligenceChart() {
    const ctx = document.getElementById("threat-intelligence-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("threat-intelligence-chart", () => {
      this.charts.threatIntelligence = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "Threat Intelligence",
              data: [12, 19, 8, 15, 22, 18, 25, 20],
              borderColor: "rgb(0, 212, 255)",
              backgroundColor: "rgba(0, 212, 255, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(0, 212, 255)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 6,
              borderWidth: 2.5,
            },
          ],
        },
        options: this.getOptimizedLineChartOptions(),
      })
    })
  }

  createOptimizedTransactionPatternsChart() {
    const ctx = document.getElementById("transaction-patterns-chart")
    if (!ctx) return

    this.createOptimizedIntersectionObserver("transaction-patterns-chart", () => {
      this.charts.transactionPatterns = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Normal Transactions",
              data: [65, 59, 80, 81],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(16, 185, 129)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 4,
              borderWidth: 2.5,
            },
            {
              label: "Suspicious Transactions",
              data: [28, 48, 40, 19],
              borderColor: "rgb(239, 68, 68)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "rgb(239, 68, 68)",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 4,
              borderWidth: 2.5,
            },
          ],
        },
        options: this.getOptimizedLineChartOptions(),
      })
    })
  }

  getOptimizedLineChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1200, // Optimized for 30 FPS
        easing: "easeOutCubic",
        delay: (context) => {
          return context.type === "data" && context.mode === "default" ? context.dataIndex * 80 : 0
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(26, 31, 46, 0.95)",
          titleColor: "#ffffff",
          bodyColor: "#94a3b8",
          borderColor: "rgba(0, 212, 255, 0.3)",
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: true,
          padding: 10,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 6,
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 6,
          },
        },
      },
      elements: {
        point: {
          hoverRadius: 6,
          hoverBorderWidth: 2,
        },
        line: {
          borderCapStyle: "round",
          borderJoinStyle: "round",
        },
      },
    }
  }

  getOptimizedBarChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 1000, // Optimized for 30 FPS
        easing: "easeOutCubic",
        delay: (context) => {
          return context.type === "data" && context.mode === "default" ? context.dataIndex * 100 : 0
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(26, 31, 46, 0.95)",
          titleColor: "#ffffff",
          bodyColor: "#94a3b8",
          borderColor: "rgba(0, 212, 255, 0.3)",
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: true,
          padding: 10,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            borderColor: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 6,
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 6,
          },
        },
      },
    }
  }

  getOptimizedDoughnutChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500, // Optimized for 30 FPS
        easing: "easeOutCubic",
        animateRotate: true,
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(26, 31, 46, 0.95)",
          titleColor: "#ffffff",
          bodyColor: "#94a3b8",
          borderColor: "rgba(0, 212, 255, 0.3)",
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: true,
          padding: 10,
          callbacks: {
            label: (context) => {
              const label = context.label || ""
              const value = context.parsed
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${percentage}%`
            },
          },
        },
      },
      cutout: "60%",
      radius: "85%",
    }
  }

  getOptimizedRadarChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500, // Optimized for 30 FPS
        easing: "easeOutCubic",
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(26, 31, 46, 0.95)",
          titleColor: "#ffffff",
          bodyColor: "#94a3b8",
          borderColor: "rgba(0, 212, 255, 0.3)",
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: true,
          padding: 10,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            circular: true,
          },
          angleLines: {
            color: "rgba(255, 255, 255, 0.1)",
            lineWidth: 1,
          },
          pointLabels: {
            color: "rgba(148, 163, 184, 0.8)",
            font: {
              size: 10,
              family: "Inter",
            },
            padding: 6,
          },
          ticks: {
            color: "rgba(148, 163, 184, 0.6)",
            font: {
              size: 9,
              family: "Inter",
            },
            backdropColor: "transparent",
            stepSize: 20,
          },
        },
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          hoverBorderWidth: 3,
        },
        line: {
          borderWidth: 2.5,
          tension: 0.1,
        },
      },
    }
  }

  startOptimizedRealTimeUpdates() {
    setInterval(() => {
      this.realTimeData.threatDetection = [
        ...this.realTimeData.threatDetection.slice(1),
        Math.floor(Math.random() * 40) + 60,
      ]
      this.realTimeData.fraudPrevention = [
        ...this.realTimeData.fraudPrevention.slice(1),
        Math.floor(Math.random() * 30) + 45,
      ]
      this.realTimeData.systemPerformance = [
        ...this.realTimeData.systemPerformance.slice(1),
        Math.floor(Math.random() * 15) + 85,
      ]
      this.realTimeData.networkActivity = [
        ...this.realTimeData.networkActivity.slice(1),
        Math.floor(Math.random() * 100) + 150,
      ]

      this.updateOptimizedChartsWithAnimation()
    }, 5000) // Optimized update interval
  }

  updateOptimizedChartsWithAnimation() {
    const charts = [
      { chart: this.charts.threat, data: this.realTimeData.threatDetection },
      { chart: this.charts.fraud, data: this.realTimeData.fraudPrevention },
      { chart: this.charts.performance, data: this.realTimeData.systemPerformance },
    ]

    charts.forEach(({ chart, data }, index) => {
      if (chart) {
        setTimeout(() => {
          chart.data.datasets[0].data = data
          chart.update("none") // Optimized update mode
        }, index * 150)
      }
    })

    if (this.charts.network) {
      setTimeout(() => {
        this.charts.network.data.datasets[0].data = this.realTimeData.networkActivity
        this.charts.network.data.datasets[1].data = this.realTimeData.threatDetection.map((v) => v * 2)
        this.charts.network.update("none")
      }, 450)
    }
  }

  handleResize() {
    Object.values(this.charts).forEach((chart) => {
      if (chart) {
        chart.resize()
      }
    })
  }

  destroy() {
    Object.values(this.charts).forEach((chart) => {
      if (chart) chart.destroy()
    })
    this.observers.forEach(({ observer }) => {
      observer.disconnect()
    })
    this.charts = {}
    this.observers.clear()
    this.animationQueue = []
  }
}
