import { User, UserRelationship, sequelize } from 'models';

export default {
  Mutation: {
    addStudentRelationship: (_, { userTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const userTargetRelation = await User.findOne({
          where: userTarget,
          ...(transaction ? { transaction } : {})
        });
        const isTeacher = await userTargetRelation.isTeacher();

        if (!isTeacher) {
          throw new Error('User not a Teacher');
        }

        const userRelationshipData = {
          user_id: user.id,
          target_id: userTargetRelation.id,
          status: 'PENDING',
        };

        const [userRelationship] = await UserRelationship.findOrCreate({
          where: userRelationshipData,
          ...(transaction ? { transaction } : {})
        });

        return userRelationship;
      }),
  },
};
