import { motion } from 'framer-motion';

export const LoaderScreen = ({ text }: { text: string }) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
    <motion.div
      className="size-16 rounded-full border-4 border-brand-500 border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
    <p className="text-lg font-medium text-slate-600 dark:text-slate-300">{text}</p>
  </div>
);
