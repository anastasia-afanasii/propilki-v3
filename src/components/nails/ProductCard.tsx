import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type NailProduct = {
  id: number;
  name: string;
  price: string;
  category: string;
  images: string[];
  colors: string[];
  length: string;
};

type Props = {
  product: NailProduct;
  badgeLabel: string;
};

const ProductCard = ({ product, badgeLabel }: Props) => {
  const navigate = useNavigate();

  const coverImage = product.images?.[0]
    ? `${import.meta.env.BASE_URL}${product.images[0]}`
    : `${import.meta.env.BASE_URL}placeholder.svg`;

  const goToProduct = () => navigate(`/product/${product.id}`);

  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-none cursor-pointer">
      <div className="relative overflow-hidden" onClick={goToProduct}>
        <img
          src={coverImage}
          alt={product.name}
          className="w-full h-56 sm:h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
          width={800}
          height={800}
          loading="lazy"
        />

        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 text-neutral-700 text-[10px] sm:text-xs font-medium px-2 py-1 tracking-wider uppercase">
          {product.category}
        </span>

        <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button className="w-full bg-black hover:bg-neutral-800 text-white rounded-none font-medium tracking-wide text-xs sm:text-sm py-2">
            <Eye className="h-3 w-3 mr-2" />
            {badgeLabel}
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6" onClick={goToProduct}>
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
  );
};

export default ProductCard;
