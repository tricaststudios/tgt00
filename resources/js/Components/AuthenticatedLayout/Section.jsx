import clsx from 'clsx';

export default function Section({ className, children }) {
    return <div className={clsx('overflow-hidden rounded-lg bg-white p-8 shadow-sm dark:bg-neutral-800', className)}>{children}</div>;
}
