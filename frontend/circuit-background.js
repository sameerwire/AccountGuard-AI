// Update CircuitBackground class for optimized 30 FPS performance
class CircuitBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d", { alpha: true, desynchronized: true })
    this.nodes = []
    this.lines = []
    this.animationId = null
    this.lastFrameTime = 0
    this.fpsCounter = 0
    this.lastFpsUpdate = 0
    this.isVisible = true
    this.performanceMode = "optimized" // optimized for 30 FPS
    this.targetFPS = 30
    this.frameInterval = 1000 / this.targetFPS

    this.init()
  }

  init() {
    this.setupCanvas()
    this.generateOptimizedNodes()
    this.generateOptimizedLines()
    this.setupVisibilityObserver()
    this.animate()

    window.addEventListener(
      "resize",
      this.debounce(() => this.handleResize(), 300),
    )
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) // Limit DPR for better performance

    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    this.canvas.style.width = rect.width + "px"
    this.canvas.style.height = rect.height + "px"

    this.ctx.scale(dpr, dpr)
    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = "medium" // Balanced quality/performance
  }

  setupVisibilityObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(this.canvas)
  }

  generateOptimizedNodes() {
    this.nodes = []
    const rect = this.canvas.getBoundingClientRect()
    const gridSize = 100 // Optimized grid size for 30 FPS
    const cols = Math.ceil(rect.width / gridSize)
    const rows = Math.ceil(rect.height / gridSize)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.7) {
          // Reduced node density
          this.nodes.push({
            x: i * gridSize + (Math.random() - 0.5) * 30,
            y: j * gridSize + (Math.random() - 0.5) * 30,
            connections: [],
            active: Math.random() > 0.8,
            pulseDelay: Math.random() * 5000,
            lastPulse: 0,
            energy: Math.random(),
            type: Math.random() > 0.85 ? "hub" : "node",
          })
        }
      }
    }

    // Optimized connection algorithm
    this.nodes.forEach((node, index) => {
      const maxConnections = node.type === "hub" ? 4 : 2
      const nearbyNodes = this.nodes
        .map((otherNode, otherIndex) => ({ node: otherNode, index: otherIndex }))
        .filter(({ node: otherNode, index: otherIndex }) => {
          if (index === otherIndex) return false
          const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
          return distance < 150 && distance > 50
        })
        .sort((a, b) => {
          const distA = Math.sqrt(Math.pow(node.x - a.node.x, 2) + Math.pow(node.y - a.node.y, 2))
          const distB = Math.sqrt(Math.pow(node.x - b.node.x, 2) + Math.pow(node.y - b.node.y, 2))
          return distA - distB
        })
        .slice(0, maxConnections)

      nearbyNodes.forEach(({ index: otherIndex }) => {
        if (Math.random() > 0.4) {
          node.connections.push(otherIndex)
        }
      })
    })
  }

  generateOptimizedLines() {
    this.lines = []
    const processedConnections = new Set()

    this.nodes.forEach((node, index) => {
      node.connections.forEach((connectionIndex) => {
        const connectionKey = `${Math.min(index, connectionIndex)}-${Math.max(index, connectionIndex)}`
        if (!processedConnections.has(connectionKey)) {
          processedConnections.add(connectionKey)
          const targetNode = this.nodes[connectionIndex]
          if (targetNode) {
            this.lines.push({
              start: node,
              end: targetNode,
              progress: 0,
              active: Math.random() > 0.7,
              speed: 0.3 + Math.random() * 0.5,
              lastUpdate: 0,
              intensity: Math.random(),
              type: Math.random() > 0.9 ? "data" : "power",
            })
          }
        }
      })
    })
  }

  drawOptimizedCircuitPath(start, end, opacity = 0.3, lineType = "power") {
    const dx = end.x - start.x
    const dy = end.y - start.y

    const color = lineType === "data" ? "77, 208, 225" : "0, 212, 255"

    this.ctx.strokeStyle = `rgba(${color}, ${opacity})`
    this.ctx.lineWidth = lineType === "data" ? 1.5 : 2
    this.ctx.lineCap = "round"
    this.ctx.lineJoin = "round"

    this.ctx.beginPath()
    this.ctx.moveTo(start.x, start.y)

    // Simplified L-shaped paths for better performance
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = start.x + dx * 0.7
      this.ctx.lineTo(midX, start.y)
      this.ctx.lineTo(midX, end.y)
      this.ctx.lineTo(end.x, end.y)
    } else {
      const midY = start.y + dy * 0.7
      this.ctx.lineTo(start.x, midY)
      this.ctx.lineTo(end.x, midY)
      this.ctx.lineTo(end.x, end.y)
    }

    this.ctx.stroke()
  }

  drawOptimizedPulse(x, y, intensity = 1, type = "power") {
    const maxRadius = type === "data" ? 6 : 10
    const color = type === "data" ? "77, 208, 225" : "0, 212, 255"

    // Single layer pulse for better performance
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, maxRadius * intensity)
    gradient.addColorStop(0, `rgba(${color}, ${0.8 * intensity})`)
    gradient.addColorStop(0.5, `rgba(${color}, ${0.3 * intensity})`)
    gradient.addColorStop(1, `rgba(${color}, 0)`)

    this.ctx.beginPath()
    this.ctx.fillStyle = gradient
    this.ctx.arc(x, y, maxRadius * intensity, 0, Math.PI * 2)
    this.ctx.fill()
  }

  drawOptimizedNode(node, currentTime) {
    const baseRadius = node.type === "hub" ? 3.5 : 2.5
    const glowRadius = node.type === "hub" ? 15 : 12

    // Simplified node rendering
    this.ctx.beginPath()
    this.ctx.fillStyle = node.active ? "rgba(0, 212, 255, 0.9)" : "rgba(0, 212, 255, 0.4)"
    this.ctx.arc(node.x, node.y, baseRadius, 0, Math.PI * 2)
    this.ctx.fill()

    // Optimized active node effects
    if (node.active) {
      // Single glow layer
      const glowGradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
      glowGradient.addColorStop(0, "rgba(0, 212, 255, 0.2)")
      glowGradient.addColorStop(1, "rgba(0, 212, 255, 0)")

      this.ctx.beginPath()
      this.ctx.fillStyle = glowGradient
      this.ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2)
      this.ctx.fill()

      // Simplified pulse ring
      const pulsePhase = (currentTime * 0.002 + node.pulseDelay * 0.001) % (Math.PI * 2)
      const pulseRadius = baseRadius + 3 + Math.sin(pulsePhase) * 2
      const pulseOpacity = 0.4 + Math.sin(pulsePhase) * 0.2

      this.ctx.beginPath()
      this.ctx.strokeStyle = `rgba(0, 212, 255, ${pulseOpacity})`
      this.ctx.lineWidth = 1.5
      this.ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
      this.ctx.stroke()
    }
  }

  animate(currentTime = 0) {
    const deltaTime = currentTime - this.lastFrameTime

    // Strict 30 FPS limiting
    if (deltaTime < this.frameInterval) {
      this.animationId = requestAnimationFrame((time) => this.animate(time))
      return
    }

    this.lastFrameTime = currentTime

    // Skip rendering if not visible
    if (!this.isVisible) {
      this.animationId = requestAnimationFrame((time) => this.animate(time))
      return
    }

    const rect = this.canvas.getBoundingClientRect()
    this.ctx.clearRect(0, 0, rect.width, rect.height)

    // Simplified background
    const gradient = this.ctx.createRadialGradient(
      rect.width / 2,
      rect.height / 2,
      0,
      rect.width / 2,
      rect.height / 2,
      Math.max(rect.width, rect.height) / 2,
    )

    gradient.addColorStop(0, "rgba(10, 14, 26, 0.95)")
    gradient.addColorStop(0.5, "rgba(13, 20, 33, 0.98)")
    gradient.addColorStop(1, "rgba(10, 14, 26, 1)")

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw optimized circuit lines
    this.lines.forEach((line) => {
      const baseOpacity = line.active ? 0.4 : 0.2
      this.drawOptimizedCircuitPath(line.start, line.end, baseOpacity, line.type)

      // Optimized pulse animation
      if (line.active && currentTime - line.lastUpdate > 120) {
        line.progress += line.speed * (deltaTime * 0.001)
        line.lastUpdate = currentTime

        if (line.progress > 1.2) {
          line.progress = 0
          line.active = Math.random() > 0.5
          line.speed = 0.3 + Math.random() * 0.5
        }
      }

      // Draw optimized pulse
      if (line.active && line.progress > 0 && line.progress < 1) {
        const dx = line.end.x - line.start.x
        const dy = line.end.y - line.start.y

        let pulseX, pulseY

        // Simplified pulse position calculation
        if (Math.abs(dx) > Math.abs(dy)) {
          const midX = line.start.x + dx * 0.7
          if (line.progress < 0.7) {
            pulseX = line.start.x + (midX - line.start.x) * (line.progress / 0.7)
            pulseY = line.start.y
          } else {
            pulseX = midX
            pulseY = line.start.y + (line.end.y - line.start.y) * ((line.progress - 0.7) / 0.3)
          }
        } else {
          const midY = line.start.y + dy * 0.7
          if (line.progress < 0.7) {
            pulseX = line.start.x
            pulseY = line.start.y + (midY - line.start.y) * (line.progress / 0.7)
          } else {
            pulseX = line.start.x + (line.end.x - line.start.x) * ((line.progress - 0.7) / 0.3)
            pulseY = midY
          }
        }

        const intensity = Math.sin(line.progress * Math.PI) * 0.8 + 0.2
        this.drawOptimizedPulse(pulseX, pulseY, intensity, line.type)
      }
    })

    // Draw optimized nodes
    this.nodes.forEach((node) => {
      this.drawOptimizedNode(node, currentTime)
    })

    // Reduced random activation frequency
    if (Math.random() > 0.998) {
      const randomNode = this.nodes[Math.floor(Math.random() * this.nodes.length)]
      if (randomNode) {
        randomNode.active = !randomNode.active
      }
    }

    if (Math.random() > 0.996) {
      const randomLine = this.lines[Math.floor(Math.random() * this.lines.length)]
      if (randomLine && !randomLine.active) {
        randomLine.active = true
        randomLine.progress = 0
      }
    }

    this.animationId = requestAnimationFrame((time) => this.animate(time))
  }

  handleResize() {
    this.setupCanvas()
    this.generateOptimizedNodes()
    this.generateOptimizedLines()
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
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener("resize", this.handleResize)
  }
}
