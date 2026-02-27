/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/TemplatesPage.tsx — /templates route
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import {
  Search,
  ArrowLeft,
  Eye,
  Zap,
  Star,
  Check,
  X,
  Filter,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

const CATEGORIES = [
  "All",
  "Professional",
  "Creative",
  "Minimal",
  "Executive",
  "Tech",
];

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Pro",
    category: "Professional",
    accent: "#7c3aed",
    tags: ["ATS Friendly", "Most Used"],
    rating: 4.9,
    uses: "12.4k",
    popular: true,
    premium: false,
    desc: "Clean contemporary layout with bold header. Perfect for tech and business roles.",
    hdr: "#7c3aed",
    hdrLight: "#a78bfa",
  },
  {
    id: "minimal",
    name: "Minimal Elite",
    category: "Minimal",
    accent: "#334155",
    tags: ["Clean", "ATS Friendly"],
    rating: 4.8,
    uses: "9.1k",
    popular: false,
    premium: false,
    desc: "Ultra-clean typography-first design. Lets your experience speak for itself.",
    hdr: "#1e293b",
    hdrLight: "#475569",
  },
  {
    id: "classic",
    name: "Classic Edge",
    category: "Executive",
    accent: "#2563eb",
    tags: ["Executive", "Formal"],
    rating: 4.7,
    uses: "7.8k",
    popular: false,
    premium: false,
    desc: "Traditional structure with modern refinement. Ideal for corporate & legal.",
    hdr: "#1d4ed8",
    hdrLight: "#3b82f6",
  },
  {
    id: "creative",
    name: "Creative Bold",
    category: "Creative",
    accent: "#db2777",
    tags: ["Creative", "Colorful"],
    rating: 4.6,
    uses: "5.2k",
    popular: false,
    premium: true,
    desc: "Expressive sidebar layout with vibrant accent colors. Great for design & marketing.",
    hdr: "#be185d",
    hdrLight: "#f472b6",
  },
  {
    id: "tech",
    name: "Tech Dark",
    category: "Tech",
    accent: "#0891b2",
    tags: ["Dark Mode", "Developers"],
    rating: 4.8,
    uses: "8.3k",
    popular: false,
    premium: true,
    desc: "Dark-themed minimal design with code-style typography. Made for engineers.",
    hdr: "#0e7490",
    hdrLight: "#22d3ee",
  },
  {
    id: "executive",
    name: "Executive Plus",
    category: "Executive",
    accent: "#059669",
    tags: ["Leadership", "C-Suite"],
    rating: 4.7,
    uses: "4.6k",
    popular: false,
    premium: true,
    desc: "Premium two-column layout with elegant typography. For senior & C-suite roles.",
    hdr: "#047857",
    hdrLight: "#34d399",
  },
  {
    id: "impact",
    name: "Impact",
    category: "Professional",
    accent: "#d97706",
    tags: ["Bold", "Sales"],
    rating: 4.5,
    uses: "3.9k",
    popular: false,
    premium: true,
    desc: "High-impact header with achievement-focused layout. Ideal for sales.",
    hdr: "#b45309",
    hdrLight: "#fbbf24",
  },
  {
    id: "infographic",
    name: "Infographic",
    category: "Creative",
    accent: "#7c3aed",
    tags: ["Visual", "Charts"],
    rating: 4.4,
    uses: "2.8k",
    popular: false,
    premium: true,
    desc: "Visual skill bars, icon sections, and timeline layout for creatives.",
    hdr: "#6d28d9",
    hdrLight: "#c084fc",
  },
  {
    id: "startup",
    name: "Startup",
    category: "Tech",
    accent: "#0284c7",
    tags: ["Startup", "Modern"],
    rating: 4.6,
    uses: "6.1k",
    popular: false,
    premium: false,
    desc: "Fast-paced modern layout. Built for startup and product roles.",
    hdr: "#0369a1",
    hdrLight: "#38bdf8",
  },
];

