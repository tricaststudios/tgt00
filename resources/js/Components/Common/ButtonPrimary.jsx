import clsx from 'clsx';

export default function ButtonPrimary({ type = 'submit', className = '', processing, children, onClick, disabled }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(
                'inline-flex items-center rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-neutral-800 dark:active:bg-neutral-300',
                processing && 'cursor-not-allowed opacity-25',
                className,
            )}
            disabled={processing || disabled}
        >
            {processing ? (
                <div className="relative block items-center justify-center">
                    <div role="status" className="absolute -top-0.5 left-2 right-0">
                        <svg className="h-5 w-5 animate-spin fill-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                                className="mx-auto"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                    <span className="opacity-25">{children}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
