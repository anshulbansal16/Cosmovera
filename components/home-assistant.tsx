"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useVoiceRecognition } from "@/hooks/use-voice-recognition"

export function HomeAssistant() {
  const [isTyping, setIsTyping] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [fullResponse, setFullResponse] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { isListening, startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: (text) => {
      setShowResponse(false)
      setCurrentText("")
      setIsTyping(true)
      setFullResponse(exampleResponse)
      typeResponse()
    },
    onError: (error) => {
      console.error('Voice recognition error:', error)
    }
  })

  const exampleResponse =
    "Parabens are preservatives used in cosmetics to prevent bacterial growth. Studies suggest some parabens may mimic estrogen in the body, potentially disrupting hormone function. While regulatory bodies consider them safe at current levels, many brands now offer paraben-free alternatives if you're concerned."

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const typeResponse = () => {
    setShowResponse(true)
    setIsTyping(true)
    setCurrentText("")

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < exampleResponse.length) {
        setCurrentText(exampleResponse.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, 20)
  }

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-demo on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      typeResponse()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="overflow-hidden border-2 border-secondary/10">
      <CardContent className="p-0">
        <div className="bg-secondary p-5 text-white relative overflow-hidden">
          <div className="shimmer-effect absolute inset-0"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Ingredient Expert AI</h2>
            <p className="text-sm opacity-90 mb-4">Ask anything about cosmetic ingredients & formulations</p>

            <div className="flex items-center gap-3 mb-4">
              <Button
                onClick={toggleListening}
                variant={isListening ? "default" : "outline"}
                size="icon"
                className={`rounded-full h-12 w-12 ${isListening ? "bg-white text-secondary animate-pulse" : "bg-white/20 text-white hover:bg-white/30"}`}
                disabled={!isSupported}
              >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>

              <div className="flex-1">
                <p className="text-sm font-medium">
                  {!mounted ? "Loading..." : isListening ? "Listening..." : isSupported ? "Tap to ask a question" : "Voice input not supported"}
                </p>
                <p className="text-xs text-white/70">
                  {isListening ? "Ask about any ingredient or product" : 'Example: "Are parabens safe?"'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Are parabens safe?</p>

              {showResponse && (
                <div className="bg-muted/50 p-3 rounded-lg text-sm relative">
                  <p>{currentText}</p>
                  {isTyping && <span className="inline-block ml-1 animate-pulse">▋</span>}
                </div>
              )}

              {!showResponse && (
                <div className="text-xs text-muted-foreground">
                  <p className="mb-1">Try asking about:</p>
                  <ul className="space-y-1">
                    <li>• Specific ingredients (retinol, niacinamide)</li>
                    <li>• Ingredient combinations</li>
                    <li>• Skin concerns (sensitive skin, acne)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Link href="/assistant">
            <Button variant="outline" className="w-full">
              Chat with Ingredient Expert
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

