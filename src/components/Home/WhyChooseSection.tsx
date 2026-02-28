import { motion } from "framer-motion";
import { Zap, Target, Globe, Shield, Clock, Users } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useInView } from "react-intersection-observer";

const REASONS = [
  {
    icon: <Zap size={18} />,
    title: "Job-winning Suggestions",
    desc: "AI-powered content that highlights your strongest achievements and gets you noticed by recruiters instantly.",
    iconCls: "text-violet-500 bg-violet-500/15 border-violet-500/22",
  },
  {
    icon: <Target size={18} />,
    title: "Best AI Resume Designer",
    desc: "Modern designs that create a strong visual impression and stand out in every applicant pool globally.",
    iconCls: "text-blue-500 bg-blue-500/15 border-blue-500/22",
  },
  {
    icon: <Globe size={18} />,
    title: "Built for All Careers",
    desc: "Templates and content optimized for every industry, role, and experience level across the world.",
    iconCls: "text-cyan-500 bg-cyan-500/15 border-cyan-500/22",
  },
  {
    icon: <Shield size={18} />,
    title: "ATS Guaranteed",
    desc: "Every resume passes ATS screening so your application actually reaches human recruiters every time.",
    iconCls: "text-emerald-500 bg-emerald-500/15 border-emerald-500/22",
  },
  {
    icon: <Clock size={18} />,
    title: "Always Up-to-date",
    desc: "Constantly updated with the latest hiring trends, recruiter expectations, and job market insights.",
    iconCls: "text-amber-500 bg-amber-500/15 border-amber-500/22",
  },
  {
    icon: <Users size={18} />,
    title: "Customer Support",
    desc: "24/7 friendly support team ready to help you every step of your entire job search journey.",
    iconCls: "text-pink-500 bg-pink-500/15 border-pink-500/22",
  },
];

export default function WhyChooseSection() {
  const { theme } = useAppSelector((s) => s.theme);
  const isDark = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      ref={ref}
      className={`py-24 px-6 ${isDark ? "bg-[#0a0a18]" : "bg-white"}`}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className={`font-extrabold tracking-tight mb-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}
            style={{ fontSize: "clamp(26px,4vw,46px)" }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              ResumeAI?
            </span>
          </h2>
          <p
            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Built for candidates. Designed for results.
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 border rounded-2xl overflow-hidden ${isDark ? "border-white/7" : "border-black/7"}`}
        >
          {REASONS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={[
                "p-7 transition-colors duration-300 cursor-default",
                i % 3 !== 2
                  ? isDark
                    ? "border-r border-white/7"
                    : "border-r border-black/7"
                  : "",
                i < 3
                  ? isDark
                    ? "border-b border-white/7"
                    : "border-b border-black/7"
                  : "",
                isDark
                  ? "bg-white/2 hover:bg-violet-500/5"
                  : "bg-white/90 hover:bg-violet-500/3",
              ].join(" ")}
            >
              <div
                className={`size-10 rounded-xl border flex items-center justify-center mb-3.5 ${r.iconCls}`}
              >
                {r.icon}
              </div>
              <h3
                className={`text-sm font-bold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {r.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
