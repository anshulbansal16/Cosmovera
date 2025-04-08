'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCosmeticsAssistant } from '@/hooks/use-cosmetics-assistant';
import { useVoiceRecognition } from '@/hooks/use-voice-recognition';
import { useElevenLabs } from '@/hooks/use-elevenlabs';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  status?: 'safe' | 'caution' | 'avoid';
}

export function CosmeticsAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isLoading: isAssistantLoading, askQuestion } = useCosmeticsAssistant();
  const { isListening, startListening, stopListening, isSupported: isVoiceRecognitionSupported } = useVoiceRecognition({
    onResult: (text) => setInput(text),
  });
  const { isSpeaking, speak } = useElevenLabs();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAssistantLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await askQuestion(userMessage);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.answer,
        status: response.status,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (isVoiceEnabled && !isSpeaking) {
        speak(response.answer);
      }
    } catch (error) {
      console.error('Error getting response:', error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ingredient Expert AI</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          className={isVoiceEnabled ? "text-primary" : "text-muted-foreground"}
        >
          {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.status === 'safe'
                  ? 'bg-green-100'
                  : message.status === 'caution'
                  ? 'bg-yellow-100'
                  : message.status === 'avoid'
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.status && (
                <div className="mt-2 text-sm font-medium">
                  Status: {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isAssistantLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <p>Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Button
            type="button"
            onClick={() => isListening ? stopListening() : startListening()}
            variant="outline"
            size="icon"
            className={`rounded-full ${isListening ? "bg-primary text-primary-foreground animate-pulse" : ""}`}
            disabled={!isVoiceRecognitionSupported}
          >
            {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any cosmetic ingredient..."
            className="flex-1"
            disabled={isAssistantLoading}
          />

          <Button type="submit" disabled={!input.trim() || isAssistantLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
} 