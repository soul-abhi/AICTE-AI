# Deployment Guide for AI Resume Builder

## Prerequisites

1. **GitHub Account** - To host your code
2. **Vercel Account** - For deployment (free tier available)
3. **OpenAI API Key** - Get from https://platform.openai.com/api-keys

---

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: AI Resume Builder"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-builder.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `next build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your_api_key_here`
   - Select all environments (Production, Preview, Development)

6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete
8. Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? ai-resume-builder
# - In which directory is your code located? ./
# - Auto-detected project settings? Yes
# - Want to override the settings? No

# Add environment variable
vercel env add OPENAI_API_KEY production
# Enter your OpenAI API key when prompted
```

### 3. Post-Deployment Configuration

1. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Environment Variables:**
   - Verify in Project Settings → Environment Variables
   - Make sure `OPENAI_API_KEY` is set for all environments

3. **Performance Optimization:**
   - Enable Edge Functions (already configured)
   - Enable compression (automatic)
   - Enable caching (automatic)

---

## Testing Your Deployment

1. Visit your deployed URL
2. Click "Start Building Resume"
3. Fill in the form with sample data
4. Click "Generate AI Resume Summary"
5. Verify the AI generates a proper resume

---

## Troubleshooting

### Issue: "API Key not found"
**Solution:** Make sure `OPENAI_API_KEY` is added in Vercel Environment Variables and redeploy.

### Issue: "Build failed"
**Solution:** 
```bash
# Run build locally to check for errors
npm run build

# Fix any TypeScript or build errors
# Then commit and push changes
```

### Issue: "OpenAI API Error"
**Solution:** 
- Verify your API key is valid
- Check OpenAI account has credits
- Check API rate limits

### Issue: "Module not found"
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for GPT-4 access |

---

## Continuous Deployment

Once set up, any push to your main branch will automatically trigger a new deployment:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Vercel will automatically deploy the changes
```

---

## Monitoring and Analytics

1. **Vercel Analytics:**
   - Go to Project → Analytics tab
   - View page views, performance metrics

2. **OpenAI Usage:**
   - Check usage at https://platform.openai.com/usage
   - Set up billing alerts

---

## Cost Estimation

### Vercel (Hobby Plan - Free)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Edge Functions

### OpenAI API
- GPT-4o: ~$0.03 per resume generation
- Recommended: Start with $10 credit
- Monitor usage regularly

---

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use Vercel Environment Variables
3. ✅ Rotate API keys periodically
4. ✅ Set up rate limiting (if needed)
5. ✅ Monitor API usage

---

## Support and Updates

- **Documentation:** Check README.md
- **Issues:** Create GitHub issue
- **Updates:** Pull latest changes and redeploy

---

**Your AI Resume Builder is now live! 🎉**

Share the link and help people create amazing resumes!
