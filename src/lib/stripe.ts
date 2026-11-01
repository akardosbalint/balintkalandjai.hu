import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripeServer(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion,
      appInfo: {
        name: "balintkalandjai-alapozo",
        version: "1.0.0",
      },
    });
  }

  return stripeInstance;
}

export const STRIPE_DEFAULT_CONFIG = {
  productId: "prod_VViI8xPpi26jGI",
  priceId: process.env.STRIPE_PRICE_ID || "price_1UUhg8KKK49wrBvLjC2eSnDa",
  paymentLink: "https://donate.stripe.com/14A28sa33gxg4Ii0YM57W00",
} as const;
