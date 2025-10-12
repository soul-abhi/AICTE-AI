import axios from 'axios';
import { http } from './http';

export type PortfolioPayload = {
  theme: string;
  about: string;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link: string;
    tech: string[];
  }>;
  contact: {
    email: string;
    phone: string;
    socials: Array<{ platform: string; url: string }>;
  };
  shareSlug: string;
};

export const portfolioApi = {
  get: () =>
    http
      .get<PortfolioPayload>('/portfolios')
      .then((res: { data: PortfolioPayload }) => res.data)
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null;
        }
        throw error;
      }),
  upsert: (payload: PortfolioPayload) =>
    http.post<PortfolioPayload>('/portfolios', payload).then((res: { data: PortfolioPayload }) => res.data),
  getPublic: (slug: string) =>
    http.get<PortfolioPayload>(`/portfolios/public/${slug}`).then((res: { data: PortfolioPayload }) => res.data)
};
