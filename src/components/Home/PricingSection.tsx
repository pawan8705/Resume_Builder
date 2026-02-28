/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/PricingSection.tsx
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  Users,
  Crown,
  Gift,
  X,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";

const PLANS = [
  {
    id: "free",
    icon: Gift,
    name: "Free",
    tagline: "Get started, no card needed",
    price: { monthly: 0, yearly: 0 },
    period: "forever",
    accent: "#64748b",
    popular: false,
    cta: "Start for Free",
    features: [
      { text: "3 Resume Templates", ok: true },
      { text: "Basic AI Suggestions", ok: true },
      { text: "PDF Export", ok: true },
      { text: "ATS Score Check", ok: true },
      { text: "Cover Letter Generator", ok: false },
      { text: "Unlimited Exports", ok: false },
    ],
  },
  {
    id: "starter",
    icon: Zap,
    name: "Starter",
    tagline: "For serious job seekers",
    price: { monthly: 4.99, yearly: 3.99 },
    period: "/mo",
    accent: "#2563eb",
    popular: false,
    cta: "Start Starter",
    features: [
      { text: "20 Resume Templates", ok: true },
      { text: "Advanced AI Writing", ok: true },
      { text: "Cover Letter Generator", ok: true },
      { text: "Unlimited Exports", ok: true },
      { text: "Email Support", ok: true },
      { text: "AI Interview Coach", ok: false },
    ],
  },
  {
    id: "pro",
    icon: Crown,
    name: "Pro",
    tagline: "Land your dream job faster",
    price: { monthly: 9.99, yearly: 7.99 },
    period: "/mo",
    accent: "#7c3aed",
    popular: true,
    cta: "Start Pro — Best Value",
    features: [
      { text: "All Templates", ok: true },
      { text: "Full AI Suite", ok: true },
      { text: "AI Interview Coach", ok: true },
      { text: "LinkedIn Optimizer", ok: true },
      { text: "Job Match AI", ok: true },
      { text: "24/7 Priority Support", ok: true },
    ],
  },
  {
    id: "teams",
    icon: Users,
    name: "Teams",
    tagline: "For hiring teams & agencies",
    price: { monthly: 4.99, yearly: 3.99 },
    period: "/user/mo",
    accent: "#0891b2",
    popular: false,
    cta: "Start Teams",
    features: [
      { text: "Team Dashboard", ok: true },
      { text: "Bulk Resume Builder", ok: true },
      { text: "Analytics & Reports", ok: true },
      { text: "Custom Branding", ok: true },
      { text: "Dedicated Manager", ok: true },
      { text: "SSO Login", ok: true },
    ],
  },
];

