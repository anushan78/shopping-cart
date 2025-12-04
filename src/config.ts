export const config = {
  apiBaseUrl: process.env.API_BASE_URL || "https://equalexperts.github.io",
  getPath: "backend-take-home-test-data",
  taxRate: parseFloat(process.env.TAX_RATE || "0.125"),
};
