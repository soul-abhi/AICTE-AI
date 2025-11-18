"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, FileText, Zap, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="container mx-auto px-6 py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">
                AI Resume Builder
              </span>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="w-20 h-20 text-indigo-600 mx-auto" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              AI Resume Builder
            </h1>
            <div className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">
                Build your 90+ ATS resume
              </span>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Generate a professional, ATS-optimized resume summary using
              real-time AI. Stand out to recruiters and land your dream job.
            </p>

            <Link href="/builder">
              <motion.button
                className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-indigo-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Start Building Resume
                  <Zap className="ml-2 w-6 h-6" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              {
                icon: <CheckCircle className="w-12 h-12 text-green-500" />,
                title: "90+ ATS Score",
                description: "Optimized for Applicant Tracking Systems",
              },
              {
                icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
                title: "AI-Powered",
                description: "Real-time AI generates perfect summaries",
              },
              {
                icon: <Zap className="w-12 h-12 text-blue-500" />,
                title: "Instant Results",
                description: "Get your professional resume in seconds",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-dark p-8 rounded-2xl backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
