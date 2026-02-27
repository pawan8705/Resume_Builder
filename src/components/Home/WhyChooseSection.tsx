// import { motion } from "framer-motion";
// import { Zap, Target, Globe, Shield, Clock, Users } from "lucide-react";
// import { useAppSelector } from "@/store/hooks";
// import { useInView } from "react-intersection-observer";

// const REASONS = [
//   {
//     icon: <Zap size={18} />,
//     title: "Job-winning Suggestions",
//     desc: "AI-powered content that highlights your strongest achievements and gets you noticed by recruiters.",
//     color: "#7c3aed",
//   },
//   {
//     icon: <Target size={18} />,
//     title: "Best AI Resume Designer",
//     desc: "Modern designs that create a strong visual impression and stand out in every applicant pool.",
//     color: "#2563eb",
//   },
//   {
//     icon: <Globe size={18} />,
//     title: "Built for All Careers",
//     desc: "Templates and content optimized for every industry, role, and experience level worldwide.",
//     color: "#06b6d4",
//   },
//   {
//     icon: <Shield size={18} />,
//     title: "ATS Guaranteed",
//     desc: "Every resume passes ATS screening so your application actually reaches human recruiters.",
//     color: "#10b981",
//   },
//   {
//     icon: <Clock size={18} />,
//     title: "Always Up-to-date",
//     desc: "Constantly updated with the latest hiring trends, recruiter expectations, and job market insights.",
//     color: "#f59e0b",
//   },
//   {
//     icon: <Users size={18} />,
//     title: "Customer Support",
//     desc: "24/7 friendly support team ready to help you every step of your job search journey.",
//     color: "#ec4899",
//   },
// ];

// export default function WhyChooseSection() {
//   const { theme } = useAppSelector((s) => s.theme);
//   const isDark = theme === "dark";
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
//   const txt = isDark ? "#f1f5f9" : "#0f172a";
//   const sub = isDark ? "#64748b" : "#94a3b8";
//   const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.9)";
//   const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

//   return (
//     <section ref={ref} style={{ padding: "90px 24px" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           style={{ textAlign: "center", marginBottom: 56 }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(26px,4vw,46px)",
//               fontWeight: 800,
//               color: txt,
//               letterSpacing: "-1.2px",
//               marginBottom: 12,
//             }}
//           >
//             Why Choose{" "}
//             <span
//               style={{
//                 background: "linear-gradient(135deg,#7c3aed,#2563eb)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               ResumeAI?
//             </span>
//           </h2>
//           <p
//             style={{
//               fontSize: 15,
//               color: sub,
//               maxWidth: 400,
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             Built for candidates. Designed for results.
//           </p>
//         </motion.div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3,1fr)",
//             gap: 1,
//             border: `1px solid ${cardBorder}`,
//             borderRadius: 20,
//             overflow: "hidden",
//           }}
//           className="why-grid"
//         >
//           {REASONS.map((r, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.07 }}
//               style={{
//                 padding: "28px 24px",
//                 background: cardBg,
//                 borderRight: i % 3 !== 2 ? `1px solid ${cardBorder}` : "none",
//                 borderBottom: i < 3 ? `1px solid ${cardBorder}` : "none",
//                 transition: "background 0.25s",
//                 cursor: "default",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.background = isDark
//                   ? "rgba(124,58,237,0.05)"
//                   : "rgba(124,58,237,0.03)")
//               }
//               onMouseLeave={(e) => (e.currentTarget.style.background = cardBg)}
//             >
//               <div
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: 10,
//                   background: `${r.color}15`,
//                   border: `1px solid ${r.color}22`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: r.color,
//                   marginBottom: 14,
//                 }}
//               >
//                 {r.icon}
//               </div>
//               <h3
//                 style={{
//                   fontSize: 14,
//                   fontWeight: 700,
//                   color: txt,
//                   marginBottom: 7,
//                 }}
//               >
//                 {r.title}
//               </h3>
//               <p style={{ fontSize: 13, color: sub, lineHeight: 1.65 }}>
//                 {r.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <style>{`@media(max-width:768px){.why-grid{grid-template-columns:1fr!important}}`}</style>
//     </section>
//   );
// }

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
    <section ref={ref} className="py-24 px-6">
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
