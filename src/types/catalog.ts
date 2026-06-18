export type NailProduct = {
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
