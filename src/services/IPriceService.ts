export interface IPriceService {
  getPrice(productName: string): Promise<number>;
}
