import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import Header from "@/components/nails/Header";
import Footer from "@/components/nails/Footer";

import content from "@/data/solo.json";
import catalog from "@/data/nailCatalog.json";

type NailProduct = {
  id: number;
  name: string;
  price: string;
  category: string;
  images: string[];
  colors: string[];
  length: string;
  description?: string;
  badge?: string;
  originalPrice?: string;
  inStock?: boolean;
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const products = (catalog.products as NailProduct[]) ?? [];

  const product = useMemo(() => {
    const pid = Number(id);
    return products.find((p) => p.id === pid);
  }, [id, products]);

  useDocumentTitle(product?.name ?? "Product");

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.id]);

  const gallery = useMemo(() => {
    const imgs = product?.images ?? [];
    return imgs.map((p) => `${import.meta.env.BASE_URL}${p}`);
  }, [product]);

  const hasGallery = gallery.length > 1;

  const handlePreviousImage = () => {
    if (!hasGallery) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!hasGallery) return;
    setSelectedImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePreviousImage,
    trackMouse: true,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!hasGallery) return;
      if (e.key === "ArrowLeft") handlePreviousImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasGallery, gallery.length]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header content={content.header} />
        <div className="pt-20 sm:pt-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center py-16 sm:py-24">
            <h1 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-4">
              Product not found
            </h1>
            <Button
              onClick={() => navigate("/solo")}
              variant="outline"
              type="button"
            >
              Return to solo
            </Button>
          </div>
        </div>
        <Footer content={content.footer} />
      </div>
    );
  }

  const activeImage =
    gallery[selectedImageIndex] ?? `${import.meta.env.BASE_URL}placeholder.svg`;

  const availability =
    product.inStock === false
      ? "Out of stock"
      : product.inStock === true
      ? "Available"
      : "Handcrafted on demand";

  const availabilityClass =
    product.inStock === false
      ? "text-red-600"
      : product.inStock === true
      ? "text-green-600"
      : "text-neutral-600";

  const fromPrice = `From ${product.price}`;

  return (
    <div className="min-h-screen bg-white">
      <Header content={content.header} />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/solo#catalog")}
            className="mb-5 sm:mb-6 text-neutral-600 hover:text-neutral-900"
            type="button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to catalog
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
            {/* Images */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="relative group" {...swipeHandlers}>
                <div className="aspect-square overflow-hidden bg-neutral-50 rounded-lg">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>

                {hasGallery && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition"
                      aria-label="Previous image"
                      type="button"
                    >
                      <ChevronLeft className="h-5 w-5 text-neutral-900" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition"
                      aria-label="Next image"
                      type="button"
                    >
                      <ChevronRight className="h-5 w-5 text-neutral-900" />
                    </button>
                  </>
                )}
              </div>

              {hasGallery && (
                <div className="flex justify-center gap-2">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        selectedImageIndex === index
                          ? "w-8 bg-neutral-900"
                          : "w-2 bg-neutral-300"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      type="button"
                    />
                  ))}
                </div>
              )}

              {hasGallery && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  {gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden border-2 transition-all duration-200 rounded-md ${
                        selectedImageIndex === index
                          ? "border-neutral-900"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                      type="button"
                      aria-label={`Select image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <div>
                {product.badge && (
                  <Badge className="mb-3 sm:mb-4 bg-neutral-900 text-white hover:bg-neutral-800">
                    {product.badge}
                  </Badge>
                )}

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 mb-3 sm:mb-4 tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-medium text-neutral-900">
                    {fromPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base sm:text-lg text-neutral-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <Card className="p-5 sm:p-6 rounded-none shadow-none border border-neutral-200">
                <div className="space-y-4 sm:space-y-5">
                  {product.description && (
                    <div>
                      <h2 className="text-base sm:text-lg font-medium text-neutral-900 mb-2">
                        Description
                      </h2>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <h2 className="text-base sm:text-lg font-medium text-neutral-900 mb-3">
                      Details
                    </h2>

                    <div className="space-y-2 text-sm sm:text-base">
                      <div className="flex justify-between gap-6">
                        <span className="text-neutral-600">Product ID:</span>
                        <span className="text-neutral-900 text-right">
                          {product.id}
                        </span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-neutral-600">Category:</span>
                        <span className="text-neutral-900 text-right">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-neutral-600">Length:</span>
                        <span className="text-neutral-900">
                          {product.length}
                        </span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-neutral-600">Colors:</span>
                        <span className="text-neutral-900 text-right">
                          {product.colors.join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-neutral-600">Availability:</span>
                        <span className={`${availabilityClass} text-right`}>
                          {availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <Button
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white h-11 sm:h-12 rounded-none"
                      size="lg"
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/solo.lo_nails/",
                          "_blank"
                        )
                      }
                      type="button"
                    >
                      Order now — {fromPrice}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer content={content.footer} />
    </div>
  );
};

export default ProductPage;
