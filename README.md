# AI Resume & Portfolio Builder

A comprehensive full-stack web application designed to help students and professionals create AI-powered resumes, build portfolios, and analyze their resumes against Applicant Tracking Systems (ATS). The application leverages artificial intelligence to generate professional content while providing a user-friendly interface for manual customization.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### AI Resume Builder

- **Smart Content Generation**: Automatically generate professional summaries, work experience descriptions, and project details using AI
- **Skills Recommendation**: AI-powered skill suggestions based on role and experience
- **Real-time Preview**: Live preview of resume as you build it
- **Multiple Templates**: Choose from various professional resume templates
- **Export to PDF**: Download resume in PDF format with print-optimized layout

### Manual Resume Builder

- **Drag-and-Drop Interface**: Intuitive interface for adding and organizing resume sections
- **Custom Sections**: Add education, experience, skills, projects, and achievements
- **Rich Text Editing**: Format text with various styling options
- **Template Customization**: Modify colors, fonts, and layout

### Portfolio Builder

- **Personal Website Generator**: Create a professional portfolio website
- **Project Showcase**: Display your projects with descriptions, images, and links
- **Responsive Design**: Mobile-friendly portfolio layouts
- **Custom Domains**: Deploy portfolio with custom domain support
- **Social Integration**: Link to GitHub, LinkedIn, and other professional profiles

### ATS Checker

- **Resume Analysis**: Scan resumes for ATS compatibility
- **Keyword Optimization**: Identify missing keywords and suggest improvements
- **Formatting Check**: Ensure resume formatting is ATS-friendly
- **Score Calculation**: Get a comprehensive ATS score with detailed feedback
- **Industry Standards**: Compare against industry-specific requirements

### Additional Features

- **No Authentication Required**: Public access to all features for ease of use
- **MongoDB Optional**: Application works fully without database (save/load features disabled)
- **Smart AI Fallback**: Built-in content generation when external AI APIs are unavailable
- **Cross-browser Compatible**: Works on all modern browsers
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Architecture

### System Overview

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Client   │────────▶│  Express Server  │────────▶│   MongoDB       │
│  (Frontend)     │  HTTP   │  (Backend)       │         │  (Optional)     │
│                 │◀────────│                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                     │
                                     │
                                     ▼
                            ┌──────────────────┐
                            │                  │
                            │  AI Services     │
                            │  (Hugging Face)  │
                            │                  │
                            └──────────────────┘
```

### Frontend Architecture

- **Component-Based Design**: Modular React components for reusability
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router for client-side navigation
- **Styling**: TailwindCSS for utility-first styling
- **Animations**: Framer Motion for smooth transitions

### Backend Architecture

- **RESTful API**: Clean API endpoints following REST principles
- **Middleware Stack**: Error handling, CORS, security headers
- **Service Layer**: Business logic separated from route handlers
- **Database Abstraction**: Mongoose ODM for MongoDB operations

## Technology Stack

### Frontend

- **React 18.2**: Modern React with hooks and concurrent features
- **TypeScript 5.2**: Type-safe JavaScript for better developer experience
- **Vite 5.0**: Next-generation frontend tooling with hot module replacement
- **TailwindCSS 3.4**: Utility-first CSS framework
- **Framer Motion 11.0**: Production-ready animation library
- **React Hook Form 7.50**: Performant form handling
- **Axios 1.6**: Promise-based HTTP client
- **Lucide React**: Beautiful icon library

### Backend

- **Node.js 18+**: JavaScript runtime built on Chrome's V8 engine
- **Express 4.18**: Fast, unopinionated web framework
- **Mongoose 8.1**: Elegant MongoDB object modeling
- **PDFKit 0.15**: PDF generation library
- **Helmet**: Security middleware for Express
- **Morgan**: HTTP request logger
- **CORS**: Cross-origin resource sharing middleware

### AI & ML

- **Hugging Face Inference API**: Large language models for content generation
- **Mistral 7B Instruct**: Open-source language model
- **Custom Fallback Generator**: Built-in content generation when APIs unavailable

### Development Tools

- **ESLint**: Pluggable linting utility
- **Prettier**: Opinionated code formatter
- **Nodemon**: Auto-restart development server
- **Git**: Version control system

### Deployment

- **Vercel**: Serverless deployment platform
- **GitHub**: Source code repository and CI/CD
- **MongoDB Atlas**: Cloud-hosted MongoDB database

## Installation

### Prerequisites

Before installation, ensure you have the following installed:

- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)
- Git (version 2.30.0 or higher)

### Clone Repository

```bash
git clone https://github.com/soul-abhi/AICTE-AI.git
cd AICTE-AI
```

### Install Dependencies

Install dependencies for both client and server:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Return to root directory
cd ..
```

