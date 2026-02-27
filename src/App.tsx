// src/App.tsx — Complete routing with 404

import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { restoreSession } from "@/store/slices/authSlice";

const HomePage = lazy(() => import("@/pages/HomePage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ResumeBuilderPage = lazy(() => import("@/pages/ResumeBuilderPage"));
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
import ProtectedRoute from "@/components/ProtectedRoute";

function LoadingFallback() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]"}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-xl animate-pulse">
          📄
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full bg-violet-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return <>{children}</>;
}

function ThemeSync({ children }: { children: React.ReactNode }) {
  const { theme } = useAppSelector((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.background = theme === "dark" ? "#08080f" : "#f1f5f9";
  }, [theme]);
  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInit>
          <ThemeSync>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/builder"
                  element={
                    <ProtectedRoute>
                      <ResumeBuilderPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>

            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 500,
                },
              }}
            />
          </ThemeSync>
        </AppInit>
      </BrowserRouter>
    </Provider>
  );
}
