import { UserRelationship } from 'models';
import { UserFactory } from 'modules/user/models/factories/user';
import { UserRelationshipStatusFactory } from 'modules/relationship/models/factories/userRelationshipStatus';
import { UserRelationshipTypeFactory } from 'modules/relationship/models/factories/userRelationshipType';

export async function UserRelationshipFactory(fData) {
  const usera = await UserFactory();
  const userb = await UserFactory();
  const status = await UserRelationshipStatusFactory();
  const type = await UserRelationshipTypeFactory();

  const data = {
    user_id: usera.id,
    target_id: userb.id,
    status_id: status[0].id,
    type_id: type[0].id,
    ...fData,
  };
  const userRelation = await UserRelationship.create(data);

  return userRelation;
};

export default UserRelationshipFactory;
