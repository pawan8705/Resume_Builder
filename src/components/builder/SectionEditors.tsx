/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/builder/SectionEditors.tsx — Tailwind CSS
// ✅ No child components inside editors — plain <input> only = zero focus loss

import { useAppSelector } from "@/store/hooks";
import {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certificate,
} from "@/types/resume.types";
import { Plus, Trash2, X } from "lucide-react";
import { uid } from "@/data/resumeBuilder.data";

/* ── Shared Tailwind class helpers ── */
function useInputClass(isDark: boolean) {
  return `w-full px-3 py-2 rounded-xl text-sm outline-none transition-colors border
    ${
      isDark
        ? "bg-white/[0.04] border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-violet-500/50"
        : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-400/60"
    }`;
}
const labelCls = (isDark: boolean) =>
  `block text-[11px] font-semibold mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`;
const cardCls = (isDark: boolean) =>
  `relative rounded-2xl border p-4 ${isDark ? "bg-white/[0.02] border-white/[0.08]" : "bg-black/[0.01] border-black/[0.08]"}`;
const addBtnCls = (isDark: boolean) =>
  `w-full py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold
   text-violet-500 cursor-pointer transition-colors border-dashed border-2
   ${isDark ? "border-violet-500/30 hover:bg-violet-500/8" : "border-violet-400/30 hover:bg-violet-50"}`;
const delBtnCls = `absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer
   bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border-none`;

