/* eslint-disable react-hooks/static-components */
// src/pages/ResumeBuilderPage.tsx
// ✅ Complete Resume Builder — PDF via Blob+iframe (bulletproof)

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { usePDFExport } from "@/hooks/usePDFExport";

import BuilderSidebar from "@/components/builder/BuilderSidebar";
import BuilderTopbar from "@/components/builder/BuilderTopbar";
import TemplateSwitcher from "@/components/builder/TemplateSwitcher";
import AIPanel from "@/components/builder/AIPanel";
import LivePreview from "@/components/builder/LivePreview";
import {
  PersonalEditor,
  ExperienceEditor,
  EducationEditor,
  SkillsEditor,
  ProjectsEditor,
  CertificatesEditor,
} from "@/components/builder/SectionEditors";

import { ResumeData, SectionId } from "@/types/resume.types";
import { INITIAL_RESUME, SECTIONS } from "@/data/resumeBuilder.data";

/* ─── localStorage keys ─── */
const SK = "resumeai_resume_data";
const TK = "resumeai_template";
const TTK = "resumeai_resume_title";

/* ─── ATS Score ─── */
function calcATS(d: ResumeData): number {
  let s = 0;
  if (d.personal.name) s += 10;
  if (d.personal.summary?.length > 80) s += 15;
  if (d.personal.email) s += 5;
  if (d.personal.phone) s += 5;
  if (d.personal.linkedin) s += 5;
  if (d.experience.length > 0) s += 20;
  if (d.experience.some((e) => e.bullets.filter(Boolean).length >= 2)) s += 10;
  if (d.education.length > 0) s += 10;
  if (d.skills.length >= 4) s += 10;
  if (d.projects.length > 0) s += 5;
  if (d.certificates.length > 0) s += 5;
  return Math.min(s, 100);
}

const SECTION_LABELS: Record<SectionId, string> = {
  personal: "Personal Info",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certificates: "Certifications",
};
const SECTION_SUBS: Record<SectionId, (d: ResumeData) => string> = {
  personal: () => "Your contact info & summary",
  experience: (d) =>
    `${d.experience.length} position${d.experience.length !== 1 ? "s" : ""}`,
  education: (d) =>
    `${d.education.length} entr${d.education.length !== 1 ? "ies" : "y"}`,
  skills: (d) => `${d.skills.length} skill${d.skills.length !== 1 ? "s" : ""}`,
  projects: (d) =>
    `${d.projects.length} project${d.projects.length !== 1 ? "s" : ""}`,
  certificates: (d) =>
    `${d.certificates.length} certificate${d.certificates.length !== 1 ? "s" : ""}`,
};

/* ─── Drag-resize hook ─── */
function useDragResize(init: number, min: number, max: number) {
  const [w, setW] = useState(init);
  const drag = useRef(false);
  const startX = useRef(0);
  const startW = useRef(init);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      drag.current = true;
      startX.current = e.clientX;
      startW.current = w;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [w],
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag.current) return;
      setW(
        Math.max(
          min,
          Math.min(max, startW.current + e.clientX - startX.current),
        ),
      );
    };
    const up = () => {
      if (!drag.current) return;
      drag.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [min, max]);

  return { width: w, onMouseDown };
}

