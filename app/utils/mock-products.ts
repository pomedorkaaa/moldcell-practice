import type { CatalogProduct } from "#shared/types/catalog";

export const mockProduct: CatalogProduct = {
  id: 2,
  name: "Keychron Q1 V2",
  slug: "keychron-q1-v2",
  brandId: 2,
  categoryId: 1,
  price: 179,
  oldPrice: 199,
  stock: 7,
  description: "A compact mechanical keyboard for a focused workspace.",
  images: [
    "/images/products/keychron-q1-v2-1.webp",
    "/images/products/keychron-q1-v2-2.webp",
  ],
  createdAt: "2026-02-07T10:00:00.000Z",
  brand: { id: 2, name: "Keychron", slug: "keychron" },
  category: { id: 1, name: "Keyboards", slug: "keyboards" },
};

export const mockCatalogProducts = [mockProduct, mockProduct, mockProduct];
