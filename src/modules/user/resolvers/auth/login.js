import { User } from 'models';

export default {
  Mutation: {
    login: async (_, { auth }) => {
      const user = await User.findByAuth(auth);
      if (!user) throw new Error('Credential failed');
      return {
        user,
        token: user.getToken()
      };
    }
  }
};
