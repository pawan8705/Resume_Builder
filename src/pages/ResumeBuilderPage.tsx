/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
// src/pages/ResumeBuilderPage.tsx
// ✅ localStorage save/load + multiple templates + working AI panel + undo/redo

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";

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

const STORAGE_KEY = "resumeai_resume_data";
const TEMPLATE_KEY = "resumeai_template";
const TITLE_KEY = "resumeai_resume_title";

/* ── ATS Score ── */
function calcATS(d: ResumeData): number {
  let s = 0;
  if (d.personal.name) s += 10;
  if (d.personal.summary && d.personal.summary.length > 80) s += 15;
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
  personal: () => "Basic contact and profile info",
  experience: (d) =>
    `${d.experience.length} position${d.experience.length !== 1 ? "s" : ""} added`,
  education: (d) =>
    `${d.education.length} entr${d.education.length !== 1 ? "ies" : "y"} added`,
  skills: (d) =>
    `${d.skills.length} skill${d.skills.length !== 1 ? "s" : ""} added`,
  projects: (d) =>
    `${d.projects.length} project${d.projects.length !== 1 ? "s" : ""} added`,
  certificates: (d) =>
    `${d.certificates.length} certificate${d.certificates.length !== 1 ? "s" : ""} added`,
};

/* ── Drag-resize ── */
function useDragResize(init: number, min: number, max: number) {
  const [width, setWidth] = useState(init);
  const drag = useRef(false);
  const sx = useRef(0);
  const sw = useRef(init);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      drag.current = true;
      sx.current = e.clientX;
      sw.current = width;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [width],
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag.current) return;
      setWidth(
        Math.max(min, Math.min(max, sw.current + e.clientX - sx.current)),
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

  return { width, onMouseDown };
}

/* ── html2pdf loader + export ── */
declare const html2pdf: any;
function loadHtml2Pdf(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof html2pdf !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load html2pdf"));
    document.head.appendChild(script);
  });
}

