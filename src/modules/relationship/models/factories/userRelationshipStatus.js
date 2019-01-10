import { UserRelationshipStatus } from 'models';

export async function UserRelationshipStatusFactory(fData = []) {
  const data = [
    { name: 'PENDING' },
    { name: 'APPROVED' },
    { name: 'REJECTED' },
    ...fData,
  ];
  const userTargetStatus = await UserRelationshipStatus.bulkCreate(data);

  return userTargetStatus;
};

export default UserRelationshipStatusFactory;
