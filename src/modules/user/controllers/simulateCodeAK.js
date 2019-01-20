import faker from 'faker';
import PhoneNumber from 'awesome-phonenumber';
import config from 'config/app';
import { getToken } from 'modules/shared/libs/jwt';

const locale = 'ID';

export function simulateCodeAK(req, res) {
  let phone = req.body.phoneNumber;
  let phoneNational;
  const pn = new PhoneNumber(phone, locale);
  const prefix = PhoneNumber.getCountryCodeForRegionCode(locale);

  if (pn.isValid()) {
    phone = pn.getNumber();
    phoneNational = pn.getNumber('national');
  }

  const userAuthProvider = {
    id: faker.random.number(),
    phone: {
      number: phone,
      country_prefix: prefix,
      national_number: phoneNational
    },
    application:{
      id: config.FACEBOOK_APP_ID
    }
  };
  const phoneNumber = userAuthProvider.phone.number;
  const token = getToken({ phoneNumber, userAuthProvider });

  res.json({ token });
}

export default simulateCodeAK;