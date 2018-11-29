import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { User, UserRelationship, sequelize } from 'models';

export default {
  UserRelationship: {
    user: resolver(UserRelationship.User),
    userTarget: resolver(UserRelationship.UserTarget),
  },
  Mutation: {
    addTeacherRelationship: (_, { userTarget }, { user }) =>
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
    
    approveRequestRelationship: (_, { userTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const userTargetRelation = await User.findOne({
          where: userTarget,
          ...(transaction ? { transaction } : {})
        });
        const isStudent = await userTargetRelation.isStudent();

        if (!isStudent) {
          throw new Error('User not a Student');
        }

        const userRelation = await UserRelationship.findOne({
          where: {
            user_id: user.id,
            target_id: userTargetRelation.id,
          },
          ...(transaction ? { transaction } : {})
        });

        if (!userRelation) {
          throw new Error('User not a in relationship');
        } else {
          await userRelation.update({ status: 'APPROVED' }, {
            ...(transaction ? { transaction } : {})
          });
        }
        
        return userRelation;
      }),
  },
};
