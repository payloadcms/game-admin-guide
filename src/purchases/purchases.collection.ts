import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../shared/access/isAdmin'

export const purchases: CollectionConfig = {
  slug: 'purchases',
  labels: {
    singular: 'Purchasable',
    plural: 'In-App Purchases',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images'
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Should be entered as cents, for example $1 will be entered as 100',
      }
    },
    {
      name: 'gameItem',
      type: 'text',
      required: true,
      admin: {
        description: 'In-game item identifier',
      },
    },
  ],
};
