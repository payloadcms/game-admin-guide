import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../shared/access/isAdmin'

export const achievements: CollectionConfig = {
  slug: 'achievements',
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
      name: 'image',
      type: 'upload',
      relationTo: 'images'
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'type',
      type: 'radio',
      required: true,
      options: [
        { value: 'experience', label: 'Experience'},
        { value: 'played', label: 'Games Played'},
        { value: 'wins', label: 'Wins'},
        { value: 'losses', label: 'Losses'},
      ],
    },
    {
      name: 'amount',
      type: 'number',
      admin: {
        description: 'The number required to earn this achievement',
      },
    },
  ],
};
