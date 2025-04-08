'use client';

import { useState } from 'react';
import { useIngredientAnalysis } from '@/hooks/use-ingredient-analysis';
import { toast } from 'sonner';

export default function IngredientsPage() {
  const [input, setInput] = useState('');
  const { isLoading, error, analyzeIngredient } = useIngredientAnalysis();
  const [analysis, setAnalysis] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const result = await analyzeIngredient(input.trim());
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing ingredient:', error);
      toast.error('Failed to analyze ingredient');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ingredient Analysis</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter ingredient name..."
            className="flex-1 p-2 border rounded-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {analysis && (
        <div className={`p-6 rounded-lg ${
          analysis.status === 'safe' ? 'bg-green-50' :
          analysis.status === 'caution' ? 'bg-yellow-50' :
          'bg-red-50'
        }`}>
          <h2 className="text-xl font-semibold mb-4">{analysis.name}</h2>
          
          {analysis.scientific_name && (
            <div className="mb-4">
              <h3 className="font-semibold">Scientific Name</h3>
              <p>{analysis.scientific_name}</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold">Description</h3>
            <p>{analysis.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Status</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              analysis.status === 'safe' ? 'bg-green-100 text-green-800' :
              analysis.status === 'caution' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
            </span>
          </div>

          {analysis.common_uses && (
            <div className="mb-4">
              <h3 className="font-semibold">Common Uses</h3>
              <ul className="list-disc list-inside">
                {analysis.common_uses.map((use: string, index: number) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold">Safety Notes</h3>
            <p>{analysis.safety_notes}</p>
          </div>

          {analysis.alternatives && (
            <div className="mb-4">
              <h3 className="font-semibold">Alternatives</h3>
              <ul className="list-disc list-inside">
                {analysis.alternatives.map((alt: string, index: number) => (
                  <li key={index}>{alt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 