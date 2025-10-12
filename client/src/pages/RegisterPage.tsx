import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register: registerField, handleSubmit } = useForm<RegisterFormValues>();
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit = async (values: RegisterFormValues) => {
    await register(values);
    navigate('/resume');
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-800">
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Full Name</label>
          <input
            type="text"
            {...registerField('name', { required: true })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            {...registerField('email', { required: true })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            {...registerField('password', { required: true, minLength: 6 })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-600 py-2 text-white hover:bg-brand-700"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
