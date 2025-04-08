import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { SubscriptionModal } from "@/components/subscription-modal"
import { HomeScanner } from "@/components/home-scanner"
import { HomeAssistant } from "@/components/home-assistant"
import { IngredientDatabase } from "@/components/ingredient-database"
import { Shield, Search, Heart, CheckCircle } from "lucide-react"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16">
      {/* Hero Section with Gradient */}
      <div className="relative w-full py-10 bg-gradient-cosmovera flex items-center justify-center">
        <div className="text-center px-4 relative z-10">
          <Logo size="lg" className="mx-auto mb-4" />
          <p className="text-xl text-white/90 max-w-md mx-auto">Decode Your Cosmetics, Understand Every Ingredient</p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <CheckCircle className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">10,000+ ingredients</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <CheckCircle className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">AI-powered analysis</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <CheckCircle className="h-4 w-4 text-white mr-2" />
              <span className="text-sm text-white">Science-backed data</span>
            </div>
          </div>
        </div>

        <div className="shimmer-effect absolute inset-0"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-8 max-w-5xl mx-auto w-full">
        {/* Scanner Section */}
        <HomeScanner />

        {/* AI Assistant Section */}
        <HomeAssistant />

        {/* Ingredient Database Section */}
        <IngredientDatabase />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/scanner" className="block">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 text-base hover:bg-primary/10 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-primary">Ingredient Scanner</span>
            </Button>
          </Link>

          <Link href="/myths" className="block">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 text-base hover:bg-secondary/10 hover:border-secondary/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center">
                <Search className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-medium text-secondary">Ingredient Database</span>
            </Button>
          </Link>

          <Link href="/recommendations" className="block">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 text-base hover:bg-accent/10 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <span className="font-medium text-accent">Safe Alternatives</span>
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Why Cosmovera?</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Transparency in Every Product</p>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes ingredient lists to reveal potential concerns that brands don't disclose.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Search className="w-5 h-5 text-olive" />
              </div>
              <div>
                <p className="font-medium">Science-Backed Information</p>
                <p className="text-sm text-muted-foreground">
                  Every ingredient assessment is based on peer-reviewed research and toxicology data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-5 h-5 text-terracotta" />
              </div>
              <div>
                <p className="font-medium">Personalized Recommendations</p>
                <p className="text-sm text-muted-foreground">
                  Find safer alternatives tailored to your specific skin concerns and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Subscription CTA */}
      <div className="px-4 mt-auto max-w-5xl mx-auto w-full">
        <SubscriptionModal />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </main>
  )
}

