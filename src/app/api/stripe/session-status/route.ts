import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "MISSING_SESSION_ID", message: "Hiányzó session_id paraméter." },
      { status: 400 }
    );
  }

  const stripe = getStripeServer();
  if (!stripe) {
    return NextResponse.json(
      { error: "STRIPE_NOT_CONFIGURED", message: "Stripe nincs konfigurálva." },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      status: session.status,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hiba a session lekérésekor";
    return NextResponse.json({ error: "SESSION_RETRIEVAL_FAILED", message }, { status: 500 });
  }
}
