import faker from 'faker';
import { User, AuthProvider } from 'models';
import { GenderFactory } from './gender';

export async function UserFactory(userData) {
  const gender = await GenderFactory();

  const data = {
    gender_id: gender.id,
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    fullName: faker.name.findName(),
    phoneNumber: faker.phone.phoneNumber(),
    photoUrl: faker.image.avatar(),
    placeBod: faker.address.city(),
    dateBod: faker.date.past(),
    ...userData
  };
  const user = await User.create(data);

  const authProviders = await AuthProvider.findAll();
  const authProvider = faker.random.arrayElement(authProviders);

  await user.addAuthProvider(authProvider, { through: { sourceId: faker.random.uuid() } });
  return user;
}

export default UserFactory;
