import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Download, Layout } from 'lucide-react';

export default function Landing({ onStart }) {
  const features = [
    { title: 'AI-Powered Autofill', desc: 'Let smart suggestions speed up your resume creation.', icon: Sparkles },
    { title: 'Live Preview', desc: 'See changes instantly as you type.', icon: Eye },
    { title: 'Export as PDF', desc: 'One click to print or save a polished PDF.', icon: Download },
    { title: 'Modern Templates', desc: 'Pick from clean, professional styles.', icon: Layout },
  ];

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-white via-indigo-50/50 to-white" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
          >
            Build Your Professional CV in Minutes
          </motion.h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Create, customize, and export beautiful resumes effortlessly with AI assistance.
          </p>
          <div className="mt-8">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-3 text-white shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Start Building
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
            <div className="h-80 w-full rounded-lg bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="col-span-1 h-32 rounded bg-slate-100" />
                <div className="col-span-2 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-slate-100" />
                  <div className="h-3 w-2/3 rounded bg-slate-100" />
                  <div className="h-3 w-1/2 rounded bg-slate-100" />
                  <div className="h-3 w-5/6 rounded bg-slate-100" />
                  <div className="h-3 w-1/2 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {features.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