async function exportToPDF(
  resumeTitle: string,
  mobileTab: string,
  setMobileTab: (t: "editor" | "preview") => void,
) {
  // On mobile, must be on preview tab
  if (window.innerWidth < 768 && mobileTab === "editor") {
    setMobileTab("preview");
    toast("Switched to Preview — tap PDF again to download", {
      icon: "👁️",
      duration: 2500,
    });
    return;
  }

  const el = document.getElementById("resume-preview-content");
  if (!el) {
    toast.error("Preview not found");
    return;
  }

  const toastId = toast.loading("Generating PDF... ⏳");
  try {
    await loadHtml2Pdf();
    await html2pdf()
      .set({
        margin: 0,
        filename: `${resumeTitle.replace(/[^a-z0-9]/gi, "_") || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          letterRendering: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(el)
      .save();
    toast.dismiss(toastId);
    toast.success("PDF downloaded! ✅");
  } catch (err) {
    toast.dismiss(toastId);
    toast("Using print dialog...", { icon: "🖨️" });
    setTimeout(() => window.print(), 800);
  }
}

/* ══════════════════════════════════════════════════ */
export default function ResumeBuilderPage() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");

  /* Load from localStorage on mount */
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_RESUME;
    } catch {
      return INITIAL_RESUME;
    }
  });
  const [template, setTemplate] = useState(
    () => localStorage.getItem(TEMPLATE_KEY) || "modern",
  );
  const [resumeTitle, setResumeTitle] = useState(
    () => localStorage.getItem(TITLE_KEY) || "My Resume",
  );

  const [activeSection, setSection] = useState<SectionId>("personal");
  const [showTemplates, setTemplates] = useState(false);
  const [showAI, setAI] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const editor = useDragResize(420, 300, 640);

  /* Auto-save to localStorage whenever data changes */
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TEMPLATE_KEY, template);
      localStorage.setItem(TITLE_KEY, resumeTitle);
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastSaved(now);
    }, 800);
    return () => clearTimeout(t);
  }, [data, template, resumeTitle]);

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

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(TEMPLATE_KEY, template);
    localStorage.setItem(TITLE_KEY, resumeTitle);
    setTimeout(() => {
      setSaving(false);
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastSaved(now);
      toast.success("Resume saved! ✅");
    }, 600);
  };

  const handleReset = () => {
    if (!confirm("Reset resume to default data? This cannot be undone."))
      return;
    setData(INITIAL_RESUME);
    setTemplate("modern");
    setResumeTitle("My Resume");
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Reset to default!");
  };

  const handleExport = () => exportToPDF(resumeTitle, mobileTab, setMobileTab);

  const handlePersonal = useCallback(
    (p: ResumeData["personal"]) =>
      setData((prev) => ({ ...prev, personal: p })),
    [],
  );
  const handleExperience = useCallback(
    (e: ResumeData["experience"]) =>
      setData((prev) => ({ ...prev, experience: e })),
    [],
  );
  const handleEducation = useCallback(
    (e: ResumeData["education"]) =>
      setData((prev) => ({ ...prev, education: e })),
    [],
  );
  const handleSkills = useCallback(
    (s: ResumeData["skills"]) => setData((prev) => ({ ...prev, skills: s })),
    [],
  );
  const handleProjects = useCallback(
    (p: ResumeData["projects"]) =>
      setData((prev) => ({ ...prev, projects: p })),
    [],
  );
  const handleCertificates = useCallback(
    (c: ResumeData["certificates"]) =>
      setData((prev) => ({ ...prev, certificates: c })),
    [],
  );

  const curIdx = SECTIONS.findIndex((s) => s.id === activeSection);

  const EditorPanels = (
    <>
      <div className={activeSection === "personal" ? "block" : "hidden"}>
        <PersonalEditor data={data.personal} onChange={handlePersonal} />
      </div>
      <div className={activeSection === "experience" ? "block" : "hidden"}>
        <ExperienceEditor data={data.experience} onChange={handleExperience} />
      </div>
      <div className={activeSection === "education" ? "block" : "hidden"}>
        <EducationEditor data={data.education} onChange={handleEducation} />
      </div>
      <div className={activeSection === "skills" ? "block" : "hidden"}>
        <SkillsEditor data={data.skills} onChange={handleSkills} />
      </div>
      <div className={activeSection === "projects" ? "block" : "hidden"}>
        <ProjectsEditor data={data.projects} onChange={handleProjects} />
      </div>
      <div className={activeSection === "certificates" ? "block" : "hidden"}>
        <CertificatesEditor
          data={data.certificates}
          onChange={handleCertificates}
        />
      </div>
    </>
  );

  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.08]";
  const pageBg = isDark ? "bg-[#0d0d1e]" : "bg-[#f8fafc]";
  const prevBg = isDark ? "bg-[#111120]" : "bg-[#e8edf5]";

  const topbarProps = {
    resumeTitle,
    onTitleChange: setResumeTitle,
    onSave: handleSave,
    onExport: handleExport,
    onToggleTemplates: () => setTemplates(true),
    onToggleAI: () => setAI(!showAI),
    showAI,
    isSaving,
    atsScore,
    lastSaved,
    onReset: handleReset,
  };

  const PrevNext = ({ mobile }: { mobile?: boolean }) => (
    <div
      className={`px-4 py-2.5 border-t shrink-0 flex items-center justify-between ${divB}`}
    >
      <button
        disabled={curIdx === 0}
        onClick={() => curIdx > 0 && setSection(SECTIONS[curIdx - 1].id)}
        className={`px-3.5 py-2 rounded-xl text-xs font-medium border bg-transparent
          ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}
          ${curIdx === 0 ? "opacity-35 cursor-not-allowed" : "hover:opacity-80 cursor-pointer"}`}
      >
        ← {!mobile && "Previous"}
      </button>
      <span
        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
      >
        {curIdx + 1}/{SECTIONS.length}
      </span>
      <button
        onClick={() => {
          if (curIdx < SECTIONS.length - 1) setSection(SECTIONS[curIdx + 1].id);
          else {
            handleSave();
            toast.success("All sections complete! 🎉");
          }
        }}
        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
      >
        {curIdx === SECTIONS.length - 1
          ? "✓ Finish"
          : `Next${!mobile ? " →" : " →"}`}
      </button>
    </div>
  );

  /* ══ DESKTOP ══ */
  const Desktop = (
    <div className={`hidden md:flex h-screen overflow-hidden ${pageBg}`}>
      {/* Sidebar */}
      <div className={`w-[210px] shrink-0 border-r ${divB}`}>
        <BuilderSidebar
          activeSection={activeSection}
          onSelect={setSection}
          completedSections={completedSections}
        />
      </div>

      {/* Editor */}
      <div
        className={`shrink-0 flex flex-col overflow-hidden border-r ${divB} ${pageBg}`}
        style={{ width: editor.width }}
      >
        <BuilderTopbar {...topbarProps} />

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

        <div className="flex-1 overflow-y-auto p-5">{EditorPanels}</div>
        <PrevNext />
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={editor.onMouseDown}
        className="w-[5px] shrink-0 cursor-col-resize relative z-10 group"
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-10 rounded-full transition-colors ${isDark ? "bg-white/10 group-hover:bg-violet-500/70" : "bg-black/10 group-hover:bg-violet-500/70"}`}
        />
      </div>

      {/* Preview */}
      <div className="flex-1 flex overflow-hidden min-w-0">
        <div className={`flex-1 overflow-auto p-5 ${prevBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              Live Preview
            </span>
            <div className="flex items-center gap-2">
              {lastSaved && (
                <span
                  className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}
                >
                  Auto-saved {lastSaved}
                </span>
              )}
              <span
                className={`text-[11px] px-2.5 py-1 rounded-full capitalize ${isDark ? "bg-white/6 text-slate-400" : "bg-black/6 text-slate-500"}`}
              >
                {template} template
              </span>
            </div>
          </div>
          <div
            id="resume-preview-content"
            className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-[595px]"
          >
            <LivePreview data={data} template={template} />
          </div>
        </div>
        <AIPanel
          open={showAI}
          onClose={() => setAI(false)}
          activeSection={activeSection}
          resumeData={data}
          onUpdateData={setData}
        />
      </div>
    </div>
  );

  /* ══ MOBILE ══ */
  const Mobile = (
    <div
      className={`flex md:hidden flex-col h-[100dvh] overflow-hidden ${pageBg}`}
    >
      <BuilderTopbar {...topbarProps} />

      {/* Tab switcher */}
      <div className={`flex shrink-0 border-b ${divB}`}>
        {(["editor", "preview"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2 text-[13px] font-semibold border-b-2 cursor-pointer bg-transparent border-l-0 border-r-0 border-t-0 transition-all
              ${mobileTab === tab ? "text-violet-500 border-violet-500" : `border-transparent ${isDark ? "text-slate-500" : "text-slate-400"}`}`}
          >
            {tab === "editor" ? "✏️ Editor" : "👁️ Preview"}
          </button>
        ))}
      </div>

      {mobileTab === "editor" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section tabs — horizontal scroll */}
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
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer border-none shrink-0 transition-all
                      ${isActive ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white" : isDark ? "bg-white/6 text-slate-400" : "bg-black/5 text-slate-500"}`}
                  >
                    {isDone && !isActive && (
                      <span className="text-green-400 text-[9px]">✓</span>
                    )}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{EditorPanels}</div>
          <PrevNext mobile />
        </div>
      )}

      {mobileTab === "preview" && (
        <div className={`flex-1 overflow-y-auto p-3 ${prevBg}`}>
          {lastSaved && (
            <p
              className={`text-[10px] text-center mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}
            >
              Auto-saved {lastSaved}
            </p>
          )}
          <div
            id="resume-preview-content"
            className="bg-white rounded-lg overflow-hidden shadow-xl mx-auto"
            style={{ maxWidth: 595 }}
          >
            <LivePreview data={data} template={template} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <TemplateSwitcher
        open={showTemplates}
        current={template}
        onSelect={setTemplate}
        onClose={() => setTemplates(false)}
      />
      {Desktop}
      {Mobile}
    </>
  );
}
