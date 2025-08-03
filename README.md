# 🤖 AI Recommendation Dashboard

A modern, interactive recommendation system dashboard that combines traditional machine learning with generative AI to provide personalized product recommendations.

## 🧠 **AI Integration Status**

**Current Implementation:** 
- ✅ **Mock AI Responses** - Working with simulated AI responses
- 🔄 **Real AI Integration** - Ready to connect with OpenAI API
- 🎯 **Toggle Feature** - Switch between mock and real AI

**AI Features:**
- **Smart Recommendations** - AI-generated product suggestions
- **Personalized Explanations** - Custom reasoning for each recommendation
- **AI Chat Assistant** - Natural language queries about recommendations
- **User Behavior Analysis** - AI-powered insights and patterns

## 🌐 Live Demo

**Access the live application:** [https://ai-recommendation-dashboard.vercel.app](https://ai-recommendation-dashboard.vercel.app)

**🎉 Public URL - No Login Required!**

## ✨ Features

### 🎯 **Smart Recommendations**
- Personalized product suggestions based on user preferences
- Confidence scoring for each recommendation
- Detailed explanations of why products are recommended
- Customized marketing copy for each user

### 📊 **Analytics Dashboard**
- Real-time performance metrics
- Interactive charts and visualizations
- Category distribution analysis
- Price range insights
- Performance trends over time

### 💬 **AI Chat Assistant**
- Natural language queries about recommendations
- Quick question buttons for common inquiries
- Personalized responses based on user context
- Real-time conversation interface

### 👤 **User Management**
- Multiple user personas for testing
- Demographic-based recommendations
- Interest-based filtering
- Easy user switching interface

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Beautiful gradient backgrounds
- Interactive hover effects
- Clean, professional interface
- Tailwind CSS styling

## 🛠️ Technology Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Build Tool:** Vite
- **Deployment:** Vercel
- **Icons:** Emoji-based for simplicity

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ML_Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

## 🤖 **Real AI Setup (Optional)**

To enable real AI responses instead of mock data:

1. **Get API Keys**
   - **Claude API Key:** Visit [Anthropic Console](https://console.anthropic.com/)
   - **OpenAI API Key:** Visit [OpenAI Platform](https://platform.openai.com/api-keys)

2. **Set Environment Variables**
   ```bash
   # Create .env file
   cp env.example .env
   
   # Edit .env and add your API keys
   REACT_APP_CLAUDE_API_KEY=your-actual-claude-api-key-here
   REACT_APP_OPENAI_API_KEY=your-actual-openai-api-key-here
   ```

3. **Toggle AI Mode**
   - Click the "🎭 Mock AI" button in the app
   - It will change to "🤖 Real AI"
   - Refresh recommendations to get AI-generated content

**Note:** The app works perfectly without API keys using mock AI responses!
**Priority:** Claude API is used first, with OpenAI as fallback.

## 📁 Project Structure

```
ML_Project/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── RecommendationDashboard.tsx  # Main dashboard component
│   └── index.css               # Global styles with Tailwind
├── public/                     # Static assets
├── dist/                       # Build output
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Deployment configuration
```

## 🎯 Key Components

### RecommendationCard
- Displays individual product recommendations
- Shows confidence scores and pricing
- Includes personalized explanations
- Interactive like/dislike/buy buttons

### Analytics Section
- Performance metrics cards
- Line charts for trends
- Pie charts for category distribution
- Real-time data visualization

### AI Chat Interface
- Message history display
- Input field with quick questions
- Responsive chat bubbles
- Mock AI responses for demonstration

## 🔧 Customization

### Adding New Users
Edit the `mockUsers` object in `RecommendationDashboard.tsx`:

```typescript
const mockUsers = {
  6: { 
    user_id: 6, 
    age: 22, 
    gender: 'F', 
    preferences: ['music', 'art', 'fashion'] 
  }
};
```

### Modifying Recommendations
Update the `mockRecommendations` array to include new products or change existing ones.

### Styling Changes
Modify `tailwind.config.js` or add custom CSS in `src/index.css`.

## 🌟 Demo Features

The live demo includes:

1. **5 Different User Profiles** with varying interests and demographics
2. **3 Sample Recommendations** per user with detailed explanations
3. **Interactive Analytics** with mock performance data
4. **AI Chat Assistant** with pre-programmed responses
5. **Responsive Design** that works on mobile and desktop

## 📱 Mobile Responsive

The dashboard is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔗 Links

- **Live Application:** [https://ai-recommendation-dashboard.vercel.app](https://ai-recommendation-dashboard.vercel.app)
- **Vercel Dashboard:** [https://vercel.com/kumaraayus2000s-projects/ai-recommendation-dashboard](https://vercel.com/kumaraayus2000s-projects/ai-recommendation-dashboard)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

---

## 🎯 **Quick Start**

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Deploy: `vercel --prod` 