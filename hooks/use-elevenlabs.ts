import { useState, useCallback } from 'react';

interface UseElevenLabsProps {
  voiceId?: string;
  modelId?: string;
}

export function useElevenLabs({ 
  voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
  modelId = 'eleven_monolingual_v1'
}: UseElevenLabsProps = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const speak = useCallback(async (text: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        throw new Error('ElevenLabs API key is not configured');
      }

      if (!voiceId) {
        throw new Error('ElevenLabs voice ID is not configured');
      }

      setIsSpeaking(true);
      setError(null);

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: modelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        let errorMessage = 'Unknown error occurred';
        
        if (errorData) {
          if (typeof errorData === 'object') {
            if (errorData.detail) {
              errorMessage = errorData.detail;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else {
              errorMessage = JSON.stringify(errorData);
            }
          } else {
            errorMessage = String(errorData);
          }
        } else {
          errorMessage = response.statusText || `HTTP error ${response.status}`;
        }
        
        throw new Error(`ElevenLabs API error: ${errorMessage}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (e) => {
        setIsSpeaking(false);
        setError(new Error('Error playing audio'));
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      setIsSpeaking(false);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    }
  }, [voiceId, modelId]);

  return {
    isSpeaking,
    error,
    speak,
  };
} 