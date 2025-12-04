import { ShoppingCartService } from "../src/services/ShoppingCartService";
import { IPriceService } from "../src/services/IPriceService";

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

describe("ShoppingCartService", () => {
  let cartService: ShoppingCartService;
  let priceService: IPriceService;

  beforeEach(() => {
    priceService = new MockPriceService();
    cartService = new ShoppingCartService(priceService);
  });

  it("calculates totals correctly for multiple products", async () => {
    await cartService.addProduct("cornflakes", 2);
    await cartService.addProduct("weetabix", 1);

    const items = cartService.getItems();
    expect(items).toHaveLength(2);

    const subtotal = cartService.getSubtotal();
    expect(subtotal).toBe(15.02); // 2 * 2.52 + 1 * 9.98

    const tax = cartService.getTax();
    expect(tax).toBe(1.88); // 15.02 * 0.125

    const total = cartService.getTotal();
    expect(total).toBe(16.9); // 15.02 + 1.88
  });

  it("aggregates duplicate products correctly", async () => {
    await cartService.addProduct("cornflakes", 1);
    await cartService.addProduct("cornflakes", 3);

    const items = cartService.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(4);
    expect(items[0].totalPrice).toBe(10.08); // 4 * 2.52

    const subtotal = cartService.getSubtotal();
    expect(subtotal).toBe(10.08);

    const tax = cartService.getTax();
    expect(tax).toBe(1.26); // 10.08 * 0.125

    const total = cartService.getTotal();
    expect(total).toBe(11.34); // 10.08 + 1.26
  });
});
