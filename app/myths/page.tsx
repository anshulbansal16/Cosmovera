"use client"

import type React from "react"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, X, HelpCircle, Search, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type IngredientStatus = "safe" | "caution" | "avoid" | "unproven"

interface Ingredient {
  name: string
  category: string
  description: string
  status: IngredientStatus
  concerns?: string[]
  benefits?: string[]
}

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilter, setActiveFilter] = useState<IngredientStatus | "all">("all")

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: "Hyaluronic Acid",
      category: "Humectant",
      description:
        "A naturally occurring substance that attracts and binds water to the skin, providing intense hydration.",
      status: "safe",
      benefits: ["Hydrates skin", "Plumps fine lines", "Suitable for all skin types"],
    },
    {
      name: "Retinol",
      category: "Vitamin A Derivative",
      description:
        "A form of vitamin A that promotes cell turnover and collagen production, helping with anti-aging and acne.",
      status: "caution",
      concerns: ["May cause irritation", "Increases sun sensitivity", "Not recommended during pregnancy"],
      benefits: ["Reduces fine lines", "Improves skin texture", "Helps with acne"],
    },
    {
      name: "Fragrance/Parfum",
      category: "Fragrance",
      description:
        "An umbrella term for scent chemicals added to cosmetics. Can contain hundreds of undisclosed ingredients.",
      status: "caution",
      concerns: ["Common allergen", "Can cause irritation", "Potential hormone disruptor"],
    },
    {
      name: "Parabens",
      category: "Preservative",
      description:
        "A group of preservatives (methylparaben, propylparaben, etc.) used to prevent bacterial growth in cosmetics.",
      status: "caution",
      concerns: ["Potential hormone disruptor", "May affect reproductive health", "Bioaccumulates in tissue"],
    },
    {
      name: "Niacinamide",
      category: "Vitamin B3",
      description:
        "A form of vitamin B3 that helps improve skin barrier function, reduce inflammation, and regulate oil production.",
      status: "safe",
      benefits: ["Reduces redness", "Minimizes pores", "Regulates sebum", "Brightens skin tone"],
    },
    {
      name: "Formaldehyde",
      category: "Preservative",
      description: "A preservative and known carcinogen. Often released by other ingredients like DMDM hydantoin.",
      status: "avoid",
      concerns: ["Known carcinogen", "Skin irritant", "Respiratory irritant", "Linked to cancer"],
    },
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const newIngredient: Ingredient = {
        name: "Salicylic Acid",
        category: "Beta Hydroxy Acid (BHA)",
        description:
          "An oil-soluble acid that penetrates pores to exfoliate from within, making it effective for acne and blackheads.",
        status: "safe",
        benefits: ["Unclogs pores", "Reduces inflammation", "Exfoliates skin"],
        concerns: ["May cause dryness", "Increases sun sensitivity"],
      }

      setIngredients([newIngredient, ...ingredients])
      setSearchQuery("")
      setIsSearching(false)
    }, 1000)
  }

  const filteredIngredients =
    activeFilter === "all" ? ingredients : ingredients.filter((ingredient) => ingredient.status === activeFilter)

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Ingredient Encyclopedia</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={isSearching || !searchQuery.trim()}
              className="absolute right-0 top-0 h-10 w-10"
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "safe" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("safe")}
            className="text-safe"
          >
            Safe
          </Button>
          <Button
            variant={activeFilter === "caution" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("caution")}
            className="text-caution"
          >
            Caution
          </Button>
          <Button
            variant={activeFilter === "avoid" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("avoid")}
            className="text-avoid"
          >
            Avoid
          </Button>
          <Button
            variant={activeFilter === "unproven" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("unproven")}
            className="text-unproven"
          >
            Unproven
          </Button>
        </div>

        {/* Ingredients List */}
        <div className="space-y-4">
          {filteredIngredients.map((ingredient, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {ingredient.status === "safe" && (
                    <div className="w-8 h-8 rounded-full bg-safe/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-safe" />
                    </div>
                  )}
                  {ingredient.status === "caution" && (
                    <div className="w-8 h-8 rounded-full bg-caution/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-caution" />
                    </div>
                  )}
                  {ingredient.status === "avoid" && (
                    <div className="w-8 h-8 rounded-full bg-avoid/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-5 h-5 text-avoid" />
                    </div>
                  )}
                  {ingredient.status === "unproven" && (
                    <div className="w-8 h-8 rounded-full bg-unproven/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-5 h-5 text-unproven" />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-medium">{ingredient.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {ingredient.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{ingredient.description}</p>

                    {ingredient.concerns && ingredient.concerns.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-caution mb-1">Potential Concerns:</p>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.concerns.map((concern, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-caution/10 text-caution border-caution/20"
                            >
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {ingredient.benefits && ingredient.benefits.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-safe mb-1">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.benefits.map((benefit, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-safe/10 text-safe border-safe/20">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      {ingredient.status === "safe" && <span className="text-safe">Generally Safe</span>}
                      {ingredient.status === "caution" && <span className="text-caution">Use with Caution</span>}
                      {ingredient.status === "avoid" && <span className="text-avoid">Potentially Harmful</span>}
                      {ingredient.status === "unproven" && <span className="text-unproven">Insufficient Evidence</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MobileNav />
    </main>
  )
}

