import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { uuid } from '@/Lib/uuid';

import Notification from './Notification';

import useNotificationAutoClose from '@/Hooks/useNotificationAutoClose';
import useNotificationPortal from '@/Hooks/useNotificationPortal';

const NotificationPortal = forwardRef(({ autoClose = false, autoCloseTime = 5000 }, ref) => {
    const [notifications, setNotifications] = useState([]);
    const { loaded, portalId } = useNotificationPortal();

    useNotificationAutoClose({
        notifications,
        setNotifications,
        autoClose,
        autoCloseTime,
    });

    const removeNotification = id => {
        setNotifications(notifications.filter(t => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
        addMessage(notification) {
            setNotifications([...notifications, { ...notification, id: uuid() }]);
        },
    }));

    return loaded ? (
        ReactDOM.createPortal(
            <div aria-live="assertive" className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6">
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {notifications.map(t => (
                        <Notification key={t.id} title={t.title} type={t.type} message={t.message} onClose={() => removeNotification(t.id)} />
                    ))}
                </div>
            </div>,

            document.getElementById(portalId),
        )
    ) : (
        <></>
    );
});
export default NotificationPortal;
