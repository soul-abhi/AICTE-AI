import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoaderScreen } from './components/LoaderScreen';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { useAuth } from './auth/AuthProvider';

const HomePage = lazy(() => import('./pages/HomePage'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage'));
const AIResumeBuilderPage = lazy(() => import('./pages/AIResumeBuilderPage'));
const PortfolioBuilderPage = lazy(() => import('./pages/PortfolioBuilderPage'));
const ATSCheckerPage = lazy(() => import('./pages/ATSCheckerPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SharePortfolioPage = lazy(() => import('./pages/SharePortfolioPage'));

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Suspense fallback={<LoaderScreen text="Loading..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumeBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-resume"
            element={
              <ProtectedRoute>
                <AIResumeBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioBuilderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ats"
            element={
              <ProtectedRoute>
                <ATSCheckerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route path="/share/:slug" element={<SharePortfolioPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
