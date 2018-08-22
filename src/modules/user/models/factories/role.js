import faker from 'faker';
import { Role } from 'models';

export default function RoleFactory(roleData) {
  const data = {
    name: faker.name.jobTitle(),
    ...roleData
  };
  return Role.create(data);
}