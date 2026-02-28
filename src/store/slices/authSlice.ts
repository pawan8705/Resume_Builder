/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
  uid: string
  email: string
  displayName: string
  photoURL: string | null
  emailVerified: boolean
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  verificationSent: boolean
  resetSent: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  verificationSent: false,
  resetSent: false,
}

/* ── Helpers ── */
const USERS_KEY   = 'resumeai_users'
const SESSION_KEY = 'resumeai_session'

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}') } catch { return {} }
}
const saveUser = (u: any) => {
  const users = getUsers(); users[u.email] = u
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
const saveSession = (u: AuthUser) => localStorage.setItem(SESSION_KEY, JSON.stringify(u))
const clearSession = () => localStorage.removeItem(SESSION_KEY)
const fakeDelay = (ms = 1000) => new Promise((r) => setTimeout(r, ms))
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

/* ── Thunks ── */

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    await fakeDelay(900)
    const users = getUsers()
    const found = users[email.toLowerCase()]
    if (!found) return rejectWithValue('No account found with this email.')
    if (found.password !== password) return rejectWithValue('Incorrect password. Try again.')
    const user: AuthUser = { uid: found.uid, email: found.email, displayName: found.displayName, photoURL: null, emailVerified: found.emailVerified }
    saveSession(user)
    return user
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    await fakeDelay(1100)
    const users = getUsers()
    if (users[email.toLowerCase()]) return rejectWithValue('An account with this email already exists.')
    const newUser = { uid: uid(), email: email.toLowerCase(), displayName: name, password, emailVerified: false }
    saveUser(newUser)
    const authUser: AuthUser = { uid: newUser.uid, email: newUser.email, displayName: name, photoURL: null, emailVerified: false }
    saveSession(authUser)
    return authUser
  }
)

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async () => {
    await fakeDelay(800)
    const mockUser: AuthUser = { uid: uid(), email: 'google.user@gmail.com', displayName: 'Google User', photoURL: null, emailVerified: true }
    saveSession(mockUser)
    return mockUser
  }
)

export const loginWithGithub = createAsyncThunk(
  'auth/loginWithGithub',
  async () => {
    await fakeDelay(800)
    const mockUser: AuthUser = { uid: uid(), email: 'github.user@github.com', displayName: 'GitHub User', photoURL: null, emailVerified: true }
    saveSession(mockUser)
    return mockUser
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    await fakeDelay(1000)
    const users = getUsers()
    if (!users[email.toLowerCase()]) return rejectWithValue('No account found with this email.')
    return true
  }
)

export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async () => { await fakeDelay(700); return true }
)

export const logout = createAsyncThunk('auth/logout', async () => { clearSession() })

/* ── Slice ── */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.loading = false
    },
    clearError(state) {
      state.error = null
    },
    resetFlags(state) {
      state.verificationSent = false
      state.resetSent = false
    },
    restoreSession(state) {
      try {
        const raw = localStorage.getItem('resumeai_session')
        if (raw) {
          const session = JSON.parse(raw)
          state.user = session
          state.isAuthenticated = true
        }
      } catch { /* ignore */ }
    },
  },
  extraReducers: (builder) => {
    const pending  = (state: AuthState) => { state.loading = true; state.error = null }
    const rejected = (state: AuthState, action: any) => { state.loading = false; state.error = action.payload as string }

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false; state.user = payload; state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, rejected)

    builder
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false; state.user = payload; state.isAuthenticated = true; state.verificationSent = true
      })
      .addCase(registerUser.rejected, rejected)

    builder
      .addCase(loginWithGoogle.pending, pending)
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.loading = false; state.user = payload; state.isAuthenticated = true
      })
      .addCase(loginWithGoogle.rejected, rejected)

    builder
      .addCase(loginWithGithub.pending, pending)
      .addCase(loginWithGithub.fulfilled, (state, { payload }) => {
        state.loading = false; state.user = payload; state.isAuthenticated = true
      })
      .addCase(loginWithGithub.rejected, rejected)

    builder
      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false; state.resetSent = true
      })
      .addCase(forgotPassword.rejected, rejected)

    builder
      .addCase(resendVerification.pending, pending)
      .addCase(resendVerification.fulfilled, (state) => {
        state.loading = false; state.verificationSent = true
      })
      .addCase(resendVerification.rejected, rejected)

    builder.addCase(logout.fulfilled, () => initialState)
  },
})

export const { setUser, clearError, resetFlags, restoreSession } = authSlice.actions
export default authSlice.reducer