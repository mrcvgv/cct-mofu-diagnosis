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
  const { type, morphId } = await req.json() as { type: "fortune" | "resident"; morphId: string };

  if (!morphId || !type) {
    return NextResponse.json({ error: "morphId and type are required" }, { status: 400 });
  }

  if (type === "fortune") {
    // 単発占い ¥490（一回払い）
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_FORTUNE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { morphId, type: "fortune" },
      success_url: `${BASE_URL}/fortune/success?session_id={CHECKOUT_SESSION_ID}&morph=${morphId}`,
      cancel_url: `${BASE_URL}/fortune?morph=${morphId}&canceled=1`,
      locale: "ja",
    });
    return NextResponse.json({ url: session.url });
  }

  if (type === "resident") {
    // 住人プラン ¥980/月（サブスク）
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_RESIDENT_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { morphId, type: "resident" },
      subscription_data: {
        metadata: { morphId },
      },
      success_url: `${BASE_URL}/resident/success?session_id={CHECKOUT_SESSION_ID}&morph=${morphId}`,
      cancel_url: `${BASE_URL}/resident?morph=${morphId}&canceled=1`,
      locale: "ja",
    });
    return NextResponse.json({ url: session.url });
  }

  return NextResponse.json({ error: "invalid type" }, { status: 400 });
}
