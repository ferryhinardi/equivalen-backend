import models from 'models';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

export default function context(req) {
  const dataloaderContext = createContext(models.sequelize);
  const headers = req.request.headers;
  let token = null;
  if (headers['authorization']) {
    token = headers['authorization'].replace('Bearer ', '');
  }
  return {
    [EXPECTED_OPTIONS_KEY]: dataloaderContext,
    token,
  };
}