import React from 'react';
import { Sparkles, FileText, Grid, Info } from 'lucide-react';

export default function Navigation({ currentPage, onNavigate }) {
  const navItem = (key, label, Icon) => (
    <button
      key={key}
      onClick={() => onNavigate(key)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/70 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 ${
        currentPage === key ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/40 text-slate-700'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border-b border-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight text-slate-800">PremoCV</span>
        </div>
        <nav className="flex items-center gap-2">
          {navItem('home', 'Home', FileText)}
          {navItem('editor', 'CV Editor', Sparkles)}
          {navItem('templates', 'Templates', Grid)}
          {navItem('about', 'About', Info)}
        </nav>
      </div>
    </header>
  );
}
