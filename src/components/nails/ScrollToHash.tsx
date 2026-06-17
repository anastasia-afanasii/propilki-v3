import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const getHeaderOffset = () => 72;

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = getHeaderOffset();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const top =
              el.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
          });
        });
      }
      prevPathname.current = pathname;
      return;
    }

    // No hash: only reset scroll on an actual route change, not when query
    // params change (catalog category/page filters update the URL in place).
    if (prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    prevPathname.current = pathname;
  }, [pathname, hash, key]);

  return null;
}
