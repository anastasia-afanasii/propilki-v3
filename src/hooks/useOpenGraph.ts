import { useEffect } from "react";

const SITE = "https://propilki.online";

type OG = {
  title?: string;
  description?: string;
  /** path beginning with "/" (e.g. "/product/101") */
  path?: string;
  /** absolute or site-relative image url */
  image?: string;
};

const setMeta = (selector: string, value: string) => {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el && value) el.content = value;
  return el ? el.content : undefined;
};

/** Updates Open Graph + Twitter meta tags per route (best-effort; JS-executing crawlers). */
const useOpenGraph = ({ title, description, path, image }: OG) => {
  useEffect(() => {
    const url = `${SITE}${path && path !== "/" ? path : ""}`;
    const img = image
      ? image.startsWith("http")
        ? image
        : `${SITE}/${image.replace(/^\//, "")}`
      : undefined;

    const prev = {
      ot: document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content,
      od: document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content,
      ou: document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content,
      oi: document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content,
      tt: document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content,
      td: document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content,
      ti: document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content,
    };

    if (title) {
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[name="twitter:title"]', title);
    }
    if (description) {
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }
    setMeta('meta[property="og:url"]', url);
    if (img) {
      setMeta('meta[property="og:image"]', img);
      setMeta('meta[name="twitter:image"]', img);
    }

    return () => {
      if (prev.ot !== undefined) setMeta('meta[property="og:title"]', prev.ot);
      if (prev.od !== undefined) setMeta('meta[property="og:description"]', prev.od);
      if (prev.ou !== undefined) setMeta('meta[property="og:url"]', prev.ou);
      if (prev.oi !== undefined) setMeta('meta[property="og:image"]', prev.oi);
      if (prev.tt !== undefined) setMeta('meta[name="twitter:title"]', prev.tt);
      if (prev.td !== undefined) setMeta('meta[name="twitter:description"]', prev.td);
      if (prev.ti !== undefined) setMeta('meta[name="twitter:image"]', prev.ti);
    };
  }, [title, description, path, image]);
};

export default useOpenGraph;
