import { IDiscountService } from "../src/services/IDiscountService";
import { DiscountService } from "../src/services/DiscountService";

describe("DiscountService", () => {
  let discountService: IDiscountService;

  beforeEach(() => {
    discountService = new DiscountService();
  });

  it("should exist as a class implementing IDiscountService", () => {
    expect(DiscountService).toBeDefined();
  });

  it("should have getDiscountedPrice method", () => {
    expect(discountService.getDiscountedPrice).toBeDefined();
  });

  it("Should apply a discount on an item.", () => {
    const originalPrice = 100;
    const discountedPrice = discountService.getDiscountedPrice(
      "cornflakes",
      originalPrice
    );
    expect(discountedPrice).toBeLessThan(originalPrice);
  });

  it("should calculate different discounts for different products", () => {
    const cornflakesUnitPrice = 4.0;
    const weetabixUnitPrice = 4.0;

    const discountedCornflakesPrice = discountService.getDiscountedPrice(
      "cornflakes",
      cornflakesUnitPrice
    );
    const discountedWeetabixPrice = discountService.getDiscountedPrice(
      "weetabix",
      weetabixUnitPrice
    );

    expect(discountedCornflakesPrice).not.toBe(discountedWeetabixPrice);
  });

  it("should return the same price for product without discount", () => {
    const unitPrice = 5.0;
    const discountedPrice = discountService.getDiscountedPrice(
      "oats",
      unitPrice
    );
    expect(discountedPrice).toBe(unitPrice);
  });
});
