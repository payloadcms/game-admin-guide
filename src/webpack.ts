import path from 'path'

const mockModule = path.resolve(__dirname, './shared/mockModule.js');

export const webpack = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: [
      path.resolve(__dirname, './shared/stripe'),
    ].reduce((alias, aliasPath) => ({
      ...alias,
      [aliasPath]: mockModule,
    }), config.resolve.alias),
  },
})
