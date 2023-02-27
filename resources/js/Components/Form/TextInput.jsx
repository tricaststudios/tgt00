import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange, fullWidth = false },
    ref,
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={clsx(
                    'block rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:focus:border-neutral-600 dark:focus:ring-neutral-600',
                    fullWidth && 'w-full',
                    className,
                )}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={e => handleChange(e)}
            />
        </div>
    );
});
