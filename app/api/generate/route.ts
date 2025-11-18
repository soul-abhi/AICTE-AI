import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

interface Education {
  degree: string;
  college: string;
  year: string;
  percentage: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string;
}

interface JobTarget {
  position: string;
  skills: string;
}

interface RequestBody {
  personalDetails: PersonalDetails;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  jobTarget: JobTarget;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { personalDetails, education, experiences, projects, jobTarget } = body;

    // Construct the prompt for OpenAI
    const prompt = `You are a professional resume writer and career consultant. Generate a highly optimized, ATS-friendly (Applicant Tracking System) resume summary that will achieve a 90+ ATS score. The summary should be professional, impactful, and tailored for the target position.

**Personal Details:**
- Name: ${personalDetails.name}
- Email: ${personalDetails.email}
- Phone: ${personalDetails.phone}
- LinkedIn: ${personalDetails.linkedin}
- Portfolio: ${personalDetails.portfolio}

**Education:**
${education.map((edu, i) => `${i + 1}. ${edu.degree} from ${edu.college} (${edu.year}) - ${edu.percentage}`).join('\n')}

**Professional Experience:**
${experiences.map((exp, i) => `${i + 1}. ${exp.role} at ${exp.company} (${exp.duration})
   Responsibilities: ${exp.responsibilities}`).join('\n\n')}

**Projects:**
${projects.map((proj, i) => `${i + 1}. ${proj.title}
   Description: ${proj.description}
   Technologies: ${proj.technologies}`).join('\n\n')}

**Job Target:**
- Desired Position: ${jobTarget.position}
- Key Skills: ${jobTarget.skills}

**Instructions:**
1. Create a comprehensive, ATS-optimized resume including ALL sections: Professional Summary, Skills, Education, Experience, and Projects.
2. Use action verbs and quantifiable achievements.
3. Incorporate relevant keywords from the job target naturally.
4. Format with clear section headers and bullet points.
5. Ensure the language is professional and impactful.
6. Optimize for ATS scanning while remaining human-readable.
7. Include a compelling professional summary (3-4 lines) at the top.
8. Make sure all provided information is included and well-structured.

Generate the complete resume now:`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer specializing in creating ATS-optimized resumes that score 90+ on applicant tracking systems. You write professional, keyword-rich, and impactful resume content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const summary = completion.choices[0]?.message?.content || "Failed to generate summary.";

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating resume:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate resume summary", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
