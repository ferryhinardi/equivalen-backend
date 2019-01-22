import faker from 'faker';
import { ArchiveFactory } from './archive';
import { Package } from 'models';

export async function PackageFactory(packageData) {
  const archive = await ArchiveFactory();
  const data = {
    name: faker.random.word(),
    archive_id: archive.id,
    ...packageData,
  };

  return Package.create(data);
}

export default PackageFactory;
