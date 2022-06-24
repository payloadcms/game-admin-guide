import { CollectionConfig } from 'payload/types'

export const images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
  },
  upload: {
    staticURL: '/media',
    staticDir: './media',
    mimeTypes: ['image/png'],
    imageSizes: [
      {
        name: 'mobile',
        width: 320,
        height: 240,
      },
    ],
  },
  fields: [
    // no fields needed, using defaults
  ],
};
