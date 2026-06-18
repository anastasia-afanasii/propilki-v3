import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import type { NailProduct } from "@/types/catalog";
import { assetUrl } from "@/lib/utils";

type Props = {
  product: NailProduct;
  badgeLabel: string;
  priority?: boolean;
};

const ProductCard = ({ product, badgeLabel, priority = false }: Props) => {
  const location = useLocation();

  const coverImage = product.images?.[0]
    ? assetUrl(product.images[0])
    : assetUrl("placeholder.svg");

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ catalogSearch: location.search }}
      aria-label={`View ${product.name}`}
      className="block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      <Card className="group overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-none cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={coverImage}
            alt={product.name}
            className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
            width={800}
            height={800}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
          />

          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 text-neutral-700 text-[10px] sm:text-xs font-medium px-2 py-1 tracking-wider uppercase">
            {product.category}
          </span>

          <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <span className="flex items-center justify-center w-full bg-black text-white rounded-none font-medium tracking-wide text-xs sm:text-sm py-2">
              <Eye className="h-3 w-3 mr-2" />
              {badgeLabel}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <h3 className="text-sm sm:text-lg font-medium text-neutral-900 mb-2 tracking-wide line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm sm:text-lg font-medium text-neutral-900">
              from {product.price}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-medium tracking-wider uppercase">
              {product.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-xs bg-neutral-100 text-neutral-600 px-2 py-1 font-light tracking-wide"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
