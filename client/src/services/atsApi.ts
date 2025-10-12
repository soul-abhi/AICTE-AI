import { http } from './http';

type ATSResponse = {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  tips: string[];
};

export const atsApi = {
  evaluate: (payload: { resumeText: string; jobDescription: string; keywords: string[] }) =>
    http
      .post<ATSResponse>('/ats/score', payload)
      .then((res: { data: ATSResponse }) => res.data)
};
