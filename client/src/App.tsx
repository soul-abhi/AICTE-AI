import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoaderScreen } from './components/LoaderScreen';
// Authentication removed: ProtectedRoute and useAuth imports deleted

const HomePage = lazy(() => import('./pages/HomePage'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage'));
const AIResumeBuilderPage = lazy(() => import('./pages/AIResumeBuilderPage'));
const PortfolioBuilderPage = lazy(() => import('./pages/PortfolioBuilderPage'));
const ATSCheckerPage = lazy(() => import('./pages/ATSCheckerPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SharePortfolioPage = lazy(() => import('./pages/SharePortfolioPage'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<LoaderScreen text="Loading..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumeBuilderPage />} />
          <Route path="/ai-resume" element={<AIResumeBuilderPage />} />
          <Route path="/portfolio" element={<PortfolioBuilderPage />} />
          <Route path="/ats" element={<ATSCheckerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/share/:slug" element={<SharePortfolioPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
