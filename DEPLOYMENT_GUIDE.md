# 🚀 Deployment Guide: GitHub + Vercel

This guide will walk you through deploying your AI Resume Builder to Vercel using GitHub.

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at https://vercel.com)
- [x] MongoDB Atlas account (for database)
- [x] Git installed on your computer

---

## 📦 Step 1: Prepare Your Project

### 1.1 Update Environment Variables Template

Create a `.env.example` file in the `server` directory:

```bash
# In server/.env.example
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
HUGGINGFACE_API_KEY=your_huggingface_api_key
OPENAI_API_KEY=your_openai_api_key_optional
PORT=5000
```

### 1.2 Verify Your server/.env File

Make sure your `server/.env` has all required values (don't commit this file!).

---

## 🌐 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```powershell
# In your project root (E:\AICTE-AI)
git init
```

### 2.2 Add All Files

```powershell
git add .
```

### 2.3 Create First Commit

```powershell
git commit -m "Initial commit: AI Resume & Portfolio Builder"
```

### 2.4 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-resume-builder` (or any name you prefer)
3. Description: "AI-powered Resume & Portfolio Builder with React, Node.js, and MongoDB"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have one)
6. Click **Create repository**

### 2.5 Connect and Push to GitHub

```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-builder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

## ☁️ Step 3: Deploy Backend to Vercel

### 3.1 Sign Up / Log In to Vercel

1. Go to https://vercel.com
2. Click **Sign Up** or **Log In**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your repositories

### 3.2 Import Your GitHub Repository

1. Click **"Add New..."** → **Project**
2. Find your `ai-resume-builder` repository
3. Click **Import**

### 3.3 Configure Project Settings

**Root Directory:**

- Leave as `.` (root)

**Framework Preset:**

- Select **Other** or **Vite**

**Build Settings:**

- Build Command: `npm run vercel-build`
- Output Directory: `client/dist`
- Install Command: `npm install`

**Environment Variables** (IMPORTANT!):

Click **"Environment Variables"** and add:

| Name                  | Value                                                                            | Where to Get                                                                              |
| --------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `MONGODB_URI`         | Your MongoDB connection string                                                   | MongoDB Atlas → Connect → Connection string                                               |
| `JWT_SECRET`          | Your secret key                                                                  | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `HUGGINGFACE_API_URL` | `https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2` | Default value                                                                             |
| `HUGGINGFACE_API_KEY` | Your Hugging Face token                                                          | https://huggingface.co/settings/tokens                                                    |
| `OPENAI_API_KEY`      | (Optional) Your OpenAI key                                                       | https://platform.openai.com/api-keys                                                      |
| `NODE_ENV`            | `production`                                                                     | Fixed value                                                                               |

**IMPORTANT**: Make sure to add these for **Production** environment.

### 3.4 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for deployment
3. You'll see "🎉 Congratulations!" when done

**✅ Your app is now live!**

---

## 🔧 Step 4: Update API URL in Frontend

### 4.1 Check Your Vercel URL

Your Vercel deployment URL will be something like:

```
https://ai-resume-builder-xyz123.vercel.app
```

### 4.2 Update Client API Configuration

You have two options:

**Option 1: Use Environment Variables (Recommended)**

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-vercel-url.vercel.app`

**Option 2: Update the Code**

Edit `client/src/services/http.ts`:

```typescript
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://your-vercel-url.vercel.app" ||
  "http://localhost:5000";
```

### 4.3 Redeploy

If you changed code:

