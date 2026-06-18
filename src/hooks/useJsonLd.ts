import { useEffect } from "react";

/** Injects a JSON-LD <script> into <head> for the given data; cleans up on change/unmount. */
const useJsonLd = (data: object | null) => {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
};

export default useJsonLd;
