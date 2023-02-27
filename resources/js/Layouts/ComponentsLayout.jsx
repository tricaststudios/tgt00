import ApplicationLogo from '@/Components/Common/ApplicationLogo';
import Dropdown from '@/Components/Common/Dropdown';
import ResponsiveNavLink from '@/Components/LayoutWithoutSidebar/ResponsiveNavLink';
import Background from '@/Components/Ui/Background';
import { ArrowLeftOnRectangleIcon, ArrowTopRightOnSquareIcon, BellAlertIcon, BellIcon, LockClosedIcon, TableCellsIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { useState } from 'react';

export default function ComponentsLayout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const navigation = [
        { name: 'Modals', href: route('components.show', 'modals'), icon: ArrowTopRightOnSquareIcon, current: route().params.component === 'modals' },
        { name: 'Notifications', href: route('components.show', 'notifications'), icon: BellIcon, current: route().params.component === 'notifications' },
        { name: 'Alerts', href: route('components.show', 'alerts'), icon: BellAlertIcon, current: route().params.component === 'alerts' },
        { name: 'Tables', href: route('components.show', 'tables'), icon: TableCellsIcon, current: route().params.component === 'tables' },
    ];

    return (
        <div className="relative isolate min-h-screen bg-neutral-100 dark:bg-neutral-900">
            <Background />
            <nav className="border-b border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-neutral-800 dark:text-neutral-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {/* <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink> */}
                            </div>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-700 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300"
                                            >
                                                {auth.user.name} ({auth.user.username})
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('user.profile.edit')}>
                                            <span className="flex items-center">
                                                <UserCircleIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                <span>Account</span>
                                            </span>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('user.profile.edit')}>
                                            <span className="flex items-center">
                                                <LockClosedIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                <span>Security</span>
                                            </span>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <span className="flex items-center">
                                                <ArrowLeftOnRectangleIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                <span>Log Out</span>
                                            </span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(previousState => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:outline-none dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-neutral-400 dark:focus:bg-neutral-900 dark:focus:text-neutral-400"
                            >
                                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pt-2 pb-3">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-neutral-200 pt-4 pb-1 dark:border-neutral-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-neutral-800 dark:text-neutral-200">{auth.user.name}</div>
                            <div className="text-sm font-medium text-neutral-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('user.profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-8 sm:px-6">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="hidden py-6 px-2 sm:px-6 lg:col-span-3 lg:block lg:py-0 lg:px-0">
                            <nav className="sticky top-5 space-y-1 rounded-lg bg-neutral-50 shadow dark:bg-neutral-800 sm:p-8">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={clsx(
                                            item.current
                                                ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-700 dark:bg-neutral-50'
                                                : 'text-neutral-900 hover:bg-neutral-200 dark:text-neutral-100 dark:hover:text-neutral-700',
                                            'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={clsx(
                                                item.current ? 'text-neutral-500 group-hover:text-neutral-500' : 'text-neutral-400 group-hover:text-neutral-500',
                                                '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        <main className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
}
