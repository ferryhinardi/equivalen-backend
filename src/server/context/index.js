import models, { User } from 'models';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import { verify } from 'modules/shared/libs/jwt';

export default async function context({ req }) {
  const dataloaderContext = createContext(models.sequelize);
  const { headers } = req;
  let token = null;
  let user = null;
  if (headers.authorization) {
    token = headers.authorization.replace('Bearer ', '');
    const { id } = verify(token);
    if (id) {
      user = await User.findById(id);
    }
  }
  return {
    [EXPECTED_OPTIONS_KEY]: dataloaderContext,
    token,
    user
  };
}
