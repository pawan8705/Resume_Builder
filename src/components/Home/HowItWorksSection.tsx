import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Upload, PenLine, Cpu, Download } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";

const STEPS = [
  {
    num: "01",
    Icon: Upload,
    title: "Choose Your Path.",
    c: {
      text: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/25",
      dot: "bg-violet-500",
      bar: "from-violet-500 to-violet-400",
      numGrad: "from-violet-600 to-violet-500",
      shadow: "0 0 20px rgba(124,58,237,0.4)",
    },
    desc: "Start from scratch or upload your existing resume. AI analyses your content and gives instant personalised suggestions.",
    points: [
      "Create from scratch with AI guidance",
      "Upload and enhance existing resume",
      "Choose from 200+ professional templates",
    ],
    mock: [
      { label: "Create New Resume", active: true },
      { label: "Upload Existing", active: false },
      { label: "Use Template", active: false },
    ],
    progress: 25,
  },
  {
    num: "02",
    Icon: PenLine,
    title: "Fill In Your Details.",
    c: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/25",
      dot: "bg-blue-500",
      bar: "from-blue-500 to-blue-400",
      numGrad: "from-blue-600 to-blue-500",
      shadow: "0 0 20px rgba(37,99,235,0.4)",
    },
    desc: "Simple guided steps for each section. AI writes bullet points, summaries, and tailors everything to your target role.",
    points: [
      "Smart AI content suggestions",
      "Auto-fill from LinkedIn profile",
      "Section-by-section guided process",
    ],
    mock: [
      { label: "Personal Info ✓", active: false },
      { label: "Experience ✓", active: false },
      { label: "Skills — In Progress", active: true },
    ],
    progress: 50,
  },
  {
    num: "03",
    Icon: Cpu,
    title: "AI Builds & Designs.",
    c: {
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/25",
      dot: "bg-cyan-500",
      bar: "from-cyan-500 to-cyan-400",
      numGrad: "from-cyan-600 to-cyan-500",
      shadow: "0 0 20px rgba(8,145,178,0.4)",
    },
    desc: "Watch AI transform your data into a job-winning document with ATS-optimised formatting and keyword analysis.",
    points: [
      "ATS-optimised formatting",
      "Keyword density analysis",
      "Industry-specific design themes",
    ],
    mock: [
      { label: "ATS Score: 96%", active: true },
      { label: "Keywords: Optimised", active: false },
      { label: "Design: Professional", active: false },
    ],
    progress: 75,
  },
  {
    num: "04",
    Icon: Download,
    title: "Download & Apply.",
    c: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/25",
      dot: "bg-emerald-500",
      bar: "from-emerald-500 to-emerald-400",
      numGrad: "from-emerald-600 to-emerald-500",
      shadow: "0 0 20px rgba(16,185,129,0.4)",
    },
    desc: "Export everything in one polished file. Your complete application package as a professional PDF — ready to send.",
    points: [
      "HD PDF export in one click",
      "Cover letter included",
      "Multiple format options",
    ],
    mock: [
      { label: "Resume.pdf — Ready ✓", active: true },
      { label: "Cover Letter.pdf ✓", active: false },
      { label: "References.pdf ✓", active: false },
    ],
    progress: 100,
  },
];

export default function HowItWorksSection() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className={`py-24 px-5 overflow-hidden ${isDark ? "bg-[#0a0a18]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <p
            className={`text-[11px] font-black tracking-[3px] uppercase mb-3 ${isDark ? "text-white/25" : "text-black/30"}`}
          >
            The Process
          </p>
          <h2
            className={`font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
            style={{ fontSize: "clamp(30px,4.5vw,54px)" }}
          >
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p
            className={`text-sm max-w-sm mx-auto leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Four simple steps. From blank page to job-winning resume in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-20">
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const C = step.c;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${!isLeft ? "md:[direction:rtl]" : ""}`}
              >
                {/* Text */}
                <div className="[direction:ltr]">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`size-9 rounded-full bg-gradient-to-br ${C.numGrad} flex items-center justify-center text-white text-sm font-black`}
                      style={{ boxShadow: C.shadow }}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-xs font-semibold tracking-widest uppercase ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      Step {step.num}
                    </span>
                  </div>

                  <h3
                    className={`font-extrabold mb-4 tracking-tight leading-snug ${isDark ? "text-slate-100" : "text-slate-900"}`}
                    style={{ fontSize: "clamp(22px,2.8vw,30px)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-[1.85] mb-6 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {step.desc}
                  </p>

                  {step.points.map((p, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + i * 0.08 + j * 0.07 }}
                      className="flex items-center gap-2.5 mb-3"
                    >
                      <CheckCircle2
                        size={14}
                        className={`${C.text} shrink-0`}
                      />
                      <span
                        className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {p}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Mockup */}
                <div className="[direction:ltr]">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`rounded-2xl border p-6 relative overflow-hidden
                      ${isDark ? "bg-white/[0.025] border-white/[0.07]" : "bg-white border-black/[0.07]"}`}
                    style={{
                      boxShadow: isDark
                        ? "0 24px 60px rgba(0,0,0,0.45)"
                        : "0 24px 60px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Top accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${C.bar}`}
                    />
                    {/* Soft glow */}
                    <div
                      className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${C.shadow.replace("0 0 20px ", "").replace(")", "10)")} 0%, transparent 80%)`,
                      }}
                    />

                    <p
                      className={`text-xs font-semibold mb-4 flex items-center gap-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      <span className={`size-2 rounded-full ${C.dot}`} />
                      Step {step.num} — {step.title.replace(".", "")}
                    </p>

                    {step.mock.map((m, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: 8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.08 + j * 0.07 }}
                        className={`px-3.5 py-2.5 rounded-xl mb-2.5 border flex items-center gap-2.5
                          ${m.active ? `${C.bg} ${C.border}` : isDark ? "bg-white/[0.025] border-white/[0.06]" : "bg-slate-50 border-black/[0.06]"}`}
                      >
                        <span
                          className={`size-2 rounded-full shrink-0 ${m.active ? C.dot : isDark ? "bg-white/15" : "bg-black/15"}`}
                        />
                        <span
                          className={`text-xs flex-1 ${m.active ? `font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}` : isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          {m.label}
                        </span>
                        {m.active && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${C.bg} ${C.text}`}
                          >
                            Active
                          </span>
                        )}
                      </motion.div>
                    ))}

                    {/* Progress */}
                    <div className="mt-5">
                      <div
                        className={`flex justify-between text-[11px] mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        <span>Progress</span>
                        <span className={`font-bold ${C.text}`}>
                          {step.progress}%
                        </span>
                      </div>
                      <div
                        className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/7" : "bg-black/7"}`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${step.progress}%` } : {}}
                          transition={{
                            delay: 0.55 + i * 0.1,
                            duration: 0.9,
                            ease: "easeOut",
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${C.bar}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-20"
        >
          <Link to="/?auth=signup" className="no-underline">
            <button
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: "0 0 28px rgba(124,58,237,0.4)" }}
            >
              Get Started Free →
            </button>
          </Link>
          <p
            className={`text-xs mt-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}
          >
            No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
