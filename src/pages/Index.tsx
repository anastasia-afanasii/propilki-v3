import useDocumentTitle from "@/hooks/useDocumentTitle";

import Header from "@/components/online-courses/Header";
import Footer from "@/components/online-courses/Footer";

import HeroSection from "@/components/online-courses/HeroSection";
import AboutSection from "@/components/online-courses/AboutSection";
import CoursesSection from "@/components/online-courses/CoursesSection";
import ReviewsSection from "@/components/online-courses/ReviewsSection";
import FAQSection from "@/components/online-courses/FAQSection";

import propilki from "@/data/propilki.json";

const Index = () => {
  useDocumentTitle("Online Nail Courses");

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Index;
