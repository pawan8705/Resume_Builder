// import { Link } from "react-router-dom";
// import { FileText, Github, Twitter, Linkedin, Heart, Send } from "lucide-react";
// import { useAppSelector } from "@/store/hooks";

// const NAV = {
//   Features: [
//     { label: "AI Resume Builder", href: "/#features" },
//     { label: "AI Cover Letter", href: "/#features" },
//     { label: "AI Resume Optimizer", href: "/#features" },
//     { label: "AI Job Agent", href: "#" },
//     { label: "Interview Coach", href: "#" },
//   ],
//   Resources: [
//     { label: "How It Works", href: "/#how-it-works" },
//     { label: "Templates", href: "/templates" },
//     { label: "Pricing", href: "/#pricing" },
//     { label: "Blog", href: "#" },
//   ],
//   Company: [
//     { label: "About", href: "#" },
//     { label: "Careers", href: "#" },
//     { label: "Contact", href: "#" },
//     { label: "Privacy Policy", href: "#" },
//     { label: "Terms of Service", href: "#" },
//   ],
// };

// export default function Footer() {
//   const { theme } = useAppSelector((s) => s.theme);
//   const isDark = theme === "dark";
//   const txt = isDark ? "#f1f5f9" : "#0f172a";
//   const sub = isDark ? "#475569" : "#94a3b8";
//   const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
//   const inputBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

//   return (
//     <footer
//       style={{
//         borderTop: `1px solid ${border}`,
//         background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.02)",
//         padding: "60px 24px 28px",
//       }}
//     >
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
//             gap: 36,
//             marginBottom: 52,
//           }}
//           className="footer-grid"
//         >
//           {/* Brand Column */}
//           <div>
//             <Link
//               to="/"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 textDecoration: "none",
//                 marginBottom: 14,
//               }}
//             >
//               <div
//                 style={{
//                   width: 32,
//                   height: 32,
//                   borderRadius: 9,
//                   background: "linear-gradient(135deg,#7c3aed,#2563eb)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 0 16px rgba(124,58,237,0.4)",
//                 }}
//               >
//                 <FileText size={15} color="#fff" />
//               </div>
//               <span style={{ fontWeight: 800, fontSize: 17, color: txt }}>
//                 Resume
//                 <span
//                   style={{
//                     background: "linear-gradient(135deg,#7c3aed,#2563eb)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   AI
//                 </span>
//               </span>
//             </Link>

//             <p
//               style={{
//                 fontSize: 13,
//                 color: sub,
//                 lineHeight: 1.75,
//                 maxWidth: 210,
//                 marginBottom: 20,
//               }}
//             >
//               Build professional, ATS-optimized resumes with AI. Trusted by 50K+
//               professionals worldwide.
//             </p>

//             {/* Newsletter */}
//             <p
//               style={{
//                 fontSize: 12,
//                 color: sub,
//                 fontWeight: 600,
//                 marginBottom: 10,
//                 letterSpacing: "0.3px",
//               }}
//             >
//               Subscribe to Newsletter
//             </p>
//             <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
//               <input
//                 placeholder="your@email.com"
//                 style={{
//                   flex: 1,
//                   padding: "9px 12px",
//                   borderRadius: 9,
//                   border: `1px solid ${border}`,
//                   background: inputBg,
//                   color: txt,
//                   fontSize: 12,
//                   outline: "none",
//                   minWidth: 0,
//                 }}
//               />
//               <button
//                 style={{
//                   width: 36,
//                   height: 36,
//                   borderRadius: 9,
//                   border: "none",
//                   background: "linear-gradient(135deg,#7c3aed,#2563eb)",
//                   color: "#fff",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <Send size={13} />
//               </button>
//             </div>

