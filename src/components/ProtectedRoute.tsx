import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAppSelector((s) => s.auth)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080f]">
        <div className="size-5 rounded-full border-2 border-white/20 border-t-violet-500 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/?auth=signin" replace />
  return <>{children}</>
}