import { AfterLoginHook } from 'payload/dist/collections/config/types'
import { APIError } from 'payload/errors'

export const playerLoginHook: AfterLoginHook = async ({ doc }) => {
  if (doc.banned) {
    throw new APIError('You have been banned, goodbye', 403);
  }
}
