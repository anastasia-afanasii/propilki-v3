import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | PROPILKI` : "PROPILKI";
    return () => {
      document.title = prev;
    };
  }, [title]);
};

export default useDocumentTitle;
