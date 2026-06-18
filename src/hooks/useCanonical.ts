import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";

const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      link.href = `${SITE}${pathname === "/" ? "" : pathname}`;
    }
  }, [pathname]);
};

export default useCanonical;
