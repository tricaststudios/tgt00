import { ArrowLeftOnRectangleIcon, Bars3BottomLeftIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import Dropdown from '../Common/Dropdown';

export default function TopNavigation({ auth, setShowSidebar }) {
    return (
        <nav className="z-50 bg-white shadow-none dark:border-zinc-700 dark:bg-neutral-700 lg:sticky lg:top-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between lg:justify-end">
                    <div className="order-2 flex items-center sm:ml-6">
                        <div className="relative ml-3">
                            {auth.user && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="group block flex-shrink-0">
                                                <div className="flex items-center">
                                                    <div>
                                                        <img
                                                            className="inline-block h-9 w-9 rounded-full"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt="profile"
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                                                            ({auth.user.username})
                                                        </p>
                                                        <p className="text-xs font-medium text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-200 dark:group-hover:text-zinc-100">
                                                            {auth.user.name}
                                                        </p>
                                                    </div>
                                                </div>
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

                                        <Dropdown.Link href={route('user.security.edit')}>
                                            <span className="flex items-center">
                                                <LockClosedIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                <span>Security</span>
                                            </span>
                                        </Dropdown.Link>

                                        {auth.user.roles.some(role => role.name === 'admin') && (
                                            <Dropdown.Link href="/tgt-admin">
                                                <span className="flex items-center">
                                                    <UserGroupIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                    <span>Admin</span>
                                                </span>
                                            </Dropdown.Link>
                                        )}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <span className="flex items-center">
                                                <ArrowLeftOnRectangleIcon className="-ml-1 mr-3 h-5 w-5 flex-shrink-0" />
                                                <span>Log Out</span>
                                            </span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            )}
                        </div>
                    </div>

                    <div className="order-1 -mr-2 flex items-center lg:hidden">
                        <button
                            type="button"
                            className=" border-zinc-200 text-zinc-500 focus:outline-none lg:hidden"
                            onClick={() => setShowSidebar(previousState => !previousState)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
