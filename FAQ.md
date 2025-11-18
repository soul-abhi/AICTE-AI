# ❓ Frequently Asked Questions (FAQ)

## General Questions

### What is AI Resume Builder?
AI Resume Builder is a web application that uses artificial intelligence (OpenAI GPT-4) to generate professional, ATS-optimized resumes with a target score of 90+.

### Do I need to create an account?
No! The application is designed to work without any login or registration. Just visit the site and start building.

### Is it free to use?
The application itself is free to use. However, if you're hosting your own instance, you'll need to pay for OpenAI API usage (approximately $0.01-0.03 per resume generation).

### What is an ATS score?
ATS (Applicant Tracking System) score measures how well your resume can be parsed by automated recruitment software. A 90+ score means your resume is highly optimized for these systems.

---

## Technical Questions

### What technologies are used?
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Edge Functions)
- **AI:** OpenAI GPT-4o
- **Deployment:** Vercel

### Can I run this locally?
Yes! Follow these steps:
```bash
npm install
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

### What Node.js version do I need?
Node.js 18 or higher is recommended.

### Do I need a database?
No database is required. The application is stateless - all data is processed in real-time and not stored.

---

## Setup & Configuration

### How do I get an OpenAI API key?
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key and add it to your `.env.local` file

### Where do I put my API key?
Create a `.env.local` file in the root directory:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### Can I use GPT-3.5 instead of GPT-4?
Yes, but GPT-4 produces better results. To use GPT-3.5, modify `app/api/generate/route.ts`:
```typescript
model: "gpt-3.5-turbo"
```

### How do I change the AI's creativity level?
Modify the `temperature` value in `app/api/generate/route.ts`:
- Lower (0.5): More focused and deterministic
- Current (0.7): Balanced
- Higher (0.9): More creative and varied

---

## Deployment Questions

### How do I deploy to Vercel?
1. Push your code to GitHub
2. Go to vercel.com and import your repository
3. Add `OPENAI_API_KEY` environment variable
4. Click Deploy

See `DEPLOYMENT.md` for detailed instructions.

### Can I deploy to other platforms?
Yes! The application can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Render**
- Any platform that supports Next.js

### How much does hosting cost?
- **Vercel Hobby Plan:** FREE (sufficient for most use cases)
- **OpenAI API:** ~$0.01-0.03 per resume
- **Custom Domain:** ~$10-15/year (optional)

### Can I use a custom domain?
Yes! After deploying to Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your DNS records as instructed

---

## Usage Questions

### What information do I need to provide?
- Personal details (name, email, phone, LinkedIn, portfolio)
- Education (degree, college, year, grades)
- Work experience (company, role, duration, responsibilities)
- Projects (title, description, technologies)
- Job target (desired position, skills)

### How long does it take to generate a resume?
Typically 5-10 seconds, depending on:
- OpenAI API response time
- Your internet connection
- Amount of information provided

### Can I generate multiple resumes?
Yes! You can generate as many resumes as you need. Each generation is independent.

### Can I save my resume?
Currently, the application doesn't save resumes. Use the "Copy to Clipboard" button to save the generated content to your preferred document editor.

### What format is the generated resume?
The resume is generated as formatted text. You can copy it and paste it into:
- Microsoft Word
- Google Docs
- Any text editor

---

## Troubleshooting

### The site won't load
**Possible causes:**
- Development server not running → Run `npm run dev`
- Port 3000 in use → Use different port: `npm run dev -- -p 3001`
- Build errors → Check console for errors

### "API Key not found" error
**Solution:**
1. Create `.env.local` file in root directory
2. Add: `OPENAI_API_KEY=your-key-here`
3. Restart development server

### "Failed to generate summary" error
**Possible causes:**
1. **Invalid API key** → Verify key at https://platform.openai.com/api-keys
2. **No credits** → Add credits to your OpenAI account
3. **Rate limit** → Wait a moment and try again
4. **Network issue** → Check your internet connection

### Animations are laggy
**Solutions:**
- Close other browser tabs
- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Check CPU usage
- Reduce animations by modifying `framer-motion` properties

### Build fails with TypeScript errors
**Solution:**
```bash
# Check for errors
npx tsc --noEmit

