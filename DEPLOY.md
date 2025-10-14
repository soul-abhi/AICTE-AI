# 🚀 Quick Deployment Guide

## Deploy to Vercel (3 Steps)

### Step 1: Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import repository: `soul-abhi/AICTE-AI`

### Step 2: Configure (Optional)
**MongoDB is OPTIONAL** - Only needed if you want to save resumes/portfolios

Add environment variable only if you want save feature:
```
MONGODB_URI = your_mongodb_connection_string
```

**AI works without any API keys!** Built-in fallback included.

### Step 3: Deploy
Click "Deploy" → Wait 2-3 minutes → Done! 🎉

## Features

✅ **AI Resume Builder** - Generate professional resumes with AI  
✅ **Manual Resume Builder** - Create resumes manually  
✅ **Portfolio Builder** - Build your portfolio website  
✅ **ATS Checker** - Check resume ATS score  
✅ **PDF Export** - Download as PDF  

## MongoDB Optional

**Without MongoDB:**
- ✅ AI generation works
- ✅ Resume/portfolio creation works
- ❌ Can't save/load resumes (session only)

**With MongoDB:**
- ✅ Everything works
- ✅ Save and load resumes/portfolios

## Local Development

```bash
# Install
npm install

# Start backend (terminal 1)
cd server && npm run dev

# Start frontend (terminal 2)
cd client && npm run dev

# Visit http://localhost:5173
```

## Environment Variables (All Optional)

```env
# Optional - For saving resumes/portfolios
MONGODB_URI=mongodb+srv://...

# Optional - Better AI (works without this too!)
HUGGINGFACE_API_KEY=your_key
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1
```

---

**Your app works 100% without any environment variables!** 🎉
