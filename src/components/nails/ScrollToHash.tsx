import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getHeaderOffset = () => 72;

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = getHeaderOffset();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const top =
          el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }, [pathname, hash, key]);

  return null;
}
