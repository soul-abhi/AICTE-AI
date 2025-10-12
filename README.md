# 🎯 AI Resume & Portfolio Builder

Full-stack web application that helps create ATS-ready resumes with AI-powered content generation, portfolio building, and resume analysis.

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Generate professional summaries, experience descriptions, project details, and skills
- 📝 **Dual Resume Builders** - Classic builder + Advanced AI Resume Builder
- 🎨 **Modern UI** - Beautiful gradient designs with smooth animations (Framer Motion)
- 📄 **PDF Export** - Download clean, professional, ATS-friendly resumes
- 🔐 **User Authentication** - Secure JWT-based login/registration
- 💼 **Portfolio Builder** - Create and share professional portfolios
- 📊 **ATS Checker** - Analyze resume compatibility with job descriptions
- 🌓 **Theme Support** - Light/dark mode toggle
- 🎯 **Human-Like AI** - Content that sounds natural, not AI-generated

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11** - Smooth animations
- **Lucide React** - Beautiful icons
- **Axios** - API requests

### Backend

- **Node.js** with Express
- **MongoDB** (Mongoose) - Database
- **JWT** - Authentication
- **Hugging Face API** - AI content generation (with smart fallback)
- **PDFKit** - PDF generation
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy `server/.env.example` to `server/.env` and configure:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
HUGGINGFACE_API_KEY=your_huggingface_api_key
PORT=5000
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
npm run dev --workspace=server

# Terminal 2 - Frontend
npm run dev --workspace=client
```

Visit: `http://localhost:5173`

## 📦 Deployment

### Deploy to Vercel (Recommended)

See detailed guide: **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

**Quick Steps:**

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure MongoDB Atlas:**
   - Whitelist Vercel IPs: `0.0.0.0/0`
   - Verify connection string

**Full deployment guide available in `DEPLOYMENT_GUIDE.md`**

## 📁 Project Structure

```
ai-resume-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   ├── auth/          # Authentication
│   │   └── theme/         # Theme provider
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Auth & error handling
│   │   └── index.js       # Server entry
│   └── package.json
├── vercel.json            # Vercel configuration
├── DEPLOYMENT_GUIDE.md    # Detailed deployment guide
└── README.md              # This file
```

## 🎨 AI Features

### Human-Like Content Generation

- **Professional Summary** - Natural, conversational summaries
- **Skills** - Role-specific skill suggestions (15+ skills)
- **Experience** - 3-4 bullet points with metrics and impact
- **Projects** - Technical descriptions with features and scale

### Smart Features

- 4 randomized templates per content type
- Context-aware generation
- No AI buzzwords or patterns
- Unique output every generation
- Works offline with smart fallback system

See: [AI_FEATURES.md](./AI_FEATURES.md) for detailed documentation

## 🔒 Environment Variables

### Backend (server/.env)

```bash
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_32char_secret
HUGGINGFACE_API_KEY=hf_xxx...

# Optional
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
OPENAI_API_KEY=sk_xxx...
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment walkthrough
- **[AI_FEATURES.md](./AI_FEATURES.md)** - AI generation features
- **[HUMAN_LIKE_AI.md](./HUMAN_LIKE_AI.md)** - How we made AI content human-like
- **[AI_IMPROVEMENT_COMPARISON.md](./AI_IMPROVEMENT_COMPARISON.md)** - Before/after comparison

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Whitelist your IP in MongoDB Atlas Network Access
- Verify connection string format
- Check database user permissions

### AI Generation Not Working

- Verify `HUGGINGFACE_API_KEY` is set
- Smart fallback system works even without API
- Check browser console for errors

### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules client/node_modules server/node_modules
npm install
npm run build
```

### CORS Errors

- Update `CLIENT_ORIGIN` in server/.env
- Check CORS configuration in server/src/index.js

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use this project for learning or building your own resume builder!

## 🙏 Acknowledgments

- Hugging Face for AI API
- MongoDB Atlas for database hosting
- Vercel for easy deployment
- Tailwind CSS for styling
- Framer Motion for animations

## 📧 Support

For issues and questions:

- Open an issue on GitHub
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help
- Review documentation files for feature details

---

**Built with ❤️ for helping people create amazing resumes!**

## 🎯 What's Next?

After deployment:

- [ ] Test all features on production
- [ ] Add custom domain
- [ ] Set up monitoring
- [ ] Gather user feedback
- [ ] Add more AI features
- [ ] Improve ATS scoring algorithm
- [ ] Add more resume templates

**Ready to deploy? Check out [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)!** 🚀