/* ════ PERSONAL ════ */
export function PersonalEditor({
  data,
  onChange,
}: {
  data: PersonalInfo;
  onChange: (d: PersonalInfo) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className={lbl}>Full Name</span>
          <input
            className={inp}
            value={data.name}
            placeholder="Alex Johnson"
            onChange={(e) => onChange({ ...data, name: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>Job Title</span>
          <input
            className={inp}
            value={data.title}
            placeholder="Software Engineer"
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>Email</span>
          <input
            className={inp}
            value={data.email}
            placeholder="you@example.com"
            type="email"
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>Phone</span>
          <input
            className={inp}
            value={data.phone}
            placeholder="+1 (555) 000-0000"
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>Location</span>
          <input
            className={inp}
            value={data.location}
            placeholder="San Francisco, CA"
            onChange={(e) => onChange({ ...data, location: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>Website</span>
          <input
            className={inp}
            value={data.website}
            placeholder="yoursite.com"
            onChange={(e) => onChange({ ...data, website: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>LinkedIn URL</span>
          <input
            className={inp}
            value={data.linkedin}
            placeholder="linkedin.com/in/..."
            onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          <span className={lbl}>GitHub URL</span>
          <input
            className={inp}
            value={data.github}
            placeholder="github.com/..."
            onChange={(e) => onChange({ ...data, github: e.target.value })}
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className={lbl}>Professional Summary</span>
        <textarea
          className={`${inp} resize-y leading-relaxed min-h-[90px]`}
          value={data.summary}
          rows={5}
          placeholder="Write a compelling professional summary..."
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
        />
      </label>
    </div>
  );
}

/* ════ EXPERIENCE ════ */
export function ExperienceEditor({
  data,
  onChange,
}: {
  data: Experience[];
  onChange: (d: Experience[]) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  const upd = (id: string, f: string, v: any) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [f]: v } : e)));
  const updB = (id: string, i: number, v: string) =>
    onChange(
      data.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.map((b, j) => (j === i ? v : b)) }
          : e,
      ),
    );
  const addB = (id: string) =>
    onChange(
      data.map((e) =>
        e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e,
      ),
    );
  const remB = (id: string, i: number) =>
    onChange(
      data.map((e) =>
        e.id === id
          ? { ...e, bullets: e.bullets.filter((_, j) => j !== i) }
          : e,
      ),
    );
  const add = () =>
    onChange([
      ...data,
      {
        id: uid(),
        company: "",
        role: "",
        start: "",
        end: "",
        current: false,
        bullets: [""],
      },
    ]);
  const rem = (id: string) => onChange(data.filter((e) => e.id !== id));

  return (
    <div className="flex flex-col gap-3.5">
      {data.map((exp) => (
        <div key={exp.id} className={cardCls(isDark)}>
          <button onClick={() => rem(exp.id)} className={delBtnCls}>
            <Trash2 size={12} />
          </button>

          <div className="grid grid-cols-2 gap-2 mb-3 pr-8">
            <label className="flex flex-col">
              <span className={lbl}>Job Title</span>
              <input
                className={inp}
                value={exp.role}
                placeholder="Senior Engineer"
                onChange={(e) => upd(exp.id, "role", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Company</span>
              <input
                className={inp}
                value={exp.company}
                placeholder="Acme Corp"
                onChange={(e) => upd(exp.id, "company", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Start (YYYY-MM)</span>
              <input
                className={inp}
                value={exp.start}
                placeholder="2022-01"
                onChange={(e) => upd(exp.id, "start", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>End (YYYY-MM)</span>
              <input
                className={`${inp} ${exp.current ? "opacity-40" : ""}`}
                value={exp.end}
                placeholder="2024-06"
                disabled={exp.current}
                onChange={(e) => upd(exp.id, "end", e.target.value)}
              />
            </label>
          </div>

          <label
            className={`flex items-center gap-2 text-xs cursor-pointer mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            <input
              type="checkbox"
              className="accent-violet-500"
              checked={exp.current}
              onChange={(e) => upd(exp.id, "current", e.target.checked)}
            />
            Currently working here
          </label>

          <span className={lbl}>Key Achievements</span>
          {exp.bullets.map((b, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className={`${inp} flex-1`}
                value={b}
                placeholder={`Achievement ${i + 1}...`}
                onChange={(e) => updB(exp.id, i, e.target.value)}
              />
              <button
                onClick={() => remB(exp.id, i)}
                className="w-8 shrink-0 rounded-lg bg-red-500/8 text-red-400 hover:bg-red-500/18 border-none cursor-pointer flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addB(exp.id)}
            className={`text-xs font-medium flex items-center gap-1 mt-1 cursor-pointer border-none bg-transparent text-violet-500 hover:text-violet-400`}
          >
            <Plus size={12} /> Add bullet
          </button>
        </div>
      ))}
      <button onClick={add} className={addBtnCls(isDark)}>
        <Plus size={14} /> Add Experience
      </button>
    </div>
  );
}

/* ════ EDUCATION ════ */
export function EducationEditor({
  data,
  onChange,
}: {
  data: Education[];
  onChange: (d: Education[]) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  const upd = (id: string, f: string, v: string) =>
    onChange(data.map((e) => (e.id === id ? { ...e, [f]: v } : e)));
  const add = () =>
    onChange([
      ...data,
      {
        id: uid(),
        school: "",
        degree: "",
        field: "",
        start: "",
        end: "",
        gpa: "",
      },
    ]);
  const rem = (id: string) => onChange(data.filter((e) => e.id !== id));

  return (
    <div className="flex flex-col gap-3.5">
      {data.map((edu) => (
        <div key={edu.id} className={cardCls(isDark)}>
          <button onClick={() => rem(edu.id)} className={delBtnCls}>
            <Trash2 size={12} />
          </button>
          <div className="grid grid-cols-2 gap-2 pr-8">
            <label className="flex flex-col">
              <span className={lbl}>School / University</span>
              <input
                className={inp}
                value={edu.school}
                placeholder="MIT"
                onChange={(e) => upd(edu.id, "school", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Degree</span>
              <input
                className={inp}
                value={edu.degree}
                placeholder="B.Tech"
                onChange={(e) => upd(edu.id, "degree", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Field of Study</span>
              <input
                className={inp}
                value={edu.field}
                placeholder="Computer Science"
                onChange={(e) => upd(edu.id, "field", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>GPA</span>
              <input
                className={inp}
                value={edu.gpa}
                placeholder="3.8"
                onChange={(e) => upd(edu.id, "gpa", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Start Year</span>
              <input
                className={inp}
                value={edu.start}
                placeholder="2018"
                onChange={(e) => upd(edu.id, "start", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>End Year</span>
              <input
                className={inp}
                value={edu.end}
                placeholder="2022"
                onChange={(e) => upd(edu.id, "end", e.target.value)}
              />
            </label>
          </div>
        </div>
      ))}
      <button onClick={add} className={addBtnCls(isDark)}>
        <Plus size={14} /> Add Education
      </button>
    </div>
  );
}

/* ════ SKILLS ════ */
export function SkillsEditor({
  data,
  onChange,
}: {
  data: Skill[];
  onChange: (d: Skill[]) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  const upd = (id: string, f: string, v: any) =>
    onChange(data.map((sk) => (sk.id === id ? { ...sk, [f]: v } : sk)));
  const add = () => onChange([...data, { id: uid(), name: "", level: 80 }]);
  const rem = (id: string) => onChange(data.filter((sk) => sk.id !== id));

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_100px_44px_32px] gap-2 items-center pb-1">
        <span className={lbl}>Skill Name</span>
        <span className={`${lbl} text-center`}>Level</span>
        <span />
        <span />
      </div>
      {data.map((sk) => (
        <div
          key={sk.id}
          className="grid grid-cols-[1fr_100px_44px_32px] gap-2 items-center"
        >
          <input
            className={inp}
            value={sk.name}
            placeholder="e.g. React.js"
            onChange={(e) => upd(sk.id, "name", e.target.value)}
          />
          <input
            type="range"
            min={10}
            max={100}
            value={sk.level}
            className="w-full accent-violet-500"
            onChange={(e) => upd(sk.id, "level", +e.target.value)}
          />
          <span className="text-xs font-bold text-violet-500 text-center">
            {sk.level}%
          </span>
          <button
            onClick={() => rem(sk.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 border-none cursor-pointer"
          >
            <Trash2 size={11} />
          </button>
        </div>
      ))}
      <button onClick={add} className={addBtnCls(isDark)}>
        <Plus size={14} /> Add Skill
      </button>
    </div>
  );
}

/* ════ PROJECTS ════ */
export function ProjectsEditor({
  data,
  onChange,
}: {
  data: Project[];
  onChange: (d: Project[]) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  const upd = (id: string, f: string, v: string) =>
    onChange(data.map((p) => (p.id === id ? { ...p, [f]: v } : p)));
  const add = () =>
    onChange([
      ...data,
      { id: uid(), name: "", description: "", tech: "", link: "" },
    ]);
  const rem = (id: string) => onChange(data.filter((p) => p.id !== id));

  return (
    <div className="flex flex-col gap-3.5">
      {data.map((proj) => (
        <div key={proj.id} className={cardCls(isDark)}>
          <button onClick={() => rem(proj.id)} className={delBtnCls}>
            <Trash2 size={12} />
          </button>
          <div className="flex flex-col gap-2 pr-8">
            <label className="flex flex-col">
              <span className={lbl}>Project Name</span>
              <input
                className={inp}
                value={proj.name}
                placeholder="My Awesome Project"
                onChange={(e) => upd(proj.id, "name", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Description</span>
              <input
                className={inp}
                value={proj.description}
                placeholder="What does it do?"
                onChange={(e) => upd(proj.id, "description", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Technologies Used</span>
              <input
                className={inp}
                value={proj.tech}
                placeholder="React, Node.js, PostgreSQL"
                onChange={(e) => upd(proj.id, "tech", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>GitHub / Live Link</span>
              <input
                className={inp}
                value={proj.link}
                placeholder="https://github.com/..."
                onChange={(e) => upd(proj.id, "link", e.target.value)}
              />
            </label>
          </div>
        </div>
      ))}
      <button onClick={add} className={addBtnCls(isDark)}>
        <Plus size={14} /> Add Project
      </button>
    </div>
  );
}

/* ════ CERTIFICATES ════ */
export function CertificatesEditor({
  data,
  onChange,
}: {
  data: Certificate[];
  onChange: (d: Certificate[]) => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const inp = useInputClass(isDark);
  const lbl = labelCls(isDark);

  const upd = (id: string, f: string, v: string) =>
    onChange(data.map((c) => (c.id === id ? { ...c, [f]: v } : c)));
  const add = () =>
    onChange([...data, { id: uid(), name: "", issuer: "", date: "" }]);
  const rem = (id: string) => onChange(data.filter((c) => c.id !== id));

  return (
    <div className="flex flex-col gap-3.5">
      {data.map((cert) => (
        <div key={cert.id} className={cardCls(isDark)}>
          <button onClick={() => rem(cert.id)} className={delBtnCls}>
            <Trash2 size={12} />
          </button>
          <div className="grid grid-cols-[1fr_1fr_120px] gap-2 pr-8">
            <label className="flex flex-col">
              <span className={lbl}>Certificate Name</span>
              <input
                className={inp}
                value={cert.name}
                placeholder="AWS Solutions Architect"
                onChange={(e) => upd(cert.id, "name", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Issuing Organization</span>
              <input
                className={inp}
                value={cert.issuer}
                placeholder="Amazon Web Services"
                onChange={(e) => upd(cert.id, "issuer", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className={lbl}>Date (YYYY-MM)</span>
              <input
                className={inp}
                value={cert.date}
                placeholder="2023-06"
                onChange={(e) => upd(cert.id, "date", e.target.value)}
              />
            </label>
          </div>
        </div>
      ))}
      <button onClick={add} className={addBtnCls(isDark)}>
        <Plus size={14} /> Add Certificate
      </button>
    </div>
  );
}
