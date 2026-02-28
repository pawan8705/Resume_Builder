// src/pages/HomePage.tsx
import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AuthPage from "@/pages/AuthPage";

const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const HowItWorksSection = lazy(
  () => import("@/components/home/HowItWorksSection"),
);
const ReviewsSection = lazy(() => import("@/components/home/ReviewsSection"));
const WhyChooseSection = lazy(
  () => import("@/components/home/WhyChooseSection"),
);
const PricingSection = lazy(() => import("@/components/home/PricingSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));
const Footer = lazy(() => import("@/components/layout/Footer"));

function Loader() {
  return (
    <div className="h-24 flex items-center justify-center">
      <div className="w-20 h-0.5 rounded-full bg-violet-500/15 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-blue-600 rounded-full"
          style={{ animation: "sl 1.2s ease-in-out infinite" }}
        />
      </div>
      <style>{`@keyframes sl{0%{transform:translateX(-150%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const isDark = useAppSelector((s) => s.theme.theme === "dark");
  const authMode = searchParams.get("auth");

  if (authMode && ["signin", "signup", "forgot"].includes(authMode)) {
    return <AuthPage />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#08080f]" : "bg-white"}`}
    >
      <Navbar />
      <HeroSection />
      <Suspense fallback={<Loader />}>
        <FeaturesSection />
        <HowItWorksSection />
        <ReviewsSection />
        <WhyChooseSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
}
