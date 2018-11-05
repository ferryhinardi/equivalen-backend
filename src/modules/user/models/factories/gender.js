import { Gender } from 'models';

export async function GenderFactory() {
  return Promise.all([
    Gender.create({ name: 'Male' }),
    Gender.create({ name: 'Female' })
  ]);
}

export default GenderFactory;
