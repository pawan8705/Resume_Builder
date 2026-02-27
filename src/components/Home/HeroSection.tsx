
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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { createResume } from "@/store/slices/resumeSlice";
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
  "AMAZON",
];

/* ── Upload Modal ── */
function UploadModal({ onClose }: { onClose: () => void }) {
  const { theme } = useAppSelector((s) => s.theme);
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDark = theme === "dark";
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
      dispatch(
        createResume({
          title: uploaded?.name?.replace(/\.[^.]+$/, "") || "Uploaded Resume",
          template: "modern",
        }),
      );
      toast.success("Resume imported!");
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
        className={`w-full max-w-[460px] rounded-2xl border p-7 shadow-2xl ${isDark ? "bg-[#0e0e1a] border-white/8" : "bg-white border-black/8"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3
              className={`text-lg font-extrabold mb-0.5 ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              Upload Your Resume
            </h3>
            <p
              className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              We'll import and enhance it with AI
            </p>
          </div>
          <button
            onClick={onClose}
            className={`size-8 rounded-lg border-none cursor-pointer flex items-center justify-center ${isDark ? "bg-white/6 text-slate-400 hover:text-slate-200" : "bg-black/5 text-slate-400 hover:text-slate-700"}`}
          >
            <X size={15} />
          </button>
        </div>

        {/* Drop Zone */}
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
          onClick={() =>
            (document.getElementById("file-inp") as HTMLInputElement)?.click()
          }
          className={[
            "rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all mb-5",
            dragging
              ? "border-violet-500 bg-violet-500/6"
              : uploaded
                ? "border-green-500 bg-green-500/4"
                : isDark
                  ? "border-white/10 hover:border-white/20"
                  : "border-black/10 hover:border-black/20",
          ].join(" ")}
        >
          <input
            id="file-inp"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {uploaded ? (
            <>
              <CheckCircle
                className="text-green-500 mx-auto mb-2.5"
                size={36}
              />
              <p
                className={`text-sm font-bold mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {uploaded.name}
              </p>
              <p
                className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                {(uploaded.size / 1024).toFixed(0)} KB · Ready to import
              </p>
            </>
          ) : (
            <>
              <FileText
                className={`mx-auto mb-3 ${isDark ? "text-white/20" : "text-black/15"}`}
                size={36}
              />
              <p
                className={`text-sm font-semibold mb-1 ${isDark ? "text-slate-200" : "text-slate-700"}`}
              >
                {dragging ? "Drop it here!" : "Drag & drop your resume"}
              </p>
              <p
                className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                or click to browse · PDF, DOC, DOCX
              </p>
            </>
          )}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl border cursor-pointer text-sm font-medium bg-transparent ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}`}
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!uploaded || loading}
            onClick={handleProcess}
            className={`flex-1 py-2.5 rounded-xl border-none text-sm font-bold cursor-pointer flex items-center justify-center gap-1.5 transition-all ${uploaded ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white" : isDark ? "bg-white/5 text-slate-500 cursor-not-allowed" : "bg-black/5 text-slate-400 cursor-not-allowed"}`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="size-3.5 rounded-full border-2 border-white/30 border-t-white"
                />
                Importing...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Import & Enhance
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Hero ── */
export default function HeroSection() {
  const { theme } = useAppSelector((s) => s.theme);
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const [showUpload, setShowUpload] = useState(false);

  const handleCreate = () => {
    if (!isAuthenticated) {
      navigate("/?auth=signup");
      return;
    }
    dispatch(createResume({ title: "My Resume", template: "modern" }));
    toast.success("Resume created!");
    navigate("/builder");
  };

  return (
    <>
      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      </AnimatePresence>

      <section className="relative overflow-hidden py-20 pb-14">
        {/* BG Glows */}
        <div
          className="absolute -top-1/5 left-1/10 size-[800px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/10 right-1/20 size-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.018)"} 1px, transparent 1px),linear-gradient(90deg,${isDark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.018)"} 1px,transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6"
            >
              <Star size={11} fill="currentColor" /> AI-Powered · Trusted by
              50K+ professionals
            </motion.div>

            {/* FIX: 2 separate spans so "Resume" never clips */}
            <h1
              className={`font-black leading-[1.1] mb-5 tracking-tighter ${isDark ? "text-slate-100" : "text-slate-900"}`}
              style={{ fontSize: "clamp(32px,5.2vw,66px)" }}
            >
              <span className="block">
                Build Your{" "}
                <em className="not-italic bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Perfect Resume
                </em>
              </span>
              <span className="block">Smarter, Faster, with AI.</span>
            </h1>

            <p
              className={`max-w-[480px] mx-auto mb-8 leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}
              style={{ fontSize: "clamp(14px,1.7vw,17px)" }}
            >
              Professionally designed resumes built in minutes. AI writes,
              optimizes, and tailors each word to match your dream role
              perfectly.
            </p>

            <div className="flex gap-2.5 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-none cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold"
                style={{
                  fontSize: "clamp(13px,1.5vw,15px)",
                  boxShadow: "0 0 28px rgba(124,58,237,0.45)",
                }}
              >
                <Sparkles size={15} /> Create Your Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowUpload(true)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-semibold border backdrop-blur-sm transition-all ${isDark ? "bg-white/4 text-slate-200 border-white/8 hover:bg-white/7" : "bg-white/90 text-slate-800 border-black/8 hover:bg-white"}`}
                style={{ fontSize: "clamp(13px,1.5vw,15px)" }}
              >
                <Upload size={15} /> Upload Your Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 max-w-[820px] mx-auto mb-14"
          >
            {/* Resume Card */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`rounded-[18px] border backdrop-blur-xl p-5 ${isDark ? "bg-white/4 border-white/7" : "bg-white/90 border-black/7"}`}
              style={{
                boxShadow: isDark
                  ? "0 24px 70px rgba(0,0,0,0.6)"
                  : "0 24px 70px rgba(0,0,0,0.10)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="relative shrink-0">
                  <div className="size-11 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-black text-sm">
                    JC
                  </div>
                  <div
                    className={`absolute bottom-0.5 right-0.5 size-2.5 rounded-full bg-green-500 border-2 ${isDark ? "border-[#0a0a0f]" : "border-white"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bold text-[13px] ${isDark ? "text-slate-100" : "text-slate-900"}`}
                  >
                    Jake Carter
                  </p>
                  <p
                    className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Product Designer
                  </p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-green-500/12 border border-green-500/28 text-green-400 text-[10px] font-bold">
                  ATS 94%
                </span>
              </div>

              {SKILLS.map((s, i) => (
                <div key={i} className="mb-2.5">
                  <div className="flex justify-between mb-1">
                    <span
                      className={`text-[11px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[11px] text-violet-500 font-bold">
                      {s.pct}%
                    </span>
                  </div>
                  <div
                    className={`h-[5px] rounded-full overflow-hidden ${isDark ? "bg-white/7" : "bg-black/7"}`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.9 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
                    />
                  </div>
                </div>
              ))}

              <div className="mt-3.5 flex items-center gap-1.5 px-3 py-2 rounded-[9px] bg-violet-500/8 border border-violet-500/14 text-violet-400 text-[11px] font-medium">
                <Sparkles size={11} /> AI optimizing your resume...
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="ml-auto size-1.5 rounded-full bg-violet-500 shrink-0"
                />
              </div>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
              className={`rounded-[18px] border backdrop-blur-xl p-5 ${isDark ? "bg-white/4 border-white/7" : "bg-white/90 border-black/7"}`}
              style={{
                boxShadow: isDark
                  ? "0 24px 70px rgba(0,0,0,0.5)"
                  : "0 24px 70px rgba(0,0,0,0.08)",
              }}
            >
              <p
                className={`text-xs font-bold mb-3.5 flex items-center gap-1.5 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                <Sparkles size={13} className="text-violet-500" /> Smart AI
                Suggestions
              </p>
              {AI_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] mb-2 border ${isDark ? "bg-white/3 border-white/7" : "bg-black/3 border-black/7"}`}
                >
                  <span className="text-lg leading-none">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
                    >
                      {item.text}
                    </p>
                    <p
                      className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {item.hint}
                    </p>
                  </div>
                  <ChevronRight
                    size={12}
                    className={`shrink-0 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p
              className={`text-center text-[11px] font-semibold tracking-[2px] uppercase mb-5 ${isDark ? "text-white/25" : "text-black/30"}`}
            >
              Trusted by Professionals Who Joined Leading AI
            </p>
            <div className="overflow-hidden">
              <div
                className="flex gap-4 w-max"
                style={{ animation: "marquee 22s linear infinite" }}
              >
                {[...COMPANIES, ...COMPANIES].map((c, i) => (
                  <span
                    key={i}
                    className={`text-[13px] font-black tracking-[1.5px] px-4 py-2 rounded-lg border whitespace-nowrap ${isDark ? "text-white/18 border-white/7 bg-white/1" : "text-black/20 border-black/7 bg-black/2"}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </section>
    </>
  );
}
