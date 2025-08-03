import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AIService, AIRecommendation, UserProfile } from './aiService';

const RecommendationDashboard = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState(1);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{type: string, content: string, timestamp: Date}>>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommendations');
  const [useRealAI, setUseRealAI] = useState(false);
  const [version] = useState('1.0.0');
  const [productActions, setProductActions] = useState<Record<number, {likes: number, dislikes: number, purchases: number}>>({});

  // Mock data for demonstration
  const mockUsers = {
    1: { user_id: 1, age: 25, gender: 'M', preferences: ['technology', 'gaming', 'fitness'] },
    2: { user_id: 2, age: 30, gender: 'F', preferences: ['fashion', 'beauty', 'travel'] },
    3: { user_id: 3, age: 35, gender: 'M', preferences: ['books', 'technology', 'cooking'] },
    4: { user_id: 4, age: 28, gender: 'F', preferences: ['fitness', 'health', 'technology'] },
    5: { user_id: 5, age: 40, gender: 'M', preferences: ['travel', 'photography', 'books'] }
  };

  const mockRecommendations = [
    {
      product_id: 8,
      product_name: "Laptop Stand",
      score: 0.85,
      explanation: "Based on your interest in technology and gaming, this ergonomic laptop stand will improve your setup.",
      marketing_copy: "Perfect for your tech-savvy lifestyle! Transform your gaming experience while protecting your health.",
      price: 49.99,
      category: "Electronics"
    },
    {
      product_id: 9,
      product_name: "Yoga Mat", 
      score: 0.78,
      explanation: "Given your fitness interests, this premium yoga mat is perfect for your workout routine.",
      marketing_copy: "Take your fitness journey to the next level! Premium quality for all your workouts.",
      price: 39.99,
      category: "Health"
    },
    {
      product_id: 5,
      product_name: "Smart Watch",
      score: 0.82,
      explanation: "Combining technology and fitness, this smart watch tracks workouts while keeping you connected.",
      marketing_copy: "The perfect blend of tech and fitness! Monitor health and achieve your goals.",
      price: 399.99,
      category: "Electronics"
    },
    {
      product_id: 12,
      product_name: "Wireless Earbuds",
      score: 0.91,
      explanation: "Perfect for your tech lifestyle! These premium wireless earbuds offer crystal clear sound for music and calls.",
      marketing_copy: "Elevate your audio experience! Perfect for workouts, gaming, and daily use with amazing battery life.",
      price: 129.99,
      category: "Electronics"
    },
    {
      product_id: 15,
      product_name: "Fitness Tracker",
      score: 0.87,
      explanation: "Track your fitness goals with precision! This advanced fitness tracker monitors heart rate, steps, and sleep.",
      marketing_copy: "Achieve your fitness goals faster! Get detailed insights into your health and performance.",
      price: 89.99,
      category: "Health"
    },
    {
      product_id: 18,
      product_name: "Gaming Mouse",
      score: 0.89,
      explanation: "Level up your gaming experience! This high-precision gaming mouse offers customizable buttons and RGB lighting.",
      marketing_copy: "Dominate your games with precision! Ergonomic design for hours of comfortable gaming.",
      price: 79.99,
      category: "Electronics"
    }
  ];

  const mockAnalytics = {
    total_recommendations: 3,
    avg_confidence_score: 0.82,
    category_distribution: { "Electronics": 2, "Health": 1 },
    price_range: { min: 39.99, max: 399.99, avg: 163.32 }
  };

  const performanceData = [
    { name: 'Mon', recommendations: 12, clicks: 8, purchases: 3 },
    { name: 'Tue', recommendations: 15, clicks: 12, purchases: 5 },
    { name: 'Wed', recommendations: 18, clicks: 14, purchases: 6 },
    { name: 'Thu', recommendations: 22, clicks: 18, purchases: 8 },
    { name: 'Fri', recommendations: 20, clicks: 16, purchases: 7 },
    { name: 'Sat', recommendations: 25, clicks: 20, purchases: 9 },
    { name: 'Sun', recommendations: 28, clicks: 22, purchases: 10 }
  ];

  const categoryColors = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

  useEffect(() => {
    loadRecommendations();
  }, [selectedUser]);

  const loadRecommendations = async () => {
    setLoading(true);
    
    try {
      if (useRealAI) {
        // Use real AI service
        const userProfile: UserProfile = mockUsers[selectedUser as keyof typeof mockUsers];
        const aiRecommendations = await AIService.generateRecommendations(userProfile);
        setRecommendations(aiRecommendations);
        
        // Generate analytics from AI recommendations
        const totalRecs = aiRecommendations.length;
        const avgScore = aiRecommendations.reduce((sum, rec) => sum + rec.score, 0) / totalRecs;
        const categories = aiRecommendations.reduce((acc, rec) => {
          acc[rec.category] = (acc[rec.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const prices = aiRecommendations.map(rec => rec.price);
        
        setAnalytics({
          total_recommendations: totalRecs,
          avg_confidence_score: avgScore,
          category_distribution: categories,
          price_range: {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: prices.reduce((sum, price) => sum + price, 0) / prices.length
          }
        });
      } else {
        // Use mock data
        setRecommendations(mockRecommendations);
        setAnalytics(mockAnalytics);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Fallback to mock data
      setRecommendations(mockRecommendations);
      setAnalytics(mockAnalytics);
    }
    
    setLoading(false);
  };

  const handleProductAction = (productId: number, action: 'like' | 'dislike' | 'buy') => {
    setProductActions(prev => {
      const current = prev[productId] || { likes: 0, dislikes: 0, purchases: 0 };
      const updated = { ...current };
      
      switch(action) {
        case 'like':
          updated.likes += 1;
          break;
        case 'dislike':
          updated.dislikes += 1;
          break;
        case 'buy':
          updated.purchases += 1;
          break;
      }
      
      return { ...prev, [productId]: updated };
    });
    
    // Show feedback
    const messages = {
      like: '👍 Product liked!',
      dislike: '👎 Product disliked!',
      buy: '🛒 Product added to cart!'
    };
    
    alert(messages[action]);
  };

  const handleAskAI = async () => {
    if (!currentQuery.trim()) return;

    setChatMessages(prev => [...prev, {
      type: 'user',
      content: currentQuery,
      timestamp: new Date()
    }]);

    const query = currentQuery;
    setCurrentQuery('');

    try {
      if (useRealAI) {
        // Use real AI service
        const userProfile: UserProfile = mockUsers[selectedUser as keyof typeof mockUsers];
        const aiResponse = await AIService.chatWithAI(query, userProfile, recommendations);
        
        setChatMessages(prev => [...prev, {
          type: 'ai',
          content: aiResponse,
          timestamp: new Date()
        }]);
      } else {
        // Mock AI response
        setTimeout(() => {
          const responses = {
            "why": "I recommended these products based on your interests in technology, gaming, and fitness. Each item aligns with your profile and purchase history.",
            "price": "These are competitively priced items. The laptop stand offers great value at $49.99, while the smart watch, though pricier, provides comprehensive features.",
            "popular": "The Smart Watch is currently the most popular among users with similar interests to yours."
          };

          const response = Object.keys(responses).find(key => 
            query.toLowerCase().includes(key)
          );

          setChatMessages(prev => [...prev, {
            type: 'ai',
            content: responses[response as keyof typeof responses] || "That's a great question! I'd be happy to provide more insights about your recommendations.",
            timestamp: new Date()
          }]);
        }, 500);
      }
    } catch (error) {
      console.error('Error with AI chat:', error);
      setChatMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm having trouble connecting right now, but I'd be happy to help with your recommendations!",
        timestamp: new Date()
      }]);
    }
  };

  const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  const RecommendationCard = ({ rec }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{rec.product_name}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {rec.category}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-green-600">${rec.price}</div>
        <div className="flex items-center">
          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
            <div 
              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              style={{ width: `${rec.score * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{(rec.score * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
            💡 Why recommended?
          </h4>
          <p className="text-blue-700 text-sm">{rec.explanation}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-3">
          <h4 className="font-semibold text-purple-800 mb-1 flex items-center">
            📢 Personalized for you
          </h4>
          <p className="text-purple-700 text-sm">{rec.marketing_copy}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => handleProductAction(rec.product_id, 'like')}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          👍 Like
        </button>
        <button 
          onClick={() => handleProductAction(rec.product_id, 'dislike')}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          👎 Dislike
        </button>
        <button 
          onClick={() => handleProductAction(rec.product_id, 'buy')}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🛒 Buy
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'recommendations':
        return (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(rec => (
                  <RecommendationCard key={rec.product_id} rec={rec} />
                ))}
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analytics?.total_recommendations || 0}
                </div>
                <div className="text-gray-600">Total Recommendations</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {(analytics?.avg_confidence_score * 100).toFixed(0) || 0}%
                </div>
                <div className="text-gray-600">Avg Confidence</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${analytics?.price_range?.avg?.toFixed(0) || 0}
                </div>
                <div className="text-gray-600">Avg Price</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Object.keys(analytics?.category_distribution || {}).length}
                </div>
                <div className="text-gray-600">Categories</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="recommendations" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="purchases" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.entries(analytics?.category_distribution || {}).map(([name, value]) => ({ name, value }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {Object.entries(analytics?.category_distribution || {}).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                🤖 AI Assistant
              </h2>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    Ask me anything about your recommendations!
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        {message.type === 'ai' && <span className="text-blue-500 mr-2">🤖</span>}
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-3">
                <input
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                  placeholder="Ask about your recommendations..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleAskAI}
                  disabled={!currentQuery.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Send
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {['Why these products?', 'Are these good prices?', 'Most popular item?'].map(question => (
                    <button
                      key={question}
                      onClick={() => { setCurrentQuery(question); handleAskAI(); }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                🤖 AI Recommendation System
              </h1>
              <p className="text-gray-600 mt-1">Traditional ML + GenAI Powered</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(mockUsers).map(([id, user]) => (
                  <option key={id} value={id}>
                    User {id} ({user.age}y, {user.gender})
                  </option>
                ))}
              </select>
              <button
                onClick={() => setUseRealAI(!useRealAI)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  useRealAI 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {useRealAI ? '🤖 Real AI' : '🎭 Mock AI'}
              </button>
              <button
                onClick={loadRecommendations}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* User Profile */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            👤 User Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {mockUsers[selectedUser]?.preferences.map(interest => (
                  <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Demographics</h3>
              <p className="text-gray-600">
                {mockUsers[selectedUser]?.age} years old • {mockUsers[selectedUser]?.gender === 'M' ? 'Male' : 'Female'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <TabButton
            id="recommendations"
            label="Recommendations"
            icon="⭐"
            active={activeTab === 'recommendations'}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            icon="📊"
            active={activeTab === 'analytics'}
            onClick={setActiveTab}
          />
          <TabButton
            id="chat"
            label="AI Chat"
            icon="💬"
            active={activeTab === 'chat'}
            onClick={setActiveTab}
          />
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default RecommendationDashboard;