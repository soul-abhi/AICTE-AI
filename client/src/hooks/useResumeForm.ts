import { useState } from 'react';
import { ResumePayload } from '../services/resumeApi';

const defaultResume: ResumePayload = {
  title: 'AI-Optimized Resume',
  template: 'modern',
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: ''
  },
  summary: '',
  skills: [],
  experiences: [],
  education: [],
  projects: [],
  coverLetter: ''
};

export const useResumeForm = () => {
  const [resume, setResume] = useState<ResumePayload>(defaultResume);

  const updateResume = <K extends keyof ResumePayload>(key: K, value: ResumePayload[K]) => {
    setResume((prev: ResumePayload) => ({ ...prev, [key]: value }));
  };

  return { resume, updateResume, setResume };
};
