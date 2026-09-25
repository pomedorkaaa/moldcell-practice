export interface OrderSummary {
  id: number;
  status: string;
  total: number;
  createdAt: string;
}

export interface OrderConfirmationItem {
  productId: number;
  productName: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderConfirmation extends OrderSummary {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  items: OrderConfirmationItem[];
}

export interface OrderItemDetails {
  id: number;
  productId: number | null;
  productName: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
}

export interface OrderDetails extends OrderSummary {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  items: OrderItemDetails[];
}