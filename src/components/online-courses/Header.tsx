import SiteHeader from "@/components/SiteHeader";

type Props = {
  content?: {
    mobileAriaLabel?: string;
  };
};

const Header = ({ content }: Props) => (
  <SiteHeader
    logoText="PROPILKI"
    logoTo="/"
    mobileAriaLabel={content?.mobileAriaLabel ?? "Open menu"}
    links={[
      { to: "/#about", label: "About" },
      { to: "/#courses", label: "Courses" },
      { to: "/#reviews", label: "Reviews" },
      { to: "/#faq", label: "FAQ" },
      { to: "/solo", label: "Press-on Nails", highlight: true },
    ]}
  />
);

export default Header;
