import { CollectionConfig } from 'payload/types';

export const admins: CollectionConfig = {
  slug: 'admins',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [],
};
