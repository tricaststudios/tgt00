import clsx from 'clsx';

export default function P({ className, children }) {
    return <p className={clsx('text-neutral-600 dark:text-neutral-300', className)}>{children}</p>;
}
