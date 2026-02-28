import { createSlice } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

const getInitial = (): Theme => {
  try {
    const saved = localStorage.getItem('resumeai_theme') as Theme
    if (saved === 'light' || saved === 'dark') return saved
  } catch (e) {
    console.warn('Failed to retrieve theme from localStorage:', e)
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitial() as Theme },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('resumeai_theme', state.theme)
      document.documentElement.classList.toggle('dark', state.theme === 'dark')
    },
    setTheme: (state, action: { payload: Theme }) => {
      state.theme = action.payload
      localStorage.setItem('resumeai_theme', action.payload)
      document.documentElement.classList.toggle('dark', action.payload === 'dark')
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer