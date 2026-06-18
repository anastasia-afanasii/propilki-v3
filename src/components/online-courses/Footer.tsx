import SiteFooter from "@/components/SiteFooter";

type Props = {
  content: {
    brandTitle: string;
    brandDescription: string;
    navHeading?: string;
    nav: { label: string; to: string; highlight?: boolean }[];
    socials?: { instagram?: string; email?: string };
    copyright: string;
  };
};

const Footer = ({ content }: Props) => <SiteFooter {...content} />;

export default Footer;
