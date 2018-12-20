// const debug = require('debug')('app');

export default (sequelize, Sequelize) => {
  const SendGrid = sequelize.define(
    'SendGrid',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      from: {
        allowNull: false,
        defaultValue: 'do-not-reply@pt-gps.com',
        type: Sequelize.STRING
      },
      templateId: {
        field: 'template_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      dynamicTemplateData: {
        field: 'dynamic_template_data',
        allowNull: true,
        type: Sequelize.STRING
      },
      content: {
        allowNull: true,
        type: Sequelize.STRING
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
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'send_grid_mails',
      deletedAt: 'deleted_at',
      paranoid: true
    }
  );
  SendGrid.associate = models => {
    SendGrid.User = models.SendGrid.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return SendGrid;
};
