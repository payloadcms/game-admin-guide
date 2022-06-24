import { FieldAccess } from 'payload/types'

export const adminOnly: FieldAccess = ({ req }) => req.user.collection === 'admins'
