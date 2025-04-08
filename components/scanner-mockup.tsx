import { Camera, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ScannerMockupProps {
  isScanning?: boolean
  showResult?: boolean
}

export function ScannerMockup({ isScanning = false, showResult = false }: ScannerMockupProps) {
  return (
    <div className="scanner-mockup w-full max-w-[280px] aspect-[9/16] bg-black mx-auto border-2 border-primary/30 shadow-lg">
      <div className="relative h-full w-full bg-white p-3 pt-6 flex flex-col">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 w-full h-6 bg-black/5 flex items-center justify-between px-4 text-[10px] text-black/70">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="i-lucide-signal h-3 w-3" />
            <span className="i-lucide-wifi h-3 w-3" />
            <span className="i-lucide-battery-full h-3 w-3" />
          </div>
        </div>

        {/* App Header */}
        <div className="text-center mb-2">
          <h3 className="text-xs font-semibold text-primary">Cosmovera</h3>
          <p className="text-[10px] text-muted-foreground">Ingredient Scanner</p>
        </div>

        {!showResult ? (
          <>
            {/* Scanner View */}
            <div className="flex-1 relative rounded-lg overflow-hidden bg-gradient-to-b from-primary/10 to-secondary/10 flex items-center justify-center mb-3 border border-primary/20">
              <Camera className="h-8 w-8 text-primary" />
              {isScanning && <div className="scanner-beam"></div>}
            </div>

            {/* Scanner Controls */}
            <div className="grid grid-cols-3 gap-1 mb-2">
              <div className="bg-muted rounded p-1 text-center">
                <p className="text-[8px]">Barcode</p>
              </div>
              <div className="bg-primary/30 rounded p-1 text-center">
                <p className="text-[8px] text-primary font-medium">Camera</p>
              </div>
              <div className="bg-muted rounded p-1 text-center">
                <p className="text-[8px]">Search</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-muted-foreground">
                {isScanning ? "Analyzing ingredients..." : "Point camera at product label"}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="bg-white rounded-lg border shadow-sm p-2 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[11px] font-medium">Hydrating Face Cream</h4>
                  <p className="text-[9px] text-muted-foreground">NaturGlow</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-caution/20 flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3 text-caution" />
                </div>
              </div>

              <div className="mt-1 mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px]">Safety Score</span>
                  <span className="text-[8px] font-medium">78%</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-caution rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>

              <p className="text-[8px] font-medium mb-1">Key Ingredients:</p>
              <div className="flex flex-wrap">
                <Badge variant="outline" className="text-[7px] h-3 mr-1 mb-1 bg-safe/10 text-safe border-safe/20">
                  Water
                </Badge>
                <Badge variant="outline" className="text-[7px] h-3 mr-1 mb-1 bg-safe/10 text-safe border-safe/20">
                  Glycerin
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[7px] h-3 mr-1 mb-1 bg-caution/10 text-caution border-caution/20"
                >
                  Fragrance
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[7px] h-3 mr-1 mb-1 bg-caution/10 text-caution border-caution/20"
                >
                  Phenoxyethanol
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm p-2 mb-2">
              <p className="text-[8px] font-medium mb-1">Concerns:</p>
              <ul className="text-[8px] text-muted-foreground space-y-1">
                <li className="flex items-start">
                  <span className="text-caution mr-1">•</span> Contains potential allergens
                </li>
                <li className="flex items-start">
                  <span className="text-caution mr-1">•</span> Fragrance may cause irritation
                </li>
              </ul>
            </div>

            <div className="text-center mt-auto">
              <p className="text-[10px] text-primary">Tap for detailed analysis</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

