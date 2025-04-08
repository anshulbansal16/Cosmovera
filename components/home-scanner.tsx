"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { ScannerMockup } from "./scanner-mockup"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HomeScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleScan = () => {
    setIsScanning(true)

    // Simulate scanning delay
    setTimeout(() => {
      setShowResult(true)
      setIsScanning(false)
    }, 3000)
  }

  // Reset the demo after some time
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowResult(false)
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [showResult])

  return (
    <Card className="overflow-hidden border-2 border-primary/30 shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-cosmovera p-5 text-white relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
          <div className="relative z-10">
            <Badge variant="outline" className="bg-white/30 text-white border-white/40 mb-2">
              NEW
            </Badge>
            <h2 className="text-2xl font-bold mb-1 text-white">Decode Your Cosmetics</h2>
            <p className="text-sm text-white/90 mb-4">Scan any product to reveal what's really inside</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-white/30 text-white border-white/40">
                10,000+ ingredients
              </Badge>
              <Badge variant="outline" className="bg-white/30 text-white border-white/40">
                Toxicity alerts
              </Badge>
              <Badge variant="outline" className="bg-white/30 text-white border-white/40">
                Science-backed
              </Badge>
            </div>

            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 font-medium"
            >
              {isScanning ? "Scanning..." : "Try Instant Scan"}
              {!isScanning && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="p-5 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <ScannerMockup isScanning={isScanning} showResult={showResult} />
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <h3 className="text-lg font-semibold">How It Works</h3>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-medium">1</span>
              </div>
              <div>
                <p className="font-medium">Scan Product Label</p>
                <p className="text-sm text-muted-foreground">
                  Point your camera at any cosmetic product's ingredient list
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-medium">2</span>
              </div>
              <div>
                <p className="font-medium">AI Analysis</p>
                <p className="text-sm text-muted-foreground">
                  Our AI identifies and analyzes every ingredient in seconds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-medium">3</span>
              </div>
              <div>
                <p className="font-medium">Get Detailed Insights</p>
                <p className="text-sm text-muted-foreground">Learn about potential concerns and safer alternatives</p>
              </div>
            </div>

            <Link href="/scanner">
              <Button variant="outline" className="w-full mt-2">
                Open Full Scanner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

