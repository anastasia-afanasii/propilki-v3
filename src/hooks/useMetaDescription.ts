import { useEffect } from "react";

const DEFAULT =
  "PROPILKI - professional nail design studio offering online and offline dry file manicure courses, handcrafted press-on nails by SOLO, and exclusive nail art collections.";

const useMetaDescription = (description?: string) => {
  useEffect(() => {
    const el = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!el) return;
    const prev = el.content;
    el.content = description?.trim() ? description.trim() : DEFAULT;
    return () => {
      el.content = prev;
    };
  }, [description]);
};

export default useMetaDescription;
