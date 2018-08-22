import faker from 'faker';
import { Gender, User, Role, AuthProvider } from 'models';

export async function UserFactory(userData) {
  const genders = await Gender.findAll();
  const gender = faker.random.arrayElement(genders);

  const data = {
    gender_id: gender.id,
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    fullName: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumber(),
    photoUrl: faker.image.avatar(),
    birthDate: faker.date.past(),
    ...userData,
  };
  const user = await User.create(data);

  const authProviders = await AuthProvider.findAll();
  const authProvider = faker.random.arrayElement(authProviders);

  await user.addAuthProvider(authProvider, { through: { sourceId: faker.random.uuid() }});
  return user;
}

export async function UserWithRoleFactory(userData) {
  const roles = await Role.findAll();
  const role = faker.random.arrayElement(roles);
  const user = await UserFactory({
    ...userData
  });
  await user.addRole(role);
  return user;
}

export default UserFactory;