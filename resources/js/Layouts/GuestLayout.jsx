import { Link } from '@inertiajs/react';

export default function Guest({ children, title = '' }) {
    return (
        <div className="relative isolate h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-900">
            <div className="flex min-h-screen flex-col items-center justify-center ">
                <Link href="/">
                    <div className="flex items-center space-x-5">
                        <img className="h-20 w-20 fill-current text-neutral-500" src="/images/logos/react.svg" alt="app-logo" />
                    </div>
                </Link>

                {title && <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-300">{title}</h2>}

                <div className="mx-auto mt-8 w-full max-w-md">
                    <div className="rounded-lg bg-white py-8 px-10 shadow dark:bg-neutral-800">{children}</div>
                </div>
            </div>
        </div>
    );
}
