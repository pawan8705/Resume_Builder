/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
// src/pages/DashboardPage.tsx — Full functionality with working CRUD

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FileText, Palette, Settings, LogOut,
  Plus, Upload, TrendingUp, Eye, Download, MoreHorizontal,
  Edit3, Trash2, Copy, ChevronRight, Sparkles, Bell,
  AlertTriangle, Menu, X, BarChart2, Clock, CheckCircle,
  Zap, Home, Search,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { toggleTheme } from '@/store/slices/themeSlice'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'resumeai_resume_data'
const TEMPLATE_KEY = 'resumeai_template'
const TITLE_KEY = 'resumeai_resume_title'

interface MockResume {
  id: string
  title: string
  template: string
  atsScore: number
  lastEdited: string
  status: 'active' | 'draft'
  views: number
  downloads: number
}

const DEFAULT_RESUMES: MockResume[] = [
  { id: '1', title: 'Software Engineer Resume', template: 'Modern',  atsScore: 94, lastEdited: '2 hours ago', status: 'active', views: 128, downloads: 12 },
  { id: '2', title: 'Full Stack Developer CV',  template: 'Minimal', atsScore: 87, lastEdited: '1 day ago',   status: 'active', views: 84,  downloads: 7  },
  { id: '3', title: 'Product Manager Resume',   template: 'Classic', atsScore: 76, lastEdited: '3 days ago',  status: 'draft',  views: 22,  downloads: 2  },
]

const STATS = [
  { label: 'Total Resumes', value: (n: number) => `${n}`, icon: FileText,  color: 'text-violet-400', iconBg: 'bg-violet-500/12'  },
  { label: 'Avg ATS Score', value: (n: number) => `${n}%`, icon: TrendingUp, color: 'text-blue-400',   iconBg: 'bg-blue-500/12'    },
  { label: 'Total Views',   value: (n: number) => `${n}`, icon: Eye,        color: 'text-cyan-400',   iconBg: 'bg-cyan-500/12'    },
  { label: 'Downloads',     value: (n: number) => `${n}`, icon: Download,   color: 'text-emerald-400',iconBg: 'bg-emerald-500/12' },
]

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText,        label: 'My Resumes',id: 'resumes'   },
  { icon: Palette,         label: 'Templates', id: 'templates' },
  { icon: BarChart2,       label: 'Analytics', id: 'analytics' },
  { icon: Settings,        label: 'Settings',  id: 'settings'  },
]

const QUICK_ACTIONS = [
  { icon: Plus,     label: 'Create Resume', sub: 'Start fresh',        grad: 'from-violet-600 to-blue-600',  shadow: 'rgba(124,58,237,0.4)', link: '/builder' },
  { icon: Upload,   label: 'Upload Resume', sub: 'Import & AI enhance',grad: 'from-cyan-600 to-sky-600',     shadow: 'rgba(8,145,178,0.4)',  link: null       },
  { icon: Sparkles, label: 'AI Optimize',   sub: 'Boost ATS score',    grad: 'from-emerald-600 to-teal-600', shadow: 'rgba(5,150,105,0.4)',  link: null       },
  { icon: Zap,      label: 'Job Match',     sub: 'Find matching jobs',  grad: 'from-amber-500 to-orange-500', shadow: 'rgba(217,119,6,0.4)', link: null       },
]

