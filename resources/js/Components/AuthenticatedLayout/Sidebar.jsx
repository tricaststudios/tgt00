import ApplicationLogo from '@/Components/Common/ApplicationLogo';
import { Dialog, Transition } from '@headlessui/react';
import { BanknotesIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    ChartBarSquareIcon,
    CreditCardIcon,
    QuestionMarkCircleIcon,
    ServerStackIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import SidebarLink from './SidebarLink';
import SidebarSublink from './SidebarSublink';

export default function Sidebar({ showSidebar, setShowSidebar }) {
    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon, current: route().current('dashboard') },
        { name: 'Miners', href: route('miners.index'), icon: ServerStackIcon, current: route().current('miners.index') },
        { name: 'Market', href: route('markets.index'), icon: ChartBarSquareIcon, current: route().current('markets.*') },
    ];

    const subnavigation = [
        { name: 'Active Miners', href: route('user.miners.index'), icon: ServerStackIcon, current: route().current('user.miners.index') },
        { name: 'Orders', href: route('user.orders.index'), icon: ShoppingBagIcon, current: route().current('user.orders.index') },
        { name: 'Withdrawal Accounts', href: route('user.withdrawals.accounts.index'), icon: BanknotesIcon, current: route().current('user.withdrawals.accounts.index') },
        { name: 'Wallet', href: route('user.wallet.index'), icon: CreditCardIcon, current: route().current('user.wallet.index') },
        { name: 'Withdrawals', href: route('user.withdrawals.index'), icon: ArrowUpTrayIcon, current: route().current('user.withdrawals.index') },
        { name: 'Deposits', href: route('user.deposits.index'), icon: ArrowDownTrayIcon, current: route().current('user.deposits.index') },
    ];
    return (
        <>
            <Transition.Root show={showSidebar} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setShowSidebar}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-neutral-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-md flex-1 flex-col bg-neutral-100 pt-5 pb-4 dark:bg-neutral-900">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="flex flex-shrink-0 items-center justify-between px-4">
                                        <Link href="/">
                                            <ApplicationLogo className="h-8 w-auto" />
                                        </Link>

                                        <button
                                            type="button"
                                            className="show ml-1 h-10 w-10 items-center justify-center rounded-full focus:outline-none"
                                            onClick={() => setShowSidebar(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation.map(item => (
                                                <SidebarLink
                                                    onClick={() => setShowSidebar(false)}
                                                    key={item.name}
                                                    href={item.href}
                                                    current={item.current}
                                                >
                                                    <item.icon
                                                        className={clsx(
                                                            item.current ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                            'mr-4 h-6 w-6 flex-shrink-0',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </SidebarLink>
                                            ))}
                                        </div>
                                        <div className="mt-5 space-y-1 border-t border-neutral-400 pt-5 dark:border-neutral-500">
                                            {subnavigation.map(item => (
                                                <SidebarSublink
                                                    onClick={() => setShowSidebar(false)}
                                                    key={item.name}
                                                    href={item.href}
                                                    current={item.current}
                                                >
                                                    <item.icon
                                                        className={clsx(
                                                            item.current ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                            'mr-4 h-6 w-6 flex-shrink-0',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </SidebarSublink>
                                            ))}
                                        </div>
                                        <div className="mt-5 space-y-1 border-t border-neutral-400 pt-5 dark:border-neutral-500">
                                            <SidebarSublink href="" current={false}>
                                                <QuestionMarkCircleIcon
                                                    className={clsx(
                                                        false ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                        'mr-4 h-6 w-6 flex-shrink-0',
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                Customer Support
                                            </SidebarSublink>
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="z-20 hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="z-20 flex h-16 flex-shrink-0 items-center justify-between bg-white px-4 dark:bg-neutral-700">
                        <Link href="/">
                            <ApplicationLogo
                                className="h-9 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500"
                                alt="Your Company"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto bg-neutral-200 pt-5 dark:bg-neutral-900">
                        <nav className="flex-1 px-2 py-4">
                            <div className="space-y-1">
                                {navigation.map(item => (
                                    <SidebarLink onClick={() => setShowSidebar(false)} key={item.name} href={item.href} current={item.current}>
                                        <item.icon
                                            className={clsx(
                                                item.current ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                'mr-4 h-6 w-6 flex-shrink-0',
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </SidebarLink>
                                ))}
                            </div>

                            <div className="mt-10 border-t border-neutral-400 dark:border-neutral-500">
                                <div className="mt-5 space-y-1">
                                    {subnavigation.map(item => (
                                        <SidebarSublink onClick={() => setShowSidebar(false)} key={item.name} href={item.href} current={item.current}>
                                            <item.icon
                                                className={clsx(
                                                    item.current ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                    'mr-4 h-6 w-6 flex-shrink-0',
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </SidebarSublink>
                                    ))}
                                </div>
                            </div>

                            {usePage().props.settings.telegram_url && (
                                <div className="mt-10 border-t border-neutral-400 dark:border-neutral-500">
                                    <div className="mt-5 space-y-1">
                                        <SidebarSublink href={usePage().props.settings.telegram_url} current={false}>
                                            <QuestionMarkCircleIcon
                                                className={clsx(
                                                    false ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300',
                                                    'mr-4 h-6 w-6 flex-shrink-0',
                                                )}
                                                aria-hidden="true"
                                            />
                                            Customer Support
                                        </SidebarSublink>
                                    </div>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
