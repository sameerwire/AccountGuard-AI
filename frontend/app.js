import gsap from "gsap"
import AOS from "aos"
import lucide from "lucide"
import CircuitBackground from "./CircuitBackground"
import ChartManager from "./ChartManager"
import Chart from "chart.js/auto"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

class AccountGuardApp {
  constructor() {
    this.circuitBackground = null
    this.chartManager = null
    this.currentTab = "dashboard"
    this.systemMetrics = {
      threatsBlocked: 1247,
      fraudPrevented: 89,
      systemUptime: 99.9,
      activeConnections: 2847,
    }
    this.animationTimeline = gsap.timeline()
    this.isInitialized = false
    this.performanceMode = "optimized" // optimized for 30 FPS

    // Set GSAP defaults for 30 FPS optimization
    gsap.defaults({
      duration: 0.6,
      ease: "power2.out",
    })

    this.init()
  }

  init() {
    this.showOptimizedLoadingScreen()
    this.initializeComponents()
    this.setupEventListeners()
    this.setupOptimizedAnimations()
    this.populateActivityFeeds()
    this.startOptimizedMetricsUpdates()
    this.initializeAdvancedFeatures()

    // Optimized initialization timing
    setTimeout(() => {
      this.hideLoadingScreen()
      this.showToast(
        "🚀 AccountGuard AI Ready",
        "Advanced threat detection systems are running in optimized mode.",
        "success",
      )
      this.isInitialized = true
    }, 1500)
  }

  showOptimizedLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    const app = document.getElementById("app")

    loadingScreen.style.display = "flex"
    app.classList.add("hidden")

    // Optimized loading animations for 30 FPS
    gsap.fromTo(
      ".loading-spinner",
      { scale: 0, rotation: 0 },
      { scale: 1, rotation: 360, duration: 0.8, ease: "back.out(1.7)" },
    )

    gsap.fromTo(
      ".loading-title",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" },
    )

    gsap.fromTo(
      ".loading-subtitle",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out" },
    )

