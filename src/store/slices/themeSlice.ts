import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { storage } from '@/lib/utils'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

const getSavedTheme = (): Theme => {
  const saved = storage.get<Theme>('theme')
  if (saved === 'light' || saved === 'dark') return saved
  // System preference check
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'dark'
}

const initialState: ThemeState = {
  theme: getSavedTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      storage.set('theme', state.theme)
      // DOM pe apply
      document.documentElement.classList.toggle('light', state.theme === 'light')
      document.documentElement.classList.toggle('dark', state.theme === 'dark')
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      storage.set('theme', action.payload)
      document.documentElement.classList.toggle('light', action.payload === 'light')
      document.documentElement.classList.toggle('dark', action.payload === 'dark')
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer