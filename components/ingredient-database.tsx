import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Ingredient {
  name: string
  category: string
  status: "safe" | "caution" | "avoid"
  description: string
}

export function IngredientDatabase() {
  const featuredIngredients: Ingredient[] = [
    {
      name: "Hyaluronic Acid",
      category: "Humectant",
      status: "safe",
      description: "Natural substance that attracts and retains moisture in the skin",
    },
    {
      name: "Retinol",
      category: "Vitamin A Derivative",
      status: "caution",
      description: "Promotes cell turnover, may cause irritation in high concentrations",
    },
    {
      name: "Fragrance/Parfum",
      category: "Fragrance",
      status: "caution",
      description: "Umbrella term for scent chemicals, potential allergen for sensitive skin",
    },
    {
      name: "Niacinamide",
      category: "Vitamin B3",
      status: "safe",
      description: "Reduces inflammation, strengthens skin barrier, regulates oil production",
    },
    {
      name: "Formaldehyde",
      category: "Preservative",
      status: "avoid",
      description: "Known carcinogen, can cause skin irritation and allergic reactions",
    },
    {
      name: "Glycerin",
      category: "Humectant",
      status: "safe",
      description: "Attracts moisture to the skin, gentle and suitable for all skin types",
    },
  ]

  return (
    <Card className="overflow-hidden border-2 border-olive/10">
      <CardContent className="p-0">
        <div className="bg-olive p-5 text-white relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Ingredient Encyclopedia</h2>
            <p className="text-sm opacity-90 mb-4">Browse our database of 10,000+ cosmetic ingredients</p>

            <Button variant="outline" className="bg-white/20 text-white hover:bg-white/30">
              <Search className="mr-2 h-4 w-4" />
              Search Ingredients
            </Button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-4">Featured Ingredients</h3>

          <div className="space-y-3">
            {featuredIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className={`ingredient-tag ingredient-tag-${ingredient.status}`}>
                  {ingredient.status === "safe" && "Safe"}
                  {ingredient.status === "caution" && "Caution"}
                  {ingredient.status === "avoid" && "Avoid"}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="font-medium text-sm">{ingredient.name}</p>
                    <span className="text-xs text-muted-foreground ml-2">{ingredient.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ingredient.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/myths">
            <Button variant="outline" className="w-full mt-4">
              Explore Full Database
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

