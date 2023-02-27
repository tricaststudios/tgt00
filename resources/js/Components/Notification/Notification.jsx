import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import P from '../AuthenticatedLayout/P';

export default function Notification({ type, onClose, message, title }) {
    return (
        <Transition
            show={true}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="tranneutral-y-2 opacity-0 sm:tranneutral-y-0 sm:tranneutral-x-2"
            enterTo="tranneutral-y-0 opacity-100 sm:tranneutral-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {type === 'success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
                            {type === 'danger' && <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            {title && <P className="text-sm font-medium text-gray-900">{title}</P>}
                            <P className="mt-1 text-sm text-gray-500">{message}</P>
                        </div>
                        <div className="ml-4 flex flex-shrink-0">
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-white dark:bg-neutral-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}
