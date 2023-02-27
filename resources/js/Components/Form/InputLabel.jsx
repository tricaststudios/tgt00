import clsx from 'clsx';

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={clsx('block text-sm font-medium text-neutral-700 dark:text-neutral-300', className)}>
            {value ? value : children}
        </label>
    );
}
