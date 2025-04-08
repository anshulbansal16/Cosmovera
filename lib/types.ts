export interface Conversation {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  status?: 'safe' | 'caution' | 'avoid';
  created_at: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  status: 'safe' | 'caution' | 'avoid';
  scientific_name?: string;
  common_uses?: string[];
  safety_notes?: string;
  alternatives?: string[];
  created_at: string;
  updated_at: string;
} 