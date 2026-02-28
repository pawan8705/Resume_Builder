// src/components/builder/BuilderTopbar.tsx
// ✅ Responsive topbar — works at 320px+

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
  const [menuOpen, setMenu] = useState(false);

  const atsColor =
    atsScore >= 85
      ? "text-green-400 bg-green-400/10 border-green-400/25"
      : atsScore >= 65
        ? "text-amber-400 bg-amber-400/10 border-amber-400/25"
        : "text-red-400 bg-red-400/10 border-red-400/25";
  const atsTxt =
    atsScore >= 85
      ? "text-green-400"
      : atsScore >= 65
        ? "text-amber-400"
        : "text-red-400";

  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.08]";
  const bg = isDark
    ? "bg-[#0a0a18]/97 backdrop-blur-xl"
    : "bg-white/97 backdrop-blur-xl";

  const iconBtn = `size-8 flex items-center justify-center rounded-lg cursor-pointer border-none shrink-0 transition-all
    ${
      isDark
        ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
        : "bg-black/4 text-slate-500 hover:bg-black/8 hover:text-slate-700"
    }`;

  return (
    <div
      className={`h-11 px-2.5 flex items-center gap-1.5 shrink-0 sticky top-0 z-30 border-b ${bg} ${divB}`}
    >
      {/* Title input */}
      <input
        value={resumeTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        maxLength={40}
        className={`min-w-0 flex-[1_1_50px] w-0 bg-transparent border-none outline-none
          text-[13px] font-bold truncate
          ${isDark ? "text-slate-100 placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"}`}
        placeholder="Resume title…"
      />

      <div className="flex items-center gap-1 shrink-0">
        {/* ATS badge — visible ≥ 360px */}
        <span
          className={`hidden min-[360px]:flex items-center h-6 px-2 rounded-full
          text-[10px] font-extrabold border shrink-0 ${atsColor}`}
        >
          {atsScore}%
        </span>

        {/* AI toggle */}
        <button
          onClick={onToggleAI}
          title="AI Assistant"
          className={`${iconBtn} ${showAI ? "!bg-violet-500/12 !text-violet-400" : ""}`}
        >
          <Sparkles size={13} />
        </button>

        {/* PDF download — always visible */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onExport}
          className="flex items-center gap-1 h-8 px-2.5 rounded-lg border-none cursor-pointer
            bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[11px] font-bold
            hover:opacity-90 shrink-0"
          style={{ boxShadow: "0 0 10px rgba(124,58,237,0.4)" }}
        >
          <Download size={11} /> PDF
        </motion.button>

        {/* ⋯ More menu */}
        <div className="relative">
          <button onClick={() => setMenu((v) => !v)} className={iconBtn}>
            {menuOpen ? <X size={12} /> : <MoreHorizontal size={14} />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ duration: 0.13 }}
                className={`absolute right-0 top-10 z-50 rounded-2xl border p-2 min-w-[200px]
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  ${isDark ? "bg-[#0f0f1e] border-white/8" : "bg-white border-black/8"}`}
              >
                {/* ATS row */}
                <div
                  className={`flex items-center justify-between px-3 py-2 mb-1 rounded-xl
                  ${isDark ? "bg-white/4" : "bg-slate-50"}`}
                >
                  <div>
                    <p
                      className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      ATS Score
                    </p>
                    {lastSaved && (
                      <p
                        className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}
                      >
                        Saved {lastSaved}
                      </p>
                    )}
                  </div>
                  <span className={`text-lg font-black ${atsTxt}`}>
                    {atsScore}%
                  </span>
                </div>

                {/* Actions */}
                {[
                  {
                    icon: Palette,
                    label: "Change Template",
                    fn: onToggleTemplates,
                    red: false,
                  },
                  {
                    icon: isSaving ? Loader2 : Save,
                    label: isSaving ? "Saving…" : "Save Resume",
                    fn: onSave,
                    red: false,
                  },
                  {
                    icon: RotateCcw,
                    label: "Reset Resume",
                    fn: onReset,
                    red: true,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.fn();
                      setMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                      cursor-pointer border-none text-left transition-colors bg-transparent
                      ${
                        item.red
                          ? "text-red-400 hover:bg-red-500/8"
                          : isDark
                            ? "text-slate-200 hover:bg-white/6"
                            : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    <item.icon
                      size={14}
                      className={
                        item.red
                          ? "text-red-400"
                          : isDark
                            ? "text-slate-500"
                            : "text-slate-400"
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
