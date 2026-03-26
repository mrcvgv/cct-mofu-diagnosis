import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "payment_not_configured" }, { status: 503 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover",
  });
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://cct-mofu-diagnosis.vercel.app";
  const { type, morphId, sessionId } = await req.json() as {
    type: "fortune" | "resident";
    morphId: string;
    sessionId?: string;
  };

  if (!morphId || !type) {
    return NextResponse.json({ error: "morphId and type are required" }, { status: 400 });
  }

  const baseMetadata = { morphId, type, ...(sessionId ? { sessionId } : {}) };

  if (type === "fortune") {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_FORTUNE_PRICE_ID!, quantity: 1 }],
      metadata: baseMetadata,
      success_url: `${BASE_URL}/fortune/success?session_id={CHECKOUT_SESSION_ID}&morph=${morphId}`,
      cancel_url:  `${BASE_URL}/fortune?morph=${morphId}&canceled=1`,
      locale: "ja",
    });
    return NextResponse.json({ url: session.url });
  }

  if (type === "resident") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_RESIDENT_PRICE_ID!, quantity: 1 }],
      metadata: baseMetadata,
      subscription_data: { metadata: { morphId, ...(sessionId ? { sessionId } : {}) } },
      success_url: `${BASE_URL}/resident/success?session_id={CHECKOUT_SESSION_ID}&morph=${morphId}`,
      cancel_url:  `${BASE_URL}/resident?morph=${morphId}&canceled=1`,
      locale: "ja",
    });
    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ error: "invalid type" }, { status: 400 });
}
