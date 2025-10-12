import axios from 'axios';
import { http } from './http';

export type ResumePayload = {
  title: string;
  template: string;
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  skills: string[];
  experiences: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    link: string;
    tech: string[];
  }>;
  coverLetter?: string;
};

export const resumeApi = {
  get: () =>
    http
      .get<ResumePayload>('/resumes')
      .then((res: { data: ResumePayload }) => res.data)
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null;
        }
        throw error;
      }),
  upsert: (payload: ResumePayload) =>
    http
      .post<ResumePayload>('/resumes', payload)
      .then((res: { data: ResumePayload }) => res.data),
  download: () =>
    http
      .get<Blob>('/resumes/download', { responseType: 'blob' })
      .then((res: { data: Blob }) => res.data)
};
