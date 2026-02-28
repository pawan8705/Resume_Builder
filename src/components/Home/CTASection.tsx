// src/components/home/CTASection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "@/store/hooks";

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isDark = useAppSelector((s) => s.theme.theme === "dark");

  return (
    <section
      ref={ref}
      className={`py-16 px-6 pb-24 ${isDark ? "bg-[#0a0a18]" : "bg-white"}`}
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl text-center"
          style={{
            background:
              "linear-gradient(135deg,#3b0764 0%,#1e3a8a 50%,#0e7490 100%)",
            padding: "clamp(48px,7vw,80px) clamp(24px,6vw,72px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 50%, rgba(124,58,237,0.3), transparent 50%), radial-gradient(circle at 85% 20%, rgba(37,99,235,0.25), transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-5"
            >
              🚀
            </motion.div>

            <h2
              className="font-black text-white mb-4 tracking-tight leading-tight"
              style={{ fontSize: "clamp(26px,4.5vw,52px)" }}
            >
              Ready To Land Your Next Job
              <br />
              <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                With A Perfect Resume?
              </span>
            </h2>

            <p className="text-base text-white/65 max-w-[420px] mx-auto mb-9 leading-relaxed">
              Join 50,000+ professionals. Build your perfect resume free — no
              credit card ever required.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/?auth=signup" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl border-none cursor-pointer bg-white text-violet-700 font-extrabold"
                  style={{
                    fontSize: "clamp(13px,1.5vw,15px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                  }}
                >
                  <Sparkles size={15} /> Start Building Free
                </motion.button>
              </Link>
              <Link to="/templates" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl cursor-pointer bg-white/10 text-white font-semibold border border-white/20 backdrop-blur-sm"
                  style={{ fontSize: "clamp(13px,1.5vw,15px)" }}
                >
                  Browse Templates <ArrowRight size={15} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
