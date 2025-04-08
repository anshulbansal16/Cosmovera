"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Shield, Search, Zap } from "lucide-react"

interface SubscriptionModalProps {
  trigger?: React.ReactNode
}

export function SubscriptionModal({ trigger }: SubscriptionModalProps) {
  const [open, setOpen] = useState(false)

  const features = [
    {
      icon: Shield,
      title: "Unlimited Ingredient Scans",
      description: "Scan as many products as you want, anytime",
    },
    {
      icon: Search,
      title: "Deep Toxicity Analysis",
      description: "Get detailed safety profiles for every ingredient",
    },
    {
      icon: Zap,
      title: "Personalized Recommendations",
      description: "Discover safer alternatives tailored to your needs",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full py-6 text-lg font-medium bg-gradient-cosmovera hover:opacity-90">
            <span className="mr-2">✨</span> Unlock Premium Features
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Cosmovera Premium</DialogTitle>
          <DialogDescription className="text-center">Unlock the full power of ingredient analysis</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                $4.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Cancel anytime</p>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Ad-free experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Early access to new features</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full bg-gradient-cosmovera hover:opacity-90">Start 7-Day Free Trial</Button>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

