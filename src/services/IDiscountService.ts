export interface IDiscountService {
  getDiscountedPrice(productName: string, price: number): number;
}
