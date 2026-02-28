/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Bell,
  Shield,
  Moon,
  Sun,
  Trash2,
  LogOut,
  Save,
  Eye,
  EyeOff,
  Camera,
  ArrowLeft,
  AlertTriangle,
  Key,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import toast from "react-hot-toast";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Shield },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProfileSettingsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const { user } = useAppSelector((s) => s.auth);

  const [tab, setTab] = useState<TabId>("profile");
  const [saving, setSaving] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [profile, setProfile] = useState({
    displayName: user?.displayName || "Alex Johnson",
    email: user?.email || "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    github: "github.com/alexjohnson",
    linkedin: "linkedin.com/in/alexjohnson",
    bio: "Senior Software Engineer passionate about building scalable web applications.",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    jobAlerts: true,
    resumeViewed: true,
    weeklyTips: false,
    marketingEmails: false,
  });

  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });

  const initials = profile.displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved! ✅");
    }, 800);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Min 8 characters required");
      return;
    }
    toast.success("Password updated successfully! 🔒");
    setPasswords({ old: "", new: "", confirm: "" });
  };

  const bg = isDark ? "bg-[#08080f]" : "bg-[#f1f5f9]";
  const card = isDark
    ? "bg-white/[0.03] border-white/[0.07]"
    : "bg-white border-black/[0.07] shadow-sm";
  const divB = isDark ? "border-white/[0.07]" : "border-black/[0.07]";
  const inp = `w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors border
    ${
      isDark
        ? "bg-white/[0.04] border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-violet-500/50"
        : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-400/60"
    }`;
  const lbl = `block text-xs font-semibold mb-1.5 ${isDark ? "text-slate-500" : "text-slate-400"}`;

  return (
    <>
      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteModal(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-5 bg-black/65 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-sm rounded-2xl p-7 text-center border ${isDark ? "bg-[#0e0e1c] border-white/8" : "bg-white border-black/8"}`}
            >
              <div className="size-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <h3
                className={`text-lg font-black mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Delete Account?
              </h3>
              <p
                className={`text-sm mb-6 leading-relaxed ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                All your resumes and data will be permanently deleted. This
                cannot be undone.
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 py-2.5 rounded-xl cursor-pointer font-semibold text-sm border bg-transparent ${isDark ? "border-white/10 text-slate-400" : "border-black/10 text-slate-500"}`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch(logout());
                    toast.success("Account deleted");
                    navigate("/");
                  }}
                  className="flex-1 py-2.5 rounded-xl cursor-pointer font-bold text-sm bg-red-500 text-white border-none"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen ${bg}`}>
        {/* Header */}
        <div
          className={`sticky top-0 z-20 backdrop-blur-xl border-b ${divB} ${isDark ? "bg-[#08080f]/95" : "bg-white/95"}`}
        >
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 text-xs font-medium no-underline transition-colors ${isDark ? "text-slate-500 hover:text-slate-200" : "text-slate-400 hover:text-slate-700"}`}
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <span className={isDark ? "text-slate-700" : "text-slate-300"}>
              /
            </span>
            <span
              className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}
            >
              Settings
            </span>
            <div className="flex-1" />
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`size-8 rounded-xl border-none cursor-pointer flex items-center justify-center ${isDark ? "bg-white/6 text-slate-400" : "bg-black/5 text-slate-500"}`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar tabs */}
            <div className="lg:w-[220px] shrink-0">
              {/* Avatar */}
              <div
                className={`rounded-2xl border p-5 text-center mb-4 ${card}`}
              >
                <div className="relative inline-block mb-3">
                  <div className="size-20 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-2xl font-black mx-auto">
                    {initials}
                  </div>
                  <button className="absolute -bottom-1 -right-1 size-7 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center border-2 border-white cursor-pointer">
                    <Camera size={11} className="text-white" />
                  </button>
                </div>
                <p
                  className={`text-sm font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {profile.displayName}
                </p>
                <p
                  className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {profile.email}
                </p>
                <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-1 rounded-full bg-violet-500/12 text-violet-400 border border-violet-500/20">
                  Free Plan
                </span>
              </div>

              {/* Nav */}
              <div className={`rounded-2xl border overflow-hidden ${card}`}>
                {TABS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium cursor-pointer border-none text-left transition-all
                      ${i < TABS.length - 1 ? `border-b ${divB}` : ""}
                      ${
                        tab === t.id
                          ? isDark
                            ? "bg-violet-500/10 text-violet-400"
                            : "bg-violet-50 text-violet-600"
                          : isDark
                            ? "bg-transparent text-slate-400 hover:bg-white/4 hover:text-slate-200"
                            : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                  >
                    <t.icon size={15} />
                    {t.label}
                    {tab === t.id && (
                      <ChevronRight
                        size={12}
                        className="ml-auto text-violet-400"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* PROFILE TAB */}
              {tab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-6 ${card}`}
                >
                  <h2
                    className={`text-base font-black mb-5 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                  >
                    Profile Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {[
                      {
                        key: "displayName",
                        label: "Full Name",
                        icon: User,
                        placeholder: "Your name",
                      },
                      {
                        key: "email",
                        label: "Email Address",
                        icon: Mail,
                        placeholder: "you@example.com",
                      },
                      {
                        key: "phone",
                        label: "Phone Number",
                        icon: Phone,
                        placeholder: "+1 (555) 000-0000",
                      },
                      {
                        key: "location",
                        label: "Location",
                        icon: MapPin,
                        placeholder: "City, Country",
                      },
                      {
                        key: "website",
                        label: "Website",
                        icon: Globe,
                        placeholder: "yoursite.com",
                      },
                      {
                        key: "github",
                        label: "GitHub URL",
                        icon: Github,
                        placeholder: "github.com/...",
                      },
                      {
                        key: "linkedin",
                        label: "LinkedIn URL",
                        icon: Linkedin,
                        placeholder: "linkedin.com/in/..",
                      },
                    ].map((f) => (
                      <label key={f.key} className="flex flex-col">
                        <span className={lbl}>{f.label}</span>
                        <div className="relative">
                          <f.icon
                            size={13}
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                          />
                          <input
                            value={(profile as any)[f.key]}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                [f.key]: e.target.value,
                              })
                            }
                            placeholder={f.placeholder}
                            className={`${inp} pl-9`}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                  <label className="flex flex-col mb-5">
                    <span className={lbl}>Bio</span>
                    <textarea
                      value={profile.bio}
                      rows={3}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className={`${inp} resize-none leading-relaxed`}
                      placeholder="Tell us a bit about yourself..."
                    />
                  </label>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <div className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <Save size={14} /> Save Profile
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* ACCOUNT TAB */}
              {tab === "account" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  {/* Change Password */}
                  <div className={`rounded-2xl border p-6 ${card}`}>
                    <h2
                      className={`text-base font-black mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                    >
                      Change Password
                    </h2>
                    <p
                      className={`text-xs mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      Keep your account secure with a strong password
                    </p>
                    <div className="flex flex-col gap-3.5 max-w-md">
                      {[
                        {
                          key: "old",
                          label: "Current Password",
                          show: showOldPass,
                          toggle: () => setShowOldPass(!showOldPass),
                        },
                        {
                          key: "new",
                          label: "New Password",
                          show: showNewPass,
                          toggle: () => setShowNewPass(!showNewPass),
                        },
                        {
                          key: "confirm",
                          label: "Confirm New Password",
                          show: showNewPass,
                          toggle: () => setShowNewPass(!showNewPass),
                        },
                      ].map((f) => (
                        <label key={f.key} className="flex flex-col">
                          <span className={lbl}>{f.label}</span>
                          <div className="relative">
                            <Key
                              size={13}
                              className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                            />
                            <input
                              type={f.show ? "text" : "password"}
                              value={(passwords as any)[f.key]}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  [f.key]: e.target.value,
                                })
                              }
                              placeholder="••••••••"
                              className={`${inp} pl-9 pr-10`}
                            />
                            <button
                              type="button"
                              onClick={f.toggle}
                              className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
                            >
                              {f.show ? (
                                <EyeOff
                                  size={14}
                                  className={
                                    isDark ? "text-slate-500" : "text-slate-400"
                                  }
                                />
                              ) : (
                                <Eye
                                  size={14}
                                  className={
                                    isDark ? "text-slate-500" : "text-slate-400"
                                  }
                                />
                              )}
                            </button>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={handlePasswordChange}
                      className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
                    >
                      <Key size={14} /> Update Password
                    </button>
                  </div>

                  {/* Appearance */}
                  <div className={`rounded-2xl border p-6 ${card}`}>
                    <h2
                      className={`text-base font-black mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                    >
                      Appearance
                    </h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
                        >
                          Dark Mode
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          Switch between light and dark themes
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(toggleTheme())}
                        className={`relative w-11 h-6 rounded-full cursor-pointer border-none transition-colors ${isDark ? "bg-violet-600" : "bg-slate-300"}`}
                      >
                        <div
                          className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${isDark ? "translate-x-5" : "translate-x-0.5"}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div
                    className={`rounded-2xl border border-red-500/20 p-6 ${isDark ? "bg-red-500/5" : "bg-red-50/50"}`}
                  >
                    <h2 className="text-base font-black mb-1 text-red-400">
                      Danger Zone
                    </h2>
                    <p
                      className={`text-xs mb-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      These actions are irreversible. Please be certain.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          dispatch(logout());
                          toast.success("Logged out! 👋");
                          navigate("/");
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border border-red-500/30 bg-transparent text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"
                      >
                        <Trash2 size={14} /> Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* NOTIFICATIONS TAB */}
              {tab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border p-6 ${card}`}
                >
                  <h2
                    className={`text-base font-black mb-5 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                  >
                    Notification Preferences
                  </h2>
                  <div className="flex flex-col gap-1">
                    {[
                      {
                        key: "emailUpdates",
                        label: "Email Updates",
                        desc: "Product updates and new features",
                      },
                      {
                        key: "jobAlerts",
                        label: "Job Alerts",
                        desc: "Matching jobs for your resume",
                      },
                      {
                        key: "resumeViewed",
                        label: "Resume Viewed",
                        desc: "When someone views your resume",
                      },
                      {
                        key: "weeklyTips",
                        label: "Weekly Tips",
                        desc: "Resume writing and career advice",
                      },
                      {
                        key: "marketingEmails",
                        label: "Marketing Emails",
                        desc: "Promotions and special offers",
                      },
                    ].map((n) => (
                      <div
                        key={n.key}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isDark ? "hover:bg-white/3" : "hover:bg-slate-50"}`}
                      >
                        <div>
                          <p
                            className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
                          >
                            {n.label}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                          >
                            {n.desc}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [n.key]: !(notifications as any)[n.key],
                            })
                          }
                          className={`relative w-11 h-6 rounded-full cursor-pointer border-none transition-colors shrink-0 ${(notifications as any)[n.key] ? "bg-violet-600" : isDark ? "bg-white/15" : "bg-slate-200"}`}
                        >
                          <div
                            className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${(notifications as any)[n.key] ? "translate-x-5" : "translate-x-0.5"}`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSave}
                    className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90"
                  >
                    <Save size={14} /> Save Preferences
                  </button>
                </motion.div>
              )}

              {/* BILLING TAB */}
              {tab === "billing" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className={`rounded-2xl border p-6 ${card}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2
                          className={`text-base font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
                        >
                          Current Plan
                        </h2>
                        <p
                          className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          You are on the free plan
                        </p>
                      </div>
                      <span className="text-[11px] font-black px-3 py-1.5 rounded-full bg-violet-500/12 text-violet-400 border border-violet-500/20">
                        Free
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        ["3", "Resumes"],
                        ["5", "Templates"],
                        ["∞", "Downloads"],
                      ].map(([val, label]) => (
                        <div
                          key={label}
                          className={`p-3 rounded-xl text-center ${isDark ? "bg-white/3" : "bg-slate-50"}`}
                        >
                          <p
                            className={`text-lg font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
                          >
                            {val}
                          </p>
                          <p
                            className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                          >
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Link to="/#pricing" className="no-underline">
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold text-white cursor-pointer border-none bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 transition-opacity"
                        style={{ boxShadow: "0 0 16px rgba(124,58,237,0.35)" }}
                      >
                        🚀 Upgrade to Pro — €9.99/mo
                      </button>
                    </Link>
                  </div>
                  <div className={`rounded-2xl border p-6 ${card}`}>
                    <h2
                      className={`text-base font-black mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                    >
                      Billing History
                    </h2>
                    <div
                      className={`flex flex-col items-center justify-center py-8 ${isDark ? "text-slate-600" : "text-slate-300"}`}
                    >
                      <CreditCard size={32} className="mb-3" />
                      <p
                        className={`text-sm font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        No billing history
                      </p>
                      <p
                        className={`text-xs mt-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                      >
                        Upgrade to see invoices here
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
