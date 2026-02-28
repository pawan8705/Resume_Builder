// src/components/home/HeroSection.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Upload,
  ChevronRight,
  Star,
  X,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";

const SKILLS = [
  { label: "React.js", pct: 95 },
  { label: "TypeScript", pct: 88 },
  { label: "Node.js", pct: 78 },
];
const AI_ITEMS = [
  { icon: "✨", text: "Enhanced Results", hint: "AI boosted impact by 40%" },
  {
    icon: "🎯",
    text: "Soft Skills Added",
    hint: "Problem-solving, Collaboration",
  },
  { icon: "📊", text: "ATS Keywords", hint: "Continuous Learning added" },
  { icon: "🚀", text: "Job Match 96%", hint: "Tailored for your target role" },
];
const COMPANIES = [
  "SAMSUNG",
  "AUDI",
  "SIEMENS",
  "WÜRTH",
  "GOOGLE",
  "MICROSOFT",
];

/* ── Upload Modal ── */
function UploadModal({ onClose }: { onClose: () => void }) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error("PDF, DOC or DOCX only");
      return;
    }
    setUploaded(file);
  };

  const handleProcess = () => {
    if (!isAuthenticated) {
      toast("Sign in first!", { icon: "🔐" });
      onClose();
      navigate("/?auth=signin");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Resume imported! ✅");
      setLoading(false);
      onClose();
      navigate("/builder");
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[460px] rounded-2xl border p-7 shadow-2xl
          ${isDark ? "bg-[#0e0e1a] border-white/8" : "bg-white border-black/8"}`}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3
              className={`text-lg font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              Upload Resume
            </h3>
            <p
              className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              AI will analyse and enhance it instantly
            </p>
          </div>
          <button
            onClick={onClose}
            className={`size-8 rounded-xl flex items-center justify-center border-none cursor-pointer
            ${isDark ? "bg-white/6 text-slate-400 hover:text-slate-200" : "bg-black/5 text-slate-500 hover:text-slate-700"}`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-4
            ${
              dragging
                ? "border-violet-500 bg-violet-500/8"
                : isDark
                  ? "border-white/10 hover:border-violet-500/40"
                  : "border-black/10 hover:border-violet-400/40"
            }`}
          onClick={() => document.getElementById("hero-file-input")?.click()}
        >
          <input
            id="hero-file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {uploaded ? (
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle size={22} className="text-green-400" />
              <div className="text-left">
                <p
                  className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {uploaded.name}
                </p>
                <p className="text-xs text-green-400">Ready to import</p>
              </div>
            </div>
          ) : (
            <>
              <div className="size-12 rounded-2xl bg-violet-500/12 flex items-center justify-center mx-auto mb-3">
                <FileText size={22} className="text-violet-400" />
              </div>
              <p
                className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
              >
                Drag & drop or click to upload
              </p>
              <p
                className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                PDF, DOC, DOCX up to 10MB
              </p>
            </>
          )}
        </div>

        <button
          onClick={handleProcess}
          disabled={!uploaded || loading}
          className={`w-full py-3 rounded-xl font-bold text-sm text-white border-none transition-all cursor-pointer
            bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed`}
          style={{ boxShadow: "0 0 18px rgba(124,58,237,0.4)" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Importing…
            </span>
          ) : (
            "Import & Enhance with AI ✨"
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Hero ── */
export default function HeroSection() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);

  const handleBuild = () => {
    if (isAuthenticated) navigate("/builder");
    else navigate("/?auth=signup");
  };

  return (
    <>
      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      </AnimatePresence>

      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-16
        ${isDark ? "bg-[#08080f]" : "bg-slate-50"}`}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-sm font-semibold
                  bg-violet-500/8 border-violet-500/20 text-violet-400"
              >
                <Sparkles size={14} /> AI-Powered Resume Builder
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6
                  ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Build a Resume
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  That Gets Hired
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-base sm:text-lg mb-8 leading-relaxed max-w-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                AI writes, optimises and scores your resume in real time. Beat
                ATS filters and land more interviews.
              </motion.p>

              {/* Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-8"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span
                  className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  4.9/5 from 12,000+ users
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuild}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white cursor-pointer border-none
                    bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 text-sm"
                  style={{ boxShadow: "0 0 20px rgba(124,58,237,0.45)" }}
                >
                  Build My Resume <ChevronRight size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowUpload(true)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold cursor-pointer text-sm border transition-colors
                    ${isDark ? "border-white/10 text-slate-300 hover:bg-white/5" : "border-black/10 text-slate-600 hover:bg-black/4"}`}
                >
                  <Upload size={15} /> Upload Existing
                </motion.button>
              </motion.div>

              {/* Trust logos */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <p
                  className={`text-xs font-medium mb-3 uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}
                >
                  Used by people at
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {COMPANIES.map((c) => (
                    <span
                      key={c}
                      className={`text-xs font-bold tracking-wider ${isDark ? "text-slate-600" : "text-slate-400"}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Resume card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl
                ${isDark ? "bg-[#0e0e1a] border-white/8" : "bg-white border-black/8"}`}
              >
                {/* Mock topbar */}
                <div
                  className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? "border-white/6 bg-white/2" : "border-black/6 bg-slate-50"}`}
                >
                  {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                    <div
                      key={c}
                      className="size-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                  <div
                    className={`flex-1 h-4 rounded-full mx-3 ${isDark ? "bg-white/6" : "bg-black/5"}`}
                  />
                  <span className="text-[10px] font-bold text-violet-400">
                    ATS 94%
                  </span>
                </div>

                <div className="p-5">
                  {/* Profile */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-black">
                      A
                    </div>
                    <div>
                      <div
                        className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                      >
                        Alex Johnson
                      </div>
                      <div className="text-xs text-violet-400">
                        Senior Software Engineer
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div
                      className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      Skills
                    </div>
                    {SKILLS.map((sk) => (
                      <div key={sk.label} className="mb-1.5">
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span
                            className={
                              isDark ? "text-slate-300" : "text-slate-600"
                            }
                          >
                            {sk.label}
                          </span>
                          <span className="text-violet-400 font-bold">
                            {sk.pct}%
                          </span>
                        </div>
                        <div
                          className={`h-1 rounded-full overflow-hidden ${isDark ? "bg-white/7" : "bg-black/7"}`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sk.pct}%` }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI suggestions */}
                  <div
                    className={`rounded-xl p-3 border ${isDark ? "bg-violet-500/6 border-violet-500/15" : "bg-violet-50 border-violet-200/50"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles size={11} className="text-violet-400" />
                      <span className="text-[10px] font-bold text-violet-400">
                        AI Suggestions Applied
                      </span>
                    </div>
                    {AI_ITEMS.map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-2 mb-1 last:mb-0"
                      >
                        <span className="text-[10px]">{item.icon}</span>
                        <span
                          className={`text-[10px] font-semibold ${isDark ? "text-slate-300" : "text-slate-600"}`}
                        >
                          {item.text}
                        </span>
                        <span
                          className={`text-[9px] ml-auto ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          {item.hint}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
