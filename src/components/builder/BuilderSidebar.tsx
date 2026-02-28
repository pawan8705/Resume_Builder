import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { SECTIONS } from '@/data/resumeBuilder.data'
import { SectionId } from '@/types/resume.types'

interface Props {
  activeSection: SectionId
  onSelect: (id: SectionId) => void
  completedSections: SectionId[]
}

export default function BuilderSidebar({ activeSection, onSelect, completedSections }: Props) {
  const isDark = useAppSelector((s) => s.theme.theme === 'dark')

  const divBorder = isDark ? 'border-white/[0.07]' : 'border-black/[0.08]'
  const bg        = isDark ? 'bg-[#0a0a18]' : 'bg-white'

  return (
    <div className={`flex flex-col h-screen ${bg}`}>

      {/* Logo + Back */}
      <div className={`px-4 pt-4 pb-3.5 border-b ${divBorder}`}>
        <Link to="/dashboard"
          className={`flex items-center gap-1.5 no-underline text-xs font-medium transition-colors
            ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
          <ArrowLeft size={13} /> Back to Dashboard
        </Link>
        <div className={`mt-3.5 text-base font-extrabold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Resume<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">AI</span>
          <span className={`block text-[11px] font-medium mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Builder
          </span>
        </div>
      </div>

      {/* Sections Nav */}
      <nav className="flex-1 px-2.5 py-3 flex flex-col gap-0.5 overflow-y-auto">
        <span className={`text-[10px] font-bold uppercase tracking-[1.5px] px-2 mb-1.5
          ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          Sections
        </span>

        {SECTIONS.map((s) => {
          const isActive    = activeSection === s.id
          const isCompleted = completedSections.includes(s.id)

          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer
                border-l-2 text-left transition-all text-sm
                ${isActive
                  ? isDark
                    ? 'bg-violet-500/10 border-violet-500 text-violet-400 font-semibold'
                    : 'bg-violet-500/8 border-violet-500 text-violet-600 font-semibold'
                  : `border-transparent font-medium
                    ${isDark ? 'text-slate-500 hover:text-slate-300 hover:bg-white/4' : 'text-slate-400 hover:text-slate-700 hover:bg-black/3'}`}`}
            >
              {/* Icon bubble */}
              <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center
                ${isActive
                  ? 'bg-gradient-to-br from-violet-600 to-blue-600'
                  : isCompleted
                    ? 'bg-green-400/15'
                    : isDark ? 'bg-white/6' : 'bg-black/5'}`}>
                {isCompleted && !isActive
                  ? <Check size={11} className="text-green-400" />
                  : <s.icon size={11} className={isActive ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-500'} />}
              </div>

              <span>{s.label}</span>

              {isCompleted && !isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Progress bar */}
      <div className={`px-4 py-3 border-t ${divBorder}`}>
        <div className="flex justify-between mb-1.5">
          <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Progress
          </span>
          <span className="text-[11px] font-bold text-violet-500">
            {Math.round((completedSections.length / SECTIONS.length) * 100)}%
          </span>
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/7' : 'bg-black/7'}`}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-500"
            style={{ width: `${(completedSections.length / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}