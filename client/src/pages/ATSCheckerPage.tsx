import { useState } from 'react';
import { motion } from 'framer-motion';
import { atsApi } from '../services/atsApi';

type ATSResult = {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  tips: string[];
};

export default function ATSCheckerPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const evaluate = async () => {
    setLoading(true);
    const payload = {
      resumeText,
      jobDescription,
      keywords: keywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    };
    const response = await atsApi.evaluate(payload);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
      >
        <h2 className="text-xl font-semibold">ATS Score Evaluation</h2>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          rows={6}
          placeholder="Paste job description..."
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <textarea
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          rows={6}
          placeholder="Paste resume content..."
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <input
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          placeholder="Additional keywords (comma separated)"
          className="input"
        />
        <button
          type="button"
          onClick={evaluate}
          disabled={loading}
          className="rounded-full bg-brand-600 px-6 py-2 text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? 'Calculating...' : 'Get ATS Score'}
        </button>
      </motion.div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-slate-900/80 p-6 text-white shadow-lg ring-1 ring-slate-800"
        >
          <h3 className="text-3xl font-bold">ATS Score: {result.score}%</h3>
          <p className="mt-3 text-sm text-slate-200">
            Higher scores mean better alignment with the job description.
          </p>
          <div className="mt-6 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold uppercase tracking-wide text-slate-300">Matched Keywords</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.matchedKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-white/10 px-3 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wide text-slate-300">Missing Keywords</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.missingKeywords.length ? (
                  result.missingKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-full bg-red-500/20 px-3 py-1 text-red-200">
                      {keyword}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-200">No missing keywords detected!</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold uppercase tracking-wide text-slate-300">Tips</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {result.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
