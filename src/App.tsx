import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { restoreSession } from "@/store/slices/authSlice";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ResumeBuilderPage = lazy(() => import("@/pages/ResumeBuilderPage"));
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
const ProfileSettingsPage = lazy(() => import("@/pages/ProfileSettingsPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
import ProtectedRoute from "@/components/ProtectedRoute";

function Loader() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]"}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="size-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-2xl animate-pulse"
          style={{ boxShadow: "0 0 24px rgba(124,58,237,0.5)" }}
        >
          📄
        </div>
        <div className="flex gap-1.5">
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

    // Thin custom scrollbars
    let styleEl = document.getElementById("__scrollbar_style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "__scrollbar_style";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"};
        border-radius: 999px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.22)"};
      }
    `;
  }, [theme]);
  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInit>
          <ThemeSync>
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/templates" element={<TemplatesPage />} />

                {/* Protected */}
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
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <ProfileSettingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <AnalyticsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>

            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: "10px 16px",
                },
              }}
            />
          </ThemeSync>
        </AppInit>
      </BrowserRouter>
    </Provider>
  );
}
