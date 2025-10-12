# 🎯 COPY & PASTE COMMANDS - GITHUB & VERCEL DEPLOYMENT

Just copy and paste these commands in order!

---

## 📍 STEP 1: Check Your Location

```powershell
# Make sure you're in the project root
cd E:\AICTE-AI

# Verify you're in the right place
dir
```

You should see: `client/`, `server/`, `package.json`, `vercel.json`

---

## 📍 STEP 2: Check Git Status

```powershell
git status
```

**If you see "fatal: not a git repository":**

```powershell
git init
```

---

## 📍 STEP 3: Stage All Files

```powershell
git add .
```

---

## 📍 STEP 4: Commit

```powershell
git commit -m "Initial commit: AI Resume Builder with deployment config"
```

---

## 📍 STEP 5: Create GitHub Repository

**Don't type anything yet!** First:

1. Open browser: https://github.com/new
2. Repository name: `ai-resume-builder`
3. Description: `AI-powered Resume Builder`
4. Public or Private: **Your choice**
5. **DO NOT** check any boxes
6. Click **"Create repository"**

---

## 📍 STEP 6: Connect to GitHub

**Replace `YOUR_USERNAME` with your actual GitHub username:**

```powershell
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-builder.git
```

**Example (if your username is "johndoe"):**

```powershell
git remote add origin https://github.com/johndoe/ai-resume-builder.git
```

---

## 📍 STEP 7: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

**✅ CODE IS NOW ON GITHUB!**

Visit: `https://github.com/YOUR_USERNAME/ai-resume-builder` to see it!

---

## ☁️ STEP 8: Deploy to Vercel

### 8.1 Go to Vercel

Open browser: https://vercel.com

Click: **"Sign Up"** (or **"Log In"** if you have account)

Choose: **"Continue with GitHub"**

Click: **"Authorize Vercel"**

---

### 8.2 Import Project

Click: **"Add New..."** → **"Project"**

Find: **"ai-resume-builder"** in the list

Click: **"Import"** next to it

---

### 8.3 Configure Project

**Root Directory:** Leave as `.`

**Framework Preset:** Select **"Other"**

**Build Command:**

```
npm run vercel-build
```

**Output Directory:**

```
client/dist
```

**Install Command:**

```
npm install
```

---

### 8.4 Add Environment Variables

Click **"Environment Variables"**

Add these ONE BY ONE:

**Variable 1:**

- Name: `MONGODB_URI`
- Value: `<paste your MongoDB connection string from server/.env>`

**Variable 2:**

- Name: `JWT_SECRET`
- Value: `<paste your JWT secret from server/.env>`

**Variable 3:**

- Name: `HUGGINGFACE_API_URL`
- Value: `https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2`

**Variable 4:**

- Name: `HUGGINGFACE_API_KEY`
- Value: `<paste your Hugging Face token from server/.env>`

**Variable 5:**

- Name: `NODE_ENV`
- Value: `production`

**Variable 6:**

- Name: `CLIENT_ORIGIN`
- Value: `*`

Make sure **"Production"** is checked for all!

---

### 8.5 Deploy!

Click: **"Deploy"**

⏳ Wait 2-3 minutes...

🎉 You'll see **"Congratulations!"**

---

## 🗄️ STEP 9: Configure MongoDB

### 9.1 Open MongoDB Atlas

Browser: https://cloud.mongodb.com

Login to your account

---

### 9.2 Whitelist Vercel IPs

1. Click your project name (top left)
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"** button
4. Click **"Allow Access From Anywhere"**
5. IP Address: `0.0.0.0/0`
6. Comment: `Vercel deployment`
7. Click **"Confirm"**

**✅ MONGODB NOW ACCESSIBLE FROM VERCEL!**

---

## 🎉 STEP 10: Test Your App!

### 10.1 Get Your URL

In Vercel Dashboard, find your URL:

```
https://ai-resume-builder-xyz123.vercel.app
```

Or click the **"Visit"** button

---

### 10.2 Test Everything

1. ✅ Visit your URL
2. ✅ Click **"Register"** → create account
3. ✅ Login with the account
4. ✅ Go to **"AI Resume"** page
5. ✅ Fill in some info
6. ✅ Click **"Generate with AI"** buttons
7. ✅ Click **"Download Resume PDF"**

**Everything works? 🎉 YOU'RE DONE!**

---

## 🐛 If Something's Wrong

### Check Vercel Logs

1. Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Look for errors

### Check Environment Variables

1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Verify all 6 variables are there
4. Click **"Redeploy"** if you added/fixed any

### Force Redeploy

1. Vercel Dashboard → Your Project
2. **"Deployments"** tab
3. Click **"..."** on latest
4. Click **"Redeploy"**

---

## 📝 Save These URLs

**Your GitHub Repo:**

```
https://github.com/YOUR_USERNAME/ai-resume-builder
```

**Your Live App:**

```
https://your-project-name.vercel.app
```

**Vercel Dashboard:**

```
https://vercel.com/YOUR_USERNAME/ai-resume-builder
```

---

## 🔄 Future Updates

When you make changes:

```powershell
cd E:\AICTE-AI
git add .
git commit -m "Your update description"
git push
```

**Vercel automatically redeploys!** 🚀

---

## 📞 Need Help?

- **Quick Guide:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)
- **Full Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

**That's it! Your AI Resume Builder is LIVE! 🎉**
