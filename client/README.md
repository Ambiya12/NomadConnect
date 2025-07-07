# Nomad Connect

**Real stories. Real places. Real travelers.**

A modern travel community platform where authentic travelers share hidden gems, insider tips, and real experiences from around the world. Built with React, TypeScript, and modern web technologies.

![Nomad Connect]()

## ✨ Features

### 🗺️ **Destinations**
- **Discover Hidden Gems**: Browse authentic destinations shared by real travelers
- **Interactive Maps**: View locations with coordinates and detailed information
- **Rich Media**: High-quality images and detailed descriptions
- **Search & Filter**: Find destinations by country, city, or keywords
- **User Ratings**: Like and comment on destinations

### 📝 **Travel Tips**
- **Community Wisdom**: Share and discover practical travel advice
- **Expert Insights**: Learn from experienced travelers
- **Interactive Engagement**: Like, comment, and discuss tips
- **Easy Publishing**: Simple interface for sharing knowledge

### 👤 **User Profiles**
- **Personal Portfolios**: Showcase your travel experiences
- **Profile Customization**: Add bio, profile picture, and personal details
- **Activity Tracking**: View your contributions and engagement stats
- **Public Profiles**: Connect with other travelers

### 🔐 **Authentication & Security**
- **Secure Registration**: Email-based account creation
- **Profile Management**: Update personal information and preferences
- **Content Ownership**: Edit and manage your own posts
- **Privacy Controls**: Secure user data handling

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Modern web browser**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ambiya12/NomadConnect.git
   cd nomad-connect
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling

### **UI Components**
- **Material-UI Icons** - Consistent iconography
- **Custom Components** - Reusable UI elements
- **Responsive Design** - Mobile-first approach

### **State Management**
- **React Context** - Authentication state
- **Custom Hooks** - Reusable logic
- **Local Storage** - Persistent user sessions

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Vite** - Development and build tooling

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AuthorCard/      # Author information display
│   ├── CommentSection/  # Comments functionality
│   ├── DestinationCard/ # Destination preview cards
│   ├── Header/          # Navigation header
│   ├── Footer/          # Site footer
│   ├── LoadingSpinner/  # Loading states
│   ├── Profile/         # Profile-related components
│   └── TravelTips/      # Travel tips components
├── pages/               # Main application pages
│   ├── About/           # About us page
│   ├── Destination/     # Destination pages
│   ├── Home/            # Landing page
│   ├── Login/           # Authentication
│   ├── Profile/         # User profiles
│   ├── SignUp/          # User registration
│   └── TravelTips/      # Travel tips pages
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── main.tsx            # Application entry point
```

## 🎨 Design Philosophy

### **User Experience**
- **Clean Interface**: Minimal, intuitive design
- **Fast Performance**: Optimized loading and interactions
- **Mobile-First**: Responsive across all devices
- **Accessibility**: WCAG compliant components

### **Visual Design**
- **Modern Aesthetics**: Clean lines and thoughtful spacing
- **Consistent Branding**: Cohesive color scheme and typography
- **High-Quality Media**: Crisp images and smooth animations
- **Professional Polish**: Production-ready interface

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Deployment
npm run deploy       # Deploy to production
```

## 🌐 API Integration

The frontend integrates with a RESTful API for:

- **User Authentication** - Login, registration, profile management
- **Destinations** - CRUD operations for travel destinations
- **Travel Tips** - Create, read, update, delete travel advice
- **Comments** - User interactions and discussions
- **File Uploads** - Image handling for destinations and profiles

### **API Endpoints**
```
POST   /api/register/              # User registration
POST   /api/login/                 # User authentication
GET    /api/profile/               # Get user profile
PATCH  /api/profile/               # Update user profile

GET    /api/destinations/          # List destinations
POST   /api/destinations/          # Create destination
GET    /api/destinations/:id       # Get destination details
PATCH  /api/destinations/:id       # Update destination
DELETE /api/destinations/:id       # Delete destination

GET    /api/travel-tips/           # List travel tips
POST   /api/travel-tips/           # Create travel tip
GET    /api/travel-tips/:id        # Get travel tip details
PATCH  /api/travel-tips/:id        # Update travel tip
DELETE /api/travel-tips/:id        # Delete travel tip
```

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### **Features**
- **Fluid Layouts**: Adapts to any screen size
- **Touch-Friendly**: Optimized for mobile interactions
- **Progressive Enhancement**: Works on all devices

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **Secure Authentication**: JWT token management
- **HTTPS Ready**: SSL/TLS support
- **Content Security**: Protected file uploads

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy-loaded routes and components
- **Image Optimization**: Responsive images with fallbacks
- **Bundle Optimization**: Tree-shaking and minification
- **Caching Strategy**: Efficient asset caching
- **Fast Loading**: Optimized initial page load

## 🌍 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+


### **Upcoming Features**
- [ ] **Real-time Chat** - Connect with fellow travelers
- [ ] **Trip Planning** - Collaborative itinerary creation
- [ ] **Offline Support** - PWA capabilities
- [ ] **Social Features** - Follow travelers and get updates
- [ ] **Advanced Search** - AI-powered destination recommendations
- [ ] **Mobile App** - Native iOS and Android applications

### **Technical Improvements**
- [ ] **Performance** - Further optimization and caching
- [ ] **Testing** - Comprehensive test suite
- [ ] **Accessibility** - Enhanced WCAG compliance
- [ ] **Internationalization** - Multi-language support

## 👥 Team

Built with ❤️ by travelers, for travelers.

---

**Start your journey with Nomad Connect today!** 🌟

*Share your hidden gems, discover authentic experiences, and connect with a community that values real travel stories over tourist traps.*