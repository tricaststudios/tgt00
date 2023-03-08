import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { isNull } from 'lodash';
import React from 'react';

const types = {
    danger: {
        bg: 'bg-red-50',
        title: 'text-red-700',
        message: 'text-red-700',
        iconClass: 'text-red-400',
        defaultIcon: XCircleIcon,
    },
    info: {
        bg: 'bg-blue-50',
        title: 'text-blue-700',
        message: 'text-blue-700',
        iconClass: 'text-blue-400',
        defaultIcon: ExclamationCircleIcon,
    },
    success: {
        bg: 'bg-green-50',
        title: 'text-green-700',
        message: 'text-green-700',
        iconClass: 'text-green-400',
        defaultIcon: CheckCircleIcon,
    },
    warning: {
        bg: 'bg-yellow-50',
        title: 'text-yellow-700',
        message: 'text-yellow-700',
        iconClass: 'text-yellow-400',
        defaultIcon: ExclamationTriangleIcon,
    },
};

export default function Alert({ type = 'info', title = null, message = null, icon = null, children }) {
    if (isNull(icon)) {
        icon = React.createElement(types[type].defaultIcon);
    }

    icon = React.cloneElement(icon, {
        className: clsx(icon.props?.className, 'h-5 w-5', types[type].iconClass),
        'aria-hidden': true,
    });

    return title ? (
        <div className={clsx('rounded-md p-4', types[type].bg)}>
            <div className="flex">
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3">
                    <h3 className={clsx('text-sm font-medium', types[type].title)}>{title}</h3>
                    {isNull(message) ? (
                        <p className={types[type].title}>{message ?? children}</p>
                    ) : (
                        <div className="mt-2 text-sm">
                            <p className={types[type].title}>{message ?? children}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <>
            <div className={clsx('rounded-md p-4', types[type].bg)}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">{icon}</div>
                    <div className="ml-3">
                        {isNull(message) ? (
                            <p className={types[type].title}>{message ?? children}</p>
                        ) : (
                            <div className="text-sm">
                                <p className={types[type].title}>{message ?? children}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
