<script setup lang="ts">
import CatalogFilters from "~/components/catalog/CatalogFilters/CatalogFilters.vue";
import CatalogGrid from "~/components/catalog/CatalogGrid/CatalogGrid.vue";
import CatalogToolbar from "~/components/catalog/CatalogToolbar/CatalogToolbar.vue";
import styles from "./CatalogPage.module.scss";
import { mockCatalogProducts } from "~/utils/mock-products";
import type { CatalogFilterPatch } from "~/components/catalog/CatalogFilters/CatalogFilters.types";
// const catalogProducts = mockCatalogProducts;

const route = useRoute();
const router = useRouter();

const apiQuery = computed(() => route.query);

const {
  data: products,
  status,
  error,
} = await useFetch<CatalogProduct[]>("/api/products", {
  key: "catalog-products",
  query: apiQuery,
  default: () => [],
});

const { data: priceRange, error: priceRangeError } =
  await useFetch<CatalogPriceRange>("/api/catalog/price-range");

const { data: brands, error: brandsError } = await useFetch<Brand[]>(
  "/api/brands",
  {
    default: () => [],
  },
);

const { data: categories, error: categoriesError } = await useFetch<Category[]>(
  "/api/categories",
  {
    default: () => [],
  },
);

function updateQuery(patch: CatalogFilterPatch) {
  const query = { ...router.currentRoute.value.query };

  for (const [key, value] of Object.entries(patch)) {
    const shouldRemove =
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (key === "sort" && value === "default");

    if (shouldRemove) {
      delete query[key];
    } else {
      query[key] = Array.isArray(value) ? value : String(value);
    }
  }

  return navigateTo(
    {
      path: route.path,
      query,
    },
    {
      replace: true,
    },
  );
}

function resetFilters() {
  return navigateTo(
    {
      path: route.path,
      query: {},
    },
    {
      replace: true,
    },
  );
}

function updateSort(sort: string) {
  return updateQuery({
    sort,
  });
}
</script>

<template>
  <section :class="styles['catalog-page']">
    <div :class="styles['catalog-heading']">
      <div>
        <h1>Catalog</h1>
        <p>36 products</p>
      </div>
    </div>
    <div :class="styles['catalog-layout']">
      <CatalogFilters
        v-if="
          priceRange && !priceRangeError && !categoriesError && !brandsError
        "
        :categories="categories"
        :brands="brands"
        :price-range="priceRange"
        :query="route.query"
        @change="updateQuery"
        @reset="resetFilters"
      />
      <div>
        <CatalogToolbar @change="updateSort" />
        <CatalogGrid :products="products" />
      </div>
    </div>
  </section>
</template>
