# 🔄 AI Recommendation Dashboard - Code Flow

## 📊 **Main Application Flow**

```mermaid
flowchart TD
    A[User Opens App] --> B[App Initializes]
    B --> C[Load RecommendationDashboard Component]
    C --> D[Initialize State Variables]
    D --> E[Set Default User Profile]
    E --> F[Load Initial Recommendations]
    F --> G[Render Dashboard UI]
    G --> H{User Interaction}
    
    H --> I[Switch User Profile]
    H --> J[Toggle AI Mode]
    H --> K[Change Tab]
    H --> L[Ask AI Question]
    H --> M[Refresh Recommendations]
    
    I --> F
    J --> N[Update AI Service Mode]
    N --> F
    K --> O[Render Different Tab Content]
    L --> P[Process AI Chat]
    M --> F
    
    F --> Q{AI Mode?}
    Q -->|Mock AI| R[Load Mock Data]
    Q -->|Real AI| S[Call OpenAI API]
    
    R --> T[Update State]
    S --> U{API Success?}
    U -->|Yes| T
    U -->|No| R
    
    T --> G
    O --> G
    P --> G
```

## 🧠 **AI Service Flow**

```mermaid
flowchart TD
    A[AI Service Call] --> B{Service Type?}
    
    B -->|Generate Recommendations| C[generateRecommendations]
    B -->|Chat Response| D[chatWithAI]
    B -->|User Insights| E[generateUserInsights]
    
    C --> F[Create OpenAI Prompt]
    F --> G[Call OpenAI API]
    G --> H{API Response?}
    H -->|Success| I[Parse JSON Response]
    H -->|Error| J[Return Mock Data]
    
    I --> K[Return AI Recommendations]
    J --> L[Return Fallback Data]
    
    D --> M[Create Chat Prompt]
    M --> N[Call OpenAI API]
    N --> O{API Response?}
    O -->|Success| P[Return AI Response]
    O -->|Error| Q[Return Error Message]
    
    E --> R[Create Analysis Prompt]
    R --> S[Call OpenAI API]
    S --> T{API Response?}
    T -->|Success| U[Return Insights]
    T -->|Error| V[Return Mock Insights]
```

## 🎯 **Recommendation Loading Flow**

```mermaid
flowchart TD
    A[loadRecommendations Called] --> B[Set Loading State]
    B --> C{useRealAI?}
    
    C -->|Yes| D[Get User Profile]
    C -->|No| E[Load Mock Recommendations]
    
    D --> F[Call AIService.generateRecommendations]
    F --> G{API Success?}
    G -->|Yes| H[Process AI Recommendations]
    G -->|No| I[Fallback to Mock Data]
    
    H --> J[Calculate Analytics]
    I --> J
    E --> J
    
    J --> K[Update State]
    K --> L[Clear Loading State]
    L --> M[Re-render UI]
```

## 💬 **AI Chat Flow**

```mermaid
flowchart TD
    A[User Types Question] --> B[handleAskAI Called]
    B --> C[Add User Message to Chat]
    C --> D[Clear Input Field]
    D --> E{useRealAI?}
    
    E -->|Yes| F[Call AIService.chatWithAI]
    E -->|No| G[Use Mock Response Logic]
    
    F --> H{API Success?}
    H -->|Yes| I[Add AI Response to Chat]
    H -->|No| J[Add Error Message to Chat]
    
    G --> K[Keyword Matching]
    K --> L[Select Mock Response]
    L --> I
    
    I --> M[Update Chat State]
    J --> M
    M --> N[Re-render Chat UI]
```

## 🎨 **UI Rendering Flow**

```mermaid
flowchart TD
    A[Component Render] --> B[Render Header]
    B --> C[Render User Profile Section]
    C --> D[Render Navigation Tabs]
    D --> E{Active Tab?}
    
    E -->|Recommendations| F[renderRecommendations]
    E -->|Analytics| G[renderAnalytics]
    E -->|Chat| H[renderChat]
    
    F --> I[Show Loading Spinner?]
    I -->|Yes| J[Display Loading UI]
    I -->|No| K[Display Recommendation Cards]
    
    K --> L[Map Recommendations]
    L --> M[Render RecommendationCard Components]
    
    G --> N[Render KPI Cards]
    N --> O[Render Charts]
    O --> P[Display Analytics Data]
    
    H --> Q[Render Chat Interface]
    Q --> R[Display Message History]
    R --> S[Show Input Field]
    S --> T[Display Quick Questions]
```

