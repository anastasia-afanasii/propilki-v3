import content from "@/data/solo.json";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import Header from "@/components/nails/Header";
import Hero from "@/components/nails/Hero";
import NailCatalog from "@/components/nails/NailCatalog";
import TipCreationProcess from "@/components/nails/TipCreationProcess";
import HowItWorks from "@/components/nails/HowItWorks";
import PackagingVisual from "@/components/nails/PackagingVisual";
import Testimonials from "@/components/nails/Testimonials";
import FAQ from "@/components/nails/FAQ";
import Biography from "@/components/nails/Biography";
import Championships from "@/components/nails/Championships";
import Competitions from "@/components/nails/Competitions";
import CelebrityWorks from "@/components/nails/CelebrityWorks";
import Footer from "@/components/nails/Footer";

const Solo = () => {
  useDocumentTitle("SOLO Press-On Nails");

  return (
    <div className="min-h-screen bg-white">
      <Header content={content.header} />
      <main>
        <h1 className="sr-only">SOLO — Handcrafted Press-On Nails</h1>
        <Hero content={content.heroCarousel} />
        <NailCatalog content={content.catalog} />
        <TipCreationProcess content={content.tipCreationProcess} />
        <HowItWorks content={content.howItWorks} />
        <PackagingVisual content={content.packaging} />
        <Championships content={content.championships} />
        <Competitions content={content.competitions} />
        <CelebrityWorks content={content.celebrityWorks} />
        <Testimonials content={content.testimonials} />
        <FAQ content={content.faq} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
};

export default Solo;