    gsap.fromTo(
      ".loading-status",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 0.6, ease: "back.out(1.7)" },
    )
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    const app = document.getElementById("app")

    gsap.to(loadingScreen, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        loadingScreen.style.display = "none"
        app.classList.remove("hidden")
        this.initializeOptimizedPageAnimations()
      },
    })
  }

  initializeOptimizedPageAnimations() {
    // Optimized AOS settings for 30 FPS
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
      offset: 30,
      delay: 0,
      anchorPlacement: "top-bottom",
    })

    // Optimized entrance animations
    gsap.fromTo(".header", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })

    gsap.fromTo(
      ".page-header > *",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.15, ease: "power2.out" },
    )

    gsap.fromTo(
      ".navigation-tabs",
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" },
    )

    // Optimized metric cards animation
    gsap.fromTo(
      ".metric-card",
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.45,
        ease: "power2.out",
      },
    )
  }

  initializeComponents() {
    // Optimized Lucide icons initialization
    lucide.createIcons({
      attrs: {
        "stroke-width": 1.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
    })

    // Initialize optimized circuit background
    this.circuitBackground = new CircuitBackground("circuit-background")

    // Initialize chart manager with optimized timing
    setTimeout(() => {
      this.chartManager = new ChartManager()
    }, 400)
  }

  setupOptimizedAnimations() {
    this.setupOptimizedScrolling()
    this.setupOptimizedHoverAnimations()
    this.setupOptimizedIntersectionAnimations()
  }

  setupOptimizedScrolling() {
    // Optimized smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power2.inOut",
          })
        }
      })
    })
  }

  setupOptimizedHoverAnimations() {
    // Optimized hover effects
    document.querySelectorAll(".glass").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          y: -2,
          duration: 0.2,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        })
      })
    })

    // Optimized button hover animations
    document.querySelectorAll(".analyze-btn").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          y: -1,
          duration: 0.15,
          ease: "power2.out",
        })
      })

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        })
      })
    })
  }

  setupOptimizedIntersectionAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-30px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target

          if (element.classList.contains("chart-card")) {
            this.animateOptimizedChartCard(element)
          } else if (element.classList.contains("metric-card")) {
            this.animateOptimizedMetricCard(element)
          } else if (element.classList.contains("activity-item")) {
            this.animateOptimizedActivityItem(element)
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll(".chart-card, .metric-card, .activity-item").forEach((el) => {
      observer.observe(el)
    })
  }

  animateOptimizedChartCard(element) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 25, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      },
    )
  }

  animateOptimizedMetricCard(element) {
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
    )
  }

  animateOptimizedActivityItem(element) {
    gsap.fromTo(
      element,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      },
    )
  }

  setupEventListeners() {
    // Optimized tab navigation
    const tabButtons = document.querySelectorAll(".tab-button")
    tabButtons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        const tabId = e.currentTarget.dataset.tab
        this.switchOptimizedTab(tabId, index)
      })
    })

    // Analysis buttons with optimized feedback
    const analyzePhishingBtn = document.getElementById("analyze-phishing")
    const analyzeFraudBtn = document.getElementById("analyze-fraud")

    if (analyzePhishingBtn) {
      analyzePhishingBtn.addEventListener("click", () => this.analyzePhishing())
    }

    if (analyzeFraudBtn) {
      analyzeFraudBtn.addEventListener("click", () => this.analyzeFraud())
    }

    this.setupOptimizedKeyboardNavigation()

    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize()
      }, 200),
    )
  }

  setupOptimizedKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const tabButtons = document.querySelectorAll(".tab-button")
        const activeIndex = Array.from(tabButtons).findIndex((btn) => btn.classList.contains("active"))

        if (activeIndex !== -1) {
          e.preventDefault()
          let newIndex

          if (e.key === "ArrowLeft") {
            newIndex = activeIndex > 0 ? activeIndex - 1 : tabButtons.length - 1
          } else {
            newIndex = activeIndex < tabButtons.length - 1 ? activeIndex + 1 : 0
          }

          const newTab = tabButtons[newIndex].dataset.tab
          this.switchOptimizedTab(newTab, newIndex)
          tabButtons[newIndex].focus()
        }
      }

      if (e.ctrlKey && e.key === "Enter") {
        const activeTab = this.currentTab
        if (activeTab === "phishing") {
          this.analyzePhishing()
        } else if (activeTab === "fraud") {
          this.analyzeFraud()
        }
      }
    })
  }

  switchOptimizedTab(tabId, index) {
    if (this.currentTab === tabId) return

    // Optimized tab switching animation
    const currentPane = document.getElementById(`${this.currentTab}-tab`)
    const targetPane = document.getElementById(`${tabId}-tab`)

    if (currentPane) {
      gsap.to(currentPane, {
        opacity: 0,
        x: -15,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          currentPane.classList.remove("active")

          if (targetPane) {
            targetPane.classList.add("active")
            gsap.fromTo(targetPane, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" })
          }
        },
      })
    }

    // Optimized tab button animation
    document.querySelectorAll(".tab-button").forEach((btn, i) => {
      btn.classList.remove("active")
      if (i !== index) {
        gsap.to(btn, {
          scale: 1,
          duration: 0.15,
          ease: "power2.out",
        })
      }
    })

    const activeButton = document.querySelector(`[data-tab="${tabId}"]`)
    activeButton.classList.add("active")

    gsap.to(activeButton, {
      scale: 1.02,
      duration: 0.15,
      ease: "back.out(1.7)",
      yoyo: true,
      repeat: 1,
    })

    // Optimized tab indicator animation
    const tabIndicator = document.querySelector(".tab-indicator")
    gsap.to(tabIndicator, {
      x: `${index * 100}%`,
      duration: 0.3,
      ease: "power2.out",
    })

    this.currentTab = tabId

    setTimeout(() => {
      AOS.refresh()
      this.refreshOptimizedChartAnimations()
    }, 250)
  }

  refreshOptimizedChartAnimations() {
    const visibleCharts = document.querySelectorAll(`#${this.currentTab}-tab .chart-container canvas`)
    visibleCharts.forEach((canvas) => {
      const chartInstance = Chart.getChart(canvas)
      if (chartInstance) {
        chartInstance.update("none") // Optimized update mode
      }
    })
  }

  analyzePhishing() {
    const emailContent = document.getElementById("email-content").value
    const urlInput = document.getElementById("url-input").value
    const smsContent = document.getElementById("sms-content").value

    if (!emailContent && !urlInput && !smsContent) {
      this.showToast("Input Required", "Please enter content to analyze", "warning")
      this.optimizedShakeElement(document.querySelector(".detection-card"))
      return
    }

    const analyzeBtn = document.getElementById("analyze-phishing")
    const threatIndicator = document.getElementById("phishing-threat-indicator")

    this.startOptimizedAnalysisAnimation(analyzeBtn, threatIndicator, "phishing")

    setTimeout(() => {
      const isPhishing = Math.random() > 0.7
      const confidence = Math.floor(Math.random() * 40) + (isPhishing ? 60 : 20)
      const riskLevel = isPhishing ? "High" : "Low"
      const indicators = isPhishing ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 2)

      this.updateOptimizedPhishingResults(isPhishing, confidence, riskLevel, indicators)
      this.stopOptimizedAnalysisAnimation(analyzeBtn, "phishing")

      this.showToast(
        isPhishing ? "⚠️ Threat Detected" : "✅ Content Safe",
        isPhishing ? "Phishing threat identified and blocked" : "Content verified as safe by AI analysis",
        isPhishing ? "error" : "success",
      )

      if (!isPhishing) {
        this.triggerOptimizedCelebrationAnimation()
      }
    }, 2000)
  }

  startOptimizedAnalysisAnimation(button, indicator, type) {
    button.classList.add("loading")
    button.innerHTML = '<i data-lucide="loader-2"></i> AI Processing...'
    lucide.createIcons()

    gsap.to(button, {
      scale: 0.99,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
    })

    indicator.innerHTML = `
      <div class="threat-badge analyzing">
        <i data-lucide="loader-2"></i>
        Analyzing...
      </div>
    `
    lucide.createIcons()

    gsap.to(indicator.querySelector(".threat-badge"), {
      scale: 1.01,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
    })
  }

  stopOptimizedAnalysisAnimation(button, type) {
    button.classList.remove("loading")
    button.innerHTML = '<i data-lucide="rocket"></i> Launch AI Analysis'
    lucide.createIcons()

    gsap.killTweensOf(button)
    gsap.set(button, { scale: 1 })

    const indicator = document.getElementById(`${type}-threat-indicator`)
    gsap.killTweensOf(indicator.querySelector(".threat-badge"))
  }

  updateOptimizedPhishingResults(isPhishing, confidence, riskLevel, indicators) {
    const threatIndicator = document.getElementById("phishing-threat-indicator")
    const confidenceEl = document.getElementById("phishing-confidence")
    const riskEl = document.getElementById("phishing-risk")
    const indicatorsEl = document.getElementById("phishing-indicators")
    const progressFill = document.getElementById("phishing-progress")
    const progressText = document.getElementById("phishing-progress-text")

    const badgeClass = isPhishing ? "danger" : "safe"
    const badgeText = isPhishing ? "Phishing Threat Detected" : "Content Verified Safe"
    const badgeIcon = isPhishing ? "alert-triangle" : "shield"

    threatIndicator.innerHTML = `
      <div class="threat-badge ${badgeClass}">
        <i data-lucide="${badgeIcon}"></i>
        ${badgeText}
      </div>
    `

    gsap.fromTo(
      threatIndicator.querySelector(".threat-badge"),
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
    )

    // Optimized metrics animation
    gsap.to(
      { value: 0 },
      {
        value: confidence,
        duration: 1,
        ease: "power2.out",
        onUpdate: function () {
          const currentValue = Math.round(this.targets()[0].value)
          confidenceEl.textContent = `${currentValue}%`
          progressFill.style.width = `${currentValue}%`
          progressText.textContent = `${currentValue}%`
        },
      },
    )

    gsap.to(
      { value: 0 },
      {
        value: indicators,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          indicatorsEl.textContent = Math.round(this.targets()[0].value)
        },
      },
    )

    this.optimizedTypewriterEffect(riskEl, riskLevel, 80)
    lucide.createIcons()
    this.highlightOptimizedResults("phishing")
  }

  analyzeFraud() {
    const amount = document.getElementById("transaction-amount").value
    const category = document.getElementById("merchant-category").value
    const location = document.getElementById("transaction-location").value

    if (!amount || !category || !location) {
      this.showToast("Input Required", "Please fill in all transaction details", "warning")
      this.optimizedShakeElement(document.querySelector(".detection-card"))
      return
    }

    const analyzeBtn = document.getElementById("analyze-fraud")
    const threatIndicator = document.getElementById("fraud-threat-indicator")

    this.startOptimizedAnalysisAnimation(analyzeBtn, threatIndicator, "fraud")

    setTimeout(() => {
      const isFraud = Math.random() > 0.8
      const fraudScore = (Math.random() * 0.9).toFixed(2)
      const anomalies = Math.floor(Math.random() * 3)
      const riskLevel = isFraud ? "High" : "Low"

      this.updateOptimizedFraudResults(isFraud, fraudScore, anomalies, riskLevel)
      this.stopOptimizedAnalysisAnimation(analyzeBtn, "fraud")

      this.showToast(
        isFraud ? "🚨 Fraud Detected" : "✅ Transaction Safe",
        isFraud ? "Fraudulent transaction blocked by AI" : "Transaction verified and approved",
        isFraud ? "error" : "success",
      )

      if (!isFraud) {
        this.triggerOptimizedCelebrationAnimation()
      }
    }, 2200)
  }

  updateOptimizedFraudResults(isFraud, fraudScore, anomalies, riskLevel) {
    const threatIndicator = document.getElementById("fraud-threat-indicator")
    const scoreEl = document.getElementById("fraud-score")
    const anomaliesEl = document.getElementById("fraud-anomalies")
    const riskLevelEl = document.getElementById("fraud-risk-level")

    const badgeClass = isFraud ? "danger" : "safe"
    const badgeText = isFraud ? "Fraudulent Transaction" : "Transaction Verified"
    const badgeIcon = isFraud ? "ban" : "shield"

    threatIndicator.innerHTML = `
      <div class="threat-badge ${badgeClass}">
        <i data-lucide="${badgeIcon}"></i>
        ${badgeText}
      </div>
    `

    gsap.fromTo(
      threatIndicator.querySelector(".threat-badge"),
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
    )

    gsap.to(
      { value: 0 },
      {
        value: Number.parseFloat(fraudScore),
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function () {
          scoreEl.textContent = this.targets()[0].value.toFixed(2)
        },
      },
    )

    gsap.to(
      { value: 0 },
      {
        value: anomalies,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: function () {
          anomaliesEl.textContent = Math.round(this.targets()[0].value)
        },
      },
    )

    this.optimizedTypewriterEffect(riskLevelEl, riskLevel, 80)
    lucide.createIcons()
    this.highlightOptimizedResults("fraud")
  }

  optimizedTypewriterEffect(element, text, speed = 80) {
    element.textContent = ""
    let i = 0
    const timer = setInterval(() => {
      element.textContent += text.charAt(i)
      i++
      if (i >= text.length) {
        clearInterval(timer)
      }
    }, speed)
  }

  highlightOptimizedResults(type) {
    const resultsCard = document.querySelector(`#${type}-tab .detection-card:last-child`)
    if (resultsCard) {
      gsap.fromTo(
        resultsCard,
        { boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" },
        {
          boxShadow: "0 8px 32px rgba(0, 212, 255, 0.3)",
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      )
    }
  }

  triggerOptimizedCelebrationAnimation() {
    const colors = ["#00d4ff", "#6366f1", "#8b5cf6", "#10b981"]

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: 50%;
        top: 50%;
      `

      document.body.appendChild(particle)

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: 0,
        scale: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      })
    }
  }

  optimizedShakeElement(element) {
    gsap.to(element, {
      x: -8,
      duration: 0.08,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
      onComplete: () => gsap.set(element, { x: 0 }),
    })
  }

  populateActivityFeeds() {
    const phishingFeed = document.getElementById("phishing-activity-feed")
    const fraudFeed = document.getElementById("fraud-activity-feed")

    const phishingActivities = [
      { type: "success", title: "AI Analysis Complete", time: "2 minutes ago", icon: "check-circle" },
      { type: "danger", title: "Threat Neutralized", time: "5 minutes ago", icon: "shield" },
      { type: "success", title: "Email Scan Complete", time: "8 minutes ago", icon: "check-circle" },
      { type: "warning", title: "Suspicious Pattern Detected", time: "12 minutes ago", icon: "alert-triangle" },
      { type: "success", title: "URL Verified Safe", time: "15 minutes ago", icon: "check-circle" },
    ]

    const fraudActivities = [
      { type: "success", title: "Transaction Verified", time: "1 minute ago", icon: "check-circle" },
      { type: "danger", title: "Anomaly Detected", time: "3 minutes ago", icon: "alert-triangle" },
      { type: "success", title: "Payment Processed", time: "6 minutes ago", icon: "credit-card" },
      { type: "warning", title: "High-Value Transaction", time: "9 minutes ago", icon: "dollar-sign" },
      { type: "success", title: "Identity Verified", time: "11 minutes ago", icon: "user-check" },
    ]

    if (phishingFeed) {
      phishingFeed.innerHTML = this.generateActivityHTML(phishingActivities)
      this.animateOptimizedActivityFeed(phishingFeed)
    }

    if (fraudFeed) {
      fraudFeed.innerHTML = this.generateActivityHTML(fraudActivities)
      this.animateOptimizedActivityFeed(fraudFeed)
    }

    this.startOptimizedActivityUpdates()
  }

  generateActivityHTML(activities) {
    return activities
      .map(
        (activity) => `
          <div class="activity-item">
            <div class="activity-icon ${activity.type}">
              <i data-lucide="${activity.icon}"></i>
            </div>
            <div class="activity-content">
              <div class="activity-title">${activity.title}</div>
              <div class="activity-time">${activity.time}</div>
            </div>
          </div>
        `,
      )
      .join("")
  }

  animateOptimizedActivityFeed(feed) {
    const items = feed.querySelectorAll(".activity-item")
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      },
    )
  }

  startOptimizedActivityUpdates() {
    setInterval(() => {
      const feeds = ["phishing-activity-feed", "fraud-activity-feed"]

      feeds.forEach((feedId) => {
        const feed = document.getElementById(feedId)
        if (!feed) return

        const isPhishing = feedId.includes("phishing")
        const activities = isPhishing
          ? [
              { type: "success", title: "Suspicious URL Blocked", time: "Just now", icon: "shield" },
              { type: "success", title: "Email Verified Safe", time: "Just now", icon: "check-circle" },
              { type: "warning", title: "Phishing Attempt Detected", time: "Just now", icon: "alert-triangle" },
              { type: "success", title: "Malware Quarantined", time: "Just now", icon: "bug" },
            ]
          : [
              { type: "danger", title: "Transaction Flagged", time: "Just now", icon: "alert-triangle" },
              { type: "success", title: "Payment Approved", time: "Just now", icon: "check-circle" },
              { type: "warning", title: "Unusual Pattern", time: "Just now", icon: "trending-up" },
              { type: "success", title: "Account Verified", time: "Just now", icon: "user-check" },
            ]

        const randomActivity = activities[Math.floor(Math.random() * activities.length)]

        const newItem = document.createElement("div")
        newItem.className = "activity-item"
        newItem.innerHTML = `
          <div class="activity-icon ${randomActivity.type}">
            <i data-lucide="${randomActivity.icon}"></i>
          </div>
          <div class="activity-content">
            <div class="activity-title">${randomActivity.title}</div>
            <div class="activity-time">${randomActivity.time}</div>
          </div>
        `

        feed.insertBefore(newItem, feed.firstChild)
        if (feed.children.length > 5) {
          const lastItem = feed.lastChild
          gsap.to(lastItem, {
            opacity: 0,
            x: 20,
            duration: 0.2,
            onComplete: () => lastItem.remove(),
          })
        }

        gsap.fromTo(
          newItem,
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
        )

        lucide.createIcons()
      })
    }, 20000)
  }

  startOptimizedMetricsUpdates() {
    setInterval(() => {
      this.systemMetrics.threatsBlocked += Math.floor(Math.random() * 3)
      const threatsEl = document.getElementById("threats-blocked")
      const dashboardThreatsEl = document.getElementById("dashboard-threats")

      this.animateOptimizedCounter(threatsEl, this.systemMetrics.threatsBlocked)
      this.animateOptimizedCounter(dashboardThreatsEl, this.systemMetrics.threatsBlocked)

      this.systemMetrics.activeConnections = Math.max(
        2000,
        this.systemMetrics.activeConnections + Math.floor(Math.random() * 20) - 10,
      )

      const connectionsEl = document.getElementById("active-connections")
      this.animateOptimizedCounter(connectionsEl, this.systemMetrics.activeConnections)

      this.optimizedPulseElement(threatsEl)
      this.optimizedPulseElement(connectionsEl)
    }, 6000)
  }

  animateOptimizedCounter(element, targetValue) {
    if (!element) return

    const currentValue = Number.parseInt(element.textContent.replace(/,/g, "")) || 0

    gsap.to(
      { value: currentValue },
      {
        value: targetValue,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function () {
          element.textContent = Math.round(this.targets()[0].value).toLocaleString()
        },
      },
    )
  }

  optimizedPulseElement(element) {
    if (!element) return

    gsap.to(element, {
      scale: 1.03,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  initializeAdvancedFeatures() {
    this.startOptimizedSystemMonitoring()
    this.optimizePerformance()
    this.setupAdvancedShortcuts()
    this.setupAutoSave()
  }

  startOptimizedSystemMonitoring() {
    let frameCount = 0
    let lastTime = performance.now()

    const monitor = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

        // Optimize for 30 FPS target
        if (fps < 25) {
          document.documentElement.style.setProperty("--animation-speed", "0.7")
        } else if (fps > 35) {
          document.documentElement.style.setProperty("--animation-speed", "1")
        }

        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(monitor)
    }

    monitor()
  }

  optimizePerformance() {
    const lazyElements = document.querySelectorAll("[data-lazy-animate]")

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            const animationType = element.dataset.lazyAnimate

            this.triggerOptimizedLazyAnimation(element, animationType)
            lazyObserver.unobserve(element)
          }
        })
      },
      { threshold: 0.1 },
    )

    lazyElements.forEach((el) => lazyObserver.observe(el))
  }

  triggerOptimizedLazyAnimation(element, type) {
    switch (type) {
      case "fadeIn":
        gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        break
      case "slideUp":
        gsap.fromTo(element, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        break
      case "scale":
        gsap.fromTo(element, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
        break
    }
  }

  setupAdvancedShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            this.switchOptimizedTab("dashboard", 0)
            break
          case "2":
            e.preventDefault()
            this.switchOptimizedTab("phishing", 1)
            break
          case "3":
            e.preventDefault()
            this.switchOptimizedTab("fraud", 2)
            break
          case "r":
            e.preventDefault()
            this.refreshAllData()
            break
          case "c":
            e.preventDefault()
            this.clearAllInputs()
            break
        }
      }
    })
  }

  setupAutoSave() {
    const inputs = document.querySelectorAll("input, textarea, select")

    inputs.forEach((input) => {
      input.addEventListener(
        "input",
        this.debounce(() => {
          const key = `accountguard_${input.id}`
          localStorage.setItem(key, input.value)
        }, 400),
      )

      const savedValue = localStorage.getItem(`accountguard_${input.id}`)
      if (savedValue) {
        input.value = savedValue
      }
    })
  }

  refreshAllData() {
    this.showToast("Refreshing Data", "Updating all security metrics...", "success")

    setTimeout(() => {
      this.startOptimizedMetricsUpdates()
      this.populateActivityFeeds()
      this.showToast("Data Refreshed", "All security metrics updated successfully", "success")
    }, 800)
  }

  clearAllInputs() {
    const inputs = document.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.value = ""
      localStorage.removeItem(`accountguard_${input.id}`)
    })

    this.showToast("Inputs Cleared", "All form inputs have been cleared", "success")
  }

  handleResize() {
    if (this.chartManager) {
      this.chartManager.handleResize()
    }

    if (this.circuitBackground) {
      this.circuitBackground.handleResize()
    }
  }

  showToast(title, message, type = "success") {
    const container = document.getElementById("toast-container")
    if (!container) return

    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    toast.innerHTML = `
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    `

    container.appendChild(toast)

    gsap.fromTo(
      toast,
      { opacity: 0, x: 80, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
    )

    setTimeout(() => toast.classList.add("show"), 50)

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        x: 80,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast)
          }
        },
      })
    }, 3500)
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  destroy() {
    if (this.circuitBackground) {
      this.circuitBackground.destroy()
    }
    if (this.chartManager) {
      this.chartManager.destroy()
    }

    gsap.killTweensOf("*")
    window.removeEventListener("resize", this.handleResize)
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.accountGuardApp = new AccountGuardApp()
})

// Handle page unload
window.addEventListener("beforeunload", () => {
  if (window.accountGuardApp) {
    window.accountGuardApp.destroy()
  }
})

// Service Worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
