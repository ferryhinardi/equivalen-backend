import { ProductLicense } from 'models';

export default function ProductLicenseFactory(data = {}) {
  return ProductLicense.create({
    ...data
  });
}
