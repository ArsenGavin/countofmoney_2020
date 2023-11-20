import { notification } from 'antd';

export const openNotification = (options = {
    type: 'open',
    duration: 3,
    message: 'Notification',
    onClick: () => null
}) => {
    const {type, message, duration, description, onClick} = options;
    notification[type]({
        message: message,
        description,
        onClick,
        duration,
    });
};
