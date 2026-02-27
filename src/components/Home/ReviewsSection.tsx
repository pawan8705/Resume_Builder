// import { motion } from "framer-motion";
// import { Star } from "lucide-react";
// import { useAppSelector } from "@/store/hooks";
// import { useInView } from "react-intersection-observer";

// const REVIEWS = [
//   {
//     name: "Sarah Johnson",
//     role: "Software Engineer @ Google",
//     avatar: "SJ",
//     rating: 5,
//     text: "ResumeAI helped me land my dream job at Google. The AI suggestions were brilliant and ATS optimization actually worked. Got 3x more callbacks.",
//     color: "#7c3aed",
//   },
//   {
//     name: "Ahmed Khan",
//     role: "Product Manager @ Meta",
//     avatar: "AK",
//     rating: 5,
//     text: "Built a stunning professional resume in just 20 minutes. Been struggling with this for weeks. The templates are exactly what recruiters want to see.",
//     color: "#2563eb",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Data Scientist @ Amazon",
//     avatar: "PS",
//     rating: 5,
//     text: "The AI writing assistant is genuinely impressive. It highlighted achievements I would have never thought to include myself. Hired within 2 weeks!",
//     color: "#06b6d4",
//   },
//   {
//     name: "Carlos Rivera",
//     role: "UX Designer @ Apple",
//     avatar: "CR",
//     rating: 5,
//     text: "Best free resume builder I have ever used. PDF export is pixel-perfect and the templates look stunning. Highly recommend to anyone job hunting now.",
//     color: "#ec4899",
//   },
//   {
//     name: "Emily Chen",
//     role: "Frontend Developer @ Netflix",
//     avatar: "EC",
//     rating: 5,
//     text: "I was very skeptical at first but ResumeAI truly exceeded every expectation. Clean interface, powerful AI, gorgeous templates. Got my job offer fast!",
//     color: "#10b981",
//   },
//   {
//     name: "Raj Patel",
//     role: "Full Stack Dev @ Startup",
//     avatar: "RP",
//     rating: 5,
//     text: "From zero to job offer in 3 weeks using ResumeAI. The ATS score feature helped me perfectly tailor my resume for each application I sent.",
//     color: "#f59e0b",
//   },
// ];

// export default function ReviewsSection() {
//   const { theme } = useAppSelector((s) => s.theme);
//   const isDark = theme === "dark";
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
//   const txt = isDark ? "#f1f5f9" : "#0f172a";
//   const sub = isDark ? "#64748b" : "#94a3b8";
//   const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.9)";
//   const cardBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

//   return (
//     <section id="reviews" ref={ref} style={{ padding: "90px 24px" }}>
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
//               marginBottom: 10,
//             }}
//           >
//             See What Our Users Are{" "}
//             <span
//               style={{
//                 background: "linear-gradient(135deg,#f59e0b,#ec4899)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Saying
//             </span>
//           </h2>
//           <p style={{ fontSize: 15, color: sub }}>
//             Real stories from professionals who changed their careers.
//           </p>
//         </motion.div>

//         {/* Average rating bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 14 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: 12,
//             marginBottom: 48,
//           }}
//         >
//           <div style={{ display: "flex", gap: 3 }}>
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Star key={i} size={18} fill="#f59e0b" stroke="none" />
//             ))}
//           </div>
//           <span style={{ fontSize: 22, fontWeight: 800, color: txt }}>4.9</span>
//           <span style={{ fontSize: 13, color: sub }}>from 50,000+ reviews</span>
//         </motion.div>

//         {/* Reviews Grid */}
//         <div style={{ columns: 3, columnGap: 18 }} className="reviews-grid">
//           {REVIEWS.map((r, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 22 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.07 }}
//               style={{
//                 breakInside: "avoid",
//                 marginBottom: 18,
//                 padding: "22px",
//                 borderRadius: 16,
//                 background: cardBg,
//                 border: `1px solid ${cardBorder}`,
//                 backdropFilter: "blur(10px)",
//                 display: "block",
//                 boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
//               }}
//             >
//               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
//                 {Array.from({ length: r.rating }).map((_, j) => (
//                   <Star key={j} size={13} fill="#f59e0b" stroke="none" />
//                 ))}
//               </div>
//               <p
//                 style={{
//                   fontSize: 13,
//                   color: sub,
//                   lineHeight: 1.75,
//                   marginBottom: 16,
//                 }}
//               >
//                 "{r.text}"
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 9,
//                   paddingTop: 12,
//                   borderTop: `1px solid ${cardBorder}`,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 10,
//                     background: `${r.color}20`,
//                     border: `1px solid ${r.color}30`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: r.color,
//                     fontSize: 11,
//                     fontWeight: 800,
//                     flexShrink: 0,
//                   }}
//                 >
//                   {r.avatar}
//                 </div>
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 700, color: txt }}>
//                     {r.name}
//                   </div>
//                   <div style={{ fontSize: 11, color: sub }}>{r.role}</div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <style>{`@media(max-width:768px){.reviews-grid{columns:1!important}} @media(max-width:1024px){.reviews-grid{columns:2!important}}`}</style>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useInView } from "react-intersection-observer";

