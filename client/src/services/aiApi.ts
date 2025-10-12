import { http } from './http';

export const aiApi = {
  generate: (prompt: string, maxTokens = 200) =>
    http
      .post<{ text: string }>('/ai/generate', { prompt, maxTokens })
      .then((res: { data: { text: string } }) => res.data.text)
};
