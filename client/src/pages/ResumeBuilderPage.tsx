import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { aiApi } from '../services/aiApi';
import { resumeApi, type ResumePayload } from '../services/resumeApi';
import { useResumeForm } from '../hooks/useResumeForm';
import { ResumePreview } from '../components/resume/ResumePreview';
import { LoaderScreen } from '../components/LoaderScreen';

export default function ResumeBuilderPage() {
  const { resume, setResume } = useResumeForm();
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern');
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { register, handleSubmit, control, watch, setValue, reset } = useForm<ResumePayload>({
    defaultValues: resume
  });

  const experiences = useFieldArray({ name: 'experiences', control });
  const education = useFieldArray({ name: 'education', control });
  const projects = useFieldArray({ name: 'projects', control });

  useEffect(() => {
    resumeApi
      .get()
      .then((data) => {
        if (data) {
          setResume(data);
          reset(data);
        }
      })
      .catch(() => {});
  }, [reset, setResume]);

  const onSubmit = async (values: ResumePayload) => {
    try {
      const saved = await resumeApi.upsert(values);
      setResume(saved);
      setSaveMessage('✅ Resume saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage('❌ Failed to save resume. Please try again.');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const generateSummary = async () => {
    setLoading(true);
    const skills = watch('skills').join(', ');
    const name = watch('personal.fullName');
    const text = await aiApi.generate(
      `Create a professional resume summary for ${name}. Highlight key skills: ${skills}.`
    );
    setValue('summary', text);
    setLoading(false);
  };

  const generateCoverLetter = async () => {
    setLoading(true);
    const skills = watch('skills').join(', ');
    const name = watch('personal.fullName');
    const text = await aiApi.generate(
      `Write a concise cover letter for ${name} applying for a role requiring ${skills}.`
    );
    setValue('coverLetter', text);
    setLoading(false);
  };

  const downloadPDF = async () => {
    const blob = await resumeApi.download();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoaderScreen text="Generating your AI Resume..." />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      {saveMessage && (
        <div className="fixed top-20 right-4 z-50 rounded-lg bg-white px-6 py-3 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700 animate-bounce">
          <p className="text-sm font-medium">{saveMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input {...register('personal.fullName')} placeholder="Full Name" className="input" />
            <input {...register('personal.email')} placeholder="Email" className="input" />
            <input {...register('personal.phone')} placeholder="Phone" className="input" />
            <input {...register('personal.location')} placeholder="Location" className="input" />
            <input {...register('personal.website')} placeholder="Website" className="input" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Summary</h2>
            <button
              type="button"
              onClick={generateSummary}
              className="rounded-full border border-brand-600 px-4 py-1 text-sm text-brand-600 hover:bg-brand-50"
            >
              Generate Summary
            </button>
          </div>
          <textarea {...register('summary')} rows={5} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <h2 className="text-xl font-semibold">Experience</h2>
          {experiences.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  {...register(`experiences.${index}.role` as const)}
                  placeholder="Role"
                  className="input"
                />
                <input
                  {...register(`experiences.${index}.company` as const)}
                  placeholder="Company"
                  className="input"
                />
                <input
                  {...register(`experiences.${index}.startDate` as const)}
                  placeholder="Start Date"
                  className="input"
                />
                <input
                  {...register(`experiences.${index}.endDate` as const)}
                  placeholder="End Date"
                  className="input"
                />
              </div>
              <textarea
                {...register(`experiences.${index}.achievements.0` as const)}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                placeholder="Key achievement or responsibility"
                rows={2}
              />
              <button
                type="button"
                onClick={() => experiences.remove(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              experiences.append({
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                achievements: ['']
              })
            }
            className="rounded-full border border-dashed border-brand-600 px-4 py-2 text-sm text-brand-600"
          >
            Add experience
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <h2 className="text-xl font-semibold">Education</h2>
          {education.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  {...register(`education.${index}.degree` as const)}
                  placeholder="Degree/Program"
                  className="input"
                />
                <input
                  {...register(`education.${index}.institution` as const)}
                  placeholder="Institution"
                  className="input"
                />
                <input
                  {...register(`education.${index}.startDate` as const)}
                  placeholder="Start Date"
                  className="input"
                />
                <input
                  {...register(`education.${index}.endDate` as const)}
                  placeholder="End Date (or Expected)"
                  className="input"
                />
              </div>
              <textarea
                {...register(`education.${index}.highlights.0` as const)}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                placeholder="Achievements, GPA, relevant coursework"
              />
              <button
                type="button"
                onClick={() => education.remove(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              education.append({
                institution: '',
                degree: '',
                startDate: '',
                endDate: '',
                highlights: ['']
              })
            }
            className="rounded-full border border-dashed border-brand-600 px-4 py-2 text-sm text-brand-600"
          >
            Add education
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <h2 className="text-xl font-semibold">Projects</h2>
          {projects.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <input
                {...register(`projects.${index}.name` as const)}
                placeholder="Project Name"
                className="input mb-3"
              />
              <textarea
                {...register(`projects.${index}.description` as const)}
                placeholder="Brief description of the project"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900 mb-3"
                rows={3}
              />
              <input
                {...register(`projects.${index}.link` as const)}
                placeholder="GitHub/Demo Link (optional)"
                className="input mb-3"
              />
              <input
                placeholder="Tech stack (comma separated)"
                defaultValue={field.tech?.join(', ')}
                onBlur={(event) =>
                  setValue(
                    `projects.${index}.tech`,
                    event.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
                className="input"
              />
              <button
                type="button"
                onClick={() => projects.remove(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              projects.append({
                name: '',
                description: '',
                link: '',
                tech: []
              })
            }
            className="rounded-full border border-dashed border-brand-600 px-4 py-2 text-sm text-brand-600"
          >
            Add project
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <h2 className="text-xl font-semibold">Skills</h2>
          <input
            placeholder="e.g., Java, React, Node.js, MongoDB (comma separated)"
            defaultValue={watch('skills')?.join(', ')}
            onBlur={(event) =>
              setValue(
                'skills',
                event.target.value
                  .split(',')
                  .map((skill) => skill.trim())
                  .filter(Boolean)
              )
            }
            className="input"
          />
          <div className="flex flex-wrap gap-2">
            {watch('skills')?.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cover Letter</h2>
            <button
              type="button"
              onClick={generateCoverLetter}
              className="rounded-full border border-brand-600 px-4 py-1 text-sm text-brand-600 hover:bg-brand-50"
            >
              Generate Cover Letter
            </button>
          </div>
          <textarea {...register('coverLetter')} rows={8} className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" placeholder="Your cover letter will appear here..." />
        </motion.div>

        <div className="flex flex-wrap gap-4">
          <button type="submit" className="rounded-full bg-brand-600 px-6 py-2 font-medium text-white hover:bg-brand-700 transition">
            💾 Save Resume
          </button>
          <button
            type="button"
            onClick={downloadPDF}
            className="rounded-full border-2 border-brand-600 px-6 py-2 font-medium text-brand-600 hover:bg-brand-50 transition"
          >
            📥 Download PDF
          </button>
          <button
            type="button"
            onClick={() => setTemplate((prev) => (prev === 'modern' ? 'classic' : 'modern'))}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition"
          >
            🎨 {template === 'modern' ? 'Switch to Classic' : 'Switch to Modern'}
          </button>
        </div>
      </form>

      <ResumePreview data={watch()} template={template} />
    </div>
  );
}
