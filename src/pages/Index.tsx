import { useMemo } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useMetaDescription from "@/hooks/useMetaDescription";
import useOpenGraph from "@/hooks/useOpenGraph";
import useJsonLd from "@/hooks/useJsonLd";
import { SITE } from "@/lib/site";

import Header from "@/components/online-courses/Header";
import Footer from "@/components/online-courses/Footer";

import HeroSection from "@/components/online-courses/HeroSection";
import AboutSection from "@/components/online-courses/AboutSection";
import CoursesSection from "@/components/online-courses/CoursesSection";
import ReviewsSection from "@/components/online-courses/ReviewsSection";
import FAQSection from "@/components/online-courses/FAQSection";

import propilki from "@/data/propilki.json";

const Index = () => {
  useDocumentTitle("Dry File Manicure Courses - Online & Offline");
  useMetaDescription(
    "Master the dry file manicure technique with PROPILKI - online and offline nail courses for beginners and professionals. Safe methods, fast results, and handcrafted press-on nails by SOLO."
  );
  useOpenGraph({
    title: "PROPILKI - Dry File Manicure Courses & Press-On Nails",
    description:
      "Online and offline dry file manicure courses for beginners and professionals, plus handcrafted SOLO press-on nails.",
    path: "/",
    image: "og-image.png",
  });

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Dry File Manicure School",
      description:
        "Online and offline dry file manicure training - safe, fast and effective techniques for beginners and professionals.",
      provider: {
        "@type": "Organization",
        name: "PROPILKI",
        url: SITE,
      },
      offers: {
        "@type": "Offer",
        category: "Online and offline nail courses",
        availability: "https://schema.org/InStock",
      },
    }),
    []
  );
  useJsonLd(jsonLd);

  return (
    <div className="min-h-screen bg-white">
      <Header content={propilki.header} />
      <main>
        <HeroSection hero={propilki.hero} stats={propilki.stats} />
        <AboutSection about={propilki.about} />
        <CoursesSection
          section={propilki.coursesSection}
          courses={propilki.courses}
        />
        <ReviewsSection reviews={propilki.reviews} />
        <FAQSection faq={propilki.faq} />
      </main>
      <Footer content={propilki.footer} />
    </div>
  );
};

export default Index;
