export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  role: string
  start: string
  end: string
  current: boolean
  bullets: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  start: string
  end: string
  gpa: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string
  link: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certificates: Certificate[]
}

export type SectionId = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certificates'

export interface Template {
  id: string
  name: string
  accent: string
  description: string
}