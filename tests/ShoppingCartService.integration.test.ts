import { ShoppingCartService } from "../src/services/ShoppingCartService";
import { PriceService } from "../src/services/PriceService";
import { DiscountService } from "../src/services/DiscountService";

describe("ShoppingCartService Integration Tests", () => {
  jest.setTimeout(15000);

  let priceService: PriceService;
  let discountService: DiscountService;
  let shoppingCartService: ShoppingCartService;

  beforeAll(() => {
    priceService = new PriceService();
    discountService = new DiscountService();

    shoppingCartService = new ShoppingCartService(
      priceService,
      discountService
    );
  });

  it("should calculate totals with real prices from API", async () => {
    // Clear cart before test
    shoppingCartService.clearCart();
    // Add Products
    await shoppingCartService.addProduct("weetabix", 2);
    await shoppingCartService.addProduct("cornflakes", 1);
    await shoppingCartService.addProduct("frosties", 4);
    await shoppingCartService.addProduct("shreddies", 3);
    await shoppingCartService.addProduct("weetabix", 3);

    const total = await shoppingCartService.getTotal();
    console.log("Total is : ", total);
    expect(total).toEqual(88.22);
  });

  it("should calculate subtotal, tax and total with real prices from API", async () => {
    // Clear cart and Add Products
    shoppingCartService.clearCart();
    await shoppingCartService.addProduct("cornflakes", 1);
    await shoppingCartService.addProduct("cornflakes", 1);
    await shoppingCartService.addProduct("weetabix", 1);
    const subtotal = shoppingCartService.getSubtotal();
    const tax = shoppingCartService.getTax();
    const total = shoppingCartService.getTotal();

    console.log(`Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}`);

    expect(subtotal).toEqual(12.52);
    expect(tax).toEqual(1.56);
    expect(total).toEqual(14.08);
  });
});
