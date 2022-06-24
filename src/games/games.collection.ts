import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../shared/access/isAdmin'
import { gamesAfterChangeHook } from './gamesAfterChangeHook'

export const games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [
      gamesAfterChangeHook,
    ],
  },
  access: {
    update: () => false,
    delete: () => false,
    create: isAdmin,
  },
  fields: [
    {
      name: 'teams',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'players',
          type: 'array',
          fields: [
            {
              name: 'player',
              type: 'relationship',
              relationTo: 'players',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'score',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
