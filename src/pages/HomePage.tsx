import { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "../components/Home/HeroSection";
import AuthPage from "@/pages/AuthPage";

const FeaturesSection = lazy(
  () => import("../components/Home/FeaturesSection"),
);
const HowItWorksSection = lazy(
  () => import("../components/Home/HowItWorksSection"),
);
const ReviewsSection = lazy(() => import("../components/Home/ReviewsSection"));
const WhyChooseSection = lazy(
  () => import("../components/Home/WhyChooseSection"),
);
const PricingSection = lazy(() => import("../components/Home/PricingSection"));
const CTASection = lazy(() => import("../components/Home/CTASection"));
const Footer = lazy(() => import("../components/layout/Footer"));

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
  const authMode = searchParams.get("auth"); // 'signin' | 'signup' | 'forgot' | null

  // Agar ?auth= param hai toh AuthPage full screen dikhao
  if (authMode && ["signin", "signup", "forgot"].includes(authMode)) {
    return <AuthPage />;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary, #0a0a0f)" }}
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
