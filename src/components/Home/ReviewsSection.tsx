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
    <section
      id="reviews"
      ref={ref}
      className={`py-24 px-6 ${isDark ? "bg-[#08080f]" : "bg-slate-50"}`}
    >
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
