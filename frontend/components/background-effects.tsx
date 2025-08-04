"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function BackgroundEffects() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return

      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = 10 + Math.random() * 10 + "s"
      particle.style.animationDelay = Math.random() * 5 + "s"

      particlesRef.current.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 15000)
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 200)
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at top, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgb(10, 14, 26) 0%, rgb(13, 20, 33) 50%, rgb(10, 14, 26) 100%)",
            "radial-gradient(ellipse at top, rgba(0, 212, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.15) 0%, transparent 50%), linear-gradient(135deg, rgb(10, 14, 26) 0%, rgb(13, 20, 33) 50%, rgb(10, 14, 26) 100%)",
            "radial-gradient(ellipse at top, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgb(10, 14, 26) 0%, rgb(13, 20, 33) 50%, rgb(10, 14, 26) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* Particles Container */}
      <div ref={particlesRef} className="particles-container" />

      {/* AI Network Visualization */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="text-white text-xl"
          >
            🧠
          </motion.div>
        </motion.div>

        {/* Network Nodes */}
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20 + index * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2 + index * 0.5, repeat: Number.POSITIVE_INFINITY },
            }}
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-primary/20 border border-primary rounded-lg flex items-center justify-center text-primary text-xs"
            style={{
              transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateX(120px) rotate(-${index * 90}deg)`,
              animationDelay: `${index * 5}s`,
            }}
          >
            {["🛡️", "📊", "⚙️", "💾"][index]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
