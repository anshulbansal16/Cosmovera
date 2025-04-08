import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { database } from '@/lib/database';

interface IngredientAnalysis {
  name: string;
  description: string;
  status: 'safe' | 'caution' | 'avoid';
  scientific_name?: string;
  common_uses?: string[];
  safety_notes: string;
  alternatives?: string[];
}

export function useIngredientAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyzeIngredient = useCallback(async (ingredientName: string): Promise<IngredientAnalysis> => {
    try {
      setIsLoading(true);
      setError(null);

      // First, check if we have this ingredient in our database
      try {
        const existingIngredient = await database.getIngredient(ingredientName);
        if (existingIngredient) {
          return existingIngredient;
        }
      } catch (e) {
        // If not found in database, proceed with OpenAI analysis
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key is not configured');
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a cosmetic ingredient analysis expert. Analyze cosmetic ingredients for safety and efficacy.
            Provide detailed information in the following format:
            - Name: Common name of the ingredient
            - Scientific Name: INCI or chemical name
            - Description: Brief description of what it is and its purpose
            - Status: One of [safe, caution, avoid]
            - Common Uses: List of common uses in cosmetics
            - Safety Notes: Detailed safety information
            - Alternatives: Safe alternatives if status is caution or avoid

            Base your analysis on scientific research and regulatory guidelines.
            Be thorough but concise in your assessment.`
          },
          {
            role: 'user',
            content: `Analyze this cosmetic ingredient: ${ingredientName}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0].message.content || '';
      
      // Parse the response into structured data
      const analysis: IngredientAnalysis = {
        name: ingredientName,
        description: '',
        status: 'caution', // default status
        safety_notes: '',
      };

      // Parse the response
      const lines = response.split('\n');
      for (const line of lines) {
        const [key, ...valueParts] = line.split(':').map(s => s.trim());
        const value = valueParts.join(':').trim();

        switch (key.toLowerCase()) {
          case 'scientific name':
            analysis.scientific_name = value;
            break;
          case 'description':
            analysis.description = value;
            break;
          case 'status':
            if (value.toLowerCase().includes('safe')) analysis.status = 'safe';
            else if (value.toLowerCase().includes('avoid')) analysis.status = 'avoid';
            else analysis.status = 'caution';
            break;
          case 'common uses':
            analysis.common_uses = value.split(',').map(use => use.trim());
            break;
          case 'safety notes':
            analysis.safety_notes = value;
            break;
          case 'alternatives':
            analysis.alternatives = value.split(',').map(alt => alt.trim());
            break;
        }
      }

      // Save to database for future reference
      try {
        await database.saveIngredient(analysis);
      } catch (e) {
        console.error('Failed to save ingredient to database:', e);
      }

      return analysis;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to analyze ingredient');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    analyzeIngredient,
  };
} 