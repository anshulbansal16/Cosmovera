import { useState, useCallback } from 'react';
import OpenAI from 'openai';

interface CosmeticsAssistantResponse {
  answer: string;
  status?: 'safe' | 'caution' | 'avoid';
  explanation?: string;
}

export function useCosmeticsAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const askQuestion = useCallback(async (question: string): Promise<CosmeticsAssistantResponse> => {
    try {
      setIsLoading(true);
      setError(null);

      // First, check if we have this ingredient in our database
      try {
        const existingIngredient = await database.getIngredient(question);
        if (existingIngredient) {
          return existingIngredient;
        }
      } catch (e) {
        // If not found in database, proceed with OpenAI analysis
      }

      const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.');
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Required for client-side usage
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a knowledgeable cosmetics assistant specializing in skincare, makeup, and beauty products. 
            Your expertise includes:
            - Ingredient analysis and safety
            - Product recommendations based on skin type and concerns
            - Skincare routines and best practices
            - Makeup application techniques
            - Beauty industry trends and innovations
            
            When answering questions:
            1. Provide detailed, accurate information
            2. Include safety considerations
            3. Suggest alternatives when appropriate
            4. Explain your reasoning
            5. Use clear, professional language
            6. Format your response with:
               - A clear answer to the question
               - Safety status (safe/caution/avoid)
               - Detailed explanation
               - Additional recommendations if relevant
            
            For product safety, use these categories:
            - safe: Generally safe for most users
            - caution: May cause issues for some users
            - avoid: Not recommended due to potential risks`
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const answer = completion.choices[0].message.content || '';

      // Parse the response to extract status and explanation
      const statusMatch = answer.match(/status:\s*(safe|caution|avoid)/i);
      const status = statusMatch ? statusMatch[1].toLowerCase() as 'safe' | 'caution' | 'avoid' : undefined;

      return {
        answer,
        status,
        explanation: status ? answer.split('\n').find((line: string) => line.toLowerCase().includes('explanation:'))?.replace(/explanation:/i, '').trim() : undefined
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    askQuestion,
  };
} 