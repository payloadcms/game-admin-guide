import { Access } from 'payload/config';

export const isAdmin: Access = ({ req }) => {
  return req?.user.collection === 'admins';
}
