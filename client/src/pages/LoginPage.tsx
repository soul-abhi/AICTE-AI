import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800">
      <h2 className="text-2xl font-semibold">Login removed</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Authentication has been disabled. You can continue using the app without signing in.
      </p>
      <div className="mt-6">
        <Link to="/" className="rounded-full bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
