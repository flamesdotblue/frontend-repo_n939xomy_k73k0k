import React, { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import Landing from './components/Landing.jsx';
import CVEditor from './components/CVEditor.jsx';
import TemplateGallery from './components/TemplateGallery.jsx';

function AboutContact() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">About PremoCV</h2>
        <p className="mt-2 text-slate-600">
          Our mission is to make high-end resume design accessible to everyone. Build fast, look great, and feel confident.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Why PremoCV?</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Clean, professional templates designed with hiring in mind.</li>
            <li>Live preview and smart autofill for a faster workflow.</li>
            <li>Simple export to PDF for instant sharing.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Contact Us</h3>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">Name</span>
              <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">Email</span>
              <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="you@example.com" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-600">Message</span>
              <textarea rows={4} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm" placeholder="How can we help?" />
            </label>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [template, setTemplate] = useState('classic');

  const handleUseTemplate = (t) => {
    setTemplate(t);
    setPage('editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/40 to-white text-slate-900">
      <Navigation currentPage={page} onNavigate={setPage} />

      {page === 'home' && <Landing onStart={() => setPage('editor')} />}
      {page === 'editor' && (
        <CVEditor template={template} onTemplateChange={setTemplate} />
      )}
      {page === 'templates' && <TemplateGallery onUseTemplate={handleUseTemplate} />}
      {page === 'about' && <AboutContact />}

      <footer className="border-t border-white/60 bg-white/40 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm text-slate-600">
          <span>© {new Date().getFullYear()} PremoCV. All rights reserved.</span>
          <button onClick={() => setPage('editor')} className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-800">Start Building</button>
        </div>
      </footer>
    </div>
  );
}
