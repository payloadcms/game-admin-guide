import { FieldAccess } from 'payload/types'

export const adminOrSelf: FieldAccess = ({ req, id }): boolean => {
  return req.user.id === id || req?.user.collection === 'admins';
}
