import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export function createCartItem(product: Product, quantity: number): CartItem {
  return {
    product,
    quantity,
    totalPrice: parseFloat((product.price * quantity).toFixed(2)),
  };
}
