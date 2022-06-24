import payload from 'payload';

type Props = {
  email: string
  collection: 'providers' | 'customers' | 'admins'
}
export const isEmailTaken = async ({ email, collection }: Props): Promise<boolean> => {
  const userQuery = await payload.find({
    collection,
    overrideAccess: true,
    limit: 1,
    depth: 0,
    where: {
      email: {
        equals: email,
      },
    },
  });
  const existingUser = userQuery.docs[0];
  return !!existingUser;
};