/* ── Logout Modal ── */
function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const isDark = useAppSelector((s) => s.theme.theme === 'dark')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/65 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.88, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 16, opacity: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl p-7 shadow-2xl text-center ${isDark ? 'bg-[#0e0e1c] border border-white/8' : 'bg-white border border-black/8'}`}>
        <div className="size-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h3 className={`text-lg font-black mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Log out?</h3>
        <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Your resume data is saved locally.</p>
        <div className="flex gap-2.5">
          <button onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl cursor-pointer font-semibold text-sm border bg-transparent ${isDark ? 'border-white/10 text-slate-400' : 'border-black/10 text-slate-500'}`}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl cursor-pointer font-bold text-sm bg-gradient-to-r from-red-500 to-red-600 text-white border-none flex items-center justify-center gap-1.5">
            <LogOut size={13} /> Yes, Logout
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Delete Confirm Modal ── */
function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  const isDark = useAppSelector((s) => s.theme.theme === 'dark')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/65 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.88, y: 12, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 12, opacity: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center ${isDark ? 'bg-[#0e0e1c] border border-white/8' : 'bg-white border border-black/8'}`}>
        <div className="size-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className={`text-base font-black mb-1.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Delete Resume?</h3>
        <p className={`text-xs mb-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>"{title}" will be permanently deleted.</p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl cursor-pointer font-semibold text-sm border bg-transparent ${isDark ? 'border-white/10 text-slate-400' : 'border-black/10 text-slate-500'}`}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl cursor-pointer font-bold text-sm bg-red-500 text-white border-none">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Resume Card ── */
