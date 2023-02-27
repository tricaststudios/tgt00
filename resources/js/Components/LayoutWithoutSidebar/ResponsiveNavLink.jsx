import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`flex w-full items-start border-l-4 py-2 pl-3 pr-4 ${
                active
                    ? 'border-neutral-400 bg-neutral-50 text-neutral-700 focus:border-neutral-700 focus:bg-neutral-100 focus:text-neutral-800 dark:border-neutral-600 dark:bg-neutral-900/50 dark:text-neutral-300 dark:focus:border-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-200'
                    : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800 focus:border-neutral-300 focus:bg-neutral-50 focus:text-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:border-neutral-600 dark:focus:bg-neutral-700 dark:focus:text-neutral-200'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none`}
        >
            {children}
        </Link>
    );
}
