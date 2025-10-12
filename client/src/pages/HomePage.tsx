import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'AI Resume Generation',
    description: 'Craft ATS-ready resumes with AI summaries and keyword suggestions.'
  },
  {
    title: 'Portfolio Builder',
    description: 'Showcase projects and skills with live previews and shareable links.'
  },
  {
    title: 'ATS Score Checker',
    description: 'Match resumes to job descriptions and boost interview chances.'
  },
  {
    title: 'Cover Letter AI',
    description: 'Generate tailored cover letters from job postings instantly.'
  }
];

export default function HomePage() {
  return (
    <section className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white/80 p-10 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
      >
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Build standout resumes & portfolios with AI superpowers.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          AI Resume & Portfolio Builder helps students craft professional resumes, generate cover
          letters, and publish portfolios in minutes.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/resume"
            className="rounded-full bg-brand-600 px-6 py-3 text-white shadow-lg hover:bg-brand-700"
          >
            Start Building
          </Link>
          <Link
            to="/portfolio"
            className="rounded-full border border-brand-600 px-6 py-3 text-brand-600 hover:bg-brand-50"
          >
            Explore Portfolio
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/70 p-6 shadow-lg ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-800"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
