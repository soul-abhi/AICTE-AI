import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioApi } from '../services/portfolioApi';
import { LoaderScreen } from '../components/LoaderScreen';

export default function SharePortfolioPage() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    portfolioApi
      .getPublic(slug)
      .then((data) => setPortfolio(data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <LoaderScreen text="Loading portfolio..." />;
  }

  if (!portfolio) {
    return <p>Portfolio not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 rounded-3xl bg-white/90 p-10 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900/90 dark:ring-slate-800">
      <header>
        <h1 className="text-4xl font-bold">{portfolio.owner?.name || 'Student Portfolio'}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{portfolio.about}</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {portfolio.skills.map((skill: string) => (
            <span key={skill} className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-4 space-y-4">
          {portfolio.projects.map((project: any) => (
            <div key={project.name} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-brand-600 hover:underline"
                >
                  View project
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{portfolio.contact.email}</p>
        <p className="text-slate-600 dark:text-slate-300">{portfolio.contact.phone}</p>
      </section>
    </div>
  );
}
