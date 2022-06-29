import { CollectionConfig } from 'payload/types'
import { playerPurchaseHook } from './playerPurchaseHook'
import { adminOnly } from '../../shared/access/fields/adminOnly'

export const playerPurchases: CollectionConfig = {
  slug: 'player-purchases',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req }) => {
      switch (req.user.collection) {
        case 'admins':
          return true

        case 'players':
          return {
            player: req.user.id
          }
        default:
          return false
      }
    },
  },
  hooks: {
    beforeChange: [playerPurchaseHook],
  },
  fields: [
    {
      name: 'purchase',
      type: 'relationship',
      relationTo: 'purchases',
      required: true,
    },
    {
      name: 'players',
      type: 'relationship',
      relationTo: 'players',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'In cents',
      },
    },
    {
      name: 'charge',
      type: 'text',
      access: {
        read: adminOnly
      },
      admin: {
        description: 'Stripe charge ID',
        readOnly: true,
      },
    },
  ],
}