const REVIEWS = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer @ Google",
    avatar: "SJ",
    rating: 5,
    text: "ResumeAI helped me land my dream job at Google. The AI suggestions were spot-on and ATS optimization actually worked. Got 3x more callbacks than before.",
    avatarCls: "bg-violet-500/20 border-violet-500/30 text-violet-400",
  },
  {
    name: "Ahmed Khan",
    role: "Product Manager @ Meta",
    avatar: "AK",
    rating: 5,
    text: "Built a stunning professional resume in just 20 minutes. Been struggling with this for weeks. The templates are exactly what recruiters want to see.",
    avatarCls: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist @ Amazon",
    avatar: "PS",
    rating: 5,
    text: "The AI writing assistant is genuinely impressive. It highlighted achievements I would have never thought to include myself. Hired within 2 weeks!",
    avatarCls: "bg-cyan-500/20 border-cyan-500/30 text-cyan-400",
  },
  {
    name: "Carlos Rivera",
    role: "UX Designer @ Apple",
    avatar: "CR",
    rating: 5,
    text: "Best free resume builder I have ever used. PDF export is pixel-perfect and templates look stunning. Highly recommend to anyone job hunting right now.",
    avatarCls: "bg-pink-500/20 border-pink-500/30 text-pink-400",
  },
  {
    name: "Emily Chen",
    role: "Frontend Developer @ Netflix",
    avatar: "EC",
    rating: 5,
    text: "I was skeptical at first but ResumeAI truly exceeded every expectation. Clean UI, powerful AI, gorgeous templates. Got my job offer in record time!",
    avatarCls: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  },
  {
    name: "Raj Patel",
    role: "Full Stack Dev @ Startup",
    avatar: "RP",
    rating: 5,
    text: "From zero to job offer in 3 weeks using ResumeAI. The ATS score feature helped me perfectly tailor my resume for each application I sent out.",
    avatarCls: "bg-amber-500/20 border-amber-500/30 text-amber-400",
  },
];

export default function ReviewsSection() {
  const { theme } = useAppSelector((s) => s.theme);
  const isDark = theme === "dark";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="reviews" ref={ref} className="py-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2
            className={`font-extrabold tracking-tight mb-2.5 ${isDark ? "text-slate-100" : "text-slate-900"}`}
            style={{ fontSize: "clamp(26px,4vw,46px)" }}
          >
            See What Our Users Are{" "}
            <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
              Saying
            </span>
          </h2>
          <p
            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Real stories from professionals who changed their careers.
          </p>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center items-center gap-3 mb-14"
        >
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill="#f59e0b" stroke="none" />
            ))}
          </div>
          <span
            className={`text-2xl font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            4.9
          </span>
          <span
            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            from 50,000+ reviews
          </span>
        </motion.div>

        {/* Masonry */}
        <div className="columns-3 gap-4 max-md:columns-2 max-sm:columns-1">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`break-inside-avoid mb-4 p-5 rounded-2xl border backdrop-blur-xl transition-colors duration-300 ${isDark ? "bg-white/2 border-white/7 hover:bg-white/4" : "bg-white/90 border-black/7 hover:bg-white"}`}
              style={{
                boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={13} fill="#f59e0b" stroke="none" />
                ))}
              </div>
              <p
                className={`text-[13px] leading-[1.75] mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                "{r.text}"
              </p>
              <div
                className={`flex items-center gap-2.5 pt-3 border-t ${isDark ? "border-white/7" : "border-black/7"}`}
              >
                <div
                  className={`size-9 rounded-xl border flex items-center justify-center text-[11px] font-extrabold shrink-0 ${r.avatarCls}`}
                >
                  {r.avatar}
                </div>
                <div>
                  <p
                    className={`text-[13px] font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                  >
                    {r.name}
                  </p>
                  <p
                    className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {r.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
