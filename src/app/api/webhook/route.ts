import Stripe from "stripe";
import { NextResponse } from "next/server";
import { trackInteraction } from "@/lib/stats";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { morphId, type, sessionId } = session.metadata ?? {};
      await trackInteraction({
        eventType:  type === "fortune" ? "purchase_fortune" : "purchase_resident",
        sessionId:  sessionId ?? undefined,
        morphId:    morphId   ?? undefined,
        properties: { stripeSessionId: session.id, amount: session.amount_total },
      });
      break;
    }
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      const { morphId, sessionId } = sub.metadata ?? {};
      await trackInteraction({
        eventType:  "subscription_start",
        sessionId:  sessionId ?? undefined,
        morphId:    morphId   ?? undefined,
        properties: { status: sub.status },
      });
      break;
    }
    case "customer.subscription.updated":
      break;
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const { morphId, sessionId } = sub.metadata ?? {};
      await trackInteraction({
        eventType:  "subscription_cancel",
        sessionId:  sessionId ?? undefined,
        morphId:    morphId   ?? undefined,
        properties: {},
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
