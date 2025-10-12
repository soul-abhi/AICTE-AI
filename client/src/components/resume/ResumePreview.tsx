import { motion } from 'framer-motion';
import type { ResumePayload } from '../../services/resumeApi';

type ResumePreviewProps = {
  data: ResumePayload;
  template: 'modern' | 'classic';
};

const sectionClass = 'border-l-4 border-brand-500 pl-4';

export const ResumePreview = ({ data, template }: ResumePreviewProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 ${
      template === 'classic' ? 'font-serif' : 'font-sans'
    }`}
  >
    <header className="border-b border-slate-200 pb-4 text-center">
      <h2 className="text-2xl font-bold uppercase">{data.personal.fullName || 'Your Name'}</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {data.personal.email} • {data.personal.phone} • {data.personal.location}
      </p>
      <p className="text-sm text-brand-600">{data.personal.website}</p>
    </header>

    <section className={`mt-6 space-y-3 ${sectionClass}`}>
      <h3 className="text-lg font-semibold uppercase tracking-wide">Summary</h3>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {data.summary || 'Generate a compelling summary using AI.'}
      </p>
    </section>

    <section className={`mt-6 space-y-3 ${sectionClass}`}>
      <h3 className="text-lg font-semibold uppercase tracking-wide">Skills</h3>
      <div className="flex flex-wrap gap-2 text-sm">
        {data.skills.length
          ? data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-brand-50 px-3 py-1 text-brand-700 dark:bg-brand-600/20 dark:text-brand-200"
              >
                {skill}
              </span>
            ))
          : 'Add skills to showcase your strengths.'}
      </div>
    </section>

    <section className={`mt-6 space-y-3 ${sectionClass}`}>
      <h3 className="text-lg font-semibold uppercase tracking-wide">Experience</h3>
      <div className="space-y-4 text-sm">
        {data.experiences.length ? (
          data.experiences.map((exp) => (
            <div key={`${exp.company}-${exp.role}`}>
              <p className="font-semibold">
                {exp.role} • {exp.company}
              </p>
              <p className="text-xs text-slate-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <ul className="mt-2 list-disc pl-5">
                {exp.achievements.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Add experience entries to highlight achievements.</p>
        )}
      </div>
    </section>

    <section className={`mt-6 space-y-3 ${sectionClass}`}>
      <h3 className="text-lg font-semibold uppercase tracking-wide">Education</h3>
      <div className="space-y-4 text-sm">
        {data.education.length ? (
          data.education.map((edu) => (
            <div key={`${edu.institution}-${edu.degree}`}>
              <p className="font-semibold">
                {edu.degree} • {edu.institution}
              </p>
              <p className="text-xs text-slate-500">
                {edu.startDate} - {edu.endDate}
              </p>
              <ul className="mt-2 list-disc pl-5">
                {edu.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Add education details with achievements.</p>
        )}
      </div>
    </section>
  </motion.div>
);
