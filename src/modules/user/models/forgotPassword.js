import sendEmail from 'modules/shared/libs/send-grid';

export default (sequelize, Sequelize) => {
  const ForgotPassword = sequelize.define(
    'ForgotPassword',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      hashUrl: {
        field: 'hash_url',
        type: Sequelize.STRING
      },
      expired: {
        type: Sequelize.DATE
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'forgot_passwords',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  ForgotPassword.associate = models => {
    ForgotPassword.User = models.ForgotPassword.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };

  ForgotPassword.prototype.sendEmailForgot = async function sendEmailForgot(transaction) {
    const { User, SendGrid } = require('models');
    const templateId = 'd-ada6b752e852480fb2e851826a91ab4d';
    const subject = 'Forgot Password';
    const { email } = await User.findByPk(this.user_id);
    const dynamicTemplateData = {
      email,
      url: this.hashUrl,
      link: 'Link'
    };
    const sendGridData = await SendGrid.create({
      subject,
      templateId,
      dynamicTemplateData: JSON.stringify(dynamicTemplateData),
      user_id: this.user_id
    }, { transaction });

    sendEmail({ to: email, from: sendGridData.from, subject, templateId, dynamicTemplateData });
  };

  return ForgotPassword;
};