## Configuration

### Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the `server` directory.

#### Required Variables

None - the application works without any environment variables.

#### Optional Variables

**MongoDB Configuration** (for save/load features):

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**AI Service Configuration** (for enhanced AI features):

```env
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
HUGGINGFACE_API_KEY=your_hugging_face_api_key
```

**Development Configuration**:

```env
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### MongoDB Setup (Optional)

If you want to enable save/load features:

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier: 512MB)
3. Set up database access (username and password)
4. Whitelist your IP address or allow access from anywhere
5. Get connection string and add to `.env` file

### Hugging Face API Setup (Optional)

For enhanced AI content generation:

1. Create account at https://huggingface.co
2. Go to Settings > Access Tokens
3. Create new token with read permissions
4. Add token to `.env` file

Note: The application works without this API key using built-in fallback content generation.

## Development

### Starting Development Servers

#### Backend Server

```bash
cd server
npm run dev
```

Server will start on `http://localhost:5000`

Features:

- Hot reload with nodemon
- MongoDB connection (if configured)
- API endpoints available at `/api/*`
- Health check at `/api/health`

#### Frontend Client

```bash
cd client
npm run dev
```

Client will start on `http://localhost:5173`

Features:

- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- TailwindCSS JIT compilation

### Building for Production

Build the entire application:

```bash
npm run vercel-build
```

This command:

1. Installs dependencies for client and server
2. Builds the client application
3. Outputs production files to `client/dist`

Build client only:

```bash
cd client
npm run build
```

Preview production build:

```bash
cd client
npm run preview
```

## Deployment

### Deploy to Vercel

#### Automated Deployment (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository: `soul-abhi/AICTE-AI`
   - Vercel auto-detects configuration from `vercel.json`

3. **Configure Environment Variables** (Optional)

   In Vercel dashboard, go to Project Settings > Environment Variables:

   ```
   MONGODB_URI = your_mongodb_connection_string
   HUGGINGFACE_API_KEY = your_api_key
   HUGGINGFACE_API_URL = https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - Your application will be live at `https://your-project.vercel.app`

#### Manual Deployment with Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Deployment Configuration

The `vercel.json` file configures the deployment:

```json
{
  "builds": [
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/src/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

This configuration:

- Builds the backend as serverless function
- Builds the frontend as static site
- Routes `/api/*` to backend
- Routes all other requests to frontend

## API Documentation

### Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-app.vercel.app/api`

### Endpoints

#### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "ok"
}
```

#### AI Content Generation

```http
POST /api/ai/generate
```

**Request Body:**

```json
{
  "prompt": "Write a professional summary for John Doe",
  "maxTokens": 250
}
```

**Response:**

```json
{
  "text": "Generated content here..."
}
```

#### Resume Operations

```http
GET /api/resumes
POST /api/resumes
GET /api/resumes/:id
PUT /api/resumes/:id
DELETE /api/resumes/:id
```

**Note:** Resume endpoints require MongoDB configuration.

#### Portfolio Operations

```http
GET /api/portfolios
POST /api/portfolios
GET /api/portfolios/:id
PUT /api/portfolios/:id
DELETE /api/portfolios/:id
GET /api/portfolios/share/:slug
```

**Note:** Portfolio endpoints require MongoDB configuration.

#### ATS Analysis

```http
POST /api/ats/analyze
```

**Request Body:**

```json
{
  "resumeText": "Resume content here...",
  "jobDescription": "Job description here..."
}
```

**Response:**

```json
{
  "score": 85,
  "feedback": "Detailed feedback...",
  "suggestions": ["Suggestion 1", "Suggestion 2"]
}
```

## Project Structure

```
AICTE-AI/
├── client/                      # Frontend application
│   ├── src/
│   │   ├── auth/               # Authentication components (legacy)
│   │   ├── components/         # React components
│   │   │   ├── Layout.tsx      # Main layout component
│   │   │   ├── LoaderScreen.tsx
│   │   │   └── resume/
│   │   │       └── ResumePreview.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useResumeForm.ts
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AIResumeBuilderPage.tsx
│   │   │   ├── ResumeBuilderPage.tsx
│   │   │   ├── PortfolioBuilderPage.tsx
│   │   │   ├── ATSCheckerPage.tsx
│   │   │   ├── LoginPage.tsx   # Placeholder page
│   │   │   ├── RegisterPage.tsx # Placeholder page
│   │   │   └── SharePortfolioPage.tsx
│   │   ├── services/           # API service layer
│   │   │   ├── http.ts         # Axios instance
│   │   │   ├── aiApi.ts        # AI service
│   │   │   ├── atsApi.ts       # ATS service
│   │   │   ├── resumeApi.ts    # Resume service
│   │   │   └── portfolioApi.ts # Portfolio service
│   │   ├── styles/             # CSS files
│   │   │   └── forms.css
│   │   ├── theme/              # Theme provider
│   │   │   └── ThemeProvider.tsx
│   │   ├── App.tsx             # Main app component
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js      # Tailwind configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── postcss.config.js       # PostCSS configuration
├── server/                      # Backend application
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── aiController.js
│   │   │   ├── atsController.js
│   │   │   ├── resumeController.js
│   │   │   └── portfolioController.js
│   │   ├── lib/                # Libraries and utilities
│   │   │   └── db.js           # Database connection
│   │   ├── middleware/         # Express middleware
│   │   │   └── errorHandler.js
│   │   ├── models/             # Mongoose models
│   │   │   ├── User.js         # User model (legacy)
│   │   │   ├── Resume.js       # Resume model
│   │   │   └── Portfolio.js    # Portfolio model
│   │   ├── routes/             # Route definitions
│   │   │   ├── aiRoutes.js
│   │   │   ├── atsRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   └── portfolioRoutes.js
│   │   ├── services/           # Business logic
│   │   │   ├── aiService.js    # AI content generation
│   │   │   ├── atsService.js   # ATS analysis
│   │   │   └── pdfService.js   # PDF generation
│   │   └── index.js            # Server entry point
│   ├── .env                    # Environment variables (not in git)
│   └── package.json            # Dependencies
├── .gitignore                  # Git ignore rules
├── package.json                # Root package configuration
├── vercel.json                 # Vercel deployment configuration
├── README.md                   # Project documentation
├── DEPLOY.md                   # Deployment guide
└── PROJECT_READY.md           # Project status summary
```

## Features Implementation Details

### AI Content Generation

The application implements a sophisticated two-tier AI system:

1. **Primary: External AI API**
   - Uses Hugging Face Inference API
   - Model: Mistral 7B Instruct v0.2
   - Generates high-quality, contextual content
   - Falls back to secondary system on failure

2. **Secondary: Built-in Generator**
   - Template-based content generation
   - Context-aware suggestions
   - Multiple variations for natural output
   - No external dependencies required

Implementation location: `server/src/services/aiService.js`

### MongoDB Optional Design

The application is designed to work with or without MongoDB:

**Without MongoDB:**

- All features work except save/load
- Data persists in session storage
- Perfect for testing and demos

**With MongoDB:**

- Full CRUD operations for resumes and portfolios
- User data persistence
- Cross-device access to saved data

Implementation location: `server/src/index.js`

### ATS Scoring Algorithm

The ATS checker analyzes resumes based on:

- **Keyword Matching**: Compares resume keywords with job description
- **Format Compliance**: Checks for ATS-friendly formatting
- **Section Completeness**: Ensures all required sections are present
- **Content Quality**: Analyzes content depth and relevance
- **Technical Skills**: Validates technical skills against industry standards

Implementation location: `server/src/services/atsService.js`

## Browser Support

The application supports the following browsers:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance Optimization

### Frontend

- Code splitting with React.lazy
- Dynamic imports for route components
- Image optimization with lazy loading
- Minified production builds
- Tree shaking to remove unused code
- CSS purging with TailwindCSS

### Backend

- Serverless architecture with Vercel
- Efficient database queries with Mongoose
- Response caching for static content
- Gzip compression for API responses
- Connection pooling for database

## Security

### Implemented Security Measures

- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Input validation and sanitization
- MongoDB injection prevention
- Rate limiting on API endpoints
- Secure environment variable handling

### Environment Variables Security

- Never commit `.env` files to version control
- Use `.gitignore` to exclude sensitive files
- Rotate API keys regularly
- Use different keys for development and production

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code formatting
- Use TypeScript for frontend code
- Add comments for complex logic
- Write meaningful commit messages

### Testing

- Test all features before submitting PR
- Ensure build passes without errors
- Verify deployment configuration works

## License

This project is developed for educational purposes as part of AICTE initiative.

## Acknowledgments

- AICTE for project support and guidance
- Hugging Face for AI model access
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- Open source community for various libraries and tools

## Contact

For questions or support, please open an issue on GitHub.

Repository: https://github.com/soul-abhi/AICTE-AI

---

Built for students by students
