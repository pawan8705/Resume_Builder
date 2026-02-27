/* eslint-disable @typescript-eslint/no-explicit-any */
// src/data/resumeBuilder.data.ts

import { ResumeData, Template, SectionId } from '@/types/resume.types'
import {
  User, Briefcase, GraduationCap,
  Code2, ExternalLink, Award
} from 'lucide-react'

export const INITIAL_RESUME: ResumeData = {
  personal: {
    name: 'Alex Johnson',
    title: 'Senior Software Engineer',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    website: 'alexjohnson.dev',
    summary:
      'Passionate software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud infrastructure. Led teams of 5+ engineers delivering products used by millions.',
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      start: '2021-01',
      end: '',
      current: true,
      bullets: [
        'Led development of microservices architecture serving 2M+ users',
        'Reduced API latency by 40% through Redis caching implementation',
        'Mentored 3 junior engineers, improving team velocity by 25%',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      start: '2019-03',
      end: '2020-12',
      current: false,
      bullets: [
        'Built React dashboard used by 50K+ customers',
        'Integrated 10+ third-party APIs including Stripe and Twilio',
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      start: '2015',
      end: '2019',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', name: 'React / Next.js', level: 95 },
    { id: '2', name: 'TypeScript', level: 90 },
    { id: '3', name: 'Node.js', level: 85 },
    { id: '4', name: 'AWS / Cloud', level: 78 },
    { id: '5', name: 'PostgreSQL', level: 80 },
    { id: '6', name: 'Docker / K8s', level: 72 },
  ],
  projects: [
    {
      id: '1',
      name: 'AI Resume Builder',
      description: 'Full-stack SaaS app with AI-powered resume generation used by 10K+ users',
      tech: 'React, Node.js, OpenAI, PostgreSQL',
      link: 'github.com/alex/resume-builder',
    },
  ],
  certificates: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-06',
    },
  ],
}

export const TEMPLATES: Template[] = [
  { id: 'modern',    name: 'Modern',    accent: '#7c3aed', description: 'Clean & professional' },
  { id: 'minimal',   name: 'Minimal',   accent: '#0f172a', description: 'Less is more'         },
  { id: 'classic',   name: 'Classic',   accent: '#1d4ed8', description: 'Timeless style'       },
  { id: 'creative',  name: 'Creative',  accent: '#059669', description: 'Stand out boldly'     },
  { id: 'executive', name: 'Executive', accent: '#b45309', description: 'Senior leadership'    },
]

export const SECTIONS: { id: SectionId; label: string; icon: any }[] = [
  { id: 'personal',     label: 'Personal Info',  icon: User          },
  { id: 'experience',   label: 'Experience',     icon: Briefcase     },
  { id: 'education',    label: 'Education',      icon: GraduationCap },
  { id: 'skills',       label: 'Skills',         icon: Code2         },
  { id: 'projects',     label: 'Projects',       icon: ExternalLink  },
  { id: 'certificates', label: 'Certifications', icon: Award         },
]

export const AI_SUGGESTIONS: Record<SectionId, string[]> = {
  personal: [
    'Add a compelling professional summary with keywords',
    'Include your LinkedIn URL for recruiter outreach',
    'Mention your key specialization in the title',
  ],
  experience: [
    'Quantify achievements with numbers/percentages',
    'Start each bullet with a strong action verb',
    'Add measurable impact metrics to each role',
  ],
  education: [
    'Add relevant coursework if recent graduate',
    'Include GPA only if above 3.5',
    'List academic awards or honors received',
  ],
  skills: [
    'Group skills by category for easier scanning',
    'Add proficiency levels for honest representation',
    'Include trending technologies in your field',
  ],
  projects: [
    'Add live demo or GitHub links',
    'Mention team size and your specific role',
    'Highlight user numbers or business impact',
  ],
  certificates: [
    'Add expiry/renewal dates if applicable',
    'Include certificate ID for verification',
    'Sort by most recent or most relevant first',
  ],
}

export const uid = () => Math.random().toString(36).slice(2, 9)