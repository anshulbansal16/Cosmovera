"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, User, Bot, Volume2, VolumeX } from "lucide-react"
import { useVoiceRecognition } from "@/hooks/use-voice-recognition"
import { useElevenLabs } from "@/hooks/use-elevenlabs"
import { toast } from "sonner"
import { useCosmeticsAssistant } from '@/hooks/use-cosmetics-assistant'
import { database } from '@/lib/database'
import { useSession } from 'next-auth/react'
import { SignInButton } from '@/components/auth/sign-in-button'
import { UserMenu } from '@/components/auth/user-menu'
import { CosmeticsAssistant } from '@/components/cosmetics-assistant'
import { Scanner } from '@/components/scanner'
import { IngredientDatabase } from '@/components/ingredient-database'

interface Message {
  role: "user" | "assistant"
  content: string
  status?: "safe" | "caution" | "avoid"
}

interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export default function AssistantPage() {
  const { data: session } = useSession() as { data: { user: SessionUser } | null }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isSpeaking, error: elevenLabsError, speak } = useElevenLabs()
  const { isLoading: isAssistantLoading, error: assistantError, askQuestion } = useCosmeticsAssistant()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { isListening, startListening, stopListening, isSupported: isVoiceRecognitionSupported } = useVoiceRecognition({
    onResult: (text) => {
      setInput(text)
      handleSubmit(new Event('submit') as any)
    },
    onError: (error) => {
      console.error('Voice recognition error:', error)
      toast.error('Failed to recognize speech. Please try again.')
    }
  })

  useEffect(() => {
    if (elevenLabsError) {
      toast.error(elevenLabsError.message)
    }
  }, [elevenLabsError])

  useEffect(() => {
    if (assistantError) {
      toast.error(assistantError.message)
    }
  }, [assistantError])

  useEffect(() => {
    if (session?.user?.id) {
      try {
        database.getConversations(session.user.id)
          .then(conversations => {
            if (conversations) {
              const formattedMessages = conversations.map(conv => ({
                role: 'assistant' as const,
                content: conv.answer,
                status: conv.status
              }))
              setMessages(formattedMessages)
            }
          })
          .catch(error => {
            console.error('Error loading conversations:', error)
            toast.error('Failed to load previous conversations')
          })
      } catch (error) {
        console.error('Error initializing database:', error)
      }
    }
  }, [session])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = async (role: "user" | "assistant", content: string, status?: "safe" | "caution" | "avoid") => {
    setMessages((prev) => [...prev, { role, content, status }])
    
    // Save conversation to database if user is logged in
    if (session?.user?.id && role === 'assistant') {
      try {
        await database.saveConversation({
          user_id: session.user.id,
          question: input,
          answer: content,
          status
        })
      } catch (error) {
        console.error('Error saving conversation:', error)
        // Don't show error toast as this is not critical functionality
      }
    }
    
    // Speak the assistant's response
    if (role === "assistant" && isVoiceEnabled) {
      speak(content).catch((error) => {
        console.error('Error speaking message:', error)
        toast.error('Failed to speak message')
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    addMessage("user", userMessage)
    setIsLoading(true)

    try {
      const response = await askQuestion(userMessage)
      addMessage("assistant", response.answer, response.status)
    } catch (error) {
      console.error("Error getting response:", error)
      toast.error("Failed to get response from assistant")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CosmoVera Assistant</h1>
        {session ? <UserMenu /> : <SignInButton />}
      </div>

      {session ? (
        <div className="space-y-8">
          <CosmeticsAssistant />
          <Scanner />
          <IngredientDatabase />
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Welcome to CosmoVera</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to access the cosmetics assistant, ingredient scanner, and database.
          </p>
          <SignInButton />
        </div>
      )}
    </div>
  )
}

