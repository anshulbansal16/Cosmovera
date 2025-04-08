import { cn } from "@/lib/utils"

interface WaveAnimationProps {
  className?: string
  isActive?: boolean
}

export function WaveAnimation({ className, isActive = false }: WaveAnimationProps) {
  if (!isActive) return null

  return (
    <div className={cn("wave-animation", className)}>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
      <div className="wave-bar"></div>
    </div>
  )
}

