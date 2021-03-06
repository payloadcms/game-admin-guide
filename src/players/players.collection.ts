import { CollectionConfig } from 'payload/types'
import { adminOnly } from '../shared/access/fields/adminOnly'
import { playerHook } from './playerHook'
import { playerLoginHook } from './playerLoginHook'
import { adminOrSelf } from '../shared/access/fields/adminOrSelf'

export const players: CollectionConfig = {
  slug: 'players',
  auth: true,
  admin: {
    useAsTitle: 'handle',
  },
  hooks: {
    afterLogin: [ playerLoginHook ],
    beforeValidate: [ playerHook ]
  },
  fields: [
    {
      name: 'handle',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'First and Last Name',
      },
      access: {
        read: adminOrSelf,
        update: adminOnly,
        create: () => true,
      },
    },
    {
      name: 'banned',
      label: 'Ban Player',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'customer',
      label: 'Stripe Customer ID',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      access: {
        read: adminOrSelf,
        update: adminOnly,
      },
    },
    {
      name: 'achievements',
      type: 'relationship',
      relationTo: 'achievements',
      hasMany: true,
      admin: {
        readOnly: true
      },
    },
    {
      name: 'stats',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'experience',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            readOnly: true
          },
        },
        {
          name: 'played',
          label: 'Games Played',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            readOnly: true
          },
        },
        {
          name: 'wins',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            readOnly: true
          },
        },
        {
          name: 'losses',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            readOnly: true
          },
        },
      ]
    },
  ],
}
