// src/components/builder/BuilderTopbar.tsx — with Reset option

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Download,
  Palette,
  Sparkles,
  Loader2,
  MoreHorizontal,
  X,
  RotateCcw,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface Props {
  resumeTitle: string;
  onTitleChange: (t: string) => void;
  onSave: () => void;
  onExport: () => void;
  onToggleTemplates: () => void;
  onToggleAI: () => void;
  onReset: () => void;
  showAI: boolean;
  isSaving: boolean;
  atsScore: number;
  lastSaved?: string | null;
}

export default function BuilderTopbar({
  resumeTitle,
  onTitleChange,
  onSave,
  onExport,
  onToggleTemplates,
  onToggleAI,
  onReset,
  showAI,
  isSaving,
  atsScore,
  lastSaved,
}: Props) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const [moreOpen, setMoreOpen] = useState(false);

  const atsColor =
    atsScore >= 85
      ? "text-green-400 bg-green-400/10 border-green-400/25"
      : atsScore >= 65
        ? "text-amber-400 bg-amber-400/10 border-amber-400/25"
        : "text-red-400 bg-red-400/10 border-red-400/25";
  const atsTextOnly =
    atsScore >= 85
      ? "text-green-400"
      : atsScore >= 65
        ? "text-amber-400"
        : "text-red-400";

  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.08]";
  const topBg = isDark
    ? "bg-[#0a0a18]/97 backdrop-blur-xl"
    : "bg-white/97 backdrop-blur-xl";
  const iconBtn = `size-8 flex items-center justify-center rounded-lg cursor-pointer border transition-all shrink-0
    ${
      isDark
        ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
        : "bg-black/4 border-black/8 text-slate-500 hover:bg-black/8 hover:text-slate-700"
    }`;

  return (
    <div
      className={`h-11 px-2.5 flex items-center gap-1.5 shrink-0 sticky top-0 z-30 border-b ${topBg} ${divB}`}
    >
      {/* Title input */}
      <input
        value={resumeTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className={`min-w-0 w-0 flex-[1_1_50px] bg-transparent border-none outline-none text-[13px] font-bold truncate
          ${isDark ? "text-slate-100 placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"}`}
        placeholder="Resume title..."
        maxLength={40}
      />

      <div className="flex items-center gap-1 shrink-0">
        {/* ATS badge */}
        <span
          className={`hidden xs:flex items-center h-6 px-2 rounded-full text-[10px] font-extrabold border shrink-0 ${atsColor}`}
        >
          {atsScore}%
        </span>

        {/* AI toggle */}
        <button
          onClick={onToggleAI}
          title="AI Assistant"
          className={`${iconBtn} ${showAI ? "!bg-violet-500/12 !border-violet-500/30 !text-violet-400" : ""}`}
        >
          <Sparkles size={13} />
        </button>

        {/* PDF download */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onExport}
          className="flex items-center gap-1 h-8 px-2.5 rounded-lg border-none cursor-pointer
            bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[11px] font-bold
            shadow-[0_0_12px_rgba(124,58,237,0.4)] hover:opacity-90 shrink-0"
        >
          <Download size={11} /> PDF
        </motion.button>

        {/* ⋯ overflow menu */}
        <div className="relative">
          <button onClick={() => setMoreOpen(!moreOpen)} className={iconBtn}>
            {moreOpen ? <X size={12} /> : <MoreHorizontal size={14} />}
          </button>
          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ duration: 0.12 }}
                className={`absolute right-0 top-9 z-50 rounded-2xl border p-1.5 min-w-[190px]
                  shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                  ${isDark ? "bg-[#12121e] border-white/8" : "bg-white border-black/8"}`}
              >
                {/* ATS + autosave status */}
                <div
                  className={`flex items-center justify-between px-3 py-2 mb-1 rounded-xl ${isDark ? "bg-white/4" : "bg-black/4"}`}
                >
                  <div>
                    <span
                      className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      ATS Score
                    </span>
                    {lastSaved && (
                      <p
                        className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}
                      >
                        Saved {lastSaved}
                      </p>
                    )}
                  </div>
                  <span className={`text-sm font-black ${atsTextOnly}`}>
                    {atsScore}%
                  </span>
                </div>

                {[
                  {
                    label: "Choose Template",
                    icon: Palette,
                    fn: onToggleTemplates,
                    clr: "",
                  },
                  {
                    label: isSaving ? "Saving…" : "Save Resume",
                    icon: isSaving ? Loader2 : Save,
                    fn: onSave,
                    clr: "",
                  },
                  {
                    label: "Reset Resume",
                    icon: RotateCcw,
                    fn: onReset,
                    clr: "text-red-400",
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.fn();
                      setMoreOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                      cursor-pointer border-none text-left transition-colors bg-transparent
                      ${item.clr || (isDark ? "text-slate-200 hover:bg-white/6" : "text-slate-700 hover:bg-slate-50")}`}
                  >
                    <item.icon
                      size={14}
                      className={
                        item.clr ||
                        (isDark ? "text-slate-500" : "text-slate-400")
                      }
                    />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
