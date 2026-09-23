export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brandId: number;
  categoryId: number;
  price: number;
  oldPrice: number | null;
  stock: number;
  description: string;
  images: string[];
  createdAt: string;
}

export interface CatalogProduct extends Product {
  brand: Brand;
  category: Category;
}

export interface CatalogPriceRange {
  min: number;
  max: number;
}
