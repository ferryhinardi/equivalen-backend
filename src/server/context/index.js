import models from 'models';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

export default function context(req) {
  const dataloaderContext = createContext(models.sequelize);
  return {
    [EXPECTED_OPTIONS_KEY]: dataloaderContext,
  };
}