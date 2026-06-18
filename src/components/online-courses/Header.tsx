import SiteHeader from "@/components/SiteHeader";

type NavLink = { to: string; label: string; highlight?: boolean };

type Props = {
  content: {
    logoText: string;
    logoTo: string;
    mobileAriaLabel?: string;
    links: NavLink[];
  };
};

const Header = ({ content }: Props) => (
  <SiteHeader
    logoText={content.logoText}
    logoTo={content.logoTo}
    mobileAriaLabel={content.mobileAriaLabel}
    links={content.links}
  />
);

export default Header;
