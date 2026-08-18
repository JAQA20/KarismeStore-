export interface Category {
  id: number;
  gender: string;
  name: string;
}

export interface SizeWithStock {
  size: string;
  stock: number;
}

export interface Variant {
  id: string;
  type: string;
  name: string;
  hex?: string;
  patternImage?: string;
  variantImage?: string;
  variantImages?: string[];
  sizesWithStock?: SizeWithStock[];
}

export interface ProductPayload {
  id?: string;
  sku?: string;
  name: string;
  category: string;
  productType?: string;
  price: number;
  originalPrice?: number | null;
  stock?: number;
  description?: string;
  badge?: string;
  variants?: Variant[];
  images?: string[];
}

export interface FormattedProduct {
  id: string;
  sku: string;
  name: string;
  productType: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  badge: string;
  description: string;
  category: string;
  subCategory: string;
  gender: string;
  image: string;
  images: string[];
  variants: Variant[];
  availableSizes: string[];
  availableColors: Array<{
    id: string;
    name: string;
    type: string;
    hex?: string;
    patternImage?: string;
    variantImage?: string;
    variantImages?: string[];
  }>;
}
