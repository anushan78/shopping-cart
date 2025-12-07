import { ShoppingCartService } from "../src/services/ShoppingCartService";
import { IPriceService } from "../src/services/IPriceService";
import { IDiscountService } from "../src/services/IDiscountService";

class MockPriceService implements IPriceService {
  private prices: Record<string, number> = {
    cornflakes: 2.52,
    weetabix: 9.98,
  };

  async getPrice(productName: string): Promise<number> {
    const price = this.prices[productName];
    if (price !== undefined) {
      return price;
    }
    throw new Error(`Price not found for product: ${productName}`);
  }
}

class MockDiscountService implements IDiscountService {
  private discounts: Record<string, number> = {
    cornflakes: 2.27, // 20% discount
    weetabix: 7.98, // 15% discount
  };
  getDiscountedPrice(productName: string, price: number): number {
    return this.discounts[productName] ?? price;
  }
}

describe("ShoppingCartService", () => {
  let cartService: ShoppingCartService;
  let discountService: IDiscountService;
  let priceService: IPriceService;

  beforeEach(() => {
    priceService = new MockPriceService();
    discountService = new MockDiscountService();
    cartService = new ShoppingCartService(priceService, discountService);
  });

  it("calculates totals correctly for multiple products", async () => {
    await cartService.addProduct("cornflakes", 2);
    await cartService.addProduct("weetabix", 1);

    const items = cartService.getItems();
    expect(items).toHaveLength(2);

    const subtotal = cartService.getSubtotal();
    expect(subtotal).toBe(12.52); // 2 * 2.52 + 1 * 9.98

    const tax = cartService.getTax();
    expect(tax).toBe(1.56); // 15.02 * 0.125

    const total = cartService.getTotal();
    expect(total).toBe(14.08); // 15.02 + 1.88
  });

  it("aggregates duplicate products correctly", async () => {
    await cartService.addProduct("cornflakes", 1);
    await cartService.addProduct("cornflakes", 3);

    const items = cartService.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(4);
    expect(items[0].totalPrice).toBe(9.08); // 4 * 2.52

    const subtotal = cartService.getSubtotal();
    expect(subtotal).toBe(9.08);

    const tax = cartService.getTax();
    expect(tax).toBe(1.14); // 10.08 * 0.125

    const total = cartService.getTotal();
    expect(total).toBe(10.22); // 10.08 + 1.26
  });
});
