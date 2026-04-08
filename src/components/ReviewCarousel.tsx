import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  items: (string | { text: string })[];
  autoPlayMs?: number;
  pill?: {
    icon: LucideIcon;
    text: string;
  };
  variant?: "neutral" | "themed";
};

const ReviewCarousel = ({
  id = "reviews",
  title,
  subtitle,
  items: rawItems,
  autoPlayMs,
  pill,
  variant = "neutral",
}: Props) => {
  const items = useMemo(
    () => rawItems.map((item) => (typeof item === "string" ? item : item.text)),
    [rawItems]
  );
  const [index, setIndex] = useState(0);
  const hasMany = items.length > 1;
  const isThemed = variant === "themed";

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1)),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1)),
    [items.length]
  );

  useEffect(() => {
    if (!hasMany || !autoPlayMs) return;
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [hasMany, autoPlayMs, next]);

  useEffect(() => {
    if (!hasMany) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasMany, prev, next]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMany) return;
    const t = e.touches?.[0];
    if (!t) return;
    e.currentTarget.dataset.x = String(t.clientX);
    e.currentTarget.dataset.y = String(t.clientY);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMany) return;
    const x0 = Number(e.currentTarget.dataset.x || 0);
    const y0 = Number(e.currentTarget.dataset.y || 0);
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - x0;
    const dy = t.clientY - y0;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 40) prev();
    if (dx < -40) next();
  };

  const text = items[index] ?? "";

  const bgClass = isThemed ? "bg-muted/50" : "bg-neutral-50";
  const titleClass = isThemed
    ? "text-foreground leading-tight"
    : "text-neutral-900 mb-4 sm:mb-5 tracking-tight";
  const dotActive = isThemed ? "bg-foreground" : "bg-neutral-900";
  const dotInactive = isThemed ? "bg-border" : "bg-neutral-300";
  const btnClass = isThemed
    ? "bg-white border border-border shadow-sm hover:bg-muted smooth-transition"
    : "bg-white border border-neutral-200 shadow-sm hover:bg-neutral-100 transition";
  const quoteClass = isThemed ? "text-muted-foreground" : "text-neutral-600";

  return (
    <section id={id} className={`py-12 sm:py-14 md:py-16 px-4 sm:px-6 ${bgClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          {pill && (
            <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-3.5 py-1.5 mb-5 sm:mb-6">
              <pill.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{pill.text}</span>
            </div>
          )}

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light ${titleClass}`}>
            {title}
          </h2>

          {!isThemed && <div className="w-16 sm:w-20 md:w-24 h-px bg-neutral-300 mx-auto mb-5 sm:mb-6" />}

          {subtitle && (
            <p className={`text-base sm:text-lg font-light ${isThemed ? "text-muted-foreground" : "text-neutral-600"}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {hasMany && (
            <>
              <button
                onClick={prev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${btnClass}`}
                type="button"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${btnClass}`}
                type="button"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Card className={`p-6 sm:p-8 md:p-10 border ${isThemed ? "border-border elegant-shadow" : "border-neutral-200 shadow-sm"}`}>
              <blockquote className={`text-sm sm:text-base md:text-lg font-light leading-relaxed text-center italic ${quoteClass}`}>
                "{text}"
              </blockquote>
            </Card>
          </div>

          {hasMany && (
            <div className="flex justify-center gap-2 mt-5 sm:mt-6">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full transition ${i === index ? dotActive : dotInactive}`}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
