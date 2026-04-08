import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      link.href = `https://propilki.online${pathname === "/" ? "" : pathname}`;
    }
  }, [pathname]);
};

export default useCanonical;
