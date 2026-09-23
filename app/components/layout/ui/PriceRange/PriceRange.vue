<script setup lang="ts">
import type { PriceRangeProps, PriceRangeValue } from "./PriceRange.types";

import styles from "./PriceRange.module.scss";

const props = defineProps<PriceRangeProps>();

const emit = defineEmits<{
  change: [value: PriceRangeValue];
}>();

const errorId = useId();

const lower = ref<number | string>(props.minPrice ?? props.min);

const upper = ref<number | string>(props.maxPrice ?? props.max);

watch(
  () => [props.minPrice, props.maxPrice, props.min, props.max],
  () => {
    lower.value = props.minPrice ?? props.min;
    upper.value = props.maxPrice ?? props.max;
  },
);

const lowerNumber = computed(() =>
  lower.value === "" ? props.min : Number(lower.value),
);

const upperNumber = computed(() =>
  upper.value === "" ? props.max : Number(upper.value),
);

const error = computed(() => {
  const values = [lowerNumber.value, upperNumber.value];

  if (!values.every((value) => Number.isInteger(value) && value >= 0)) {
    return "Enter a whole price of zero or more.";
  }

  if (lowerNumber.value > upperNumber.value) {
    return "Minimum price must not exceed maximum price.";
  }

  return "";
});

function clamp(value: number) {
  return Math.min(props.max, Math.max(props.min, value));
}

const sliderStyle = computed(() => {
  const difference = props.max - props.min;

  function percentage(value: number) {
    if (difference <= 0) {
      return 0;
    }

    return ((clamp(value) - props.min) / difference) * 100;
  }

  return {
    "--range-start": `${percentage(lowerNumber.value)}%`,
    "--range-end": `${percentage(upperNumber.value)}%`,
  };
});

function updateSlider(side: "min" | "max", event: Event) {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);

  if (side === "min") {
    lower.value = Math.min(value, clamp(upperNumber.value));

    target.value = String(lower.value);
  } else {
    upper.value = Math.max(value, clamp(lowerNumber.value));

    target.value = String(upper.value);
  }
}

function applyRange() {
  if (error.value) {
    return;
  }

  emit("change", {
    minPrice:
      lower.value === "" || lowerNumber.value === props.min
        ? undefined
        : lowerNumber.value,

    maxPrice:
      upper.value === "" || upperNumber.value === props.max
        ? undefined
        : upperNumber.value,
  });
}
</script>

<template>
  <div :class="styles['price-range']">
    <div :class="styles['price-range-fields']">
      <input
        v-model="lower"
        type="number"
        min="0"
        step="1"
        aria-label="Minimum price"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? errorId : undefined"
        :class="styles['price-range-input']"
        @change="applyRange"
      />

      <span aria-hidden="true">–</span>

      <input
        v-model="upper"
        type="number"
        min="0"
        step="1"
        aria-label="Maximum price"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? errorId : undefined"
        :class="styles['price-range-input']"
        @change="applyRange"
      />
    </div>

    <div :class="styles['price-range-slider']" :style="sliderStyle">
      <div :class="styles['price-range-track']" aria-hidden="true" />

      <input
        type="range"
        :min="min"
        :max="max"
        step="1"
        :value="clamp(lowerNumber)"
        :disabled="min >= max || Boolean(error)"
        aria-label="Minimum price slider"
        :class="styles['price-range-handle']"
        @input="updateSlider('min', $event)"
        @change="applyRange"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        step="1"
        :value="clamp(upperNumber)"
        :disabled="min >= max || Boolean(error)"
        aria-label="Maximum price slider"
        :class="styles['price-range-handle']"
        @input="updateSlider('max', $event)"
        @change="applyRange"
      />
    </div>

    <p
      v-if="error"
      :id="errorId"
      :class="styles['price-range-error']"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
