import { UserRelationshipType } from 'models';

export async function UserRelationshipTypeFactory(fData = []) {
  const data = [
    { name: 'USER' },
    { name: 'CLASS' },
    ...fData,
  ];
  const userTargetType = await UserRelationshipType.bulkCreate(data);

  return userTargetType;
};

export default UserRelationshipTypeFactory;