```powershell
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will automatically redeploy!

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Your Live App

1. Visit your Vercel URL
2. Try to register a new account
3. Test login
4. Test AI resume generation
5. Test PDF download

### 5.2 Check Logs (if issues)

In Vercel Dashboard:

1. Go to your project
2. Click **"Functions"** tab
3. Click on any function to see logs
4. Check for errors

### 5.3 Common Issues & Fixes

**❌ "Failed to fetch" errors:**

- Check CORS settings in `server/src/index.js`
- Make sure MongoDB connection string is correct
- Verify all environment variables are set

**❌ MongoDB connection error:**

- Whitelist IP `0.0.0.0/0` in MongoDB Atlas → Network Access
- Verify connection string has correct password
- Check database user permissions

**❌ AI generation not working:**

- Verify `HUGGINGFACE_API_KEY` is set correctly
- Check if API key has permissions
- The fallback system should still work even if API fails

---

## 🎯 Step 6: Custom Domain (Optional)

### 6.1 Add Your Domain

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `myresume.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### 6.2 Update Domain in MongoDB Atlas

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add Vercel's IP ranges (or use `0.0.0.0/0` for all IPs)

---

## 📝 Environment Variables Reference

### Required for Backend:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_very_long_random_secret_key_here
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
NODE_ENV=production
```

### Optional:

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
PORT=5000
```

### For Frontend (Optional):

```bash
VITE_API_URL=https://your-app.vercel.app
```

---

## 🔄 Making Updates After Deployment

### Update Code:

```powershell
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

**That's it!** Vercel automatically redeploys.

### Update Environment Variables:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit or add variables
3. Click **"Redeploy"** to apply changes

---

## 🐛 Troubleshooting

### Check Build Logs:

- Vercel Dashboard → Deployments → Click on deployment → View logs

### Check Function Logs:

- Vercel Dashboard → Functions → Click function → View logs

### Check MongoDB Connection:

- Atlas → Network Access → Ensure `0.0.0.0/0` is whitelisted
- Atlas → Database Access → Verify user has read/write permissions

### Clear Vercel Cache:

```powershell
# In project root
vercel --prod --force
```

### Test Locally Before Deploying:

```powershell
# Test frontend build
cd client
npm run build
npm run preview

# Test backend
cd ../server
npm start
```

---

## 📊 Monitoring

### Analytics (Built-in Vercel):

- Vercel Dashboard → Analytics
- See visitor stats, page views, etc.

### Error Tracking:

- Check Functions logs regularly
- Monitor MongoDB Atlas metrics

### Performance:

- Vercel Dashboard → Speed Insights
- Check load times and performance

---

## 🎉 Success Checklist

- [x] Code pushed to GitHub
- [x] Vercel project created and linked to GitHub
- [x] All environment variables added
- [x] MongoDB Atlas IP whitelisted
- [x] Successful deployment
- [x] Registration/Login working
- [x] AI generation working
- [x] PDF download working
- [x] All pages accessible

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** to GitHub
2. **Use strong JWT_SECRET** (32+ characters, random)
3. **Rotate API keys** periodically
4. **Whitelist specific IPs** in MongoDB (not 0.0.0.0/0 for production)
5. **Enable 2FA** on GitHub and Vercel accounts
6. **Monitor logs** for suspicious activity

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **GitHub Docs**: https://docs.github.com/
- **Vite Docs**: https://vitejs.dev/
- **Express Docs**: https://expressjs.com/

---

## 🚀 Quick Commands Reference

```powershell
# Git Commands
git status                          # Check status
git add .                          # Stage all changes
git commit -m "message"            # Commit changes
git push                           # Push to GitHub

# Local Development
npm install                        # Install dependencies
npm run dev --workspace=client     # Run frontend
npm run dev --workspace=server     # Run backend

# Build
npm run build                      # Build for production
npm run preview --workspace=client # Preview production build

# Vercel CLI (Optional)
npm i -g vercel                    # Install Vercel CLI
vercel                             # Deploy from CLI
vercel --prod                      # Deploy to production
vercel logs                        # View logs
```

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Test all features thoroughly
2. ✅ Share your app with friends for testing
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring and analytics
5. ✅ Create documentation for users
6. ✅ Add more features and improvements
7. ✅ Market your app!

**Congratulations! Your AI Resume Builder is now live! 🎉**