function ResumeCard({ resume, isDark, onEdit, onDelete, onDuplicate, onDownload }: {
  resume: MockResume; isDark: boolean
  onEdit: () => void; onDelete: () => void; onDuplicate: () => void; onDownload: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const atsColor =
    resume.atsScore >= 90 ? 'text-green-400' :
    resume.atsScore >= 75 ? 'text-amber-400' : 'text-red-400'
  const atsBar =
    resume.atsScore >= 90 ? 'from-green-400 to-green-500' :
    resume.atsScore >= 75 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-red-500'
  const divB = isDark ? 'border-white/[0.07]' : 'border-black/[0.07]'

  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}
      className={`rounded-2xl p-4 border transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.3)]' : 'bg-white border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.06)]'}`}>
      <div className="flex items-start justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="size-10 rounded-xl flex items-center justify-center shrink-0 bg-violet-500/12">
            <FileText size={17} className="text-violet-400" />
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{resume.title}</p>
            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{resume.template} Template</p>
          </div>
        </div>
        {/* 3-dot menu */}
        <div className="relative shrink-0">
          <button onClick={() => setMenuOpen(!menuOpen)}
            className={`size-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-colors ${menuOpen ? isDark ? 'bg-white/8 text-slate-200' : 'bg-black/6 text-slate-700' : isDark ? 'bg-transparent text-slate-500 hover:bg-white/6' : 'bg-transparent text-slate-400 hover:bg-black/5'}`}>
            <MoreHorizontal size={15} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.13 }}
                className={`absolute right-0 top-9 z-50 rounded-xl border p-1.5 min-w-[140px] shadow-2xl ${isDark ? 'bg-[#141428] border-white/8' : 'bg-white border-black/8'}`}>
                {[
                  { icon: Edit3,    label: 'Edit',      fn: onEdit,      clr: isDark ? 'text-slate-200' : 'text-slate-700' },
                  { icon: Copy,     label: 'Duplicate', fn: onDuplicate, clr: isDark ? 'text-slate-200' : 'text-slate-700' },
                  { icon: Download, label: 'Download',  fn: onDownload,  clr: isDark ? 'text-slate-200' : 'text-slate-700' },
                  { icon: Trash2,   label: 'Delete',    fn: onDelete,    clr: 'text-red-400' },
                ].map((item) => (
                  <button key={item.label}
                    onClick={() => { setMenuOpen(false); item.fn() }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer border-none bg-transparent text-left ${item.clr} ${isDark ? 'hover:bg-white/6' : 'hover:bg-slate-50'}`}>
                    <item.icon size={12} /> {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ATS Bar */}
      <div className="mb-3.5">
        <div className="flex justify-between mb-1.5">
          <span className={`text-[11px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>ATS Score</span>
          <span className={`text-[11px] font-black ${atsColor}`}>{resume.atsScore}%</span>
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/7' : 'bg-black/7'}`}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${resume.atsScore}%` }} transition={{ delay: 0.3, duration: 0.8 }}
            className={`h-full rounded-full bg-gradient-to-r ${atsBar}`} />
        </div>
      </div>

      <div className={`flex items-center gap-3 mb-3.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        <span className="flex items-center gap-1"><Eye size={11}/> {resume.views}</span>
        <span className="flex items-center gap-1"><Download size={11}/> {resume.downloads}</span>
        <span className="ml-auto flex items-center gap-1"><Clock size={10}/> {resume.lastEdited}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0
          ${resume.status === 'active' ? 'bg-green-400/10 text-green-400 border-green-400/25' : 'bg-amber-400/10 text-amber-400 border-amber-400/25'}`}>
          {resume.status === 'active' ? '● Active' : '○ Draft'}
        </span>
        <button onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold cursor-pointer border-none hover:opacity-90">
          <Edit3 size={11}/> Edit Resume
        </button>
      </div>
    </motion.div>
  )
}

/* ════ MAIN DASHBOARD ════ */
export default function DashboardPage() {
  const dispatch  = useAppDispatch()
  const navigate  = useNavigate()
  const isDark    = useAppSelector((s) => s.theme.theme === 'dark')
  const { user }  = useAppSelector((s) => s.auth)

  const [resumes, setResumes]         = useState<MockResume[]>(DEFAULT_RESUMES)
  const [activeNav, setActiveNav]     = useState('dashboard')
  const [showLogout, setShowLogout]   = useState(false)
  const [mobileSidebar, setMobile]    = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<MockResume | null>(null)
  const [search, setSearch]           = useState('')

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const avgATS  = resumes.length ? Math.round(resumes.reduce((a, b) => a + b.atsScore, 0) / resumes.length) : 0
  const totalViews = resumes.reduce((a, b) => a + b.views, 0)
  const totalDl    = resumes.reduce((a, b) => a + b.downloads, 0)
  const statsValues = [resumes.length, avgATS, totalViews, totalDl]

  const initials = user?.displayName
    ? user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const handleLogout = () => { dispatch(logout()); toast.success('Logged out! 👋'); navigate('/') }

  const handleEdit = (r: MockResume) => {
    localStorage.setItem(TITLE_KEY, r.title)
    toast.success('Opening resume editor...')
    navigate('/builder')
  }

  const handleDuplicate = (r: MockResume) => {
    const copy: MockResume = {
      ...r,
      id: Date.now().toString(),
      title: `${r.title} (Copy)`,
      lastEdited: 'Just now',
      status: 'draft',
      views: 0,
      downloads: 0,
    }
    setResumes([copy, ...resumes])
    toast.success('Resume duplicated! ✅')
  }

  const handleDelete = (r: MockResume) => setDeleteTarget(r)

  const confirmDelete = () => {
    if (!deleteTarget) return
    setResumes(resumes.filter((r) => r.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.title}" deleted`)
    setDeleteTarget(null)
  }

  const handleDownload = (r: MockResume) => {
    localStorage.setItem(TITLE_KEY, r.title)
    toast('Opening builder to download PDF...', { icon: '📄' })
    navigate('/builder')
  }

  const bg   = isDark ? 'bg-[#08080f]' : 'bg-[#f1f5f9]'
  const side = isDark ? 'bg-[#0a0a18]' : 'bg-white'
  const main = isDark ? 'bg-[#0d0d1e]' : 'bg-[#f8fafc]'
  const divB = isDark ? 'border-white/[0.07]' : 'border-black/[0.07]'

  const SidebarContent = () => (
    <div className={`flex flex-col h-full ${side}`}>
      <div className={`px-4 pt-4 pb-3.5 border-b ${divB} flex items-center justify-between`}>
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="size-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm shrink-0" style={{ boxShadow: '0 0 14px rgba(124,58,237,0.4)' }}>📄</div>
          <span className={`font-black text-base ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Resume<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>
        <button onClick={() => setMobile(false)} className={`md:hidden size-8 rounded-xl border-none cursor-pointer flex items-center justify-center ${isDark ? 'bg-white/6 text-slate-400' : 'bg-black/5 text-slate-500'}`}>
          <X size={15}/>
        </button>
      </div>
      <div className={`px-3 py-2 border-b ${divB}`}>
        <Link to="/" className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium no-underline transition-colors ${isDark ? 'text-slate-500 hover:text-slate-200 hover:bg-white/5' : 'text-slate-400 hover:text-slate-700 hover:bg-black/4'}`}>
          <Home size={12}/> Back to Homepage
        </Link>
      </div>
      <nav className="flex-1 px-2.5 py-2.5 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = activeNav === item.id
          return (
            <button key={item.id} onClick={() => {
                setActiveNav(item.id); setMobile(false)
                if (item.id === 'templates') navigate('/templates')
                else if (item.id === 'analytics') navigate('/analytics')
                else if (item.id === 'settings') navigate('/settings')
                else if (item.id === 'resumes') { /* stay on dashboard, scroll to resumes */ }
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-l-2 text-sm font-medium cursor-pointer border-none transition-all
                ${active ? isDark ? 'bg-violet-500/12 border-violet-500 text-violet-400 font-semibold' : 'bg-violet-500/8 border-violet-500 text-violet-600 font-semibold'
                         : `border-transparent ${isDark ? 'text-slate-500 hover:text-slate-200 hover:bg-white/5' : 'text-slate-400 hover:text-slate-700 hover:bg-black/4'}`}`}>
              <item.icon size={16}/> {item.label}
              {active && <ChevronRight size={12} className="ml-auto text-violet-400"/>}
            </button>
          )
        })}
      </nav>
      <div className={`p-3 border-t ${divB}`}>
        <div className={`flex items-center gap-2.5 p-3 rounded-xl mb-2.5 ${isDark ? 'bg-white/3' : 'bg-black/3'}`}>
          <div className="size-9 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0">{initials}</div>
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{user?.displayName || 'User'}</p>
            <p className={`text-[11px] truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{user?.email || ''}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => dispatch(toggleTheme())} className={`flex-1 py-2 rounded-xl text-xs font-medium cursor-pointer border bg-transparent ${isDark ? 'border-white/10 text-slate-400' : 'border-black/10 text-slate-500'}`}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => setShowLogout(true)} className="flex-1 py-2 rounded-xl text-xs font-semibold cursor-pointer border-none bg-red-500/10 text-red-400 flex items-center justify-center gap-1">
            <LogOut size={11}/> Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
        {deleteTarget && <DeleteModal title={deleteTarget.title} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}
      </AnimatePresence>

      <div className={`flex h-screen overflow-hidden ${bg}`}>
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex flex-col w-[220px] shrink-0 border-r ${divB}`}>
          <SidebarContent/>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileSidebar && (<>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobile(false)} className="fixed inset-0 bg-black/55 z-40 md:hidden"/>
            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className={`fixed left-0 top-0 bottom-0 w-[240px] z-50 border-r ${divB} md:hidden`}>
              <SidebarContent/>
            </motion.div>
          </>)}
        </AnimatePresence>

        {/* Main */}
        <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${main}`}>
          {/* Topbar */}
          <div className={`h-14 px-4 flex items-center gap-3 shrink-0 border-b backdrop-blur-xl sticky top-0 z-20 ${isDark ? 'bg-[#0d0d1e]/95 border-white/[0.07]' : 'bg-white/95 border-black/[0.07]'}`}>
            <button onClick={() => setMobile(true)} className={`md:hidden size-9 rounded-xl border-none cursor-pointer flex items-center justify-center shrink-0 ${isDark ? 'bg-white/6 text-slate-200' : 'bg-black/5 text-slate-700'}`}>
              <Menu size={17}/>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className={`text-lg font-black leading-none tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Dashboard</h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Welcome back, {user?.displayName?.split(' ')[0] || 'there'} 👋</p>
            </div>
            {/* Search */}
            <div className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border ${isDark ? 'bg-white/5 border-white/8' : 'bg-black/4 border-black/8'}`}>
              <Search size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'}/>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resumes..."
                className={`border-none bg-transparent outline-none text-xs w-36 ${isDark ? 'text-slate-100 placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}/>
            </div>
            <button className={`relative size-9 rounded-xl border-none cursor-pointer flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-black/4 text-slate-500'}`}>
              <Bell size={15}/>
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-violet-500" style={{ border: `2px solid ${isDark ? '#0d0d1e' : '#fff'}` }}/>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 sm:p-5 md:p-6 max-w-6xl mx-auto">

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {STATS.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className={`p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-black/[0.07] shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-semibold leading-tight ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</span>
                      <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                        <stat.icon size={15} className={stat.color}/>
                      </div>
                    </div>
                    <p className={`text-2xl font-black tracking-tight leading-none ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {stat.value(statsValues[i])}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mb-5">
                <h2 className={`text-sm font-bold mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Quick Actions</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {QUICK_ACTIONS.map((action, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}>
                      {action.link ? (
                        <Link to={action.link} className="no-underline block">
                          <div className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${isDark ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.055]' : 'bg-white border-black/[0.07] shadow-sm hover:shadow-md'}`}>
                            <div className={`size-10 rounded-xl bg-gradient-to-br ${action.grad} flex items-center justify-center shrink-0`} style={{ boxShadow: `0 4px 12px ${action.shadow}` }}>
                              <action.icon size={17} className="text-white"/>
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{action.label}</p>
                              <p className={`text-[11px] truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{action.sub}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <button onClick={() => toast(`${action.label} — launching soon! 🚀`, { icon: '🔔', duration: 2500 })}
                          className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all text-left ${isDark ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.055]' : 'bg-white border-black/[0.07] shadow-sm hover:shadow-md'}`}>
                          <div className={`size-10 rounded-xl bg-gradient-to-br ${action.grad} flex items-center justify-center shrink-0`} style={{ boxShadow: `0 4px 12px ${action.shadow}` }}>
                            <action.icon size={17} className="text-white"/>
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{action.label}</p>
                            <p className={`text-[11px] truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{action.sub}</p>
                          </div>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resumes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    My Resumes <span className={`text-xs font-normal ml-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>({filteredResumes.length})</span>
                  </h2>
                  <Link to="/builder" className="no-underline">
                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold cursor-pointer border-none hover:opacity-90">
                      <Plus size={12}/> New Resume
                    </button>
                  </Link>
                </div>

                {/* Mobile search */}
                <div className={`sm:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border mb-3 ${isDark ? 'bg-white/5 border-white/8' : 'bg-white border-black/8'}`}>
                  <Search size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'}/>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resumes..."
                    className={`border-none bg-transparent outline-none text-xs flex-1 ${isDark ? 'text-slate-100 placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'}`}/>
                </div>

                {filteredResumes.length === 0 ? (
                  <div className={`text-center py-12 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-black/[0.06]'}`}>
                    <FileText size={32} className={`mx-auto mb-3 ${isDark ? 'text-slate-700' : 'text-slate-300'}`}/>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No resumes found</p>
                    <p className={`text-xs mb-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{search ? 'Try a different search' : 'Create your first resume to get started'}</p>
                    <Link to="/builder" className="no-underline">
                      <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-semibold cursor-pointer border-none">
                        + Create Resume
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {filteredResumes.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <ResumeCard resume={r} isDark={isDark}
                          onEdit={() => handleEdit(r)}
                          onDelete={() => handleDelete(r)}
                          onDuplicate={() => handleDuplicate(r)}
                          onDownload={() => handleDownload(r)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}