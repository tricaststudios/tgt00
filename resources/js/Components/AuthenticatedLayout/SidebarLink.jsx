import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function SidebarLink({ onClick, href, current = false, value = null, children }) {
    return (
        <Link
            onClick={onClick}
            href={href}
            className={clsx(
                current ? 'bg-neutral-600 text-white' : 'text-neutral-700 hover:bg-neutral-600 hover:text-white dark:text-neutral-300',
                'group flex items-center rounded-md px-2 py-2 text-base font-medium',
            )}
            aria-current={current ? 'page' : undefined}
        >
            {value ?? children}
        </Link>
    );
}
