import get from 'lodash/get';
import resolver from 'modules/shared/libs/graphql-sequelize/resolver';
import { Sequelize, sequelize, User, Archive, UserArchive } from 'models';

export default {
  UserArchive: {
    archive: resolver(UserArchive.Archive),
    user: resolver(UserArchive.User),
    owner: resolver(UserArchive.Owner)
  },
  Mutation: {
    createUserArchives: (_, { userArchive: userArchiveParam }, { user: owner }) =>
      sequelize.transaction(async (transaction) => {
        const archiveParam = get(userArchiveParam, 'archive', {});
        const usersParam = get(userArchiveParam, 'users', []);
        const archive = await Archive.findByPk(archiveParam.id,
          ...(transaction ? { transaction } : {})
        );
        const users = await User.findAll({
          where: {
            id: {
              [Sequelize.Op.in]: usersParam.map(u => u.id)
            }
          },
          ...(transaction ? { transaction } : {})
        });
        const [[userArchive]] = await archive.setUsers(users, { through: { owner_id: owner.id }});
        const returnValues = await UserArchive.findAll({
          where: { archive_id: userArchive.archive_id }
        });

        return returnValues;
      }),
    updateUserArchive: async (_, { userArchive: userArchiveParam }, { user }) =>
      sequelize.transaction(async (transaction) => {
        const archiveId = get(userArchiveParam, 'archive.id');
        const userId = user.id;
        const userArchive = await UserArchive.findOne({
          where: {
            archive_id: archiveId,
            user_id: userId
          },
          ...(transaction ? { transaction } : {})
        });

        if (!userArchive) {
          throw new Error('Arship Murid tidak ditemukan');
        }

        const resUserArchive = await userArchive.update(userArchiveParam,
          ...(transaction ? { transaction } : {})
        );

        return resUserArchive;
      }),
  }
};