/* ── Mini resume preview ── */
function MiniPreview({
  hdr,
  hdrLight,
  isDark,
}: {
  hdr: string;
  hdrLight: string;
  isDark: boolean;
}) {
  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden shadow-sm"
      style={{ aspectRatio: "0.707" }}
    >
      {/* Header band */}
      <div className="px-3 py-2.5" style={{ background: hdr }}>
        <div className="w-14 h-2 rounded-sm bg-white/90 mb-1" />
        <div className="w-9 h-1.5 rounded-sm bg-white/50 mb-1.5" />
        <div className="flex gap-1.5">
          {[28, 22, 18].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-sm bg-white/30"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
      {/* Body */}
      <div className="p-2.5 flex flex-col gap-2">
        {[
          { sec: "Summary", lines: [80, 90, 70] },
          { sec: "Experience", lines: [65, 85] },
          { sec: "Skills", lines: [] },
        ].map(({ sec, lines }, si) => (
          <div key={sec}>
            <div className="flex items-center gap-1 mb-1">
              <div
                className="size-1 rounded-full"
                style={{ background: hdrLight }}
              />
              <div
                className="h-1 rounded-sm"
                style={{ width: 28, background: hdrLight, opacity: 0.8 }}
              />
            </div>
            {lines.map((w, li) => (
              <div
                key={li}
                className="h-1 rounded-sm bg-slate-200 mb-0.5"
                style={{ width: `${w}%` }}
              />
            ))}
            {sec === "Skills" && (
              <div className="flex gap-1 flex-wrap mt-0.5">
                {[32, 24, 28].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{ width: w, background: hdrLight, opacity: 0.5 }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Preview Modal ── */
function PreviewModal({
  tpl,
  isDark,
  onClose,
  onUse,
}: {
  tpl: (typeof TEMPLATES)[0];
  isDark: boolean;
  onClose: () => void;
  onUse: () => void;
}) {
  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.07]";
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl
          ${isDark ? "bg-[#0e0e1a] border-white/[0.08]" : "bg-white border-black/[0.08]"}`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${divB}`}
        >
          <div>
            <h3
              className={`text-base font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              {tpl.name}
            </h3>
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              {tpl.category} · {tpl.desc}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`size-8 rounded-xl border-none cursor-pointer flex items-center justify-center ${isDark ? "bg-white/7 text-slate-400" : "bg-black/5 text-slate-500"}`}
          >
            <X size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Big preview */}
          <div
            className={`p-8 flex items-center justify-center ${isDark ? "bg-black/20" : "bg-slate-50"}`}
          >
            <div className="w-full max-w-[240px]">
              <MiniPreview
                hdr={tpl.hdr}
                hdrLight={tpl.hdrLight}
                isDark={isDark}
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="p-6 flex flex-col">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tpl.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ background: `${tpl.accent}15`, color: tpl.accent }}
                >
                  {tag}
                </span>
              ))}
              {tpl.premium && (
                <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
                  PRO
                </span>
              )}
            </div>

            <p
              className={`text-sm leading-relaxed mb-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {tpl.desc}
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { l: "Rating", v: `⭐ ${tpl.rating}/5` },
                { l: "Used by", v: `${tpl.uses} people` },
                { l: "ATS Score", v: "90–98%" },
                { l: "Category", v: tpl.category },
              ].map((s) => (
                <div
                  key={s.l}
                  className={`rounded-xl p-3 ${isDark ? "bg-white/3 border border-white/6" : "bg-slate-50 border border-black/6"}`}
                >
                  <p
                    className={`text-[10px] font-medium mb-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                  >
                    {s.l}
                  </p>
                  <p
                    className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
                  >
                    {s.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 mb-5">
              {[
                "Fully ATS compatible",
                "One-click PDF export",
                "AI content ready",
                "Mobile & print optimized",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-green-400 shrink-0" />
                  <span
                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onUse}
              className="mt-auto w-full py-3 rounded-xl border-none cursor-pointer text-white text-sm font-black hover:scale-[1.02] active:scale-[0.97] transition-transform"
              style={{
                background: `linear-gradient(135deg,${tpl.accent},#2563eb)`,
                boxShadow: `0 0 24px ${tpl.accent}45`,
              }}
            >
              Use This Template →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Page ── */
export default function TemplatesPage() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [preview, setPreview] = useState<(typeof TEMPLATES)[0] | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroIn = useInView(heroRef, { once: true });
  const gridIn = useInView(gridRef, { once: true, margin: "-60px" });

  const filtered = TEMPLATES.filter((t) => {
    const okCat = category === "All" || t.category === category;
    const q = search.toLowerCase();
    const okSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return okCat && okSearch;
  });

  const handleUse = (tpl: (typeof TEMPLATES)[0]) => {
    if (!isAuthenticated) {
      toast("Sign in to use templates!", { icon: "🔐" });
      navigate("/?auth=signin");
      return;
    }
    toast.success(`${tpl.name} selected! ✨`);
    navigate("/builder");
  };

  const bg = isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]";
  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.07]";

  return (
    <div className={`min-h-screen ${bg}`}>
      <AnimatePresence>
        {preview && (
          <PreviewModal
            tpl={preview}
            isDark={isDark}
            onClose={() => setPreview(null)}
            onUse={() => {
              setPreview(null);
              handleUse(preview);
            }}
          />
        )}
      </AnimatePresence>

      {/* Shared Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-14 px-5 text-center" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={heroIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p
            className={`text-[11px] font-black tracking-[3px] uppercase mb-4 ${isDark ? "text-white/25" : "text-black/30"}`}
          >
            Template Library
          </p>
          <h1
            className={`font-black tracking-tight mb-5 ${isDark ? "text-white" : "text-slate-900"}`}
            style={{ fontSize: "clamp(36px,5vw,66px)", lineHeight: 1.07 }}
          >
            {TEMPLATES.length}+ Professional
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Resume Templates
            </span>
          </h1>
          <p
            className={`text-base max-w-md mx-auto mb-10 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            ATS-optimised, recruiter-approved designs. Pick your style and let
            AI fill in the rest.
          </p>

          {/* Search bar */}
          <div
            className={`max-w-md mx-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all
            ${isDark ? "bg-white/[0.04] border-white/10 focus-within:border-white/20" : "bg-white border-black/10 shadow-sm focus-within:shadow-md"}`}
          >
            <Search
              size={15}
              className={
                isDark ? "text-slate-500 shrink-0" : "text-slate-400 shrink-0"
              }
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className={`flex-1 bg-transparent border-none outline-none text-sm ${isDark ? "text-slate-100 placeholder:text-slate-600" : "text-slate-900 placeholder:text-slate-400"}`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className={`size-5 rounded-full flex items-center justify-center cursor-pointer border-none shrink-0 ${isDark ? "bg-white/10 text-slate-400" : "bg-black/8 text-slate-500"}`}
              >
                <X size={10} />
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <div
        className={`sticky top-16 z-30 border-b backdrop-blur-xl ${divB} ${isDark ? "bg-[#08080f]/92" : "bg-[#f1f5f9]/92"}`}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex gap-1 py-2.5 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0
                  ${
                    category === cat
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_14px_rgba(124,58,237,0.35)]"
                      : isDark
                        ? "text-slate-500 hover:text-slate-200 hover:bg-white/6"
                        : "text-slate-500 hover:text-slate-800 hover:bg-black/5"
                  }`}
              >
                {cat}
                {cat !== "All" && (
                  <span
                    className={`ml-1.5 text-[11px] ${category === cat ? "text-white/70" : isDark ? "text-slate-600" : "text-slate-400"}`}
                  >
                    {TEMPLATES.filter((t) => t.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 py-10 pb-24" ref={gridRef}>
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <p
            className={`text-xs font-medium mb-6 ${isDark ? "text-slate-600" : "text-slate-400"}`}
          >
            Showing{" "}
            <span className={isDark ? "text-slate-300" : "text-slate-600"}>
              {filtered.length}
            </span>{" "}
            template{filtered.length !== 1 ? "s" : ""}
            {category !== "All" ? ` in ${category}` : ""}
            {search ? ` for "${search}"` : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div
                className={`size-16 rounded-2xl flex items-center justify-center text-2xl ${isDark ? "bg-white/4" : "bg-black/4"}`}
              >
                🔍
              </div>
              <p
                className={`text-base font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                No templates found
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="text-sm text-violet-400 hover:text-violet-300 cursor-pointer border-none bg-transparent"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((tpl, i) => (
                <motion.div
                  key={tpl.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridIn ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.05, 0.35),
                  }}
                  className={`group relative rounded-2xl border overflow-hidden transition-all duration-300
                    ${
                      isDark
                        ? "bg-white/[0.025] border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.04]"
                        : "bg-white border-black/[0.07] shadow-sm hover:shadow-lg hover:border-black/[0.12]"
                    }`}
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                    {tpl.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-violet-600 text-white shadow-sm">
                        Popular
                      </span>
                    )}
                    {tpl.premium && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-sm">
                        PRO
                      </span>
                    )}
                  </div>

                  {/* Preview area */}
                  <div
                    className={`p-4 pb-3 ${isDark ? "bg-black/20" : "bg-slate-50"}`}
                  >
                    <MiniPreview
                      hdr={tpl.hdr}
                      hdrLight={tpl.hdrLight}
                      isDark={isDark}
                    />
                  </div>

                  {/* Hover action overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{
                      background: "rgba(0,0,0,0.52)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    <button
                      onClick={() => setPreview(tpl)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-none cursor-pointer bg-white/15 text-white text-xs font-semibold hover:bg-white/25 transition-colors"
                    >
                      <Eye size={12} /> Preview
                    </button>
                    <button
                      onClick={() => handleUse(tpl)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-none cursor-pointer text-white text-xs font-bold hover:opacity-90"
                      style={{
                        background: `linear-gradient(135deg,${tpl.accent},#2563eb)`,
                      }}
                    >
                      <Zap size={12} /> Use
                    </button>
                  </div>

                  {/* Card info */}
                  <div className="p-4 pt-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3
                          className={`text-sm font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
                        >
                          {tpl.name}
                        </h3>
                        <p
                          className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          {tpl.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star
                          size={11}
                          className="text-amber-400 fill-amber-400"
                        />
                        <span
                          className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-600"}`}
                        >
                          {tpl.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {tpl.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                          style={{
                            background: `${tpl.accent}12`,
                            color: tpl.accent,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUse(tpl)}
                        className="flex-1 py-2 rounded-xl border-none cursor-pointer text-white text-xs font-bold hover:opacity-90 active:scale-[0.97] transition-all"
                        style={{
                          background: `linear-gradient(135deg,${tpl.accent},#2563eb)`,
                        }}
                      >
                        Use Template
                      </button>
                      <button
                        onClick={() => setPreview(tpl)}
                        className={`size-8 rounded-xl border-none cursor-pointer flex items-center justify-center shrink-0 transition-colors
                          ${isDark ? "bg-white/6 text-slate-400 hover:bg-white/12" : "bg-black/5 text-slate-500 hover:bg-black/10"}`}
                      >
                        <Eye size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={`border-t py-16 px-5 text-center ${divB}`}>
        <p
          className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          Can't find the perfect template? Let AI create a custom one for you.
        </p>
        <Link
          to={isAuthenticated ? "/builder" : "/?auth=signup"}
          className="no-underline"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-sm cursor-pointer border-none"
            style={{ boxShadow: "0 0 28px rgba(124,58,237,0.4)" }}
          >
            Build My Resume with AI →
          </motion.button>
        </Link>
        <p
          className={`text-xs mt-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}
        >
          No credit card required
        </p>
      </div>
    </div>
  );
}
