/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/AuthPage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  X,
  Sparkles,
  Mail,
  Lock,
  User,
  Github,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  loginWithGithub,
  forgotPassword,
  resendVerification,
  clearError,
} from "@/store/slices/authSlice";
import toast from "react-hot-toast";

type Mode = "signin" | "signup" | "forgot";

/* ── Validation ── */
const validate = {
  name: (v: string) => (v.trim().length >= 2 ? "" : "At least 2 characters"),
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email",
  password: (v: string) => (v.length >= 8 ? "" : "Min 8 characters"),
  confirm: (v: string, p: string) => (v === p ? "" : "Passwords do not match"),
};

const passwordStrength = (p: string) => {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^a-zA-Z0-9]/.test(p)) score++;
  return score;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "💪 Strong"];
const strengthColor = [
  "",
  "bg-red-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-green-500",
];

/* ── Google SVG Icon ── */
const GoogleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((s) => s.theme);
  const { isAuthenticated, loading, error, verificationSent, resetSent, user } =
    useAppSelector((s) => s.auth);
  const isDark = theme === "dark";

  const [mode, setMode] = useState<Mode>(
    (searchParams.get("auth") as Mode) || "signin",
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  /* Redirect if already logged in */
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated]);

  /* Show firebase error as toast */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  /* Sync URL mode */
  useEffect(() => {
    const m = searchParams.get("auth") as Mode;
    if (m && ["signin", "signup", "forgot"].includes(m)) setMode(m);
  }, [searchParams]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setForm({ name: "", email: "", password: "", confirm: "" });
    setErrors({ name: "", email: "", password: "", confirm: "" });
    setTouched({ name: false, email: false, password: false, confirm: false });
    setShowPass(false);
    setShowConfirm(false);
    navigate(`/?auth=${m}`, { replace: true });
  };

  const set =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setForm((f) => ({ ...f, [field]: val }));
      if (touched[field]) {
        const err =
          field === "confirm"
            ? validate.confirm(val, form.password)
            : (
                validate[field as keyof typeof validate] as (
                  v: string,
                ) => string
              )(val);
        setErrors((er) => ({ ...er, [field]: err }));
      }
    };

  const blur = (field: keyof typeof form) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const err =
      field === "confirm"
        ? validate.confirm(form[field], form.password)
        : (validate[field as keyof typeof validate] as (v: string) => string)(
            form[field],
          );
    setErrors((er) => ({ ...er, [field]: err }));
  };

  const isValid = () => {
    if (mode === "forgot") return !validate.email(form.email);
    if (mode === "signin")
      return !validate.email(form.email) && !validate.password(form.password);
    return (
      !validate.name(form.name) &&
      !validate.email(form.email) &&
      !validate.password(form.password) &&
      !validate.confirm(form.confirm, form.password)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!isValid()) return;

    if (mode === "forgot") {
      await dispatch(forgotPassword(form.email));
      return;
    }
    if (mode === "signin") {
      const res = await dispatch(
        loginUser({ email: form.email, password: form.password }),
      );
      if (!res.error) toast.success("Welcome back! 👋");
    } else {
      const res = await dispatch(
        registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      );
      if (!res.error) toast.success("Account created! Check your email 📧");
    }
  };

  const handleGoogle = async () => {
    const res = await dispatch(loginWithGoogle());
    if (!res.error) toast.success("Signed in with Google! 🎉");
  };

  const handleGithub = async () => {
    const res = await dispatch(loginWithGithub());
    if (!res.error) toast.success("Signed in with GitHub! 🎉");
  };

  const handleResendVerification = async () => {
    await dispatch(resendVerification());
    toast.success("Verification email sent!");
  };

  /* ── Styles ── */
  const pageBg = isDark ? "bg-[#08080f]" : "bg-slate-50";
  const cardBg = isDark
    ? "bg-[#0e0e1c] border-white/8"
    : "bg-white border-black/8";
  const lbl = isDark ? "text-slate-400" : "text-slate-500";
  const hdg = isDark ? "text-slate-100" : "text-slate-900";
  const divider = isDark ? "bg-white/8" : "bg-black/8";

  const inputCls = (field: keyof typeof errors) =>
    [
      "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-transparent",
      errors[field] && touched[field]
        ? "border-red-500/50 text-red-400 focus:border-red-500/70"
        : isDark
          ? "border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.10)]"
          : "border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.08)]",
    ].join(" ");

  const socialBtn = `flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border cursor-pointer text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
    isDark
      ? "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/7"
      : "border-black/10 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
  }`;

  const strength = passwordStrength(form.password);

  return (
    <div className={`min-h-screen w-full flex ${pageBg}`}>
      {/* ════════════════════════════════════
          LEFT PANEL — Branding
      ════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between w-[460px] shrink-0 relative overflow-hidden p-10"
        style={{
          background: "linear-gradient(160deg,#2e1065,#1e1b4b,#0f172a)",
        }}
      >
        {/* BG Effects */}
        <div
          className="absolute -top-20 -left-20 size-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-10 size-[320px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Logo + Heading */}
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-14">
            <div
              className="size-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center"
              style={{ boxShadow: "0 0 20px rgba(124,58,237,0.55)" }}
            >
              <span className="text-base">📄</span>
            </div>
            <span className="text-white font-black text-[18px] tracking-tight">
              Resume
              <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </div>

          <h2
            className="text-white font-black leading-[1.08] tracking-tighter mb-5"
            style={{ fontSize: "clamp(30px,3vw,44px)" }}
          >
            Your Next Job
            <br />
            Starts With a
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Perfect Resume.
            </span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            Join 50,000+ professionals. Build ATS-optimized resumes with AI in
            minutes — not hours.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[
            ["50K+", "Active Users"],
            ["95%", "Interview Rate"],
            ["4.9★", "App Rating"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="rounded-xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-4"
            >
              <p className="text-white font-black text-xl mb-0.5">{n}</p>
              <p className="text-slate-500 text-[11px] leading-tight">{l}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative z-10 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-5">
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-amber-400 text-xs">
                ★
              </span>
            ))}
          </div>
          <p className="text-slate-300 text-[13px] leading-relaxed mb-4 italic">
            "Got 3 offers in 2 weeks. The AI rewrote my resume in a way I never
            could. Total game changer."
          </p>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-black">
              SJ
            </div>
            <div>
              <p className="text-white text-xs font-bold">Sarah Johnson</p>
              <p className="text-slate-500 text-[11px]">
                Software Engineer @ Google
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          RIGHT PANEL — Auth Form
      ════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-y-auto">
        {/* Close */}
        <button
          onClick={() => navigate("/")}
          className={`absolute top-5 right-5 size-9 rounded-xl border-none cursor-pointer flex items-center justify-center transition-colors ${isDark ? "bg-white/6 text-slate-400 hover:text-slate-200 hover:bg-white/10" : "bg-black/5 text-slate-400 hover:text-slate-700 hover:bg-black/8"}`}
        >
          <X size={16} />
        </button>

        <div
          className={`w-full max-w-[400px] rounded-2xl border ${cardBg}`}
          style={{
            boxShadow: isDark
              ? "0 24px 80px rgba(0,0,0,0.55)"
              : "0 24px 80px rgba(0,0,0,0.08)",
          }}
        >
          {/* ── EMAIL VERIFICATION BANNER ── */}
          {isAuthenticated &&
            user &&
            !user.emailVerified &&
            mode === "signup" && (
              <div className="mx-0 rounded-t-2xl border-b border-amber-500/20 bg-amber-500/8 px-6 py-4 flex items-start gap-3">
                <ShieldCheck
                  size={16}
                  className="text-amber-400 mt-0.5 shrink-0"
                />
                <div className="flex-1">
                  <p className="text-amber-300 text-xs font-bold mb-0.5">
                    Verify your email
                  </p>
                  <p className="text-amber-400/70 text-[11px]">
                    Check <span className="font-semibold">{user.email}</span>{" "}
                    for a verification link.
                  </p>
                </div>
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="shrink-0 flex items-center gap-1 text-[11px] text-amber-400 font-semibold hover:text-amber-300 border-none bg-transparent cursor-pointer transition-colors"
                >
                  <RefreshCw
                    size={11}
                    className={loading ? "animate-spin" : ""}
                  />{" "}
                  Resend
                </button>
              </div>
            )}

          <div className="p-8">
            {/* ── FORGOT PASSWORD — Success State ── */}
            {mode === "forgot" && resetSent ? (
              <div className="flex flex-col items-center text-center py-4">
                <div className="size-16 rounded-2xl bg-green-500/10 border border-green-500/22 flex items-center justify-center mb-5">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <h2 className={`text-xl font-black mb-2 ${hdg}`}>
                  Check your inbox!
                </h2>
                <p className={`text-sm mb-1 ${lbl}`}>
                  We sent a password reset link to
                </p>
                <p className="text-violet-400 font-bold text-sm mb-6">
                  {form.email}
                </p>
                <p className={`text-xs mb-5 ${lbl}`}>
                  Didn't get it? Check spam or
                </p>
                <button
                  onClick={() => dispatch(forgotPassword(form.email))}
                  disabled={loading}
                  className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors mb-4 flex items-center gap-1.5 border-none bg-transparent cursor-pointer"
                >
                  <RefreshCw
                    size={13}
                    className={loading ? "animate-spin" : ""}
                  />{" "}
                  Resend email
                </button>
                <button
                  onClick={() => switchMode("signin")}
                  className={`text-xs ${lbl} hover:text-violet-400 transition-colors border-none bg-transparent cursor-pointer`}
                >
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h1
                    className={`text-[22px] font-black tracking-tight mb-1.5 ${hdg}`}
                  >
                    {mode === "signin"
                      ? "Welcome back 👋"
                      : mode === "signup"
                        ? "Create account ✨"
                        : "Reset password 🔐"}
                  </h1>
                  <p className={`text-sm ${lbl}`}>
                    {mode === "forgot"
                      ? "Enter your email and we'll send a reset link."
                      : mode === "signin"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    {mode !== "forgot" && (
                      <button
                        onClick={() =>
                          switchMode(mode === "signin" ? "signup" : "signin")
                        }
                        className="text-violet-400 font-semibold hover:text-violet-300 transition-colors border-none bg-transparent cursor-pointer"
                      >
                        {mode === "signin" ? "Sign up free" : "Sign in"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Social Buttons */}
                {mode !== "forgot" && (
                  <>
                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                      <button
                        onClick={handleGoogle}
                        disabled={loading}
                        className={socialBtn}
                      >
                        <GoogleIcon /> Google
                      </button>
                      <button
                        onClick={handleGithub}
                        disabled={loading}
                        className={socialBtn}
                      >
                        <Github size={15} /> GitHub
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                      <div className={`flex-1 h-px ${divider}`} />
                      <span className={`text-[11px] ${lbl}`}>
                        or with email
                      </span>
                      <div className={`flex-1 h-px ${divider}`} />
                    </div>
                  </>
                )}

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  {/* Name */}
                  {mode === "signup" && (
                    <div>
                      <label
                        className={`text-[11px] font-bold mb-1.5 block tracking-wide uppercase ${lbl}`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          size={14}
                          className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        />
                        <input
                          type="text"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={set("name")}
                          onBlur={blur("name")}
                          autoComplete="name"
                          className={`${inputCls("name")} pl-10`}
                        />
                      </div>
                      {errors.name && touched.name && (
                        <Error msg={errors.name} />
                      )}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label
                      className={`text-[11px] font-bold mb-1.5 block tracking-wide uppercase ${lbl}`}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`}
                      />
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={set("email")}
                        onBlur={blur("email")}
                        autoComplete="email"
                        className={`${inputCls("email")} pl-10`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <Error msg={errors.email} />
                    )}
                  </div>

                  {/* Password */}
                  {mode !== "forgot" && (
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label
                          className={`text-[11px] font-bold tracking-wide uppercase ${lbl}`}
                        >
                          Password
                        </label>
                        {mode === "signin" && (
                          <button
                            type="button"
                            onClick={() => switchMode("forgot")}
                            className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors font-semibold border-none bg-transparent cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock
                          size={14}
                          className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        />
                        <input
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={set("password")}
                          onBlur={blur("password")}
                          autoComplete={
                            mode === "signup"
                              ? "new-password"
                              : "current-password"
                          }
                          className={`${inputCls("password")} pl-10 pr-11`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className={`absolute right-3.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0 ${isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600"}`}
                        >
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <Error msg={errors.password} />
                      )}

                      {/* Strength meter */}
                      {mode === "signup" && form.password.length > 0 && (
                        <div className="mt-2.5">
                          <div className="flex gap-1 mb-1.5">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : isDark ? "bg-white/10" : "bg-black/8"}`}
                              />
                            ))}
                          </div>
                          <p
                            className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}
                          >
                            {strengthLabel[strength]}{" "}
                            {strength < 4 &&
                              "— add uppercase, numbers, symbols"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Confirm Password */}
                  {mode === "signup" && (
                    <div>
                      <label
                        className={`text-[11px] font-bold mb-1.5 block tracking-wide uppercase ${lbl}`}
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          size={14}
                          className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`}
                        />
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          value={form.confirm}
                          onChange={set("confirm")}
                          onBlur={blur("confirm")}
                          autoComplete="new-password"
                          className={`${inputCls("confirm")} pl-10 pr-11`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className={`absolute right-3.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer p-0 ${isDark ? "text-slate-600 hover:text-slate-400" : "text-slate-400 hover:text-slate-600"}`}
                        >
                          {showConfirm ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>
                      {errors.confirm && touched.confirm && (
                        <Error msg={errors.confirm} />
                      )}
                    </div>
                  )}

                  {/* Terms */}
                  {mode === "signup" && (
                    <p className={`text-[11px] leading-relaxed -mt-1 ${lbl}`}>
                      By signing up you agree to our{" "}
                      <span className="text-violet-400 cursor-pointer hover:underline">
                        Terms
                      </span>{" "}
                      &{" "}
                      <span className="text-violet-400 cursor-pointer hover:underline">
                        Privacy Policy
                      </span>
                      .
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl border-none cursor-pointer text-white text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-1"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                      boxShadow: "0 0 28px rgba(124,58,237,0.38)",
                    }}
                  >
                    {loading ? (
                      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : mode === "signin" ? (
                      <>
                        <Sparkles size={14} /> Sign In
                      </>
                    ) : mode === "signup" ? (
                      <>
                        <Sparkles size={14} /> Create Free Account
                      </>
                    ) : (
                      <>
                        <ArrowRight size={14} /> Send Reset Link
                      </>
                    )}
                  </button>

                  {/* Back to signin from forgot */}
                  {mode === "forgot" && (
                    <button
                      type="button"
                      onClick={() => switchMode("signin")}
                      className={`text-xs text-center border-none bg-transparent cursor-pointer transition-colors ${lbl} hover:text-violet-400`}
                    >
                      ← Back to Sign In
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        <p
          className={`text-[11px] mt-5 ${isDark ? "text-slate-700" : "text-slate-400"}`}
        >
          🔒 256-bit SSL · Your data is always secure
        </p>
      </div>
    </div>
  );
}

/* ── Inline error ── */
function Error({ msg }: { msg: string }) {
  return (
    <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">
      <AlertCircle size={10} className="shrink-0" /> {msg}
    </p>
  );
}
