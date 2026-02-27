export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export const TEMPLATES = [
  { id: 'modern', name: 'Modern', color: '#7c3aed' },
  { id: 'classic', name: 'Classic', color: '#2563eb' },
  { id: 'minimal', name: 'Minimal', color: '#06b6d4' },
  { id: 'creative', name: 'Creative', color: '#ec4899' },
]

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const

export const SKILL_CATEGORIES = [
  'Frontend', 'Backend', 'Database', 'DevOps',
  'Mobile', 'AI/ML', 'Design', 'Other',
]

export const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: 'User' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'skills', label: 'Skills', icon: 'Zap' },
  { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { id: 'certifications', label: 'Certifications', icon: 'Award' },
] as const

export const STATS = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '95%', label: 'Interview Rate' },
  { value: '4.9★', label: 'User Rating' },
  { value: '200+', label: 'Templates' },
]

export const FEATURES = [
  {
    icon: 'Sparkles',
    title: 'AI-Powered Writing',
    description: 'Smart suggestions to make your resume stand out from thousands of applicants.',
    color: '#7c3aed',
  },
  {
    icon: 'Zap',
    title: 'ATS Optimized',
    description: 'Beat applicant tracking systems with keyword-optimized content automatically.',
    color: '#2563eb',
  },
  {
    icon: 'Layers',
    title: 'Pro Templates',
    description: 'Beautiful, recruiter-approved templates for every industry and role.',
    color: '#06b6d4',
  },
  {
    icon: 'Download',
    title: 'PDF Export',
    description: 'Download your resume as a pixel-perfect PDF ready for any job application.',
    color: '#ec4899',
  },
  {
    icon: 'Shield',
    title: 'Privacy First',
    description: 'Your data stays on your device. No server uploads, 100% private.',
    color: '#10b981',
  },
  {
    icon: 'RefreshCw',
    title: 'Real-time Preview',
    description: 'See changes instantly as you type with our live resume preview.',
    color: '#f59e0b',
  },
]