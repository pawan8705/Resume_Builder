import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { Home, FileText, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 number */}
        <div className="relative inline-block mb-6">
          <div className="text-[120px] font-black leading-none tracking-tighter bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-20 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 blur-2xl" />
          </div>
        </div>

        <div
          className={`size-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-violet-600/15 to-blue-600/15 border ${isDark ? "border-violet-500/20" : "border-violet-300/40"}`}
        >
          <FileText size={24} className="text-violet-500" />
        </div>

        <h1
          className={`text-2xl font-black mb-3 tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
        >
          Page Not Found
        </h1>
        <p
          className={`text-sm mb-8 leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}
        >
          Oops! The page you're looking for doesn't exist. It may have been
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity"
              style={{ boxShadow: "0 0 18px rgba(124,58,237,0.35)" }}
            >
              <Home size={15} /> Go to Home
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-semibold border transition-colors
              ${isDark ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-white border-black/10 text-slate-600 hover:bg-slate-50"}`}
          >
            <ArrowLeft size={15} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
