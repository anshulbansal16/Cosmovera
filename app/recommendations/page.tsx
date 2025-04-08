"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, AlertTriangle, ChevronLeft, ChevronRight, Heart, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  brand: string
  price: string
  rating: number
  safetyScore: number
  status: "safe" | "caution" | "avoid"
  image: string
  description: string
  keyIngredients: Array<{
    name: string
    status: "safe" | "caution" | "avoid"
  }>
}

const skinConcerns = [
  "Dry Skin",
  "Oily Skin",
  "Combination Skin",
  "Sensitive Skin",
  "Acne-Prone",
  "Aging Concerns",
  "Hyperpigmentation",
  "Rosacea",
]

const productCategories = ["Cleansers", "Moisturizers", "Serums", "Sunscreens", "Treatments"]

export default function RecommendationsPage() {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [showProducts, setShowProducts] = useState(false)

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== concern))
    } else {
      setSelectedConcerns([...selectedConcerns, concern])
    }
  }

  const findRecommendations = () => {
    setShowProducts(true)
  }

  // Sample product data
  const products: Record<string, Product[]> = {
    Cleansers: [
      {
        id: 1,
        name: "Gentle Hydrating Cleanser",
        brand: "PureSkin",
        price: "$24.99",
        rating: 4.7,
        safetyScore: 95,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A gentle, hydrating cleanser suitable for sensitive skin.",
        keyIngredients: [
          { name: "Glycerin", status: "safe" },
          { name: "Aloe Vera", status: "safe" },
          { name: "Chamomile Extract", status: "safe" },
        ],
      },
      {
        id: 2,
        name: "Balancing Foam Cleanser",
        brand: "NaturGlow",
        price: "$19.99",
        rating: 4.5,
        safetyScore: 88,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A foaming cleanser that removes impurities without stripping the skin.",
        keyIngredients: [
          { name: "Glycerin", status: "safe" },
          { name: "Panthenol", status: "safe" },
          { name: "Citric Acid", status: "caution" },
        ],
      },
      {
        id: 3,
        name: "Clarifying Gel Cleanser",
        brand: "ClearSkin",
        price: "$22.99",
        rating: 4.3,
        safetyScore: 82,
        status: "caution",
        image: "/placeholder.svg?height=200&width=200",
        description: "A gel cleanser that helps control oil and clear breakouts.",
        keyIngredients: [
          { name: "Salicylic Acid", status: "safe" },
          { name: "Tea Tree Oil", status: "caution" },
          { name: "Fragrance", status: "caution" },
        ],
      },
    ],
    Moisturizers: [
      {
        id: 4,
        name: "Hydrating Face Cream",
        brand: "HydraPlus",
        price: "$32.99",
        rating: 4.8,
        safetyScore: 94,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A rich, hydrating cream for dry and normal skin types.",
        keyIngredients: [
          { name: "Hyaluronic Acid", status: "safe" },
          { name: "Ceramides", status: "safe" },
          { name: "Shea Butter", status: "safe" },
        ],
      },
      {
        id: 5,
        name: "Oil-Free Gel Moisturizer",
        brand: "BalancePro",
        price: "$28.99",
        rating: 4.6,
        safetyScore: 90,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A lightweight, oil-free gel for oily and combination skin.",
        keyIngredients: [
          { name: "Niacinamide", status: "safe" },
          { name: "Hyaluronic Acid", status: "safe" },
          { name: "Aloe Vera", status: "safe" },
        ],
      },
    ],
    Serums: [
      {
        id: 6,
        name: "Vitamin C Brightening Serum",
        brand: "GlowBoost",
        price: "$42.99",
        rating: 4.9,
        safetyScore: 92,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A potent vitamin C serum that brightens and evens skin tone.",
        keyIngredients: [
          { name: "Ascorbic Acid", status: "safe" },
          { name: "Ferulic Acid", status: "safe" },
          { name: "Vitamin E", status: "safe" },
        ],
      },
      {
        id: 7,
        name: "Hyaluronic Acid Serum",
        brand: "HydraPlus",
        price: "$36.99",
        rating: 4.7,
        safetyScore: 96,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A hydrating serum with multiple weights of hyaluronic acid.",
        keyIngredients: [
          { name: "Hyaluronic Acid", status: "safe" },
          { name: "Glycerin", status: "safe" },
          { name: "Panthenol", status: "safe" },
        ],
      },
    ],
    Sunscreens: [
      {
        id: 8,
        name: "Mineral Sunscreen SPF 50",
        brand: "SunShield",
        price: "$26.99",
        rating: 4.5,
        safetyScore: 98,
        status: "safe",
        image: "/placeholder.svg?height=200&width=200",
        description: "A mineral-based sunscreen suitable for sensitive skin.",
        keyIngredients: [
          { name: "Zinc Oxide", status: "safe" },
          { name: "Titanium Dioxide", status: "safe" },
          { name: "Vitamin E", status: "safe" },
        ],
      },
    ],
    Treatments: [
      {
        id: 9,
        name: "AHA/BHA Exfoliating Solution",
        brand: "RenewSkin",
        price: "$38.99",
        rating: 4.6,
        safetyScore: 85,
        status: "caution",
        image: "/placeholder.svg?height=200&width=200",
        description: "An exfoliating treatment with alpha and beta hydroxy acids.",
        keyIngredients: [
          { name: "Glycolic Acid", status: "caution" },
          { name: "Salicylic Acid", status: "safe" },
          { name: "Lactic Acid", status: "caution" },
        ],
      },
    ],
  }

  return (
    <main className="flex min-h-screen flex-col pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Safe Alternatives Finder</h1>

        {!showProducts ? (
          <div>
            <p className="text-muted-foreground mb-6">
              Select your skin concerns to find safe cosmetic products without harmful ingredients.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {skinConcerns.map((concern) => (
                <Button
                  key={concern}
                  variant={selectedConcerns.includes(concern) ? "default" : "outline"}
                  className={`justify-start h-auto py-3 ${selectedConcerns.includes(concern) ? "bg-primary" : ""}`}
                  onClick={() => toggleConcern(concern)}
                >
                  {selectedConcerns.includes(concern) && <Check className="mr-2 h-4 w-4" />}
                  {concern}
                </Button>
              ))}
            </div>

            <Button onClick={findRecommendations} disabled={selectedConcerns.length === 0} className="w-full gap-2">
              <Heart className="h-4 w-4" />
              Find Safe Alternatives
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="ghost" size="sm" className="mb-4" onClick={() => setShowProducts(false)}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Concerns
            </Button>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm">
                <span className="font-medium">Your concerns:</span>{" "}
                <span className="text-muted-foreground">{selectedConcerns.join(", ")}</span>
              </p>

              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3 w-3" />
                <span>Filter</span>
              </Button>
            </div>

            <Tabs defaultValue="Cleansers">
              <TabsList className="w-full overflow-x-auto flex-nowrap justify-start mb-4">
                {productCategories.map((category) => (
                  <TabsTrigger key={category} value={category} className="flex-shrink-0">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {productCategories.map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="relative">
                    <div className="flex overflow-x-auto pb-4 gap-4 snap-x">
                      {products[category]?.map((product) => (
                        <Card key={product.id} className="min-w-[280px] flex-shrink-0 snap-center">
                          <CardContent className="p-0">
                            <div className="relative">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-[200px] object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                {product.status === "safe" && (
                                  <div className="w-8 h-8 rounded-full bg-safe/80 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                                {product.status === "caution" && (
                                  <div className="w-8 h-8 rounded-full bg-caution/80 flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>

                              <div className="absolute bottom-2 left-2 bg-background/90 rounded-full px-2 py-1 text-xs font-medium">
                                Safety: {product.safetyScore}%
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium">{product.name}</h3>
                                <span className="text-sm font-bold">{product.price}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                              <p className="text-xs text-muted-foreground mb-3">{product.description}</p>

                              <div className="mb-3">
                                <p className="text-xs font-medium mb-1">Key Ingredients:</p>
                                <div className="flex flex-wrap gap-1">
                                  {product.keyIngredients.map((ingredient, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className={`text-xs ${
                                        ingredient.status === "safe"
                                          ? "bg-safe/10 text-safe border-safe/20"
                                          : ingredient.status === "caution"
                                            ? "bg-caution/10 text-caution border-caution/20"
                                            : "bg-avoid/10 text-avoid border-avoid/20"
                                      }`}
                                    >
                                      {ingredient.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <span className="text-xs mr-1">Rating:</span>
                                  <span className="text-xs font-medium">{product.rating}/5</span>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                                  <Heart className="h-3 w-3" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 hidden md:block">
                      <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 hidden md:block">
                      <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>

      <MobileNav />
    </main>
  )
}

