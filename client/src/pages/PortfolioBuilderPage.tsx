import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { portfolioApi, type PortfolioPayload } from '../services/portfolioApi';
import { aiApi } from '../services/aiApi';
import { LoaderScreen } from '../components/LoaderScreen';

type PortfolioForm = PortfolioPayload;

const defaultValues: PortfolioForm = {
  theme: 'light',
  about: '',
  skills: [],
  projects: [],
  contact: {
    email: '',
    phone: '',
    socials: []
  },
  shareSlug: ''
};

export default function PortfolioBuilderPage() {
  const [loading, setLoading] = useState(false);
  const { register, control, setValue, handleSubmit, watch, reset } = useForm<PortfolioForm>({
    defaultValues
  });
  const projects = useFieldArray({ name: 'projects', control });

  useEffect(() => {
    portfolioApi
      .get()
      .then((data) => {
        if (data) {
          reset(data);
        }
      })
      .catch(() => {});
  }, [reset]);

  const generateAbout = async () => {
    setLoading(true);
    const skills = watch('skills').join(', ');
    const text = await aiApi.generate(
      `Create a portfolio about section for a student skilled in ${skills}.`
    );
    setValue('about', text);
    setLoading(false);
  };

  const onSubmit = async (values: PortfolioForm) => {
    await portfolioApi.upsert(values);
  };

  if (loading) {
    return <LoaderScreen text="Generating your AI Portfolio..." />;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Portfolio Details</h2>
          <button
            type="button"
            onClick={generateAbout}
            className="rounded-full border border-brand-600 px-4 py-1 text-sm text-brand-600"
          >
            Generate About
          </button>
        </div>

        <textarea
          {...register('about')}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
          placeholder="Tell your story..."
        />

        <input
          placeholder="Comma separated skills"
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          {projects.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <input
                {...register(`projects.${index}.name` as const)}
                placeholder="Project name"
                className="input"
              />
              <textarea
                {...register(`projects.${index}.description` as const)}
                placeholder="Project description"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              />
              <input
                {...register(`projects.${index}.link` as const)}
                placeholder="Project link"
                className="input mt-2"
              />
              <input
                placeholder="Comma separated tech"
                onBlur={(event) =>
                  setValue(
                    `projects.${index}.tech`,
                    event.target.value
                      .split(',')
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                  )
                }
                className="input mt-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              projects.append({ name: '', description: '', link: '', tech: [] })
            }
            className="rounded-full border border-dashed border-brand-600 px-4 py-2 text-sm text-brand-600"
          >
            Add project
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input {...register('contact.email')} placeholder="Contact email" className="input" />
          <input {...register('contact.phone')} placeholder="Phone" className="input" />
        </div>

        <input {...register('shareSlug')} placeholder="Portfolio slug" className="input" />

        <button type="submit" className="rounded-full bg-brand-600 px-6 py-2 text-white hover:bg-brand-700">
          Save Portfolio
        </button>
      </form>

      <div className="rounded-2xl bg-slate-900/80 p-6 text-white shadow-lg ring-1 ring-slate-800">
        <h2 className="text-2xl font-semibold">Live Preview</h2>
        <p className="mt-4 text-slate-200">{watch('about') || 'Your about section will appear here.'}</p>
        <div className="mt-6">
          <h3 className="font-semibold">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {watch('skills')?.map((skill) => (
              <span key={skill} className="rounded-full bg-white/10 px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold">Projects</h3>
          {watch('projects')?.map((project) => (
            <div key={project.name} className="rounded-lg bg-white/10 p-3">
              <p className="font-medium">{project.name || 'Untitled project'}</p>
              <p className="text-sm text-slate-200">{project.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="font-semibold">Contact</h3>
          <p className="text-sm text-slate-200">{watch('contact.email')}</p>
          <p className="text-sm text-slate-200">{watch('contact.phone')}</p>
        </div>
      </div>
    </div>
  );
}
