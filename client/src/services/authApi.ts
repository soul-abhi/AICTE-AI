import axios from 'axios';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const STORAGE_KEY = 'ai-resume-auth';

const client = axios.create({
  baseURL: '/api/auth'
});

const save = (data: AuthResponse) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getStored = (): AuthResponse | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const authApi = {
  async login(email: string, password: string) {
    const { data } = await client.post<AuthResponse>('/login', { email, password });
    save(data);
    return data;
  },
  async register(name: string, email: string, password: string) {
    const { data } = await client.post<AuthResponse>('/register', { name, email, password });
    save(data);
    return data;
  },
  getToken() {
    return getStored()?.token ?? null;
  }
};
