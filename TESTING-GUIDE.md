# 🧪 Testing Guide for AI Resume Builder

## Table of Contents
1. [Pre-Testing Setup](#pre-testing-setup)
2. [Local Testing](#local-testing)
3. [Feature Testing](#feature-testing)
4. [API Testing](#api-testing)
5. [Deployment Testing](#deployment-testing)
6. [Performance Testing](#performance-testing)
7. [Browser Compatibility](#browser-compatibility)
8. [Mobile Testing](#mobile-testing)

---

## Pre-Testing Setup

### ✅ Prerequisites
Before testing, ensure:
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with valid `OPENAI_API_KEY`
- [ ] OpenAI account has credits
- [ ] Internet connection active

### Create Test Environment File
```bash
# Copy example and add your API key
cp .env.example .env.local

# Add your OpenAI API key
# OPENAI_API_KEY=sk-your-actual-key-here
```

---

## Local Testing

### 1. Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
✓ Ready in 2.5s
○ Compiling / ...
✓ Compiled / in 1.2s
```

### 2. Verify Server Running
- Open http://localhost:3000
- Page should load without errors
- Check browser console (F12) for errors

### 3. Build Test
```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

**If build fails:**
- Check console for TypeScript errors
- Run `npx tsc --noEmit` to see type errors
- Fix errors and rebuild

---

## Feature Testing

### Landing Page (`/`)

#### ✅ Visual Elements
- [ ] Hero section loads
- [ ] "AI Resume Builder" logo visible
- [ ] Gradient background displays
- [ ] Animated blobs moving smoothly
- [ ] "Start Building Resume" button visible
- [ ] Feature cards display (3 cards)
- [ ] All icons render correctly

#### ✅ Animations
- [ ] Blobs animate smoothly (no lag)
- [ ] Text fades in on load
- [ ] Hover effects work on buttons
- [ ] Button scales on hover
- [ ] Transitions are smooth (60fps)

#### ✅ Interactions
- [ ] Clicking "Start Building Resume" navigates to `/builder`
- [ ] Navigation is instant
- [ ] No console errors

**Test Steps:**
1. Refresh page
2. Observe animations
3. Hover over button
4. Click button
5. Verify navigation

---

### Resume Builder Page (`/builder`)

#### ✅ Layout & Navigation
- [ ] "Back to Home" button works
- [ ] Page header displays
- [ ] All sections visible
- [ ] Scroll works smoothly

#### ✅ Personal Details Section
- [ ] Section can be collapsed/expanded
- [ ] All 5 input fields present:
  - Name
  - Email
  - Phone
  - LinkedIn
  - Portfolio
- [ ] Placeholders show correctly
- [ ] Can type in all fields
- [ ] Text persists when typing

**Test Data:**
```
Name: John Doe
Email: john.doe@example.com
Phone: +1 (555) 123-4567
LinkedIn: linkedin.com/in/johndoe
Portfolio: johndoe.com
```

#### ✅ Education Section
- [ ] Section can be collapsed/expanded
- [ ] Initial entry shows
- [ ] All 4 fields work:
  - Degree
  - College
  - Year
  - Percentage
- [ ] "Add More Education" button works
- [ ] Can add multiple entries
- [ ] Delete button appears on 2+ entries
- [ ] Can delete entries (except last one)
- [ ] Delete button hidden on single entry

**Test Steps:**
1. Fill first education entry
2. Click "Add More Education"
3. Fill second entry
4. Verify delete button appears
5. Click delete on second entry
6. Verify entry removed

**Test Data:**
```
Entry 1:
Degree: Bachelor of Technology in Computer Science
College: MIT
Year: 2020-2024
Percentage: 8.5 CGPA

Entry 2:
Degree: High School
College: XYZ School
Year: 2018-2020
Percentage: 95%
```

#### ✅ Experience Section
- [ ] Section can be collapsed/expanded
- [ ] All fields work (Company, Role, Duration, Responsibilities)
- [ ] "Add More Experience" works
- [ ] Can add multiple entries
- [ ] Delete functionality works
- [ ] Textarea expands with content

**Test Data:**
```
Company: Google
Role: Software Engineer
Duration: Jan 2023 - Present
Responsibilities: Developed scalable microservices, Led team of 5 engineers, Improved system performance by 40%
```

#### ✅ Projects Section
- [ ] Section can be collapsed/expanded
- [ ] All fields work (Title, Description, Technologies)
- [ ] "Add More Projects" works
- [ ] Can add multiple entries
- [ ] Delete functionality works

**Test Data:**
```
Title: E-commerce Platform
Description: Built a full-stack e-commerce platform with payment integration, user authentication, and real-time inventory management
Technologies: React, Node.js, MongoDB, Stripe, AWS
```

#### ✅ Job Target Section
- [ ] Section can be collapsed/expanded
- [ ] Position field works
- [ ] Skills textarea works

**Test Data:**
```
Position: Full Stack Developer
Skills: JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes, MongoDB, PostgreSQL
```

#### ✅ Generate Button
- [ ] Button is visible
- [ ] Button has icon
- [ ] Hover effect works
- [ ] Button is clickable
- [ ] Disabled state when loading

---

### AI Generation Testing

#### ✅ Successful Generation
1. Fill all form sections with test data
2. Click "Generate AI Resume Summary"
3. Verify:
   - [ ] Button becomes disabled
   - [ ] Loading spinner appears
   - [ ] Text changes to "Generating..."
   - [ ] Loading animation shows below

4. Wait 5-10 seconds
5. Verify:
   - [ ] Summary section appears
   - [ ] AI-generated text displays
   - [ ] Text is properly formatted
   - [ ] "Copy to Clipboard" button appears
   - [ ] Success toast notification shows

#### ✅ Copy to Clipboard
1. After generation, click "Copy to Clipboard"
2. Verify:
   - [ ] Success toast shows
   - [ ] Can paste text (Ctrl+V in notepad)
   - [ ] Full content copied

#### ✅ Error Handling
Test with invalid/missing API key:

1. Remove API key from `.env.local`
2. Restart server
3. Try to generate
4. Verify:
   - [ ] Error toast appears
   - [ ] Error message is user-friendly
   - [ ] Console shows detailed error
   - [ ] Button re-enables

---

## API Testing

### Manual API Test

#### Using Browser Console
```javascript
// Open browser console (F12) on /builder page
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    personalDetails: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      linkedin: "linkedin.com/in/johndoe",
      portfolio: "johndoe.com"
    },
    education: [{
      degree: "B.Tech CS",
      college: "MIT",
      year: "2020-2024",
      percentage: "8.5 CGPA"
    }],
    experiences: [{
      company: "Google",
      role: "SWE",
      duration: "2023-Present",
      responsibilities: "Developed features"
    }],
    projects: [{
      title: "E-commerce",
      description: "Built platform",
      technologies: "React, Node.js"
    }],
    jobTarget: {
      position: "Full Stack Dev",
      skills: "JS, React, Node"
    }
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

#### Expected Response
```json
{
  "summary": "PROFESSIONAL SUMMARY\n\nHighly motivated..."
}
```

#### Error Responses to Test
1. **Missing API Key:**
   ```json
   {
     "error": "Failed to generate resume summary",
     "details": "API key not found"
   }
   ```

2. **Invalid Data:**
   ```json
   {
     "error": "Failed to generate resume summary"
   }
   ```

---

## Deployment Testing

### Pre-Deployment
- [ ] Local build succeeds
- [ ] All features work locally
- [ ] No console errors
- [ ] Environment variables documented

### Vercel Preview Deployment
1. Push to GitHub (non-main branch)
2. Vercel creates preview deployment
3. Visit preview URL
4. Test all features on preview:
   - [ ] Landing page loads
   - [ ] Builder page loads
   - [ ] Can fill form
   - [ ] AI generation works
   - [ ] Copy to clipboard works
   - [ ] No errors in Vercel logs

### Production Deployment
1. Merge to main branch
2. Vercel deploys to production
3. Test on production URL:
   - [ ] All pages load
   - [ ] DNS resolves correctly
   - [ ] HTTPS works
   - [ ] AI generation works
   - [ ] No performance issues

### Post-Deployment Checks
- [ ] Check Vercel logs for errors
- [ ] Test from different devices
- [ ] Test from different locations
- [ ] Monitor OpenAI API usage
- [ ] Check page load times

---

## Performance Testing

### Page Load Times
**Target:** < 3 seconds on 3G

Test with Chrome DevTools:
1. Open DevTools (F12)
2. Network tab → Throttling → Slow 3G
3. Reload page
4. Check metrics:
   - [ ] First Contentful Paint < 1.5s
   - [ ] Time to Interactive < 3s
   - [ ] Largest Contentful Paint < 2.5s

### Lighthouse Audit
```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Memory Leaks
1. Open DevTools → Performance tab
2. Start recording
3. Interact with app (open/close sections, navigate)
4. Stop recording
5. Check:
   - [ ] No continuous memory growth
   - [ ] Event listeners cleaned up
   - [ ] No memory spikes

---

## Browser Compatibility

### Desktop Browsers
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Check:**
- [ ] Layout correct
- [ ] Animations smooth
- [ ] All features work
- [ ] No console errors

### Known Issues
- **Safari:** May need -webkit- prefixes for some CSS
- **Firefox:** Scrollbar styles may differ
- **Edge:** Should work identical to Chrome

---

## Mobile Testing

### Responsive Design
Test at breakpoints:
- [ ] **Mobile:** 375px width
- [ ] **Tablet:** 768px width
- [ ] **Desktop:** 1920px width

### Mobile Browsers
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Samsung Internet

### Mobile-Specific Checks
- [ ] Text is readable (no zoom needed)
- [ ] Buttons are tappable (44px minimum)
- [ ] Form inputs focus correctly
- [ ] Keyboard doesn't break layout
- [ ] Animations perform well
- [ ] No horizontal scroll
- [ ] Copy to clipboard works

### Touch Interactions
- [ ] Tap animations work
- [ ] Scroll is smooth
- [ ] No accidental taps
- [ ] Pinch to zoom works (if enabled)

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through all inputs
- [ ] Focus indicators visible
- [ ] Can submit form with Enter
- [ ] Can close sections with keyboard

### Screen Reader Testing
Test with:
- **Windows:** NVDA
- **Mac:** VoiceOver
- **Linux:** Orca

**Check:**
- [ ] All buttons announced
- [ ] Form labels read correctly
- [ ] Error messages announced
- [ ] Success messages announced

### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Buttons meet contrast requirements
- [ ] Disabled states distinguishable

---

## Security Testing

### Environment Variables
- [ ] API key not in source code
- [ ] `.env.local` in `.gitignore`
- [ ] No keys in browser console
- [ ] No keys in network requests (check DevTools)

### Input Validation
- [ ] XSS protection (React escapes by default)
- [ ] No SQL injection risk (no database)
- [ ] API errors don't expose internals

### HTTPS
- [ ] Vercel forces HTTPS ✅
- [ ] No mixed content warnings
- [ ] SSL certificate valid

---

## Load Testing (Optional)

### Simulated Load
Using Apache Bench or similar:

```bash
# Test API endpoint (requires running server)
ab -n 100 -c 10 -p request.json -T application/json http://localhost:3000/api/generate
```

**Check:**
- Average response time
- Failed requests (should be 0)
- Requests per second

### OpenAI Rate Limits
- Monitor API usage
- Check rate limit errors
- Implement retry logic if needed

---

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests
- Cypress for integration tests

---

## Testing Checklist Summary

### Must Test Before Launch
- [x] Landing page loads ✅
- [ ] Builder page functional
- [ ] Form accepts input
- [ ] AI generation works
- [ ] API endpoint responds
- [ ] Copy to clipboard works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Build succeeds
- [ ] Deployment succeeds

### Should Test
- [ ] Performance metrics
- [ ] Browser compatibility
- [ ] Accessibility
- [ ] Mobile devices
- [ ] Error scenarios

### Nice to Test
- [ ] Load testing
- [ ] Security audit
- [ ] Lighthouse scores
- [ ] Different screen sizes

---

## Bug Reporting Template

When you find a bug:

```markdown
**Bug Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Device: [e.g., Desktop, iPhone 13]

**Console Errors:**
[Copy any console errors]
```

---

## Test Results Log Template

```markdown
# Test Results - [Date]

## Environment
- Tested By: [Name]
- Date: [YYYY-MM-DD]
- Environment: [Local/Preview/Production]
- URL: [Testing URL]

## Results
| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | ✅ | All animations working |
| Builder Form | ✅ | All sections functional |
| AI Generation | ✅ | Generated in 7s |
| Copy Feature | ✅ | Works correctly |

## Issues Found
1. [Issue description]
2. [Issue description]

## Performance
- Page Load: 2.1s
- API Response: 6.8s
- Lighthouse Score: 94

## Recommendations
- [Suggestion 1]
- [Suggestion 2]
```

---

## Quick Test Script

**5-Minute Smoke Test:**
1. ✅ Open landing page
2. ✅ Click "Start Building"
3. ✅ Fill one field in each section
4. ✅ Click "Generate"
5. ✅ Wait for result
6. ✅ Click "Copy"
7. ✅ Check console for errors

**Pass Criteria:** All steps complete without errors

---

**Happy Testing! 🧪**

**Remember:** Better to find bugs in testing than in production! 🐛
