import { IDiscountService } from "../src/services/IDiscountService";
import { IPriceService } from "../src/services/IPriceService";
import { ShoppingCartService } from "../src/services/ShoppingCartService";

class MockPriceService implements IPriceService {
  async getPrice(productName: string): Promise<number> {
    if (productName === "cornflakes") {
      return 2.52;
    }
    if (productName === "weetabix") {
      return 9.98;
    }
    return 2.52;
  }
}

class MockDiscountService implements IDiscountService {
  getDiscountedPrice(productName: string, price: number): number {
    return parseFloat((price * 0.9).toFixed(2));
  }
}

describe("Shoppingcartservice with mocks", () => {
  let priceService: IPriceService;
  let discountService: IDiscountService;
  let shoppingCartService: ShoppingCartService;

  beforeEach(() => {
    priceService = new MockPriceService();
    discountService = new MockDiscountService();
    shoppingCartService = new ShoppingCartService(
      priceService,
      discountService
    );
    shoppingCartService.clearCart();
  });

  test("adding single product yeilds subtotal for single item", async () => {
    await shoppingCartService.addProduct("cornflakes", 1);
    const subtotal = shoppingCartService.getSubtotal();
    expect(subtotal).toBe(2.27);
  });

  test("adding multiple products yields correct total(s)", async () => {
    await shoppingCartService.addProduct("cornflakes", 2);
    await shoppingCartService.addProduct("weetabix", 1);
    const subTotal = shoppingCartService.getSubtotal();
    expect(subTotal).toBe(13.52);
  });
});
