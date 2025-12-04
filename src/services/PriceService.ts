import { IPriceService } from "./IPriceService";
import { config } from "../config";

interface ProductResponse {
  title: string;
  price: number;
}

export class PriceService implements IPriceService {
  getApiUrl = `${config.apiBaseUrl}/${config.getPath}`;

  async getPrice(productName: string): Promise<number> {
    const response = await fetch(
      `${this.getApiUrl}/${encodeURIComponent(productName)}.json`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch price for product: ${productName}`);
    }
    const productData = (await response.json()) as ProductResponse;

    if (typeof productData.price !== "number") {
      throw new Error(`Invalid price data for product: ${productName}`);
    }

    return productData.price;
  }
}
