import { getAccessTokenFromCode, validateAccessToken } from 'modules/shared/libs/account-kit';
import { getToken, verify } from 'modules/shared/libs/jwt';

import { AuthProvider, User } from 'models';

export default {
  Mutation: {
    getPrefillViaAccountKit: async (_, { code }) => {
      const { access_token: accessToken } = await getAccessTokenFromCode(code);
      const userAuthProvider = await validateAccessToken(accessToken);
      const phoneNumber = userAuthProvider.phone.number;
      return {
        user: {
          phoneNumber
        },
        token: getToken({ phoneNumber, userAuthProvider })
      };
    },
    registerViaAccountKit: async (_, { user: userData }, { token }) => {
      const { phoneNumber, userAuthProvider } = verify(token);
      if (userData.phoneNumber !== phoneNumber) throw new Error('Phone number is invalid');
      const [[authProvider], user] = await Promise.all([
        AuthProvider.findOrCreate({
          where: {
            name: 'Account Kit'
          }
        }),
        User.create(userData)
      ]);
      await user.addAuthProvider(authProvider, {
        through: {
          sourceId: userAuthProvider.id,
          payload: JSON.stringify(userAuthProvider)
        }
      });
      return {
        user,
        token: user.getToken()
      };
    }
  }
};