## 🔄 **State Management Flow**

```mermaid
flowchart TD
    A[Component State] --> B[recommendations]
    A --> C[analytics]
    A --> D[selectedUser]
    A --> E[loading]
    A --> F[chatMessages]
    A --> G[currentQuery]
    A --> H[activeTab]
    A --> I[useRealAI]
    
    B --> J[AIRecommendation[]]
    C --> K[Analytics Object]
    D --> L[User ID Number]
    E --> M[Boolean Loading State]
    F --> N[Chat Message Array]
    G --> O[Current Input String]
    H --> P[Active Tab String]
    I --> Q[AI Mode Boolean]
    
    J --> R[Product Recommendations]
    K --> S[Performance Metrics]
    L --> T[User Profile Selection]
    M --> U[Loading UI Control]
    N --> V[Chat History]
    O --> W[Input Field Value]
    P --> X[Tab Content Display]
    Q --> Y[AI Service Mode]
```

## 🎯 **User Interaction Flow**

```mermaid
flowchart TD
    A[User Action] --> B{Action Type?}
    
    B -->|User Selection| C[setSelectedUser]
    B -->|AI Toggle| D[setUseRealAI]
    B -->|Tab Change| E[setActiveTab]
    B -->|Chat Input| F[setCurrentQuery]
    B -->|Send Message| G[handleAskAI]
    B -->|Refresh| H[loadRecommendations]
    B -->|Like/Dislike| I[Handle Feedback]
    B -->|Buy Product| J[Handle Purchase]
    
    C --> K[Trigger useEffect]
    K --> L[Reload Recommendations]
    
    D --> M[Toggle AI Mode]
    M --> N[Update UI Button]
    
    E --> O[Change Tab Content]
    
    F --> P[Update Input Field]
    
    G --> Q[Process AI Chat]
    
    H --> R[Reload Data]
    
    I --> S[Update Product Rating]
    
    J --> T[Handle Purchase Flow]
```

## 🔧 **Error Handling Flow**

```mermaid
flowchart TD
    A[API Call] --> B{API Response?}
    
    B -->|Success| C[Process Response]
    B -->|Error| D[Error Handling]
    
    D --> E[Log Error]
    E --> F[Show Fallback Data]
    F --> G[Display User-Friendly Message]
    
    C --> H[Validate Response]
    H --> I{Valid Data?}
    I -->|Yes| J[Update State]
    I -->|No| D
    
    J --> K[Render Success UI]
    G --> L[Render Error UI]
```

## 📱 **Responsive Design Flow**

```mermaid
flowchart TD
    A[Screen Size Change] --> B{Tailwind CSS Classes}
    
    B --> C[Grid Layout]
    C --> D{Screen Size?}
    
    D -->|Mobile| E[Single Column Layout]
    D -->|Tablet| F[Two Column Layout]
    D -->|Desktop| G[Three Column Layout]
    
    E --> H[Stacked Cards]
    F --> I[Side-by-Side Cards]
    G --> J[Grid Cards]
    
    H --> K[Responsive Charts]
    I --> K
    J --> K
    
    K --> L[Adaptive Navigation]
    L --> M[Responsive Header]
```

## 🚀 **Deployment Flow**

```mermaid
flowchart TD
    A[Code Changes] --> B[Local Development]
    B --> C[Test Locally]
    C --> D[Build for Production]
    D --> E[Vercel Deployment]
    E --> F[Build Process]
    F --> G{Build Success?}
    
    G -->|Yes| H[Deploy to CDN]
    G -->|No| I[Build Error]
    
    H --> J[Update Live URL]
    I --> K[Fix Build Issues]
    K --> D
    
    J --> L[Live Application]
    L --> M[User Access]
```

---

## 🎯 **Key Integration Points**

1. **React Hooks** - Manage component state and side effects
2. **TypeScript** - Type safety and better development experience
3. **Tailwind CSS** - Responsive styling and modern UI
4. **Recharts** - Data visualization and analytics
5. **OpenAI API** - Real AI integration for recommendations and chat
6. **Vite** - Fast development and build tooling
7. **Vercel** - Deployment and hosting platform

## 🔄 **Data Flow Summary**

1. **User Input** → **State Update** → **API Call** → **Response Processing** → **UI Update**
2. **Component Mount** → **Initial Data Load** → **Render UI** → **User Interaction** → **State Change** → **Re-render**
3. **AI Toggle** → **Service Mode Change** → **Data Source Switch** → **Content Update** 