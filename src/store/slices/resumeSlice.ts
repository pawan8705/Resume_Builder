import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { storage, generateId } from '@/lib/utils'
import {
  ResumeData, PersonalInfo, Experience,
  Education, Skill, Project, Certification
} from '@/types'

interface ResumeState {
  resumes: ResumeData[]
  activeResumeId: string | null
  activeSection: string
  isSaving: boolean
  completionScore: number
}

// Resume kitna complete hai uska score calculate karo
const calculateScore = (resume: ResumeData): number => {
  let score = 0
  const p = resume.personalInfo
  if (p.fullName)  score += 10
  if (p.email)     score += 10
  if (p.phone)     score += 5
  if (p.location)  score += 5
  if (p.summary)   score += 10
  if (p.linkedin)  score += 5
  if (p.github)    score += 5
  if (resume.experiences.length > 0)    score += 20
  if (resume.education.length > 0)      score += 15
  if (resume.skills.length > 0)         score += 10
  if (resume.projects.length > 0)       score += 5
  return Math.min(score, 100)
}

const initialState: ResumeState = {
  resumes: storage.get<ResumeData[]>('resumes') || [],
  activeResumeId: storage.get<string>('activeResumeId'),
  activeSection: 'personal',
  isSaving: false,
  completionScore: 0,
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {

    // ── Resume CRUD ──────────────────────────────────────────
    createResume: (state, action: PayloadAction<{ title: string; template: string }>) => {
      const newResume: ResumeData = {
        id: generateId(),
        title: action.payload.title,
        template: action.payload.template,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        personalInfo: {
          fullName: '', email: '', phone: '', location: '',
          linkedin: '', github: '', portfolio: '', summary: '',
        },
        experiences: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
      }
      state.resumes.push(newResume)
      state.activeResumeId = newResume.id
      state.completionScore = 0
      storage.set('resumes', state.resumes)
      storage.set('activeResumeId', newResume.id)
    },

    setActiveResume: (state, action: PayloadAction<string>) => {
      state.activeResumeId = action.payload
      storage.set('activeResumeId', action.payload)
      const resume = state.resumes.find(r => r.id === action.payload)
      if (resume) state.completionScore = calculateScore(resume)
    },

    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(r => r.id !== action.payload)
      if (state.activeResumeId === action.payload) {
        state.activeResumeId = state.resumes[0]?.id || null
      }
      storage.set('resumes', state.resumes)
    },

    duplicateResume: (state, action: PayloadAction<string>) => {
      const original = state.resumes.find(r => r.id === action.payload)
      if (original) {
        const copy: ResumeData = {
          ...JSON.parse(JSON.stringify(original)),
          id: generateId(),
          title: `${original.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        state.resumes.push(copy)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Navigation ───────────────────────────────────────────
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload
    },

    // ── Personal Info ────────────────────────────────────────
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.personalInfo = { ...resume.personalInfo, ...action.payload }
        resume.updatedAt = new Date().toISOString()
        state.completionScore = calculateScore(resume)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Experience ───────────────────────────────────────────
    addExperience: (state) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.experiences.push({
          id: generateId(), company: '', position: '',
          startDate: '', endDate: '', current: false,
          description: '', achievements: [],
        })
        storage.set('resumes', state.resumes)
      }
    },

    updateExperience: (state, action: PayloadAction<{ id: string; data: Partial<Experience> }>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        const exp = resume.experiences.find((e: { id: string }) => e.id === action.payload.id)
        if (exp) Object.assign(exp, action.payload.data)
        resume.updatedAt = new Date().toISOString()
        state.completionScore = calculateScore(resume)
        storage.set('resumes', state.resumes)
      }
    },

    deleteExperience: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.experiences = resume.experiences.filter((e: { id: string }) => e.id !== action.payload)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Education ────────────────────────────────────────────
    addEducation: (state) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.education.push({
          id: generateId(), institution: '', degree: '',
          field: '', startDate: '', endDate: '',
          gpa: '', achievements: [],
        })
        storage.set('resumes', state.resumes)
      }
    },

    updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<Education> }>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        const edu = resume.education.find((e: { id: string }) => e.id === action.payload.id)
        if (edu) Object.assign(edu, action.payload.data)
        resume.updatedAt = new Date().toISOString()
        state.completionScore = calculateScore(resume)
        storage.set('resumes', state.resumes)
      }
    },

    deleteEducation: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.education = resume.education.filter((e: { id: string }) => e.id !== action.payload)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Skills ───────────────────────────────────────────────
    addSkill: (state, action: PayloadAction<Omit<Skill, 'id'>>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.skills.push({ ...action.payload, id: generateId() })
        resume.updatedAt = new Date().toISOString()
        state.completionScore = calculateScore(resume)
        storage.set('resumes', state.resumes)
      }
    },

    deleteSkill: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.skills = resume.skills.filter((s: { id: string }) => s.id !== action.payload)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Projects ─────────────────────────────────────────────
    addProject: (state) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.projects.push({
          id: generateId(), name: '', description: '',
          technologies: [], link: '', github: '',
          startDate: '', endDate: '',
        })
        storage.set('resumes', state.resumes)
      }
    },

    updateProject: (state, action: PayloadAction<{ id: string; data: Partial<Project> }>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        const project = resume.projects.find((p: { id: string }) => p.id === action.payload.id)
        if (project) Object.assign(project, action.payload.data)
        resume.updatedAt = new Date().toISOString()
        storage.set('resumes', state.resumes)
      }
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.projects = resume.projects.filter((p: { id: string }) => p.id !== action.payload)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Certifications ───────────────────────────────────────
    addCertification: (state) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.certifications.push({
          id: generateId(), name: '', issuer: '', date: '', link: '',
        })
        storage.set('resumes', state.resumes)
      }
    },

    updateCertification: (state, action: PayloadAction<{ id: string; data: Partial<Certification> }>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        const cert = resume.certifications.find((c: { id: string }) => c.id === action.payload.id)
        if (cert) Object.assign(cert, action.payload.data)
        resume.updatedAt = new Date().toISOString()
        storage.set('resumes', state.resumes)
      }
    },

    deleteCertification: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.certifications = resume.certifications.filter((c: { id: string }) => c.id !== action.payload)
        storage.set('resumes', state.resumes)
      }
    },

    // ── Template ─────────────────────────────────────────────
    setTemplate: (state, action: PayloadAction<string>) => {
      const resume = state.resumes.find(r => r.id === state.activeResumeId)
      if (resume) {
        resume.template = action.payload
        storage.set('resumes', state.resumes)
      }
    },

    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
    },
  },
})

export const {
  createResume, setActiveResume, deleteResume, duplicateResume,
  setActiveSection,
  updatePersonalInfo,
  addExperience, updateExperience, deleteExperience,
  addEducation, updateEducation, deleteEducation,
  addSkill, deleteSkill,
  addProject, updateProject, deleteProject,
  addCertification, updateCertification, deleteCertification,
  setTemplate, setSaving,
} = resumeSlice.actions

export default resumeSlice.reducer