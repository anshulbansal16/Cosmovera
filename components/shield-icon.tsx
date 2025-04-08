import { cn } from "@/lib/utils"

interface ShieldIconProps {
  className?: string
  status: "safe" | "caution" | "avoid"
}

export function ShieldIcon({ className, status }: ShieldIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-5 h-5", className)}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      {status === "safe" && <path d="M9 12l2 2 4-4" className="text-safe" />}
      {status === "caution" && <path d="M12 8v4M12 16h.01" className="text-caution" />}
      {status === "avoid" && <path d="M15 9l-6 6M9 9l6 6" className="text-avoid" />}
    </svg>
  )
}

