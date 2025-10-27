import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Save, Wand2 } from 'lucide-react';

const defaultData = {
  personal: { name: '', title: '', email: '', phone: '', location: '', website: '' },
  summary: '',
  skills: '',
  languages: '',
  education: [ { school: '', degree: '', start: '', end: '', details: '' } ],
  experience: [ { company: '', role: '', start: '', end: '', details: '' } ],
  projects: [ { name: '', link: '', details: '' } ],
};

function SectionTitle({ children }) {
  return <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">{children}</h3>;
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:ring"
      />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <textarea
        rows={4}
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-200 transition focus:ring"
      />
    </label>
  );
}

function CVPreview({ data, template }) {
  const theme = useMemo(() => {
    switch (template) {
      case 'modern':
        return {
          accent: 'text-indigo-700',
          headerBg: 'bg-indigo-50',
          border: 'border-indigo-200',
          bullet: 'before:bg-indigo-400',
        };
      case 'minimal':
        return {
          accent: 'text-emerald-700',
          headerBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          bullet: 'before:bg-emerald-400',
        };
      default:
        return {
          accent: 'text-slate-800',
          headerBg: 'bg-slate-50',
          border: 'border-slate-200',
          bullet: 'before:bg-slate-400',
        };
    }
  }, [template]);

  return (
    <div id="cv-preview" className="mx-auto w-full max-w-[816px] rounded-xl border bg-white p-8 shadow-sm">
      <div className={`rounded-lg ${theme.headerBg} p-6`}>
        <h1 className={`text-3xl font-bold ${theme.accent}`}>{data.personal.name || 'Your Name'}</h1>
        <div className="mt-1 text-sm text-slate-600">{data.personal.title || 'Professional Title'}</div>
        <div className="mt-2 text-xs text-slate-500">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.website]
            .filter(Boolean)
            .join('  •  ')}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {data.summary && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Summary</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{data.summary}</p>
            </section>
          )}

          {data.experience.filter((e) => e.company || e.role).length > 0 && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Experience</h2>
              <div className="mt-2 space-y-3">
                {data.experience.map((exp, i) => (
                  (exp.company || exp.role) && (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm font-medium text-slate-800">
                        <span>{exp.role || 'Role'}</span>
                        <span className="text-xs text-slate-500">{[exp.start, exp.end].filter(Boolean).join(' — ')}</span>
                      </div>
                      <div className="text-sm text-slate-600">{exp.company}</div>
                      {exp.details && (
                        <ul className="mt-1 list-none space-y-1 text-sm text-slate-700">
                          {exp.details.split('\n').map((d, j) => (
                            <li key={j} className={`relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full ${theme.bullet}`}>
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {data.projects.filter((p) => p.name).length > 0 && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Projects</h2>
              <div className="mt-2 space-y-2">
                {data.projects.map((p, i) => (
                  p.name && (
                    <div key={i} className="text-sm text-slate-700">
                      <span className="font-medium text-slate-800">{p.name}</span>
                      {p.link && (
                        <a href={p.link} className="ml-2 text-indigo-600 underline" target="_blank" rel="noreferrer">{p.link}</a>
                      )}
                      {p.details && <p className="mt-1 text-slate-700">{p.details}</p>}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-6">
          {data.skills && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Skills</h2>
              <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">{data.skills}</p>
            </section>
          )}

          {data.languages && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Languages</h2>
              <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">{data.languages}</p>
            </section>
          )}

          {data.education.filter((e) => e.school).length > 0 && (
            <section>
              <h2 className={`border-b pb-1 text-sm font-semibold ${theme.border} ${theme.accent}`}>Education</h2>
              <div className="mt-2 space-y-2">
                {data.education.map((ed, i) => (
                  ed.school && (
                    <div key={i} className="text-sm text-slate-700">
                      <div className="flex items-center justify-between font-medium text-slate-800">
                        <span>{ed.degree || 'Degree'}</span>
                        <span className="text-xs text-slate-500">{[ed.start, ed.end].filter(Boolean).join(' — ')}</span>
                      </div>
                      <div>{ed.school}</div>
                      {ed.details && <p className="mt-1">{ed.details}</p>}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CVEditor({ template, onTemplateChange }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('premo-cv-data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const printRef = useRef(null);

  useEffect(() => {
    // auto-save draft on changes
    const id = setTimeout(() => localStorage.setItem('premo-cv-data', JSON.stringify(data)), 400);
    return () => clearTimeout(id);
  }, [data]);

  const update = (path, value) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const addItem = (key) => setData((d) => ({ ...d, [key]: [...d[key], {}] }));

  const handleDownload = () => {
    const content = document.getElementById('cv-preview');
    if (!content) return;
    const win = window.open('', 'PRINT', 'height=800,width=1024');
    if (!win) return;
    win.document.write(
      `<!doctype html><html><head><title>CV</title><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/src/index.css"></head><body>`
    );
    win.document.write(content.outerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const handleSave = () => {
    localStorage.setItem('premo-cv-data', JSON.stringify(data));
  };

  const autofill = () => {
    setData((d) => ({
      ...d,
      personal: {
        name: d.personal.name || 'Alex Morgan',
        title: d.personal.title || 'Senior Product Designer',
        email: d.personal.email || 'alex.morgan@example.com',
        phone: d.personal.phone || '+1 555 123 4567',
        location: d.personal.location || 'San Francisco, CA',
        website: d.personal.website || 'alex.design',
      },
      summary:
        d.summary ||
        'Human-centered designer with 7+ years crafting delightful experiences across web and mobile. Passionate about systems thinking, accessibility, and measurable impact.',
      skills:
        d.skills ||
        'Product design, UX research, Prototyping, Design systems, Figma, Accessibility, Stakeholder management',
      languages: d.languages || 'English (Native)\nSpanish (Conversational)',
      education: d.education[0].school
        ? d.education
        : [
            {
              school: 'Parsons School of Design',
              degree: 'BFA, Communication Design',
              start: '2012',
              end: '2016',
              details: 'Led campus design club; coursework in typography and interaction design.',
            },
          ],
      experience: d.experience[0].company
        ? d.experience
        : [
            {
              company: 'Lumina Labs',
              role: 'Senior Product Designer',
              start: '2021',
              end: 'Present',
              details:
                'Own end-to-end design for analytics platform.\nShipped new onboarding, improving activation by 18%.\nPartner with PM and Eng for roadmap and discovery.',
            },
            {
              company: 'Northstar',
              role: 'Product Designer',
              start: '2018',
              end: '2021',
              details:
                'Redesigned mobile app IA.\nBuilt design system components.\nRan weekly usability tests with power users.',
            },
          ],
      projects: d.projects[0].name
        ? d.projects
        : [
            {
              name: 'Open Source Design Tokens',
              link: 'https://github.com/alex/tokens',
              details: 'A shared token library used by multiple teams to ensure brand consistency.',
            },
          ],
    }));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
          <span className="hidden sm:inline">Template:</span>
          <select
            value={template}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={autofill} className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-100">
            <Wand2 className="h-4 w-4" /> AI Autofill
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
            <Save className="h-4 w-4" /> Save Progress
          </button>
          <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-white shadow hover:bg-slate-800">
            <Download className="h-4 w-4" /> Download as PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle>Personal Info</SectionTitle>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input label="Full Name" value={data.personal.name} onChange={(e) => update('personal.name', e.target.value)} />
              <Input label="Title" value={data.personal.title} onChange={(e) => update('personal.title', e.target.value)} />
              <Input label="Email" value={data.personal.email} onChange={(e) => update('personal.email', e.target.value)} />
              <Input label="Phone" value={data.personal.phone} onChange={(e) => update('personal.phone', e.target.value)} />
              <Input label="Location" value={data.personal.location} onChange={(e) => update('personal.location', e.target.value)} />
              <Input label="Website" value={data.personal.website} onChange={(e) => update('personal.website', e.target.value)} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle>Summary</SectionTitle>
            <TextArea label="Brief summary" value={data.summary} onChange={(e) => update('summary', e.target.value)} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle>Experience</SectionTitle>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Company" value={exp.company || ''} onChange={(e) => update(`experience.${i}.company`, e.target.value)} />
                <Input label="Role" value={exp.role || ''} onChange={(e) => update(`experience.${i}.role`, e.target.value)} />
                <Input label="Start" value={exp.start || ''} onChange={(e) => update(`experience.${i}.start`, e.target.value)} />
                <Input label="End" value={exp.end || ''} onChange={(e) => update(`experience.${i}.end`, e.target.value)} />
                <TextArea label="Highlights (one per line)" value={exp.details || ''} onChange={(e) => update(`experience.${i}.details`, e.target.value)} />
              </div>
            ))}
            <button onClick={() => addItem('experience')} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">+ Add Experience</button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle>Education</SectionTitle>
            {data.education.map((ed, i) => (
              <div key={i} className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="School" value={ed.school || ''} onChange={(e) => update(`education.${i}.school`, e.target.value)} />
                <Input label="Degree" value={ed.degree || ''} onChange={(e) => update(`education.${i}.degree`, e.target.value)} />
                <Input label="Start" value={ed.start || ''} onChange={(e) => update(`education.${i}.start`, e.target.value)} />
                <Input label="End" value={ed.end || ''} onChange={(e) => update(`education.${i}.end`, e.target.value)} />
                <TextArea label="Details" value={ed.details || ''} onChange={(e) => update(`education.${i}.details`, e.target.value)} />
              </div>
            ))}
            <button onClick={() => addItem('education')} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">+ Add Education</button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle>Projects</SectionTitle>
            {data.projects.map((p, i) => (
              <div key={i} className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Name" value={p.name || ''} onChange={(e) => update(`projects.${i}.name`, e.target.value)} />
                <Input label="Link" value={p.link || ''} onChange={(e) => update(`projects.${i}.link`, e.target.value)} />
                <div className="sm:col-span-2">
                  <TextArea label="Details" value={p.details || ''} onChange={(e) => update(`projects.${i}.details`, e.target.value)} />
                </div>
              </div>
            ))}
            <button onClick={() => addItem('projects')} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">+ Add Project</button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionTitle>Skills</SectionTitle>
              <TextArea label="Comma or line-separated skills" value={data.skills} onChange={(e) => update('skills', e.target.value)} />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionTitle>Languages</SectionTitle>
              <TextArea label="Languages" value={data.languages} onChange={(e) => update('languages', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="md:sticky md:top-24">
          <CVPreview ref={printRef} data={data} template={template} />
        </div>
      </div>
    </section>
  );
}
