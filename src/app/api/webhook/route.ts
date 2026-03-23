import Stripe from "stripe";
import { NextResponse } from "next/server";

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
      const { morphId, type } = session.metadata ?? {};
      console.log(`Payment completed: type=${type} morphId=${morphId} customer=${session.customer}`);
      // TODO: DBがあれば購入レコードを保存する
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const { morphId } = sub.metadata ?? {};
      console.log(`Subscription ${event.type}: morphId=${morphId} status=${sub.status}`);
      // TODO: DBがあれば住人ステータスを更新する
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`Subscription canceled: customer=${sub.customer}`);
      // TODO: 住人ステータスを無効化する
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
