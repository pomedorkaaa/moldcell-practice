export interface PriceRangeValue {
  minPrice?: number;
  maxPrice?: number;
}

export interface PriceRangeProps extends PriceRangeValue {
  min: number;
  max: number;
}
