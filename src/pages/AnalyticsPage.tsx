import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Download,
  TrendingUp,
  Users,
  FileText,
  Target,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";

const WEEKLY_DATA = [
  { day: "Mon", views: 12, downloads: 2 },
  { day: "Tue", views: 19, downloads: 4 },
  { day: "Wed", views: 8, downloads: 1 },
  { day: "Thu", views: 24, downloads: 6 },
  { day: "Fri", views: 31, downloads: 8 },
  { day: "Sat", views: 14, downloads: 3 },
  { day: "Sun", views: 9, downloads: 2 },
];

const RESUME_STATS = [
  {
    title: "Software Engineer Resume",
    views: 128,
    downloads: 12,
    ats: 94,
    trend: "up",
    change: "+23%",
  },
  {
    title: "Full Stack Developer CV",
    views: 84,
    downloads: 7,
    ats: 87,
    trend: "up",
    change: "+11%",
  },
  {
    title: "Product Manager Resume",
    views: 22,
    downloads: 2,
    ats: 76,
    trend: "down",
    change: "-4%",
  },
];

export default function AnalyticsPage() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d");

  const maxViews = Math.max(...WEEKLY_DATA.map((d) => d.views));

  const card = isDark
    ? "bg-white/[0.03] border-white/[0.07]"
    : "bg-white border-black/[0.07] shadow-sm";
  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.07]";
  const bg = isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]";

  const STATS = [
    {
      label: "Total Views",
      value: "234",
      icon: Eye,
      color: "text-violet-400",
      bg: "bg-violet-500/12",
      change: "+18%",
      up: true,
    },
    {
      label: "Downloads",
      value: "26",
      icon: Download,
      color: "text-blue-400",
      bg: "bg-blue-500/12",
      change: "+12%",
      up: true,
    },
    {
      label: "Avg ATS Score",
      value: "86%",
      icon: Target,
      color: "text-green-400",
      bg: "bg-green-500/12",
      change: "+5%",
      up: true,
    },
    {
      label: "Profile Views",
      value: "57",
      icon: Users,
      color: "text-cyan-400",
      bg: "bg-cyan-500/12",
      change: "-3%",
      up: false,
    },
  ];

  return (
    <div className={`min-h-screen ${bg}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-20 backdrop-blur-xl border-b ${divB} ${isDark ? "bg-[#08080f]/95" : "bg-white/95"}`}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            to="/dashboard"
            className={`flex items-center gap-1.5 text-xs font-medium no-underline ${isDark ? "text-slate-500 hover:text-slate-200" : "text-slate-400 hover:text-slate-700"}`}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <span className={isDark ? "text-slate-700" : "text-slate-300"}>
            /
          </span>
          <span
            className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
          >
            Analytics
          </span>
          <div className="flex-1" />
          {/* Period selector */}
          <div className={`flex rounded-xl overflow-hidden border ${divB}`}>
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-semibold cursor-pointer border-none transition-colors
                  ${period === p ? "bg-violet-600 text-white" : isDark ? "bg-transparent text-slate-400 hover:bg-white/6" : "bg-transparent text-slate-500 hover:bg-slate-50"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border p-4 ${card}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {s.label}
                </span>
                <div
                  className={`size-8 rounded-xl flex items-center justify-center ${s.bg}`}
                >
                  <s.icon size={14} className={s.color} />
                </div>
              </div>
              <p
                className={`text-2xl font-black mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {s.value}
              </p>
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-green-400" : "text-red-400"}`}
              >
                {s.up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}{" "}
                {s.change} this week
              </span>
            </motion.div>
          ))}
        </div>

        {/* Views bar chart */}
        <div className={`rounded-2xl border p-5 ${card}`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3
                className={`text-sm font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Views & Downloads
              </h3>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                Last 7 days
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-violet-400">
                <span className="size-2 rounded-full bg-violet-500 inline-block" />
                Views
              </span>
              <span className="flex items-center gap-1.5 text-xs text-blue-400">
                <span className="size-2 rounded-full bg-blue-500 inline-block" />
                Downloads
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {WEEKLY_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full flex gap-0.5 items-end"
                  style={{ height: 100 }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.views / maxViews) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-lg bg-violet-500/70 min-h-[3px]"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.downloads / maxViews) * 50}%` }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                    className="flex-1 rounded-t-lg bg-blue-500/70 min-h-[3px]"
                  />
                </div>
                <span
                  className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume performance table */}
        <div className={`rounded-2xl border ${card} overflow-hidden`}>
          <div className={`px-5 py-4 border-b ${divB}`}>
            <h3
              className={`text-sm font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              Resume Performance
            </h3>
          </div>
          <div
            className="divide-y"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.07)",
            }}
          >
            {RESUME_STATS.map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${isDark ? "hover:bg-white/3" : "hover:bg-slate-50"}`}
              >
                <div className="size-9 rounded-xl bg-violet-500/12 flex items-center justify-center shrink-0">
                  <FileText size={15} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${isDark ? "text-slate-200" : "text-slate-700"}`}
                  >
                    {r.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-xs flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      <Eye size={10} />
                      {r.views} views
                    </span>
                    <span
                      className={`text-xs flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      <Download size={10} />
                      {r.downloads} downloads
                    </span>
                  </div>
                </div>
                {/* ATS */}
                <div className="text-right shrink-0">
                  <p
                    className={`text-xs font-bold ${r.ats >= 90 ? "text-green-400" : r.ats >= 75 ? "text-amber-400" : "text-red-400"}`}
                  >
                    {r.ats}% ATS
                  </p>
                  <div
                    className={`w-16 h-1.5 rounded-full overflow-hidden mt-1 ${isDark ? "bg-white/7" : "bg-black/7"}`}
                  >
                    <div
                      className={`h-full rounded-full ${r.ats >= 90 ? "bg-green-400" : r.ats >= 75 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${r.ats}%` }}
                    />
                  </div>
                </div>
                {/* Trend */}
                <div
                  className={`shrink-0 text-xs font-bold flex items-center gap-0.5 ${r.trend === "up" ? "text-green-400" : r.trend === "down" ? "text-red-400" : "text-slate-400"}`}
                >
                  {r.trend === "up" ? (
                    <ChevronUp size={12} />
                  ) : r.trend === "down" ? (
                    <ChevronDown size={12} />
                  ) : (
                    <Minus size={12} />
                  )}
                  {r.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATS improvement tips */}
        <div className={`rounded-2xl border p-5 ${card}`}>
          <h3
            className={`text-sm font-black mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            ATS Improvement Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                tip: 'Add quantified achievements (e.g. "increased sales by 40%")',
                score: "+8%",
              },
              {
                tip: "Include 8-12 relevant keywords from job description",
                score: "+12%",
              },
              {
                tip: "Use standard section headers (Experience, Education, Skills)",
                score: "+5%",
              },
              {
                tip: "Keep resume to 1 page if under 5 years experience",
                score: "+6%",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl ${isDark ? "bg-white/3" : "bg-slate-50"}`}
              >
                <div className="size-6 rounded-full bg-green-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp size={11} className="text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {item.tip}
                  </p>
                </div>
                <span className="text-xs font-bold text-green-400 shrink-0">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
