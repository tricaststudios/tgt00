import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center border-b-2 border-neutral-400 px-1 pt-1 text-sm font-medium leading-5 text-neutral-900 transition duration-150 ease-in-out focus:border-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-100'
                    : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium leading-5 text-neutral-500 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-700 focus:border-neutral-300 focus:text-neutral-700 focus:outline-none dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-300 dark:focus:border-neutral-700 dark:focus:text-neutral-300'
            }
        >
            {children}
        </Link>
    );
}
