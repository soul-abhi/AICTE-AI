import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Book, Briefcase, Code, Award, FileText, Download, Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';
import { aiApi } from '../services/aiApi';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  grade: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
  link: string;
}

export default function AIResumeBuilderPage() {
  const [personal, setPersonal] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: ''
  });

  const [education, setEducation] = useState<Education[]>([
    { id: '1', institution: '', degree: '', year: '', grade: '' }
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    { id: '1', company: '', role: '', duration: '', description: '' }
  ]);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: '', techStack: '', description: '', link: '' }
  ]);

  const [achievements, setAchievements] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingSkills, setGeneratingSkills] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [generatingProjId, setGeneratingProjId] = useState<string | null>(null);

  const skillSuggestions = [
    'Java', 'React', 'Node.js', 'Python', 'C++', 'Git', 'Machine Learning',
    'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS',
    'Azure', 'Spring Boot', 'Express.js', 'Next.js', 'TailwindCSS'
  ];

  const handleSkillAdd = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now().toString(), institution: '', degree: '', year: '', grade: '' }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addExperience = () => {
    setExperience([...experience, { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(e => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), title: '', techStack: '', description: '', link: '' }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const generateAISummary = async () => {
    if (!personal.fullName) {
      alert('Please enter your name first');
      return;
    }
    
    console.log('🚀 Starting AI summary generation...');
    setIsGenerating(true);
    
    try {
      const experienceContext = experience
        .filter(e => e.role && e.company)
        .map(e => `${e.role} at ${e.company}`)
        .join(', ');
      
      const skillsContext = skills.length > 0 ? skills.join(', ') : 'various technical skills';
      
      const educationContext = education
        .filter(e => e.degree && e.institution)
        .map(e => `${e.degree} from ${e.institution}`)
        .join(', ');

      const prompt = `Write a professional summary for ${personal.fullName}'s resume. Make it sound natural and authentic, not like a template.

Background:
- Experience: ${experienceContext || 'Entry-level professional'}
- Skills: ${skillsContext}
- Education: ${educationContext || 'Relevant educational background'}

Guidelines:
- 3-4 sentences, around 60-80 words
- Write in first person or third person (whichever sounds more natural)
- Use conversational but professional tone
- Mention specific skills and experience naturally
- Include what they're good at and what they value
- Avoid buzzwords like "results-driven", "passionate", "leverage"
- Make it unique - avoid generic phrases
- Sound like a real person wrote it, not AI

Just write the summary:`;

      console.log('📝 Calling AI API with prompt...');
      const text = await aiApi.generate(prompt, 250);
      console.log('✅ AI response received:', text);
      setAiSummary(text.trim());
    } catch (error: any) {
      console.error('❌ Error generating summary:', error);
      console.error('Error details:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to generate summary';
      alert(`Error: ${errorMsg}`);
      setAiSummary('Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
      console.log('🏁 Generation complete');
    }
  };

  const generateAISkills = async () => {
    if (!personal.fullName) {
      alert('Please enter your name first');
      return;
    }
    setGeneratingSkills(true);
    try {
      const experienceContext = experience
        .filter(e => e.role)
        .map(e => e.role)
        .join(', ');
      
      const projectContext = projects
        .filter(p => p.techStack)
        .map(p => p.techStack)
        .join(', ');

      const prompt = `Based on this profile, suggest relevant technical skills:

Profile:
- Roles: ${experienceContext || 'Software Developer'}
- Technologies: ${projectContext || 'Modern web development'}

List 12-15 specific technical skills and tools that would be relevant. Include programming languages, frameworks, databases, tools, and 2-3 soft skills.

Just list the skills separated by commas, nothing else:`;

      const text = await aiApi.generate(prompt, 200);
      
      // Enhanced parsing to handle various formats
      const generatedSkills = text
        .replace(/^\d+[\.\)]\s*/gm, '') // Remove numbering
        .replace(/[•\-\*]/g, ',') // Replace bullets with commas
        .split(/[,\n]/) // Split by comma or newline
        .map(s => s.trim())
        .map(s => s.replace(/^["']|["']$/g, '')) // Remove quotes
        .filter(s => s && s.length > 1 && s.length < 30)
        .filter(s => !s.toLowerCase().includes('skill'))
        .slice(0, 15); // Limit to 15 skills
      
      if (generatedSkills.length > 0) {
        setSkills([...new Set([...skills, ...generatedSkills])]);
      }
    } catch (error) {
      console.error('Error generating skills:', error);
      alert('Failed to generate skills. Please try again.');
    } finally {
      setGeneratingSkills(false);
    }
  };

  const generateExperienceDescription = async (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp || !exp.role || !exp.company) {
      alert('Please enter role and company first');
      return;
    }
    setGeneratingExpId(id);
    try {
      const durationContext = exp.duration ? ` (${exp.duration})` : '';
      
      const prompt = `Write 3-4 bullet points describing this work experience. Make it sound natural and authentic, like the person wrote it themselves.

Position: ${exp.role}
Company: ${exp.company}${durationContext}

Write bullet points that:
- Start with varied action words (built, worked on, created, improved, helped, etc.)
- Mention what they actually did and what impact it had
- Include some numbers if relevant (users, features, improvements)
- Use natural language, not corporate buzzwords
- Sound like a real person describing their work
- Each bullet 10-20 words

Format: Start each line with • symbol

Write the bullets:`;

      const text = await aiApi.generate(prompt, 300);
      updateExperience(id, 'description', text.trim());
    } catch (error) {
      console.error('Error generating experience description:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setGeneratingExpId(null);
    }
  };

  const generateProjectDescription = async (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (!proj || !proj.title) {
      alert('Please enter project title first');
      return;
    }
    setGeneratingProjId(id);
    try {
      const techContext = proj.techStack ? ` Built with: ${proj.techStack}` : '';
      
      const prompt = `Write 3-4 bullet points describing this project. Make it sound natural, like the person is describing their own work.

Project: ${proj.title}${techContext}

Write bullets that:
- Describe what the project does and what was built
- Mention the tech stack naturally
- Include any interesting features or challenges solved
- Add numbers if relevant (users, performance, scale)
- Use conversational but professional tone
- Avoid buzzwords like "engineered", "architected", "leveraged"
- Each bullet 10-18 words

Format: Start each line with • symbol

Write the bullets:`;

      const text = await aiApi.generate(prompt, 300);
      updateProject(id, 'description', text.trim());
    } catch (error) {
      console.error('Error generating project description:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setGeneratingProjId(null);
    }
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            ✨ AI Resume Builder
          </motion.h1>
          <p className="text-gray-600 text-lg">Generate your professional resume instantly with AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={personal.email}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={personal.phone}
                  onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={personal.address}
                  onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
                  className="col-span-2 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <input
                  type="url"
                  placeholder="LinkedIn Profile"
                  value={personal.linkedin}
                  onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <input
                  type="url"
                  placeholder="GitHub Profile"
                  value={personal.github}
                  onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Book className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Education</h2>
                </div>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative"
                  >
                    {education.length > 1 && (
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="col-span-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="Degree/Program"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g., 2020-2024)"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="CGPA/Percentage"
                        value={edu.grade}
                        onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                        className="col-span-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                </div>
                <button
                  onClick={generateAISkills}
                  disabled={generatingSkills}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
                >
                  {generatingSkills ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type skill and press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd(skillInput);
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <button
                    onClick={() => handleSkillAdd(skillInput)}
                    className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition font-medium"
                  >
                    Add
                  </button>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="hover:text-purple-900"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>

                {/* Suggestions */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions
                      .filter(s => !skills.includes(s))
                      .slice(0, 8)
                      .map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSkillAdd(suggestion)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-700 transition"
                        >
                          + {suggestion}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Experience</h2>
                </div>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative"
                  >
                    {experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                      />
                      <div className="grid md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Role/Position"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., Jan 2023 - Present)"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                        />
                      </div>
                      <div className="space-y-2">
                        <textarea
                          placeholder="Description of your role and achievements"
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
                        />
                        <button
                          onClick={() => generateExperienceDescription(exp.id)}
                          disabled={generatingExpId === exp.id}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm rounded-lg hover:from-orange-600 hover:to-pink-600 transition disabled:opacity-50"
                        >
                          {generatingExpId === exp.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Generate with AI
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                </div>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative"
                  >
                    {projects.length > 1 && (
                      <button
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
                        value={proj.techStack}
                        onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      />
                      <div className="space-y-2">
                        <textarea
                          placeholder="Project description"
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none"
                        />
                        <button
                          onClick={() => generateProjectDescription(proj.id)}
                          disabled={generatingProjId === proj.id}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm rounded-lg hover:from-indigo-600 hover:to-purple-600 transition disabled:opacity-50"
                        >
                          {generatingProjId === proj.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Generate with AI
                            </>
                          )}
                        </button>
                      </div>
                      <input
                        type="url"
                        placeholder="GitHub/Live Link"
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Achievements & Certifications</h2>
              </div>
              <textarea
                placeholder="List your achievements, certifications, awards, etc."
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition resize-none"
              />
            </motion.div>

            {/* AI Summary Generator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-xl font-bold">AI-Powered Summary</h2>
              </div>
              <button
                onClick={generateAISummary}
                disabled={isGenerating}
                className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate AI Summary
                  </>
                )}
              </button>
              {aiSummary && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                >
                  <p className="text-sm leading-relaxed">{aiSummary}</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              id="resume-preview"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Resume Preview</h2>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>

              {/* Resume Content */}
              <div className="space-y-6 print:text-black" id="resume-content">
                {/* Header */}
                {personal.fullName && (
                  <div className="text-center pb-6 border-b-2 border-gray-200 print:border-black">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 print:text-3xl">{personal.fullName}</h1>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 print:text-black print:gap-2">
                      {personal.email && <span>{personal.email}</span>}
                      {personal.phone && <span>•</span>}
                      {personal.phone && <span>{personal.phone}</span>}
                      {personal.address && <span>•</span>}
                      {personal.address && <span>{personal.address}</span>}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 text-sm text-blue-600 mt-2 print:text-black print:gap-2">
                      {personal.linkedin && (
                        <span className="print:no-underline">{personal.linkedin}</span>
                      )}
                      {personal.github && personal.linkedin && <span>•</span>}
                      {personal.github && (
                        <span className="print:no-underline">{personal.github}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Summary */}
                {aiSummary && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1 print:border-black">
                      <span className="print:hidden"><Sparkles className="w-5 h-5 text-purple-600 inline-block mr-2" /></span>
                      Professional Summary
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed print:text-black">{aiSummary}</p>
                  </div>
                )}

                {/* Education */}
                {education.some(e => e.institution) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 print:border-black">
                      <span className="print:hidden"><Book className="w-5 h-5 text-green-600 inline-block mr-2" /></span>
                      Education
                    </h3>
                    <div className="space-y-3">
                      {education.filter(e => e.institution).map((edu) => (
                        <div key={edu.id} className="text-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900 print:text-black">{edu.degree}</p>
                              <p className="text-gray-700 print:text-black">{edu.institution}</p>
                            </div>
                            <p className="text-gray-600 text-right print:text-black">
                              {edu.year}
                              {edu.grade && <><br />{edu.grade}</>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 print:border-black">
                      <span className="print:hidden"><Code className="w-5 h-5 text-purple-600 inline-block mr-2" /></span>
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium print:bg-transparent print:border print:border-gray-400 print:text-black print:rounded-none"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {experience.some(e => e.company) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 print:border-black">
                      <span className="print:hidden"><Briefcase className="w-5 h-5 text-orange-600 inline-block mr-2" /></span>
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {experience.filter(e => e.company).map((exp) => (
                        <div key={exp.id} className="text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="font-semibold text-gray-900 print:text-black">{exp.role}</p>
                              <p className="text-gray-700 print:text-black">{exp.company}</p>
                            </div>
                            <p className="text-gray-600 print:text-black">{exp.duration}</p>
                          </div>
                          {exp.description && (
                            <p className="text-gray-700 mt-1 print:text-black">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.some(p => p.title) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 print:border-black">
                      <span className="print:hidden"><FileText className="w-5 h-5 text-indigo-600 inline-block mr-2" /></span>
                      Projects
                    </h3>
                    <div className="space-y-4">
                      {projects.filter(p => p.title).map((proj) => (
                        <div key={proj.id} className="text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-semibold text-gray-900 print:text-black">{proj.title}</p>
                            {proj.link && (
                              <span className="text-blue-600 text-xs print:text-black print:text-[10px]">
                                {proj.link}
                              </span>
                            )}
                          </div>
                          {proj.techStack && (
                            <p className="text-gray-600 italic mb-1 print:text-black">{proj.techStack}</p>
                          )}
                          {proj.description && (
                            <p className="text-gray-700 print:text-black">{proj.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 print:border-black">
                      <span className="print:hidden"><Award className="w-5 h-5 text-yellow-600 inline-block mr-2" /></span>
                      Achievements & Certifications
                    </h3>
                    <p className="text-gray-700 text-sm whitespace-pre-line print:text-black">{achievements}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content,
          #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:no-underline {
            text-decoration: none !important;
          }
          .print\\:text-black {
            color: black !important;
          }
          .print\\:border-black {
            border-color: black !important;
          }
          .print\\:bg-transparent {
            background-color: transparent !important;
          }
          .print\\:border {
            border: 1px solid !important;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:text-3xl {
            font-size: 1.875rem !important;
          }
          .print\\:gap-2 {
            gap: 0.5rem !important;
          }
          .print\\:text-\\[10px\\] {
            font-size: 10px !important;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}
