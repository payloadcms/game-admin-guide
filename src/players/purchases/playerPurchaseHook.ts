import { CollectionBeforeChangeHook } from 'payload/types'
import { stripe } from '../../shared/stripe'
import { APIError } from 'payload/errors'

export const playerPurchaseHook: CollectionBeforeChangeHook = async ({ req, data }) => {
  if (req.user.collection === 'admin') {
    return
  }

  if (!req.body.stripeToken) {
    throw new APIError('Could not complete transaction, missing payment', 400);
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
