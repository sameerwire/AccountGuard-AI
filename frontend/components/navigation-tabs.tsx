"use client"

import { motion } from "framer-motion"
import { Mail, CreditCard, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Tab {
  id: string
  label: string
  icon: string
}

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: any) => void
  tabs: Tab[]
}

const iconMap = {
  mail: Mail,
  "credit-card": CreditCard,
  activity: Activity,
}

export function NavigationTabs({ activeTab, onTabChange, tabs }: NavigationTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass rounded-2xl p-2 mb-8 relative overflow-hidden"
    >
      <div className="flex relative">
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon as keyof typeof iconMap] || Activity
          const isActive = activeTab === tab.id

          return (
            <motion.div
              key={tab.id}
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={`
                  w-full h-auto p-6 flex flex-col items-center gap-3 rounded-xl
                  transition-all duration-300 relative overflow-hidden
                  ${isActive ? "text-white shadow-glow" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div animate={isActive ? { rotate: [0, 5, -5, 0] } : {}} transition={{ duration: 0.5 }}>
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <div className="text-center">
                    <div className="font-semibold text-base">{tab.label}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
