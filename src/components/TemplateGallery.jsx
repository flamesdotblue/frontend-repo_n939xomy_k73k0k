import React from 'react';

const templates = [
  { key: 'classic', name: 'Classic', previewBg: 'from-slate-50 to-white' },
  { key: 'modern', name: 'Modern', previewBg: 'from-indigo-50 to-white' },
  { key: 'minimal', name: 'Minimal', previewBg: 'from-emerald-50 to-white' },
];

export default function TemplateGallery({ onUseTemplate }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Template Gallery</h2>
        <p className="mt-2 text-slate-600">Pick a style that fits your personality and industry.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {templates.map((t) => (
          <div key={t.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`h-64 w-full rounded-xl bg-gradient-to-br ${t.previewBg} grid grid-rows-6 p-4`}>
              <div className="row-span-1 flex items-center justify-between">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-3 w-12 rounded bg-slate-200" />
              </div>
              <div className="row-span-5 grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-2">
                  <div className="h-3 w-5/6 rounded bg-slate-200" />
                  <div className="h-3 w-2/3 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="h-3 w-5/6 rounded bg-slate-200" />
                  <div className="h-3 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                  <div className="h-3 w-5/6 rounded bg-slate-200" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-medium text-slate-900">{t.name}</div>
              <button
                onClick={() => onUseTemplate(t.key)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800"
              >
                Use This Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
