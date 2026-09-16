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

export const mockCartProducts: CatalogProduct[] = [
  mockProduct,
  {
    id: 7,
    name: "Logitech MX Master 3S",
    slug: "logitech-mx-master-3s",
    brandId: 1,
    categoryId: 2,
    price: 99,
    oldPrice: null,
    stock: 9,
    description: "A quiet wireless mouse shaped for long work sessions.",
    images: [
      "/images/products/logitech-mx-master-3s-1.webp",
      "/images/products/logitech-mx-master-3s-2.webp",
    ],
    createdAt: "2026-02-07T10:00:00.000Z",
    brand: { id: 1, name: "Logitech", slug: "logitech" },
    category: { id: 2, name: "Mice", slug: "mice" },
  },
];
