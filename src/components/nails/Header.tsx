import SiteHeader from "@/components/SiteHeader";

type Props = {
  content: {
    logoText: string;
    mobileAriaLabel: string;
  };
};

const Header = ({ content }: Props) => (
  <SiteHeader
    logoText={content.logoText}
    logoTo="/solo"
    mobileAriaLabel={content.mobileAriaLabel}
    links={[
      { to: "/solo#catalog", label: "Catalog" },
      { to: "/solo#how-it-works", label: "How it works" },
      { to: "/solo#packaging", label: "Packaging" },
      { to: "/solo#testimonials", label: "Reviews" },
      { to: "/solo#faq", label: "FAQ" },
      { to: "/", label: "Online courses", highlight: true },
    ]}
  />
);

export default Header;
