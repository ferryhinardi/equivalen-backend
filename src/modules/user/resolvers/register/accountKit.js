import {
  getAccessTokenFromCode,
  validateAccessToken
} from 'modules/shared/libs/account-kit';

import { AuthProvider, User } from 'models';

export default {
  Mutation: {
    loginViaAccountKit: async (_, { code, user: userData }) => {
      const { access_token: accessToken } = await getAccessTokenFromCode(code);
      const result = await validateAccessToken(accessToken);
      const { phoneNumber } = userData;
      if ( result.phone.number !== phoneNumber ) throw new Error('Phone number is invalid');
      const [[authProvider], user] = await Promise.all([
        AuthProvider.findOrCreate({
          where: {
            name: 'Account Kit',
          },
        }),
        User.create(userData),
      ]);
      await user.addAuthProvider(authProvider, {
        through: {
          sourceId: result.id,
          payload: JSON.stringify(result),
        }
      });
      return {
        user,
        token: user.getToken(),
      };
    }
  },
}