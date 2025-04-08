import type { Conversation, Ingredient } from './types';

// In-memory storage
const conversations: Conversation[] = [];
const ingredients: Ingredient[] = [];

export const database = {
  // Conversation methods
  async saveConversation(conversation: Omit<Conversation, 'id' | 'created_at'>) {
    try {
      const newConversation: Conversation = {
        ...conversation,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };
      conversations.push(newConversation);
      return newConversation;
    } catch (error) {
      console.error('Error saving conversation:', error);
      return null;
    }
  },

  async getConversations(userId: string) {
    try {
      return conversations.filter(conv => conv.user_id === userId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  },

  // Ingredient methods
  async saveIngredient(ingredient: Omit<Ingredient, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const newIngredient: Ingredient = {
        ...ingredient,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      ingredients.push(newIngredient);
      return newIngredient;
    } catch (error) {
      console.error('Error saving ingredient:', error);
      return null;
    }
  },

  async getIngredient(name: string) {
    try {
      return ingredients.find(ing => ing.name.toLowerCase() === name.toLowerCase()) || null;
    } catch (error) {
      console.error('Error fetching ingredient:', error);
      return null;
    }
  },

  async searchIngredients(query: string) {
    const searchTerm = query.toLowerCase();
    return ingredients.filter(ing => 
      ing.name.toLowerCase().includes(searchTerm) || 
      ing.scientific_name?.toLowerCase().includes(searchTerm)
    ).slice(0, 10);
  },

  async updateIngredient(id: string, updates: Partial<Ingredient>) {
    try {
      const index = ingredients.findIndex(ing => ing.id === id);
      if (index === -1) return null;
      
      const updatedIngredient = {
        ...ingredients[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      ingredients[index] = updatedIngredient;
      return updatedIngredient;
    } catch (error) {
      console.error('Error updating ingredient:', error);
      return null;
    }
  }
}; 