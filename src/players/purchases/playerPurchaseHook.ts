import { CollectionBeforeChangeHook } from 'payload/types'
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const playerPurchaseHook: CollectionBeforeChangeHook = async ({ req, data }) => {

  if (req.user.collection === 'admin') {
    return
  }
  // get the amount from the IAP item
  const result = await req.payload.find({
    collection: 'purchases',
    limit: 1,
    where: {
      id: {
        equals: data.purchase,
      },
    },
  })

  const purchase = result.docs[0];

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  const charge = await stripe.charges.create({
    amount: purchase.price * 100,
    currency: 'usd',
    customer: req.user.customer as string,
    capture: true,
    source: req.body.stripeToken,
    description: `In-App Purchase - ${purchase.name}`,
  })

  // set the charge id
  data.charge = charge.id
}