/* ── Checkout Modal ── */
function CheckoutModal({
  plan,
  yearly,
  onClose,
}: {
  plan: (typeof PLANS)[0];
  yearly: boolean;
  onClose: () => void;
}) {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [step, setStep] = useState<
    "confirm" | "payment" | "processing" | "success"
  >("confirm");
  const [card, setCard] = useState({ num: "", exp: "", cvc: "", name: "" });

  const price = yearly ? plan.price.yearly : plan.price.monthly;
  const isFree = price === 0;
  const fmtCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const goConfirm = () => {
    if (!isAuthenticated) {
      toast("Please sign in first!", { icon: "🔐" });
      onClose();
      navigate("/?auth=signin");
      return;
    }
    isFree ? goProcess() : setStep("payment");
  };
  const goProcess = () => {
    if (!isFree && (!card.num || !card.exp || !card.cvc || !card.name)) {
      toast.error("Please fill all card details");
      return;
    }
    setStep("processing");
    setTimeout(() => setStep("success"), 2200);
  };

  const inp = `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none bg-transparent transition-colors
    ${isDark ? "border-white/10 text-slate-100 placeholder:text-slate-600 focus:border-violet-500/50" : "border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-400/60"}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[400px] rounded-2xl border p-7 shadow-2xl relative ${isDark ? "bg-[#0e0e1a] border-white/[0.08]" : "bg-white border-black/[0.08]"}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 size-7 rounded-lg border-none cursor-pointer flex items-center justify-center ${isDark ? "bg-white/7 text-slate-400 hover:bg-white/12" : "bg-black/5 text-slate-500 hover:bg-black/10"}`}
        >
          <X size={14} />
        </button>

        {/* CONFIRM */}
        {step === "confirm" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="size-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `${plan.accent}15`,
                  border: `1px solid ${plan.accent}30`,
                }}
              >
                <plan.icon size={18} style={{ color: plan.accent }} />
              </div>
              <div>
                <p
                  className={`font-black text-base ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {plan.name} Plan
                </p>
                <p
                  className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {plan.tagline}
                </p>
              </div>
            </div>
            <div
              className={`rounded-xl border p-4 mb-6 ${isDark ? "bg-white/3 border-white/7" : "bg-slate-50 border-black/6"}`}
            >
              <div className="flex justify-between mb-3">
                <span
                  className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {plan.name} ({yearly ? "Annual" : "Monthly"})
                </span>
                <span
                  className={`font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {isFree ? "Free" : `€${price}/mo`}
                </span>
              </div>
              {yearly && !isFree && (
                <div className="flex justify-between text-xs text-green-400 mb-3">
                  <span>Annual discount</span>
                  <span>-20%</span>
                </div>
              )}
              <div
                className={`h-px mb-3 ${isDark ? "bg-white/6" : "bg-black/6"}`}
              />
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  Total Today
                </span>
                <span
                  className="font-black text-lg"
                  style={{ color: plan.accent }}
                >
                  {isFree ? "€0" : `€${(price * (yearly ? 12 : 1)).toFixed(2)}`}
                </span>
              </div>
            </div>
            <button
              onClick={goConfirm}
              className="w-full py-3 rounded-xl border-none cursor-pointer text-white text-sm font-black hover:scale-[1.02] active:scale-[0.98] transition-transform"
              style={{
                background: `linear-gradient(135deg,${plan.accent},#2563eb)`,
                boxShadow: `0 0 24px ${plan.accent}40`,
              }}
            >
              {isFree ? "Activate Free Plan" : "Continue to Payment →"}
            </button>
            <p
              className={`text-center text-[11px] mt-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}
            >
              {isFree
                ? "No credit card required"
                : "Cancel anytime · Secure checkout"}
            </p>
          </div>
        )}

        {/* PAYMENT */}
        {step === "payment" && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setStep("confirm")}
                className={`size-7 rounded-lg border-none cursor-pointer flex items-center justify-center text-xs ${isDark ? "bg-white/7 text-slate-400" : "bg-black/5 text-slate-500"}`}
              >
                ←
              </button>
              <p
                className={`font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Payment Details
              </p>
              <span
                className="ml-auto text-xs font-semibold"
                style={{ color: plan.accent }}
              >
                €{price}/mo
              </span>
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <input
                className={inp}
                placeholder="Cardholder name"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
              <input
                className={inp}
                placeholder="Card number"
                value={card.num}
                maxLength={19}
                onChange={(e) =>
                  setCard({ ...card, num: fmtCard(e.target.value) })
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inp}
                  placeholder="MM/YY"
                  value={card.exp}
                  maxLength={5}
                  onChange={(e) =>
                    setCard({ ...card, exp: fmtExp(e.target.value) })
                  }
                />
                <input
                  className={inp}
                  placeholder="CVC"
                  value={card.cvc}
                  maxLength={3}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      cvc: e.target.value.replace(/\D/g, "").slice(0, 3),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 mb-5 items-center">
              {["VISA", "MC", "AMEX"].map((c) => (
                <span
                  key={c}
                  className={`text-[10px] font-black px-2 py-1 rounded-md border ${isDark ? "border-white/10 text-slate-500" : "border-black/10 text-slate-400"}`}
                >
                  {c}
                </span>
              ))}
              <span
                className={`text-[10px] ml-auto ${isDark ? "text-slate-600" : "text-slate-400"}`}
              >
                🔒 256-bit SSL
              </span>
            </div>
            <button
              onClick={goProcess}
              className="w-full py-3 rounded-xl border-none cursor-pointer text-white text-sm font-black hover:scale-[1.02] active:scale-[0.98] transition-transform"
              style={{
                background: `linear-gradient(135deg,${plan.accent},#2563eb)`,
                boxShadow: `0 0 24px ${plan.accent}40`,
              }}
            >
              Pay €{(price * (yearly ? 12 : 1)).toFixed(2)}
            </button>
          </div>
        )}

        {/* PROCESSING */}
        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-12 gap-5">
            <div
              className="size-16 rounded-2xl flex items-center justify-center"
              style={{
                background: `${plan.accent}15`,
                border: `1px solid ${plan.accent}30`,
              }}
            >
              <Loader2
                size={28}
                className="animate-spin"
                style={{ color: plan.accent }}
              />
            </div>
            <div className="text-center">
              <p
                className={`font-black text-base mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                Processing...
              </p>
              <p
                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                Please wait, do not close...
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 gap-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 14 }}
              className="size-16 rounded-2xl flex items-center justify-center bg-green-500/12 border border-green-500/25"
            >
              <Check size={28} className="text-green-400" strokeWidth={3} />
            </motion.div>
            <div className="text-center">
              <p
                className={`font-black text-lg mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}
              >
                {plan.name} Activated! 🎉
              </p>
              <p
                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                Welcome aboard! Your account is upgraded.
              </p>
            </div>
            <button
              onClick={() => {
                toast.success(`${plan.name} plan activated! 🎉`);
                onClose();
                navigate("/dashboard");
              }}
              className="w-full py-3 rounded-xl border-none cursor-pointer text-white text-sm font-black bg-gradient-to-r from-green-500 to-emerald-500"
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function PricingSection() {
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[0] | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <AnimatePresence>
        {selectedPlan && (
          <CheckoutModal
            plan={selectedPlan}
            yearly={yearly}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>

      <section
        id="pricing"
        className={`py-24 px-5 ${isDark ? "bg-[#08080f]" : "bg-slate-50"}`}
      >
        <div className="max-w-6xl mx-auto" ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p
              className={`text-[11px] font-black tracking-[3px] uppercase mb-3 ${isDark ? "text-white/25" : "text-black/30"}`}
            >
              Pricing
            </p>
            <h2
              className={`font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
              style={{ fontSize: "clamp(32px,4.5vw,54px)" }}
            >
              Simple,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Transparent
              </span>
              <br />
              Pricing.
            </h2>
            <p
              className={`text-sm max-w-xs mx-auto mb-7 ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>

            {/* Toggle */}
            <div
              className={`inline-flex items-center gap-1 p-1 rounded-xl border ${isDark ? "bg-white/4 border-white/8" : "bg-slate-100 border-black/8"}`}
            >
              {[
                { l: "Monthly", v: false },
                { l: "Annual", v: true },
              ].map(({ l, v }) => (
                <button
                  key={l}
                  onClick={() => setYearly(v)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 flex items-center gap-1.5
                    ${yearly === v ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white" : isDark ? "bg-transparent text-slate-500" : "bg-transparent text-slate-400"}`}
                >
                  {l}
                  {v && (
                    <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/25">
                      -20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
            {PLANS.map((plan, i) => {
              const price = yearly ? plan.price.yearly : plan.price.monthly;
              const isPro = plan.popular;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                  className={`relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300
                    ${
                      isPro
                        ? "border-violet-500/35 shadow-[0_0_50px_rgba(124,58,237,0.15)]"
                        : isDark
                          ? "border-white/[0.08] hover:border-white/[0.15]"
                          : "border-black/[0.08] hover:border-black/[0.14] shadow-sm hover:shadow-md"
                    }`}
                  style={{
                    background: isPro
                      ? isDark
                        ? "linear-gradient(160deg,rgba(124,58,237,0.1),rgba(37,99,235,0.05))"
                        : "linear-gradient(160deg,rgba(124,58,237,0.05),#fff)"
                      : isDark
                        ? "rgba(255,255,255,0.02)"
                        : "#fff",
                  }}
                >
                  {isPro && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500" />
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Icon + name */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <div
                        className="size-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${plan.accent}15`,
                          border: `1px solid ${plan.accent}25`,
                        }}
                      >
                        <plan.icon size={16} style={{ color: plan.accent }} />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-black ${isDark ? "text-slate-100" : "text-slate-900"}`}
                        >
                          {plan.name}
                        </p>
                        {isPro && (
                          <p className="text-[10px] text-violet-400 font-semibold">
                            Most Popular
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                          style={{ fontSize: "clamp(26px,2.5vw,30px)" }}
                        >
                          {price === 0 ? "€0" : `€${price}`}
                        </span>
                        <span
                          className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                        >
                          {plan.period}
                        </span>
                      </div>
                      {yearly && price > 0 && (
                        <p className="text-[11px] text-green-400 font-semibold mt-0.5">
                          Save €
                          {(
                            (plan.price.monthly - plan.price.yearly) *
                            12
                          ).toFixed(2)}
                          /yr
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      {plan.tagline}
                    </p>
                    <div
                      className={`h-px mb-4 ${isDark ? "bg-white/6" : "bg-black/6"}`}
                    />

                    {/* Features */}
                    <div className="flex flex-col gap-2.5 flex-1 mb-5">
                      {plan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          {f.ok ? (
                            <div
                              className="size-4 rounded-full flex items-center justify-center shrink-0"
                              style={{
                                background: `${plan.accent}15`,
                                border: `1px solid ${plan.accent}30`,
                              }}
                            >
                              <Check
                                size={9}
                                strokeWidth={3}
                                style={{ color: plan.accent }}
                              />
                            </div>
                          ) : (
                            <div
                              className={`size-4 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/5 border border-white/8" : "bg-black/4 border border-black/6"}`}
                            >
                              <X
                                size={9}
                                strokeWidth={3}
                                className={
                                  isDark ? "text-white/20" : "text-black/20"
                                }
                              />
                            </div>
                          )}
                          <span
                            className={`text-xs ${f.ok ? (isDark ? "text-slate-300" : "text-slate-600") : isDark ? "text-slate-600" : "text-slate-400"}`}
                          >
                            {f.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full py-2.5 rounded-xl border-none cursor-pointer text-sm font-bold flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
                      style={
                        isPro
                          ? {
                              background:
                                "linear-gradient(135deg,#7c3aed,#2563eb)",
                              color: "#fff",
                              boxShadow: "0 0 22px rgba(124,58,237,0.4)",
                            }
                          : {
                              background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.05)",
                              color: isDark ? "#cbd5e1" : "#475569",
                              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                            }
                      }
                    >
                      {isPro && <Sparkles size={13} />}
                      {plan.cta}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-9 flex items-center justify-center gap-6 flex-wrap"
          >
            {[
              "No credit card required",
              "Cancel anytime",
              "24/7 Support",
              "Secure checkout",
            ].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check size={12} className="text-green-400" />
                <span
                  className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  {t}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
