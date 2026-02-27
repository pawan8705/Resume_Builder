// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Sparkles, ArrowRight } from "lucide-react";
// import { useAppSelector } from "@/store/hooks";
// import { useInView } from "react-intersection-observer";

// export default function CTASection() {
//   const { theme } = useAppSelector((s) => s.theme);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const isDark = theme === "dark";
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

//   return (
//     <section ref={ref} style={{ padding: "60px 24px 90px" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           style={{
//             borderRadius: 24,
//             background:
//               "linear-gradient(135deg,#3b0764 0%,#1e3a8a 50%,#0e7490 100%)",
//             padding: "clamp(48px,7vw,80px) clamp(24px,6vw,72px)",
//             textAlign: "center",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* BG Effects */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "radial-gradient(circle at 15% 50%, rgba(124,58,237,0.3), transparent 50%), radial-gradient(circle at 85% 20%, rgba(37,99,235,0.25), transparent 50%)",
//               pointerEvents: "none",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
//               backgroundSize: "40px 40px",
//               pointerEvents: "none",
//             }}
//           />

//           <div style={{ position: "relative", zIndex: 1 }}>
//             <motion.div
//               animate={{ y: [0, -7, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               style={{ fontSize: 44, marginBottom: 20 }}
//             >
//               🚀
//             </motion.div>
//             <h2
//               style={{
//                 fontSize: "clamp(26px,4.5vw,52px)",
//                 fontWeight: 900,
//                 color: "#fff",
//                 marginBottom: 16,
//                 letterSpacing: "-1.5px",
//                 lineHeight: 1.15,
//               }}
//             >
//               Ready To Land Your Next Job
//               <br />
//               <span
//                 style={{
//                   background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 With A Perfect Resume?
//               </span>
//             </h2>
//             <p
//               style={{
//                 fontSize: 16,
//                 color: "rgba(255,255,255,0.65)",
//                 maxWidth: 460,
//                 margin: "0 auto 36px",
//                 lineHeight: 1.75,
//               }}
//             >
//               Join 50,000+ professionals. Build your perfect resume free — no
//               credit card ever required.
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 12,
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//               }}
//             >
//               <Link to="/?auth=signup" style={{ textDecoration: "none" }}>
//                 <motion.button
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.97 }}
//                   style={{
//                     padding: "14px 28px",
//                     borderRadius: 12,
//                     border: "none",
//                     cursor: "pointer",
//                     background: "#fff",
//                     color: "#7c3aed",
//                     fontSize: 15,
//                     fontWeight: 800,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 7,
//                     boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
//                   }}
//                 >
//                   <Sparkles size={15} /> Start Building Free
//                 </motion.button>
//               </Link>
//               <Link to="/templates" style={{ textDecoration: "none" }}>
//                 <motion.button
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.97 }}
//                   style={{
//                     padding: "14px 26px",
//                     borderRadius: 12,
//                     cursor: "pointer",
//                     background: "rgba(255,255,255,0.1)",
//                     color: "#fff",
//                     fontSize: 15,
//                     fontWeight: 600,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 7,
//                     border: "1px solid rgba(255,255,255,0.2)",
//                     backdropFilter: "blur(8px)",
//                   }}
//                 >
//                   Browse Templates <ArrowRight size={15} />
//                 </motion.button>
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 px-6 pb-24">
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
          {/* BG Effects */}
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
