import { UserRelationship } from 'models';
import { UserFactory } from './user';

export async function UserRelationshipFactory(fData) {
  const usera = await UserFactory();
  const userb = await UserFactory();

  const data = {
    user_id: usera.id,
    target_id: userb.id,
    ...fData,
  };
  const userRelation = await UserRelationship.create(data);

  return userRelation;
};

export default UserRelationshipFactory;
