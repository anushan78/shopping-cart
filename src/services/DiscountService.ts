import { IDiscountService } from "./IDiscountService";

export class DiscountService implements IDiscountService {
  getDiscountedPrice(productName: string, price: number): number {
    if (productName === "cornflakes") {
      return parseFloat((price * 0.8).toFixed(2));
    }
    if (productName === "weetabix") {
      return parseFloat((price * 0.85).toFixed(2));
    }
    return price;
  }
}