/* ══════════════════════════════════════════════════════════ */
export default function ResumeBuilderPage() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const { exportPDF } = usePDFExport();

  /* ── State: persist to localStorage ── */
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const s = localStorage.getItem(SK);
      return s ? JSON.parse(s) : INITIAL_RESUME;
    } catch {
      return INITIAL_RESUME;
    }
  });
  const [template, setTemplate] = useState(
    () => localStorage.getItem(TK) || "modern",
  );
  const [resumeTitle, setResumeTitle] = useState(
    () => localStorage.getItem(TTK) || "My Resume",
  );
  const [activeSection, setSection] = useState<SectionId>("personal");
  const [showTemplates, setTemplates] = useState(false);
  const [showAI, setAI] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const editor = useDragResize(430, 300, 660);

  /* ── Auto-save ── */
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(SK, JSON.stringify(data));
        localStorage.setItem(TK, template);
        localStorage.setItem(TTK, resumeTitle);
        setLastSaved(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      }  catch(e) {
      console.log(e);
    }
    }, 600);
    return () => clearTimeout(t);
  }, [data, template, resumeTitle]);

  /* ── Derived ── */
  const atsScore = useMemo(() => calcATS(data), [data]);
  const completedSections = useMemo<SectionId[]>(() => {
    const c: SectionId[] = [];
    if (data.personal.name && data.personal.email) c.push("personal");
    if (data.experience.length > 0) c.push("experience");
    if (data.education.length > 0) c.push("education");
    if (data.skills.length > 0) c.push("skills");
    if (data.projects.length > 0) c.push("projects");
    if (data.certificates.length > 0) c.push("certificates");
    return c;
  }, [data]);

  /* ── Handlers ── */
  const handleSave = useCallback(() => {
    setSaving(true);
    try {
      localStorage.setItem(SK, JSON.stringify(data));
      localStorage.setItem(TK, template);
      localStorage.setItem(TTK, resumeTitle);
    }  catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setSaving(false);
      setLastSaved(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      toast.success("Saved! ✅");
    }, 500);
  }, [data, template, resumeTitle]);

  const handleReset = useCallback(() => {
    if (!confirm("Reset to default? This cannot be undone.")) return;
    setData(INITIAL_RESUME);
    setTemplate("modern");
    setResumeTitle("My Resume");
    try {
      localStorage.removeItem(SK);
      localStorage.removeItem(TK);
      localStorage.removeItem(TTK);
    } catch (e) {
      console.log(e);
    }
    toast.success("Reset done!");
  }, []);

  /* ── PDF Export: switch to preview on mobile first ── */
  const handleExport = useCallback(() => {
    if (window.innerWidth < 768 && mobileTab === "editor") {
      setMobileTab("preview");
      setTimeout(() => exportPDF(resumeTitle), 500);
      return;
    }
    exportPDF(resumeTitle);
  }, [mobileTab, resumeTitle, exportPDF]);

  /* ── Section data setters (stable refs) ── */
  const setPersonal = useCallback(
    (p: ResumeData["personal"]) => setData((d) => ({ ...d, personal: p })),
    [],
  );
  const setExperience = useCallback(
    (e: ResumeData["experience"]) => setData((d) => ({ ...d, experience: e })),
    [],
  );
  const setEducation = useCallback(
    (e: ResumeData["education"]) => setData((d) => ({ ...d, education: e })),
    [],
  );
  const setSkills = useCallback(
    (s: ResumeData["skills"]) => setData((d) => ({ ...d, skills: s })),
    [],
  );
  const setProjects = useCallback(
    (p: ResumeData["projects"]) => setData((d) => ({ ...d, projects: p })),
    [],
  );
  const setCertificates = useCallback(
    (c: ResumeData["certificates"]) =>
      setData((d) => ({ ...d, certificates: c })),
    [],
  );

  /* ── Layout values ── */
  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.08]";
  const pageBg = isDark ? "bg-[#0d0d1e]" : "bg-[#f8fafc]";
  const prevBg = isDark ? "bg-[#0a0a18]" : "bg-slate-200/70";
  const curIdx = SECTIONS.findIndex((s) => s.id === activeSection);

  /* ── Shared props for Topbar ── */
  const topbarProps = {
    resumeTitle,
    onTitleChange: setResumeTitle,
    onSave: handleSave,
    onExport: handleExport,
    onToggleTemplates: () => setTemplates(true),
    onToggleAI: () => setAI((v) => !v),
    onReset: handleReset,
    showAI,
    isSaving,
    atsScore,
    lastSaved,
  };

  /* ── Editor panels ── */
  const EditorContent = (
    <>
      <div className={activeSection === "personal" ? "" : "hidden"}>
        <PersonalEditor data={data.personal} onChange={setPersonal} />
      </div>
      <div className={activeSection === "experience" ? "" : "hidden"}>
        <ExperienceEditor data={data.experience} onChange={setExperience} />
      </div>
      <div className={activeSection === "education" ? "" : "hidden"}>
        <EducationEditor data={data.education} onChange={setEducation} />
      </div>
      <div className={activeSection === "skills" ? "" : "hidden"}>
        <SkillsEditor data={data.skills} onChange={setSkills} />
      </div>
      <div className={activeSection === "projects" ? "" : "hidden"}>
        <ProjectsEditor data={data.projects} onChange={setProjects} />
      </div>
      <div className={activeSection === "certificates" ? "" : "hidden"}>
        <CertificatesEditor
          data={data.certificates}
          onChange={setCertificates}
        />
      </div>
    </>
  );

  /* ── Prev/Next nav ── */
  const PrevNext = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={`px-4 py-2.5 border-t ${divB} flex items-center justify-between shrink-0`}
    >
      <button
        disabled={curIdx === 0}
        onClick={() => curIdx > 0 && setSection(SECTIONS[curIdx - 1].id)}
        className={`px-3.5 py-2 rounded-xl text-xs font-medium border bg-transparent transition-opacity
          ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}
          ${curIdx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:opacity-70"}`}
      >
        ← {!compact && "Prev"}
      </button>
      <span
        className={`text-[11px] tabular-nums ${isDark ? "text-slate-600" : "text-slate-400"}`}
      >
        {curIdx + 1} / {SECTIONS.length}
      </span>
      <button
        onClick={() => {
          if (curIdx < SECTIONS.length - 1) setSection(SECTIONS[curIdx + 1].id);
          else {
            handleSave();
            toast.success("Resume complete! 🎉");
          }
        }}
        className="px-3.5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
      >
        {curIdx === SECTIONS.length - 1
          ? "✓ Finish"
          : `Next${!compact ? " →" : "→"}`}
      </button>
    </div>
  );

  /* ── Preview panel (shared by desktop + mobile) ── */
  /* IMPORTANT: id="resume-preview-content" must exist when PDF is clicked */
  const PreviewPanel = (
    <div className={`flex-1 overflow-auto p-5 ${prevBg}`}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}
        >
          Live Preview
        </span>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <span
              className={`text-[10px] ${isDark ? "text-slate-700" : "text-slate-400"}`}
            >
              Saved {lastSaved}
            </span>
          )}
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full capitalize font-medium
            ${isDark ? "bg-white/6 text-slate-500" : "bg-black/6 text-slate-400"}`}
          >
            {template}
          </span>
        </div>
      </div>

      {/* ↓ THIS element is cloned for PDF — keep id stable */}
      <div
        id="resume-preview-content"
        className="bg-white overflow-hidden shadow-2xl mx-auto"
        style={{ maxWidth: 595, borderRadius: 8 }}
      >
        <LivePreview data={data} template={template} />
      </div>
    </div>
  );

  /* ══════════════════════════ RENDER ══════════════════════════ */
  return (
    <>
      <TemplateSwitcher
        open={showTemplates}
        current={template}
        onSelect={(t) => {
          setTemplate(t);
          toast.success(`Template: ${t}`);
        }}
        onClose={() => setTemplates(false)}
      />

      {/* ─── DESKTOP (md+) ─── */}
      <div className={`hidden md:flex h-screen overflow-hidden ${pageBg}`}>
        {/* Sidebar */}
        <div className={`w-[210px] shrink-0 border-r ${divB}`}>
          <BuilderSidebar
            activeSection={activeSection}
            onSelect={setSection}
            completedSections={completedSections}
          />
        </div>

        {/* Editor column */}
        <div
          className={`shrink-0 flex flex-col overflow-hidden border-r ${divB} ${pageBg}`}
          style={{ width: editor.width }}
        >
          <BuilderTopbar {...topbarProps} />

          {/* Section header */}
          <div className={`px-5 pt-3.5 pb-2.5 border-b shrink-0 ${divB}`}>
            <h2
              className={`text-sm font-extrabold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              {SECTION_LABELS[activeSection]}
            </h2>
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              {SECTION_SUBS[activeSection](data)}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-5">{EditorContent}</div>
          <PrevNext />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={editor.onMouseDown}
          className="w-[5px] shrink-0 cursor-col-resize relative z-10 group"
        >
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[3px] h-12 rounded-full transition-all duration-200
            ${
              isDark
                ? "bg-white/8 group-hover:bg-violet-500/60"
                : "bg-black/10 group-hover:bg-violet-500/60"
            }`}
          />
        </div>

        {/* Preview + AI panel */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {PreviewPanel}
          <AIPanel
            open={showAI}
            onClose={() => setAI(false)}
            activeSection={activeSection}
            resumeData={data}
            onUpdateData={setData}
          />
        </div>
      </div>

      {/* ─── MOBILE (< md) ─── */}
      <div
        className={`flex md:hidden flex-col h-[100dvh] overflow-hidden ${pageBg}`}
      >
        <BuilderTopbar {...topbarProps} />

        {/* Tab bar */}
        <div className={`flex shrink-0 border-b ${divB}`}>
          {(["editor", "preview"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2.5 text-[13px] font-semibold cursor-pointer bg-transparent
                border-t-0 border-l-0 border-r-0 border-b-2 transition-colors
                ${
                  mobileTab === tab
                    ? "text-violet-500 border-violet-500"
                    : `border-transparent ${isDark ? "text-slate-500" : "text-slate-400"}`
                }`}
            >
              {tab === "editor" ? "✏️ Editor" : "👁️ Preview"}
            </button>
          ))}
        </div>

        {/* EDITOR tab */}
        {mobileTab === "editor" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Section pill tabs — horizontal scroll */}
            <div className={`shrink-0 border-b ${divB}`}>
              <div
                className="flex gap-1.5 px-3 py-2 overflow-x-auto"
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {SECTIONS.map((s) => {
                  const isActive = activeSection === s.id;
                  const isDone = completedSections.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSection(s.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
                        whitespace-nowrap shrink-0 cursor-pointer border-none transition-all
                        ${
                          isActive
                            ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm"
                            : isDark
                              ? "bg-white/6 text-slate-400"
                              : "bg-black/5 text-slate-500"
                        }`}
                    >
                      {isDone && !isActive && (
                        <span className="text-green-400 text-[10px]">✓</span>
                      )}
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{EditorContent}</div>
            <PrevNext compact />
          </div>
        )}

        {/* PREVIEW tab */}
        {mobileTab === "preview" && (
          <div className={`flex-1 overflow-y-auto p-3 ${prevBg}`}>
            {lastSaved && (
              <p
                className={`text-[10px] text-center mb-2 ${isDark ? "text-slate-700" : "text-slate-400"}`}
              >
                Auto-saved {lastSaved}
              </p>
            )}
            {/* Same id — PDF hook will find this on mobile */}
            <div
              id="resume-preview-content"
              className="bg-white overflow-hidden shadow-xl mx-auto"
              style={{ maxWidth: 595, borderRadius: 8 }}
            >
              <LivePreview data={data} template={template} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
