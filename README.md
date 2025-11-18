# AI Resume Builder

A fully functional **AI-powered Resume Builder** optimized for **90+ ATS score resumes**. Built with Next.js, React, Tailwind CSS, Framer Motion, and OpenAI GPT-4.

## ✨ Features

- 🎨 **Beautiful UI/UX** with glass-morphism and smooth animations
- 🤖 **AI-Powered** resume generation using OpenAI GPT-4
- 📱 **Fully Responsive** design for all devices
- 🎯 **90+ ATS Score** optimization
- 🚀 **Ready for Vercel** deployment
- 🔒 **No Login Required** - Simple and direct experience
- 📋 **Multi-Section Form** with dynamic add/remove functionality
- 📝 **Professional Templates** optimized for job applications

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** OpenAI GPT-4
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Add your OpenAI API key to `.env.local`:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Get your API key from: https://platform.openai.com/api-keys

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Vercel

### Method 1: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your API key

### Method 2: Deploy with Vercel Dashboard

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variable: `OPENAI_API_KEY`
   - Click "Deploy"

## 📄 Project Structure

```
ai-resume-builder/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # OpenAI API endpoint
│   ├── builder/
│   │   └── page.tsx              # Resume builder page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 Usage

1. **Landing Page:**
   - Click "Start Building Resume" to navigate to the builder

2. **Resume Builder:**
   - Fill in your personal details
   - Add education, experience, and projects
   - Specify your target job role and skills
   - Click "Generate AI Resume Summary"
   - Copy the generated resume to clipboard

3. **Features:**
   - Add multiple education entries
   - Add multiple work experiences
   - Add multiple projects
   - Collapsible sections for better organization
   - Real-time AI generation with loading animation
   - Copy to clipboard functionality

## 🔧 Configuration

### OpenAI Settings

The API uses GPT-4 with the following configuration:
- **Model:** gpt-4o
- **Temperature:** 0.7 (balanced creativity and accuracy)
- **Max Tokens:** 2000

You can modify these settings in `app/api/generate/route.ts`.

### Styling

Customize the design in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles and custom CSS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for hosting
- Next.js team for the amazing framework
- Framer Motion for animations
- Lucide for beautiful icons

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using Next.js and AI**
