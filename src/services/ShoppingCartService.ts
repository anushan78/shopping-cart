import { CartItem, createCartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { IPriceService } from "./IPriceService";
import { config } from "../config";

export class ShoppingCartService {
  private items: CartItem[] = [];
  private readonly TAX_RATE = config.taxRate;

  constructor(private priceService: IPriceService) {}

  async addProduct(productName: string, quantity: number): Promise<void> {
    const price = await this.priceService.getPrice(productName);
    const existingItem = this.items.find(
      (item) => item.product.name === productName
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = parseFloat(
        (existingItem.product.price * existingItem.quantity).toFixed(2)
      );
    } else {
      const product: Product = { name: productName, price };
      const newItem = createCartItem(product, quantity);
      this.items.push(newItem);
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getSubtotal(): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    return parseFloat(subtotal.toFixed(2));
  }

  getTax(): number {
    const tax = this.getSubtotal() * this.TAX_RATE;
    return parseFloat(tax.toFixed(2));
  }

  getTotal(): number {
    const total = this.getSubtotal() + this.getTax();
    return parseFloat(total.toFixed(2));
  }
}
