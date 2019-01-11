import { Notification } from 'models';

export async function NotificationFactory(fData = []) {
  const data = [
    { name: 'RELATIONSHIP' },
    ...fData,
  ];
  const notification = await Notification.bulkCreate(data);

  return notification;
};

export default NotificationFactory;
