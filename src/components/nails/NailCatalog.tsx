import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

import SectionHeading from "@/components/SectionHeading";

import catalog from "@/data/nailCatalog.json";
import type { NailProduct } from "@/types/catalog";

const products = catalog.products as NailProduct[];

type Props = {
  content: {
    title: string;
    subtitle: string;
    categoryOrder: string[];
    badgeLabel: string;
  };
};

const MOBILE_PAGE_SIZE = 2;
const DESKTOP_PAGE_SIZE = 8;

type PageToken = number | "…";

const getVisiblePages = (current: number, total: number): PageToken[] => {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
};

const NailCatalog = ({ content }: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const categoryBarRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const defaultCategory = content.categoryOrder?.[0] ?? "All";
  const selectedCategory = searchParams.get("cat") ?? defaultCategory;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const updateParams = (next: { cat?: string; page?: number }) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next.cat !== undefined) {
          if (next.cat === defaultCategory) params.delete("cat");
          else params.set("cat", next.cat);
        }
        if (next.page !== undefined) {
          if (next.page <= 1) params.delete("page");
          else params.set("page", String(next.page));
        }
        return params;
      },
      { replace: true }
    );
  };

  const [pageSize, setPageSize] = useState<number>(() => {
    if (typeof window === "undefined") return DESKTOP_PAGE_SIZE;
    return window.matchMedia("(min-width: 640px)").matches
      ? DESKTOP_PAGE_SIZE
      : MOBILE_PAGE_SIZE;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(min-width: 640px)");
    const apply = () =>
      setPageSize(mql.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE);

    apply();

    const onChange = () => apply();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  }, [filteredProducts.length, pageSize]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (totalPages <= 1) params.delete("page");
          else params.set("page", String(totalPages));
          return params;
        },
        { replace: true }
      );
    }
  }, [page, totalPages, setSearchParams]);

  const scrollToCatalogTop = () => {
    const el = sectionRef.current;
    if (!el) return;

    const headerOffset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const ensureActiveCategoryVisible = (category: string) => {
    const bar = categoryBarRef.current;
    if (!bar) return;

    const target = bar.querySelector<HTMLButtonElement>(
      `[data-cat="${CSS.escape(category)}"]`
    );
    if (!target) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = target.getBoundingClientRect();

    if (btnRect.left < barRect.left || btnRect.right > barRect.right) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const selectCategory = (category: string) => {
    ensureActiveCategoryVisible(category);
    updateParams({ cat: category, page: 1 });
    requestAnimationFrame(() => scrollToCatalogTop());
  };

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(totalPages, Math.max(1, nextPage));
    updateParams({ page: clamped });
    requestAnimationFrame(() => scrollToCatalogTop());
  };

  const visiblePages = useMemo<PageToken[]>(
    () => getVisiblePages(page, totalPages),
    [page, totalPages]
  );

  return (
    <section
      id="catalog"
      ref={sectionRef}
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={content.title}
          subtitle={content.subtitle}
          subtitleClassName="text-base sm:text-lg text-neutral-600 font-light"
        />

        <div className="flex justify-center mb-7 sm:mb-8 md:mb-10">
          <div
            ref={categoryBarRef}
            className="w-full max-w-5xl overflow-x-auto no-scrollbar"
          >
            <div className="flex gap-2 w-max mx-auto px-1">
              {content.categoryOrder.map((category) => (
                <Button
                  key={category}
                  data-cat={category}
                  aria-pressed={selectedCategory === category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  onClick={() => selectCategory(category)}
                  className={`px-5 sm:px-6 py-2 rounded-none font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "text-neutral-600 hover:text-black hover:bg-neutral-50"
                  }`}
                  type="button"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {pageItems.length === 0 ? (
          <p className="text-center text-neutral-500 font-light py-12">
            No products in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {pageItems.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                badgeLabel={content.badgeLabel}
                priority={i < 4}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center">
            <div className="flex items-center gap-1 sm:gap-2 flex-nowrap overflow-x-auto no-scrollbar px-2">
              <Button
                variant="ghost"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded-none px-2 py-1 sm:px-3 sm:py-2"
                type="button"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Prev</span>
              </Button>

              {visiblePages.map((token, i) =>
                token === "…" ? (
                  <span
                    key={`dots-${i}`}
                    className="px-2 sm:px-3 text-neutral-400 text-sm select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={token}
                    type="button"
                    onClick={() => goToPage(token)}
                    aria-label={`Go to page ${token}`}
                    className={`h-9 min-w-9 px-3 text-sm font-medium tracking-wide border transition ${
                      token === page
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {token}
                  </button>
                )
              )}

              <Button
                variant="ghost"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-none px-2 py-1 sm:px-3 sm:py-2"
                type="button"
                aria-label="Next page"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NailCatalog;
