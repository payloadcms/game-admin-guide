import { BeforeValidateHook } from 'payload/dist/collections/config/types'
import { isEmailTaken } from '../shared/isEmailTaken'
import { stripe } from '../shared/stripe'

export const playerHook: BeforeValidateHook = async ({operation, data, originalDoc}) => {
  if (operation === 'create' && data.email) {
    // since this happens before validate we need to ensure the email isn't taken before calling stripe
    const emailIsTaken = await isEmailTaken({ email: data.email, collection: 'customers' });

    if (emailIsTaken) {
      throw new Error(`E-mail: ${data.email} already exists, if this is your e-mail, please log in.`);
    }

    // create the customer on stripe for later charges
    const stripeCustomer = await stripe.customers.create({
      email: data.email,
      name: data.name,
    });

    data.customer = stripeCustomer.id;
  }

  // update player account info on stripe to get the correct emails
  if (operation === 'update') {
    const stripeDataHasChanged = (
      originalDoc.email !== data.email
      || originalDoc.firstName !== data.firstName
      || originalDoc.lastName !== data.lastName
    );

    if (stripeDataHasChanged && data.customer) {
      stripe.customers.update(
        data.customer,
        {
          email: data.email,
          name: data.name,
        }
      )
    }
  }

  return data;
}