# Fix reported errors, then rebuild
npm run build
```

### Styles not applying correctly
**Solution:**
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## Customization

### Can I change the colors?
Yes! Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

### Can I add more fields to the form?
Yes! Edit `app/builder/page.tsx` and add new state variables and input fields.

### Can I change the AI prompt?
Yes! Edit the prompt in `app/api/generate/route.ts` to customize the output format or focus.

### Can I add different resume templates?
Yes! You would need to:
1. Create multiple prompt variations
2. Add a template selector in the UI
3. Pass the selected template to the API

---

## Performance

### How can I make it faster?
1. Use Edge Functions (already configured)
2. Enable Vercel's global CDN (automatic)
3. Optimize images (if you add any)
4. Use `next/image` for images
5. Implement caching strategies

### What's the API response time?
- **Average:** 3-5 seconds
- **Edge Function overhead:** <100ms
- **OpenAI API call:** 2-8 seconds

### How many concurrent users can it handle?
- **Vercel Hobby:** Thousands of concurrent users
- **OpenAI API:** Depends on your rate limits
- **Edge Functions:** Automatically scale globally

---

## Security & Privacy

### Is my data stored anywhere?
No. All data is processed in real-time and not stored in any database.

### Is my data sent to OpenAI?
Yes, your resume information is sent to OpenAI's API to generate the summary. Review OpenAI's privacy policy: https://openai.com/privacy

### Can I see what data is being sent?
Yes! Check the Network tab in your browser's Developer Tools to see the exact data being sent to the API.

### How can I add rate limiting?
Consider implementing:
1. Vercel's built-in rate limiting
2. Custom middleware for rate limiting
3. CAPTCHA for bot protection

---

## Cost & Billing

### How much does OpenAI charge?
**GPT-4o (October 2025 pricing):**
- Input: ~$2.50 per 1M tokens
- Output: ~$10.00 per 1M tokens
- **Per resume:** ~$0.01-0.03

### How can I track my OpenAI usage?
1. Go to https://platform.openai.com/usage
2. View your API usage and costs
3. Set up billing alerts

### Can I set spending limits?
Yes! In your OpenAI account:
1. Go to Settings → Limits
2. Set monthly spending limits
3. Set up email notifications

---

## Contribution & Support

### Can I contribute to this project?
Yes! Contributions are welcome. See `CONTRIBUTING.md` for guidelines.

### How do I report bugs?
Create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### Can I request features?
Yes! Open a GitHub issue with the "feature request" label.

### How do I get help?
1. Check this FAQ
2. Read the documentation (README.md, DEPLOYMENT.md)
3. Search existing GitHub issues
4. Open a new issue if needed

---

## Advanced Usage

### Can I use this in a corporate environment?
Yes, but consider:
- Data privacy policies
- API key security
- Rate limiting for multiple users
- Custom branding

### Can I white-label this application?
Yes! The MIT license allows commercial use and modification. Update branding in:
- `app/page.tsx` (landing page)
- `app/layout.tsx` (metadata)
- Color scheme in `tailwind.config.ts`

### Can I add user authentication?
Yes! Consider using:
- **NextAuth.js** for authentication
- **Database** to store user resumes
- **Payment integration** for monetization

### Can I add PDF export?
Yes! Consider using:
- **react-pdf** or **jsPDF** for PDF generation
- Add a "Download PDF" button
- Format the resume content for PDF layout

---

## Best Practices

### What makes a good resume input?
- Be specific and detailed
- Use action verbs
- Include quantifiable achievements
- Mention relevant technologies
- Align with target job role

### How can I get the best AI output?
1. Provide complete information
2. Be specific about your target role
3. Include relevant keywords
4. List all important skills
5. Describe projects in detail

### Should I edit the AI-generated resume?
Yes! Always review and customize:
- Check for accuracy
- Add personal touches
- Adjust for specific job applications
- Fix any generic content

---

## Upcoming Features

### What features are planned?
- [ ] PDF export
- [ ] Multiple resume templates
- [ ] User accounts (save resumes)
- [ ] Resume editing interface
- [ ] Job description analyzer
- [ ] LinkedIn import
- [ ] Cover letter generator

### Can I suggest new features?
Absolutely! Open a GitHub issue with your suggestion.

---

## Contact & Support

### Where can I get help?
- **Documentation:** README.md
- **Quick Start:** QUICKSTART.md
- **Deployment:** DEPLOYMENT.md
- **GitHub Issues:** For bug reports and questions

### How can I stay updated?
- Star the GitHub repository
- Watch for new releases
- Follow the project on GitHub

---

**Still have questions? Open an issue on GitHub!** 🚀
