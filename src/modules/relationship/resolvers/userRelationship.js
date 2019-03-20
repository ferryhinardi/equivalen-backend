import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import {
  User,
  Classes,
  UserRelationship,
  UserRelationshipStatus,
  UserRelationshipType,
  Notification,
  sequelize,
} from 'models';

export default {
  UserRelationship: {
    user: resolver(UserRelationship.User),
    target: async (userRelation) => {
      const targetType = await UserRelationshipType.findByPk(userRelation.type_id);

      if (targetType.name === UserRelationshipType.USER) {
        const userTarget = await User.findByPk(userRelation.target_id);
        return { user: userTarget };
      }
      if (targetType.name === UserRelationshipType.CLASS) {
        const classTarget = await Classes.findByPk(userRelation.target_id);
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
        let include = [];

        if (args.limit || args.offset) {
          findOption.limit = args.limit;
          findOption.offset = args.offset;
        }

        if (args.type) {
          include = include.concat([{
            model: UserRelationshipType,
            where: args.type
          }]);
        }

        if (args.status) {
          include = include.concat([{
            model: UserRelationshipStatus,
            where: args.status
          }]);
        }

        if (args.user) {
          include = include.concat([{
            model: User,
            as: 'user_related',
            where: args.user
          }]);
        }

        /**
         * type => [
         *  { id: "1", name: "USER" }
         *  { id: "2", name: "CLASS" }
         * ]
         */

        if (args.target && args.type) {
          if (args.type.id === "1" || args.type.name === "USER") {
            include = include.concat([{
              model: User,
              as: 'user_target',
              where: args.target
            }]);
          } else {
            include = include.concat([{
              model: Classes,
              where: args.target
            }]);
          }
        }

        findOption.include = include;

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
        const isTeacher = userTargetRelation.isTeacher();

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

        const [userRelationship, created] = await UserRelationship.findOrCreate({
          where: userRelationshipData,
          ...(transaction ? { transaction } : {})
        });

        if (created) {
          await Notification.applyNotification({ notificationType: Notification.RELATIONSHIP }, { user, transaction });
        }

        return userRelationship;
      }),
    
    approveRequestRelationship: (_, { id, userTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const statusApproved = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.APPROVED
          },
          ...(transaction ? { transaction } : {})
        });

        if (id) {
          const userRelationById = await UserRelationship.findByPk(id);

          if (!userRelationById) {
            throw new Error('relasi tidak ditemukan');
          }
          
          const result = await userRelationById.update({ status_id: statusApproved.id }, {
            ...(transaction ? { transaction } : {})
          });

          return result;
        }

        const userTargetRelation = await User.findOne({
          where: userTarget,
          ...(transaction ? { transaction } : {})
        });
        const isStudent = userTargetRelation.isStudent();

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
          throw new Error('User tidak memiliki relasi');
        }

        const result = await userRelation.update({ status_id: statusApproved.id }, {
          ...(transaction ? { transaction } : {})
        });
        
        return result;
      }),

    rejectRequestRelationship: (_, { id, userTarget }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const statusApproved = await UserRelationshipStatus.findOne({
          where: {
            name: UserRelationshipStatus.REJECTED
          },
          ...(transaction ? { transaction } : {})
        });

        if (id) {
          const userRelationById = await UserRelationship.findByPk(id);

          if (!userRelationById) {
            throw new Error('Relasi tidak ditemukan');
          }
          
          const result = await userRelationById.update({ status_id: statusApproved.id }, {
            ...(transaction ? { transaction } : {})
          });

          return result;
        }

        const userTargetRelation = await User.findOne({
          where: userTarget,
          ...(transaction ? { transaction } : {})
        });
        const isStudent = userTargetRelation.isStudent();

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
          throw new Error('User tidak memiliki relasi');
        }

        const result = await userRelation.update({ status_id: statusApproved.id }, {
          ...(transaction ? { transaction } : {})
        });
        
        return result;
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
