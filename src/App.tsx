import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToHash from "@/components/ScrollToHash";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import useCanonical from "@/hooks/useCanonical";

const OnlineCourses = lazy(() => import("./pages/Index"));
const Solo = lazy(() => import("./pages/Solo"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

(() => {
  const params = new URLSearchParams(window.location.search);
  const p = params.get("p");
  const h = params.get("h") || "";
  if (!p) return;

  const base = import.meta.env.BASE_URL;
  const cleaned = p.startsWith("/") ? p.slice(1) : p;
  window.history.replaceState(
    null,
    "",
    `${base}${cleaned}${decodeURIComponent(h)}`
  );
})();

const CanonicalUpdater = () => {
  useCanonical();
  return null;
};

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <CanonicalUpdater />
    <FaviconSwitcher />
    <ScrollToHash />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<OnlineCourses />} />
        <Route path="/solo" element={<Solo />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
