/* eslint-disable react-hooks/set-state-in-effect */
// src/components/layout/Navbar.tsx — Hash scroll + responsive fixed
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  AlertTriangle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

const LINKS = [
  { label: "Home", href: "/", hash: "" },
  { label: "Features", href: "/#features", hash: "features" },
  { label: "Templates", href: "/templates", hash: "" },
  { label: "How It Works", href: "/#how-it-works", hash: "how-it-works" },
  { label: "Pricing", href: "/#pricing", hash: "pricing" },
];

/* ── Smooth scroll to section ── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* ── Logout Modal ── */
function LogoutModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-[#fff]"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 16, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl p-7 text-center border shadow-2xl
          ${isDark ? "bg-[#0e0e1c] border-white/8" : "bg-white border-black/8"}`}
      >
        <div className="size-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h3
          className={`text-lg font-black mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}
        >
          Are you sure?
        </h3>
        <p
          className={`text-sm leading-relaxed mb-6 ${isDark ? "text-slate-500" : "text-slate-400"}`}
        >
          You will be logged out. Any unsaved changes may be lost.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl cursor-pointer text-sm font-semibold border bg-transparent
              ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl cursor-pointer text-sm font-bold border-none text-white flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600"
            style={{ boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
          >
            <LogOut size={14} /> Yes, Logout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Handle hash link click — smooth scroll if on same page, else navigate then scroll
  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof LINKS)[0]) => {
      if (!link.hash) return; // normal navigation for /, /templates

      e.preventDefault();

      if (location.pathname === "/") {
        // Already on home — just smooth scroll
        scrollToSection(link.hash);
        // Update URL hash without reload
        window.history.pushState(null, "", link.href);
      } else {
        // Navigate to home first, then scroll after paint
        navigate("/");
        setTimeout(() => scrollToSection(link.hash), 120);
      }
      setOpen(false);
    },
    [location.pathname, navigate],
  );

  // Handle initial hash on mount (direct URL load like /#pricing)
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 200);
    }
  }, []);

  const isActive = (link: (typeof LINKS)[0]) => {
    if (link.href === "/") return location.pathname === "/" && !location.hash;
    if (link.hash)
      return location.pathname === "/" && location.hash === `#${link.hash}`;
    return location.pathname === link.href;
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowLogout(false);
    toast.success("Logged out successfully! 👋");
    navigate("/");
  };

  const navBg = scrolled
    ? isDark
      ? "bg-[#08080f]/95 border-white/[0.07] backdrop-blur-2xl shadow-lg"
      : "bg-white/95 border-black/[0.07] backdrop-blur-2xl shadow-sm"
    : "bg-transparent border-transparent";

  return (
    <>
      <AnimatePresence>
        {showLogout && (
          <LogoutModal
            onConfirm={handleLogout}
            onCancel={() => setShowLogout(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${navBg}`}
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 no-underline shrink-0"
            >
              <div
                className="size-[34px] rounded-[9px] bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-base"
                style={{ boxShadow: "0 0 16px rgba(124,58,237,0.45)" }}
              >
                📄
              </div>
              <span
                className={`font-black text-[17px] tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Resume
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {LINKS.map((l) => {
                const active = isActive(l);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline whitespace-nowrap border-b-2 cursor-pointer
                      ${
                        active
                          ? isDark
                            ? "text-slate-100 bg-white/6 border-violet-500"
                            : "text-slate-900 bg-black/5 border-violet-500"
                          : isDark
                            ? "text-slate-500 hover:text-slate-200 hover:bg-white/6 border-transparent"
                            : "text-slate-400 hover:text-slate-800 hover:bg-black/4 border-transparent"
                      }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  dispatch(toggleTheme());
                  toast.success(isDark ? "☀️ Light mode!" : "🌙 Dark mode!", {
                    duration: 900,
                  });
                }}
                className={`size-9 rounded-lg border-none cursor-pointer flex items-center justify-center transition-colors
                  ${isDark ? "bg-white/6 text-slate-400 hover:text-slate-200" : "bg-black/5 text-slate-400 hover:text-slate-700"}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ rotate: -80, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 80, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Auth — desktop */}
              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/dashboard" className="no-underline">
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-none cursor-pointer text-[13px] font-medium transition-colors
                      ${isDark ? "bg-white/6 text-slate-200 hover:bg-white/10" : "bg-black/5 text-slate-700 hover:bg-black/8"}`}
                    >
                      <LayoutDashboard size={13} /> Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowLogout(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-none cursor-pointer text-[13px] font-medium bg-red-500/10 text-red-400 hover:bg-red-500/18 transition-colors"
                  >
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/?auth=signin" className="no-underline">
                    <button
                      className={`px-4 py-1.5 rounded-lg cursor-pointer text-sm font-medium transition-all border bg-transparent
                      ${isDark ? "border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/6" : "border-black/10 text-slate-500 hover:text-slate-800 hover:bg-black/4"}`}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/?auth=signup" className="no-underline">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border-none cursor-pointer bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold whitespace-nowrap"
                      style={{ boxShadow: "0 0 16px rgba(124,58,237,0.4)" }}
                    >
                      <Sparkles size={13} /> Get Started
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Hamburger */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setOpen(!open)}
                className={`md:hidden size-9 rounded-lg border-none cursor-pointer flex items-center justify-center
                  ${isDark ? "bg-white/6 text-slate-200" : "bg-black/5 text-slate-700"}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {open ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className={`overflow-hidden border-t md:hidden backdrop-blur-2xl
                ${isDark ? "border-white/[0.07] bg-[#08080f]/98" : "border-black/[0.07] bg-white/98"}`}
            >
              <div className="px-4 pt-2 pb-4 flex flex-col gap-0.5">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium no-underline cursor-pointer
                      ${isActive(l) ? (isDark ? "text-slate-100 bg-white/6" : "text-slate-900 bg-black/5") : isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {l.label}
                  </a>
                ))}
                <div
                  className={`mt-2 pt-3 border-t flex flex-col gap-2 ${isDark ? "border-white/[0.07]" : "border-black/[0.07]"}`}
                >
                  {!isAuthenticated ? (
                    <>
                      <Link to="/?auth=signin" className="no-underline">
                        <button
                          className={`w-full py-2.5 rounded-xl cursor-pointer text-sm font-medium border bg-transparent
                          ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}`}
                        >
                          Sign In
                        </button>
                      </Link>
                      <Link to="/?auth=signup" className="no-underline">
                        <button className="w-full py-2.5 rounded-xl border-none bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold cursor-pointer">
                          Get Started Free
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="no-underline">
                        <button
                          className={`w-full py-2.5 rounded-xl cursor-pointer text-sm border bg-transparent
                          ${isDark ? "border-white/10 text-slate-200" : "border-black/10 text-slate-700"}`}
                        >
                          Dashboard
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setOpen(false);
                          setShowLogout(true);
                        }}
                        className="w-full py-2.5 rounded-xl border-none bg-red-500/10 text-red-400 text-sm cursor-pointer font-medium"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  );
}
