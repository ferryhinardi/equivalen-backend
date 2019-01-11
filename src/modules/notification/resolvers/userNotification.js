import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Notification, UserNotification, sequelize } from 'models';

export default {
  UserNotification: {
    user: resolver(UserNotification.User),
    notification: resolver(UserNotification.Notification)
  },
  Mutation: {
    resetNotification: (_, { notificationType }, { user }) =>
      sequelize.transaction(async (transaction) => {
        await Notification.applyNotification({ notificationType, total: 0 }, { user, transaction });
        return true;
      }),
  }
};
