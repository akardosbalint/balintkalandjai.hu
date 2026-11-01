import { NextRequest, NextResponse } from "next/server";
import { getStripeServer, STRIPE_DEFAULT_CONFIG } from "@/lib/stripe";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripeServer();
    if (!stripe) {
      return NextResponse.json(
        {
          error: "STRIPE_NOT_CONFIGURED",
          message:
            "A Stripe titkos kulcs (STRIPE_SECRET_KEY) nincs beállítva. Használd a tartalék fizetési linket.",
          fallbackUrl: STRIPE_DEFAULT_CONFIG.paymentLink,
        },
        { status: 503 }
      );
    }

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const origin = host ? `${proto}://${host}` : siteConfig.url;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: STRIPE_DEFAULT_CONFIG.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${origin}/alapozo-koszonom?session_id={CHECKOUT_SESSION_ID}&payment=success`,
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ismeretlen Stripe hiba";
    return NextResponse.json(
      {
        error: "STRIPE_SESSION_ERROR",
        message,
        fallbackUrl: STRIPE_DEFAULT_CONFIG.paymentLink,
      },
      { status: 500 }
    );
  }
}
