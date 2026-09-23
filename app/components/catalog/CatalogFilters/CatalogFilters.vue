<script setup lang="ts">
import styles from "./CatalogFilters.module.scss";
import PriceRange from "~/components/layout/ui/PriceRange/PriceRange.vue";
import type {
  CatalogFilterPatch,
  CatalogFiltersProps,
} from "./CatalogFilters.types";
import type { LocationQueryValue } from "vue-router";

// const categories = [
//   { name: "Keyboards", count: 8 },
//   { name: "Mice", count: 6 },
//   { name: "Lighting", count: 5 },
//   { name: "Audio", count: 6 },
//   { name: "Chairs", count: 5 },
//   { name: "Accessories", count: 6 },
// ];
// const brands = [
//   { name: "Logitech", count: 8 },
//   { name: "Keychron", count: 4 },
//   { name: "BenQ", count: 3 },
//   { name: "NuPhy", count: 2 },
//   { name: "HyperX", count: 4 },
//   { name: "Xiaomi", count: 3 },
//   { name: "Steelcase", count: 5 },
//   { name: "Sony", count: 2 },
//   { name: "Razer", count: 5 },
// ];
// const selectedCategories = ref<string[]>(["Keyboards"]);
// const selectedBrands = ref<string[]>(["Logitech"]);
// const inStockOnly = ref(true);
// const priceRange = reactive({
//   minPrice: undefined as number | undefined,
//   maxPrice: undefined as number | undefined,
// });

// const resetFilters = () => {
//   selectedCategories.value = [];
//   selectedBrands.value = [];
//   inStockOnly.value = false;
//   priceRange.minPrice = undefined;
//   priceRange.maxPrice = undefined;
// };

const props = defineProps<CatalogFiltersProps>();

const emit = defineEmits<{
  change: [value: CatalogFilterPatch];
  reset: [];
}>();

const priceKey = ref(0);

function readList(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
): string[] {
  const values = Array.isArray(value) ? value : [value];

  return values.filter(
    (item): item is string => typeof item === "string" && item !== "",
  );
}

function readPrice(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
) {
  if (typeof value !== "string" || value.trim() === "") {
    return undefined;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : undefined;
}

const selectedCategories = computed(() => readList(props.query.category));
const selectedBrands = computed(() => readList(props.query.brand));

function toggleFilter(key: "category" | "brand", slug: string, event: Event) {
  const target = event.target as HTMLInputElement;

  const remaining = readList(props.query[key]).filter(
    (value) => value !== slug,
  );

  emit("change", {
    [key]: target.checked ? [slug, ...remaining] : remaining,
  });
}

function reset() {
  priceKey.value += 1;
  emit("reset");
}
</script>

<template>
  <aside :class="styles.filters" aria-label="Catalog filters">
    <div :class="styles['filters-header']">
      <h2 :class="styles['filters-title']">Filters</h2>
      <button type="button" :class="styles['filters-reset']" @click="reset">
        Reset
      </button>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Price</span>
      <PriceRange
        :min="priceRange.min"
        :max="priceRange.max"
        :min-price="readPrice(query.minPrice)"
        :max-price="readPrice(query.maxPrice)"
        @change="emit('change', $event)"
      />
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Category</span>
      <div :class="styles['filters-list']">
        <label
          v-for="category in categories"
          :key="category.id"
          :class="styles['filters-check']"
        >
          <!-- v-model="selectedCategories" -->
          <input
            type="checkbox"
            :checked="selectedCategories.includes(category.slug)"
            :value="category.name"
            @change="toggleFilter('category', category.slug, $event)"
          />
          <span>{{ category.name }}</span>
          <!-- <small>{{ category.count }}</small> -->
        </label>
      </div>
    </div>
    <div :class="styles['filters-group']">
      <span :class="styles['filters-label']">Brand</span>
      <div :class="styles['filters-list']">
        <label
          v-for="brand in brands"
          :key="brand.id"
          :class="styles['filters-check']"
        >
          <!-- v-model="selectedBrands" -->
          <input
            type="checkbox"
            :checked="selectedBrands.includes(brand.slug)"
            :value="brand.name"
            @change="toggleFilter('brand', brand.slug, $event)"
          />
          <span>{{ brand.name }}</span>
          <!-- <small>{{ brand.count }}</small> -->
        </label>
      </div>
    </div>
    <!-- <label :class="styles['filters-stock']">
      <input v-model="inStockOnly" type="checkbox" />
      <span>In stock only</span>
    </label> -->
  </aside>
</template>
