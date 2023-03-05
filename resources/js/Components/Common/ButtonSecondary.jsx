export default function ButtonSecondary({ type = 'button', className = '', processing, children, onClick, disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-700 shadow-sm transition duration-150 ease-in-out hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:opacity-25 dark:border-neutral-500 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-800 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing || disabled}
        >
            {children}
        </button>
    );
}
