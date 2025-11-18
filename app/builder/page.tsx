"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Target,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Sparkles,
  Copy,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

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

export default function Builder() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
  });

  const [education, setEducation] = useState<Education[]>([
    { degree: "", college: "", year: "", percentage: "" },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    { company: "", role: "", duration: "", responsibilities: "" },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "", technologies: "" },
  ]);

  const [jobTarget, setJobTarget] = useState<JobTarget>({
    position: "",
    skills: "",
  });

  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [openSections, setOpenSections] = useState({
    personal: true,
    education: true,
    experience: true,
    projects: true,
    jobTarget: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", college: "", year: "", percentage: "" }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", role: "", duration: "", responsibilities: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", technologies: "" }]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const generateSummary = async () => {
    setIsGenerating(true);
    setGeneratedSummary("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalDetails,
          education,
          experiences,
          projects,
          jobTarget,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setGeneratedSummary(data.summary);
      toast.success("Resume summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSummary);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/">
            <button className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
          </div>
        </motion.div>

        {/* Personal Details Section */}
        <Section
          title="Personal Details"
          icon={<User />}
          isOpen={openSections.personal}
          onToggle={() => toggleSection("personal")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={personalDetails.name}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, name: e.target.value })
              }
              placeholder="John Doe"
            />
            <Input
              label="Email"
              type="email"
              value={personalDetails.email}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, email: e.target.value })
              }
              placeholder="john@example.com"
            />
            <Input
              label="Phone"
              value={personalDetails.phone}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, phone: e.target.value })
              }
              placeholder="+1 234 567 8900"
            />
            <Input
              label="LinkedIn Profile"
              value={personalDetails.linkedin}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, linkedin: e.target.value })
              }
              placeholder="linkedin.com/in/johndoe"
            />
            <Input
              label="Portfolio/Website"
              value={personalDetails.portfolio}
              onChange={(e) =>
                setPersonalDetails({ ...personalDetails, portfolio: e.target.value })
              }
              placeholder="johndoe.com"
              fullWidth
            />
          </div>
        </Section>

        {/* Education Section */}
        <Section
          title="Education"
          icon={<GraduationCap />}
          isOpen={openSections.education}
          onToggle={() => toggleSection("education")}
        >
          {education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 bg-white/50 rounded-lg relative">
              {education.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].degree = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="B.Tech in Computer Science"
                />
                <Input
                  label="College/University"
                  value={edu.college}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].college = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="XYZ University"
                />
                <Input
                  label="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].year = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="2020-2024"
                />
                <Input
                  label="Percentage/CGPA"
                  value={edu.percentage}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].percentage = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="8.5 CGPA"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addEducation}
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add More Education
          </button>
        </Section>

        {/* Experience Section */}
        <Section
          title="Experience"
          icon={<Briefcase />}
          isOpen={openSections.experience}
          onToggle={() => toggleSection("experience")}
        >
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 p-4 bg-white/50 rounded-lg relative">
              {experiences.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].company = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  placeholder="Tech Corp"
                />
                <Input
                  label="Role"
                  value={exp.role}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].role = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  placeholder="Software Engineer"
                />
                <Input
                  label="Duration"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].duration = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  placeholder="Jan 2022 - Present"
                />
                <TextArea
                  label="Responsibilities"
                  value={exp.responsibilities}
                  onChange={(e) => {
                    const newExperiences = [...experiences];
                    newExperiences[index].responsibilities = e.target.value;
                    setExperiences(newExperiences);
                  }}
                  placeholder="Developed web applications, led team projects..."
                  fullWidth
                />
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add More Experience
          </button>
        </Section>

        {/* Projects Section */}
        <Section
          title="Projects"
          icon={<FolderGit2 />}
          isOpen={openSections.projects}
          onToggle={() => toggleSection("projects")}
        >
          {projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 bg-white/50 rounded-lg relative">
              {projects.length > 1 && (
                <button
                  onClick={() => removeProject(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].title = e.target.value;
                    setProjects(newProjects);
                  }}
                  placeholder="E-commerce Platform"
                />
                <TextArea
                  label="Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].description = e.target.value;
                    setProjects(newProjects);
                  }}
                  placeholder="Built a full-stack e-commerce platform with payment integration..."
                />
                <Input
                  label="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].technologies = e.target.value;
                    setProjects(newProjects);
                  }}
                  placeholder="React, Node.js, MongoDB, Stripe"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addProject}
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add More Projects
          </button>
        </Section>

        {/* Job Target Section */}
        <Section
          title="Job Role Target"
          icon={<Target />}
          isOpen={openSections.jobTarget}
          onToggle={() => toggleSection("jobTarget")}
        >
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Desired Position"
              value={jobTarget.position}
              onChange={(e) =>
                setJobTarget({ ...jobTarget, position: e.target.value })
              }
              placeholder="Full Stack Developer"
            />
            <TextArea
              label="Key Skills"
              value={jobTarget.skills}
              onChange={(e) =>
                setJobTarget({ ...jobTarget, skills: e.target.value })
              }
              placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
            />
          </div>
        </Section>

        {/* Generate Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-2" />
                Generate AI Resume Summary
              </>
            )}
          </button>
        </motion.div>

        {/* Generated Summary Section */}
        <AnimatePresence>
          {(isGenerating || generatedSummary) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 glass-dark p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                  AI Generated Summary
                </h2>
                {generatedSummary && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </button>
                )}
              </div>

              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 animate-pulse">
                      AI is crafting your perfect resume summary...
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-lg max-w-none"
                >
                  <div className="bg-white p-6 rounded-lg shadow-inner">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800">
                      {generatedSummary}
                    </pre>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reusable Components

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Section({ title, icon, isOpen, onToggle, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 glass-dark rounded-2xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-indigo-600">{icon}</div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  fullWidth,
}: InputProps) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  fullWidth,
}: TextAreaProps) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
      />
    </div>
  );
}
