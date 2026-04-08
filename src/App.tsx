import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OnlineCourses from "./pages/Index";
import Solo from "./pages/Solo";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";

import ScrollToHash from "@/components/nails/ScrollToHash";
import FaviconSwitcher from "@/components/FaviconSwitcher";
import useCanonical from "@/hooks/useCanonical";

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

const queryClient = new QueryClient();

const CanonicalUpdater = () => {
  useCanonical();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <CanonicalUpdater />
        <FaviconSwitcher />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<OnlineCourses />} />
          <Route path="/solo" element={<Solo />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
