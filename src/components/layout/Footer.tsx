
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
