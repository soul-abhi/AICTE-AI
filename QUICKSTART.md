# QUICK START GUIDE

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
Already done! ✅

### Step 2: Set Up Environment Variables

1. Create a `.env.local` file in the root directory
2. Add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Where to get your API key:**
- Go to: https://platform.openai.com/api-keys
- Sign up or log in
- Click "Create new secret key"
- Copy the key and paste it in `.env.local`

### Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 📋 Quick Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production Build
npm run build        # Build for production
npm run start        # Start production server

# Deployment
vercel              # Deploy to Vercel (after installing Vercel CLI)
```

---

## ⚠️ Important Notes

### Before Testing:
1. ✅ Make sure you've created `.env.local` with your OpenAI API key
2. ✅ Ensure you have internet connection (for OpenAI API calls)
3. ✅ Check that your OpenAI account has credits

### If You Get Errors:
- **"Missing API Key"** → Create `.env.local` file with `OPENAI_API_KEY`
- **"API Key Invalid"** → Check your key at https://platform.openai.com/api-keys
- **"No Credits"** → Add credits to your OpenAI account
- **Port 3000 in use** → Kill the process or use: `npm run dev -- -p 3001`

---

## 🎯 Testing the Application

1. **Landing Page** (http://localhost:3000)
   - Should see animated hero section
   - Click "Start Building Resume"

2. **Resume Builder** (http://localhost:3000/builder)
   - Fill in all sections:
     - Personal Details
     - Education
     - Experience
     - Projects
     - Job Role Target
   - Click "Generate AI Resume Summary"
   - Wait for AI to generate (5-10 seconds)
   - Copy to clipboard

---

## 📦 Project Structure

```
ai-resume-builder/
├── app/
│   ├── api/generate/route.ts    # OpenAI API endpoint
│   ├── builder/page.tsx          # Resume builder UI
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── .env.local                    # Your API keys (create this!)
├── .env.example                  # Template
├── package.json
└── README.md
```

---

## 🚀 Ready to Deploy?

See `DEPLOYMENT.md` for complete Vercel deployment instructions!

---

## 🆘 Need Help?

1. Check README.md for full documentation
2. Check DEPLOYMENT.md for deployment guide
3. Verify `.env.local` file exists and has correct API key
4. Ensure OpenAI API key is valid and has credits

---

**Happy Building! 🎉**