//             {/* Socials */}
//             <div style={{ display: "flex", gap: 8 }}>
//               {[
//                 <Github size={15} />,
//                 <Twitter size={15} />,
//                 <Linkedin size={15} />,
//               ].map((icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   style={{
//                     width: 34,
//                     height: 34,
//                     borderRadius: 9,
//                     background: inputBg,
//                     border: `1px solid ${border}`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: sub,
//                     textDecoration: "none",
//                     transition: "all 0.18s",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = txt;
//                     e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
//                     e.currentTarget.style.background = "rgba(124,58,237,0.08)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = sub;
//                     e.currentTarget.style.borderColor = border;
//                     e.currentTarget.style.background = inputBg;
//                   }}
//                 >
//                   {icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Link Columns */}
//           {Object.entries(NAV).map(([cat, links]) => (
//             <div key={cat}>
//               <h4
//                 style={{
//                   fontSize: 12,
//                   fontWeight: 700,
//                   color: txt,
//                   marginBottom: 16,
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                 }}
//               >
//                 {cat}
//               </h4>
//               <div
//                 style={{ display: "flex", flexDirection: "column", gap: 10 }}
//               >
//                 {links.map((l, i) => (
//                   <Link
//                     key={i}
//                     to={l.href}
//                     style={{
//                       fontSize: 13,
//                       color: sub,
//                       textDecoration: "none",
//                       transition: "color 0.15s",
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.color = txt)}
//                     onMouseLeave={(e) => (e.currentTarget.style.color = sub)}
//                   >
//                     {l.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom */}
//         <div
//           style={{
//             paddingTop: 22,
//             borderTop: `1px solid ${border}`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 10,
//           }}
//         >
//           <p style={{ fontSize: 12, color: sub }}>
//             © 2025 ResumeAI. All rights reserved.
//           </p>
//           <p
//             style={{
//               fontSize: 12,
//               color: sub,
//               display: "flex",
//               alignItems: "center",
//               gap: 4,
//             }}
//           >
//             Made with <Heart size={11} fill="#ec4899" stroke="none" /> for job
//             seekers worldwide
//           </p>
//         </div>
//       </div>
//       <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}} @media(max-width:580px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Linkedin, Heart, Send } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

const NAV = {
  Features: [
    { label: "AI Resume Builder", href: "/#features" },
    { label: "AI Cover Letter", href: "/#features" },
    { label: "AI Resume Optimizer", href: "/#features" },
    { label: "AI Job Agent", href: "#" },
    { label: "Interview Coach", href: "#" },
  ],
  Resources: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const { theme } = useAppSelector((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <footer
      className={`border-t px-6 pt-16 pb-7 ${isDark ? "border-white/6 bg-white/1" : "border-black/7 bg-black/2"}`}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] max-lg:grid-cols-2 max-sm:grid-cols-1 gap-9 mb-14">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline mb-3.5"
            >
              <div
                className="size-8 rounded-[9px] bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0"
                style={{ boxShadow: "0 0 16px rgba(124,58,237,0.4)" }}
              >
                <FileText size={14} className="text-white" />
              </div>
              <span
                className={`font-black text-[17px] tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Resume
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>

            <p
              className={`text-[13px] leading-[1.75] max-w-[200px] mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              Build professional, ATS-optimized resumes with AI. Trusted by 50K+
              professionals worldwide.
            </p>

            <p
              className={`text-xs font-semibold mb-2.5 tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              Subscribe to Newsletter
            </p>
            <div className="flex gap-1.5 mb-5">
              <input
                placeholder="your@email.com"
                className={`flex-1 min-w-0 px-3 py-2 rounded-[9px] border text-xs outline-none bg-transparent ${isDark ? "border-white/10 text-slate-200 placeholder:text-slate-600" : "border-black/10 text-slate-800 placeholder:text-slate-400"}`}
              />
              <button className="size-9 rounded-[9px] border-none bg-gradient-to-r from-violet-600 to-blue-600 text-white cursor-pointer flex items-center justify-center shrink-0">
                <Send size={13} />
              </button>
            </div>

            <div className="flex gap-2">
              {[
                <Github size={14} />,
                <Twitter size={14} />,
                <Linkedin size={14} />,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`size-[34px] rounded-[9px] border flex items-center justify-center no-underline transition-all ${isDark ? "border-white/10 text-slate-500 hover:text-slate-200 hover:border-violet-500/40 hover:bg-violet-500/8" : "border-black/10 text-slate-400 hover:text-slate-800 hover:border-violet-500/30 hover:bg-violet-500/5"}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(NAV).map(([cat, links]) => (
            <div key={cat}>
              <h4
                className={`text-xs font-bold uppercase tracking-[1px] mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {cat}
              </h4>
              <div className="flex flex-col gap-2.5">
                {links.map((l, i) => (
                  <Link
                    key={i}
                    to={l.href}
                    className={`text-[13px] no-underline transition-colors ${isDark ? "text-slate-500 hover:text-slate-200" : "text-slate-400 hover:text-slate-800"}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className={`pt-5 border-t flex items-center justify-between flex-wrap gap-2.5 ${isDark ? "border-white/6" : "border-black/7"}`}
        >
          <p
            className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}
          >
            © 2025 ResumeAI. All rights reserved.
          </p>
          <p
            className={`text-xs flex items-center gap-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}
          >
            Made with <Heart size={11} fill="#ec4899" stroke="none" /> for job
            seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
