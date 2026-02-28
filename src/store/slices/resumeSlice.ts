/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
// src/store/slices/resumeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ResumeState {
  resumes: any[]
  activeResumeId: string | null
}

const load = () => {
  try { return JSON.parse(localStorage.getItem('resumeai_resumes') || '[]') } catch { return [] }
}

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: load(),
    activeResumeId: localStorage.getItem('resumeai_active_id') || null,
  } as ResumeState,
  reducers: {
    createResume: (state, action: PayloadAction<{ title: string; template: string }>) => {
      const id = Math.random().toString(36).slice(2)
      state.resumes.push({
        id,
        title:    action.payload.title,
        template: action.payload.template,
        createdAt: new Date().toISOString(),
      })
      state.activeResumeId = id
      try {
        localStorage.setItem('resumeai_resumes',   JSON.stringify(state.resumes))
        localStorage.setItem('resumeai_active_id', id)
      } catch {}
    },
    setActiveResume: (state, action: PayloadAction<string>) => {
      state.activeResumeId = action.payload
      try { localStorage.setItem('resumeai_active_id', action.payload) } catch {}
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(r => r.id !== action.payload)
      if (state.activeResumeId === action.payload)
        state.activeResumeId = state.resumes[0]?.id ?? null
      try { localStorage.setItem('resumeai_resumes', JSON.stringify(state.resumes)) } catch {}
    },
  },
})

export const { createResume, setActiveResume, deleteResume } = resumeSlice.actions
export default resumeSlice.reducer