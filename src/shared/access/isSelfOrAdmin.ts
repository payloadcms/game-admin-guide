import { Access } from 'payload/config'

export const isSelfOrAdmin: Access = ({ req }): boolean => {
  return req.user.id === req.id || req?.user.collection === 'admins';
}
