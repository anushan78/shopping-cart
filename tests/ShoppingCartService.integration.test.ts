import { ShoppingCartService } from "../src/services/ShoppingCartService";
import { PriceService } from "../src/services/PriceService";

describe("ShoppingCartService Integration Tests", () => {
  jest.setTimeout(15000);

  let priceService: PriceService;
  let shoppingCartService: ShoppingCartService;

  beforeAll(() => {
    priceService = new PriceService();
    shoppingCartService = new ShoppingCartService(priceService);
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
    expect(total).toEqual(97.22);
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

    expect(subtotal).toEqual(15.02);
    expect(tax).toEqual(1.88);
    expect(total).toEqual(16.9);
  });
});
