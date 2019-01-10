import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import {
  User,
  Classes,
  UserRelationship,
  UserRelationshipStatus,
  UserRelationshipType,
  sequelize,
} from 'models';

export default {
  UserRelationship: {
    user: resolver(UserRelationship.User),
    target: async (userRelation) => {
      const targetType = await UserRelationshipType.findById(userRelation.type_id);

      if (targetType.name === UserRelationshipType.USER) {
        const userTarget = await User.findById(userRelation.target_id);
        return { user: userTarget };
      }
      if (targetType.name === UserRelationshipType.CLASS) {
        const classTarget = await Classes.findById(userRelation.target_id);
        return { class: classTarget };
      }

      return null;
    },
    status: resolver(UserRelationship.Status),
    type: resolver(UserRelationship.Type)
  },
  Query: {
    userRelationship: resolver(UserRelationship),
    userRelationships: resolver(UserRelationship, {
      before: (findOption, args) => {
        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.type) {
          findOption.include = [{
            model: UserRelationshipType,
            where: args.type
          }]
        }

        if (args.status) {
          findOption.include = [{
            model: UserRelationshipStatus,
            where: args.status
          }]
        }

        if (args.user) {
          findOption.include = [{
            model: User,
            where: args.user
          }]
        }

        return findOption;
      },
    }),
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
          throw new Error('Member bukan seorang guru');
        }

        const statusPending = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.PENDING
          },
          ...(transaction ? { transaction } : {})
        });
        const type = await UserRelationshipType.findOne({
          where: {
            name: UserRelationshipType.USER
          },
          ...(transaction ? { transaction } : {})
        });

        const userRelationshipData = {
          user_id: user.id,
          target_id: userTargetRelation.id,
          status_id: statusPending.id,
          type_id: type.id
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
          throw new Error('User bukan seorang murid');
        }

        const statusPending = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.PENDING
          },
          ...(transaction ? { transaction } : {})
        });

        const userRelation = await UserRelationship.findOne({
          where: {
            user_id: user.id,
            target_id: userTargetRelation.id,
            status_id: statusPending.id,
          },
          ...(transaction ? { transaction } : {})
        });

        if (!userRelation) {
          throw new Error('User not a in relationship');
        } else {
          const statusApproved = await UserRelationshipStatus.findOne({
            where: {
              name: UserRelationshipStatus.APPROVED
            },
            ...(transaction ? { transaction } : {})
          });
          await userRelation.update({ status_id: statusApproved.id }, {
            ...(transaction ? { transaction } : {})
          });
        }
        
        return userRelation;
      }),

    rejectRequestRelationship: (_, { userTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const userTargetRelation = await User.findOne({
          where: userTarget,
          ...(transaction ? { transaction } : {})
        });
        const isStudent = await userTargetRelation.isStudent();

        if (!isStudent) {
          throw new Error('User bukan seorang murid');
        }

        const statusPending = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.PENDING
          },
          ...(transaction ? { transaction } : {})
        });

        const userRelation = await UserRelationship.findOne({
          where: {
            user_id: user.id,
            target_id: userTargetRelation.id,
            status_id: statusPending.id,
          },
          ...(transaction ? { transaction } : {})
        });

        if (!userRelation) {
          throw new Error('User not a in relationship');
        } else {
          const statusApproved = await UserRelationshipStatus.findOne({
            where: {
              name: UserRelationshipStatus.REJECTED
            },
            ...(transaction ? { transaction } : {})
          });
          await userRelation.update({ status_id: statusApproved.id }, {
            ...(transaction ? { transaction } : {})
          });
        }
        
        return userRelation;
      }),

    addClassRelationship: (_, { classTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const classTargetRelation = await Classes.findOne({
          where: classTarget,
          ...(transaction ? { transaction } : {})
        });
        const statusApproved = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.APPROVED
          },
          ...(transaction ? { transaction } : {})
        });
        const type = await UserRelationshipType.findOne({
          where: {
            name: UserRelationshipType.CLASS
          },
          ...(transaction ? { transaction } : {})
        });
        const classRelationshipData = {
          user_id: user.id,
          target_id: classTargetRelation.id,
          status_id: statusApproved.id,
          type_id: type.id
        };

        const [userRelationship] = await UserRelationship.findOrCreate({
          where: classRelationshipData,
          ...(transaction ? { transaction } : {})
        });

        return userRelationship;
      }),
  },
};
