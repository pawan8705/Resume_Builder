import { configureStore } from '@reduxjs/toolkit'
import authReducer   from './slices/authSlice'
import themeReducer  from './slices/themeSlice'
import resumeReducer from './slices/resumeSlice'

export const store = configureStore({
  reducer: {
    auth:   authReducer,
    theme:  themeReducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch