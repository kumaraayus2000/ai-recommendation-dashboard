// AI Service for Real AI Integration
// Version: 1.0.0
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here';
const CLAUDE_API_KEY = process.env.REACT_APP_CLAUDE_API_KEY || 'your-claude-api-key-here';

export interface AIRecommendation {
  product_id: number;
  product_name: string;
  score: number;
  explanation: string;
  marketing_copy: string;
  price: number;
  category: string;
}

export interface UserProfile {
  user_id: number;
  age: number;
  gender: string;
  preferences: string[];
  purchase_history?: string[];
  browsing_history?: string[];
}

export class AIService {
  // Generate personalized recommendations using AI
  static async generateRecommendations(userProfile: UserProfile): Promise<AIRecommendation[]> {
    try {
      const prompt = `
        Generate 6 personalized product recommendations for a user with the following profile:
        - Age: ${userProfile.age}
        - Gender: ${userProfile.gender}
        - Interests: ${userProfile.preferences.join(', ')}
        - Purchase History: ${userProfile.purchase_history?.join(', ') || 'None'}
        
        For each recommendation, provide:
        1. Product name (realistic)
        2. Confidence score (0-1)
        3. Personalized explanation
        4. Marketing copy tailored to this user
        5. Realistic price
        6. Product category
        
        Return as JSON array with fields: product_id, product_name, score, explanation, marketing_copy, price, category
      `;

      // Try Claude first, fallback to OpenAI
      try {
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 2000,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        });

        if (claudeResponse.ok) {
          const claudeData = await claudeResponse.json();
          const recommendations = JSON.parse(claudeData.content[0].text);
          return recommendations;
        }
      } catch (claudeError) {
        console.log('Claude API failed, trying OpenAI...');
      }

      // Fallback to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an AI recommendation system expert. Generate personalized product recommendations based on user profiles.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      const recommendations = JSON.parse(data.choices[0].message.content);
      return recommendations;
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      // Fallback to mock data
      return this.getMockRecommendations(userProfile);
    }
  }

  // AI Chat Assistant with real responses
  static async chatWithAI(userQuery: string, userProfile: UserProfile, recommendations: AIRecommendation[]): Promise<string> {
    try {
      const prompt = `
        You are an AI shopping assistant. A user is asking about their product recommendations.
        
        User Profile:
        - Age: ${userProfile.age}
        - Gender: ${userProfile.gender}
        - Interests: ${userProfile.preferences.join(', ')}
        
        Current Recommendations:
        ${recommendations.map(rec => `- ${rec.product_name} ($${rec.price}): ${rec.explanation}`).join('\n')}
        
        User Question: "${userQuery}"
        
        Provide a helpful, personalized response about their recommendations. Be conversational and informative.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI shopping assistant that provides personalized advice about product recommendations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error with AI chat:', error);
      return "I'm having trouble connecting to my AI brain right now, but I'd be happy to help with your recommendations!";
    }
  }

  // Analyze user behavior and generate insights
  static async generateUserInsights(userProfile: UserProfile, recommendations: AIRecommendation[]): Promise<any> {
    try {
      const prompt = `
        Analyze this user's profile and recommendations to generate insights:
        
        User: ${userProfile.age}y, ${userProfile.gender}, interests: ${userProfile.preferences.join(', ')}
        Recommendations: ${recommendations.map(rec => rec.product_name).join(', ')}
        
        Generate insights about:
        1. User's shopping patterns
        2. Price sensitivity
        3. Category preferences
        4. Potential cross-selling opportunities
        
        Return as JSON with fields: patterns, price_sensitivity, category_preferences, cross_sell_opportunities
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a data analyst specializing in user behavior and shopping patterns.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error generating insights:', error);
      return {
        patterns: "Tech-savvy with fitness focus",
        price_sensitivity: "Medium",
        category_preferences: "Electronics, Health",
        cross_sell_opportunities: "Smart home devices, fitness accessories"
      };
    }
  }

  // Fallback mock data
  private static getMockRecommendations(userProfile: UserProfile): AIRecommendation[] {
    return [
      {
        product_id: 8,
        product_name: "Laptop Stand",
        score: 0.85,
        explanation: `Based on your interest in ${userProfile.preferences[0]}, this ergonomic laptop stand will improve your setup.`,
        marketing_copy: `Perfect for your ${userProfile.preferences[0]}-focused lifestyle!`,
        price: 49.99,
        category: "Electronics"
      },
      {
        product_id: 9,
        product_name: "Yoga Mat",
        score: 0.78,
        explanation: `Given your ${userProfile.preferences[1]} interests, this premium yoga mat is perfect for your routine.`,
        marketing_copy: `Take your ${userProfile.preferences[1]} journey to the next level!`,
        price: 39.99,
        category: "Health"
      },
      {
        product_id: 5,
        product_name: "Smart Watch",
        score: 0.82,
        explanation: `Combining ${userProfile.preferences[0]} and ${userProfile.preferences[1]}, this smart watch tracks workouts while keeping you connected.`,
        marketing_copy: `The perfect blend of ${userProfile.preferences[0]} and ${userProfile.preferences[1]}!`,
        price: 399.99,
        category: "Electronics"
      }
    ];
  }
} 