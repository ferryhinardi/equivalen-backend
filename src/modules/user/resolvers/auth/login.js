import { User } from 'models';

export default {
  Mutation: {
    login: async (_, { auth }) => {
      const user = await User.findByAuth(auth);
      if (!user) throw new Error('Credential failed');
      await User.findDevice({ user, deviceId: auth.deviceId });

      return {
        user,
        token: user.getToken()
      };
    }
  }
};
