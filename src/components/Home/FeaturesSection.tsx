// src/components/home/FeaturesSection.tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAppSelector } from '@/store/hooks'
import { Sparkles, FileText, Target, Layers, Package, Palette, Mic, ArrowUpRight } from 'lucide-react'

const CARDS = [
  {
    col: 'col-span-12 md:col-span-7',
    icon: Sparkles, iconBg: 'bg-violet-500/12 border-violet-500/20', iconClr: 'text-violet-400',
    badge: 'Most Popular', badgeClr: 'text-violet-400 bg-violet-500/10 border border-violet-500/20',
    glow: 'rgba(124,58,237,0.22)', glowPos: '-top-10 -right-10',
    title: 'AI Resume Builder',
    desc: 'Write every bullet, summary, and skill section with AI — tailored to the exact job description. ATS-ready by default.',
    tags: ['ATS Optimized', 'Job Targeted', 'Instant'],
    arrowClr: 'text-violet-400',
  },
  {
    col: 'col-span-12 md:col-span-5',
    icon: FileText, iconBg: 'bg-blue-500/12 border-blue-500/20', iconClr: 'text-blue-400',
    badge: 'AI Powered', badgeClr: 'text-blue-400',
    glow: 'rgba(37,99,235,0.16)', glowPos: '-bottom-8 -left-8',
    title: 'AI Cover Letter',
    desc: 'Compelling personalised cover letters in under 30 seconds. Matches your tone and resume automatically.',
    tags: [],
    arrowClr: 'text-blue-400',
  },
]

const STAT_CARDS = [
  { icon: Target,  stat: '96%',    statLbl: 'Avg ATS Score', iconBg: 'bg-cyan-500/12 border-cyan-500/20',    iconClr: 'text-cyan-400',    statClr: 'text-cyan-400',    title: 'Resume Optimizer', desc: 'Real-time ATS scoring, keyword gap analysis and one-click fixes.', glow: 'rgba(8,145,178,0.14)' },
  { icon: Layers,  stat: '30+',    statLbl: 'Languages',     iconBg: 'bg-purple-500/12 border-purple-500/20', iconClr: 'text-purple-400',  statClr: 'text-purple-400',  title: 'Multilingual',     desc: 'Auto-translate your resume without losing formatting or structure.', glow: 'rgba(139,92,246,0.14)' },
  { icon: Package, stat: '1-click',statLbl: 'PDF Bundle',    iconBg: 'bg-pink-500/12 border-pink-500/20',    iconClr: 'text-pink-400',    statClr: 'text-pink-400',    title: 'App Package',      desc: 'Resume + cover letter + references as one polished PDF export.', glow: 'rgba(236,72,153,0.14)' },
]

export default function FeaturesSection() {
  const isDark = useAppSelector((s) => s.theme.theme === 'dark')
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cardBase = `relative rounded-2xl border overflow-hidden transition-all duration-300 group cursor-default
    ${isDark ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.055] hover:border-white/[0.12]'
             : 'bg-white border-black/[0.07] shadow-sm hover:shadow-md'}`

  return (
    <section id="features" className={`py-24 px-5 overflow-hidden ${isDark ? "bg-[#08080f]" : "bg-slate-50"}`}>
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className={`text-[11px] font-black tracking-[3px] uppercase mb-3 ${isDark ? 'text-white/25' : 'text-black/30'}`}>
              Our Features
            </p>
            <h2 className={`font-black leading-[1.07] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontSize: 'clamp(34px,4.5vw,56px)' }}>
              Six tools.<br />
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One platform.
              </span>
            </h2>
          </div>
          <p className={`text-sm max-w-xs leading-relaxed md:pb-1.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Everything you need to build, optimize, and land your dream job — powered entirely by AI.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-12 gap-3">

          {/* Top 2 wide cards */}
          {CARDS.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 + i * 0.08 }}
              className={`${cardBase} ${c.col} p-6 md:p-7`}
            >
              <div className={`absolute size-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${c.glowPos}`}
                style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: 'blur(28px)' }} />

              <div className="flex items-start justify-between mb-5">
                <div className={`size-12 rounded-xl flex items-center justify-center border ${c.iconBg}`}>
                  <c.icon size={22} className={c.iconClr} />
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full ${c.badgeClr}`}>
                  {c.badge}
                </span>
              </div>

              <h3 className={`text-xl font-black mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
              <p className={`text-sm leading-relaxed mb-5 max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.desc}</p>

              <div className="flex items-center gap-2 flex-wrap">
                {c.tags.map((t) => (
                  <span key={t} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${isDark ? 'bg-white/6 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{t}</span>
                ))}
                <ArrowUpRight size={14} className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${c.arrowClr}`} />
              </div>
            </motion.div>
          ))}

          {/* Middle stat cards */}
          {STAT_CARDS.map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 + i * 0.07 }}
              className={`${cardBase} col-span-12 sm:col-span-6 md:col-span-4 p-6`}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${c.glow} 0%, transparent 65%)` }} />
              <div className="flex items-center justify-between mb-5">
                <div className={`size-11 rounded-xl flex items-center justify-center border ${c.iconBg}`}>
                  <c.icon size={20} className={c.iconClr} />
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black ${c.statClr}`}>{c.stat}</p>
                  <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{c.statLbl}</p>
                </div>
              </div>
              <h3 className={`text-[15px] font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{c.desc}</p>
            </motion.div>
          ))}

          {/* Design Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.43 }}
            className={`${cardBase} col-span-12 md:col-span-5 p-6`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(16,185,129,0.12) 0%, transparent 65%)' }} />
            <div className="size-11 rounded-xl flex items-center justify-center border bg-emerald-500/12 border-emerald-500/20 mb-5">
              <Palette size={20} className="text-emerald-400" />
            </div>
            <h3 className={`text-[15px] font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Design Assistant</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              AI layout, color, and font suggestions so your resume looks stunning at first glance.
            </p>
            <ArrowUpRight size={14} className="absolute bottom-5 right-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Interview Coach promo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`col-span-12 md:col-span-7 rounded-2xl border p-6 relative overflow-hidden cursor-default group
              ${isDark ? 'border-violet-500/20' : 'border-violet-400/25'}`}
            style={{ background: isDark
              ? 'linear-gradient(135deg,rgba(124,58,237,0.09) 0%,rgba(10,10,24,0.98) 100%)'
              : 'linear-gradient(135deg,rgba(124,58,237,0.05) 0%,rgba(248,250,252,1) 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 8% 50%, rgba(124,58,237,0.13) 0%, transparent 55%)' }} />
            <div className="relative z-10 flex flex-wrap items-center gap-5">
              <div className="size-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 0 24px rgba(124,58,237,0.45)' }}>
                <Mic size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-[160px]">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Interview Coach</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[10px] font-black">COMING SOON</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  AI that knows your resume. Real-time feedback, role-specific Q&A, confidence scoring.
                </p>
              </div>
              <button className="shrink-0 px-4 py-2 rounded-xl border-none cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold hover:scale-105 active:scale-95 transition-transform"
                style={{ boxShadow: '0 0 18px rgba(124,58,237,0.4)' }}>
                Join Waitlist
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}