import { Link } from '@inertiajs/react';
import P from '../AuthenticatedLayout/P';

export default function Table({ rows, children }) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="relative overflow-hidden">
                        <table className="min-w-full">
                            <thead className="hidden lg:table-header-group">
                                <tr>
                                    {rows.map((item, index) => (
                                        <th key={index} scope="col" className="py-3.5 pb-9 pl-3 text-left text-sm font-semibold text-zinc-900">
                                            <P>{item}</P>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-500">{children}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

Table.Data = ({ props, children, value = null }) => {
    return (
        <td {...props} className="hidden whitespace-nowrap py-7 pr-3 pl-3 text-sm font-medium text-zinc-900 lg:table-cell">
            <P>{value ?? children}</P>
        </td>
    );
};

Table.Pagination = ({ prev_page_url, next_page_url, total, from, to }) => {
    return (
        (prev_page_url != null || next_page_url != null) && (
            <nav className="flex items-center justify-between px-4 py-3 dark:bg-neutral-900 sm:px-0" aria-label="Pagination">
                <div className="hidden sm:block">
                    <P>
                        Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> out of{' '}
                        <span className="font-medium">{total}</span> results
                    </P>
                </div>
                <div className="flex flex-1 justify-between space-x-3 sm:justify-end">
                    <Link
                        href={prev_page_url}
                        as={!prev_page_url ? 'button' : 'a'}
                        disabled={!prev_page_url}
                        preserveScroll
                        className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        Previous
                    </Link>
                    <Link
                        href={next_page_url}
                        as={!next_page_url ? 'button' : 'a'}
                        disabled={!next_page_url}
                        preserveScroll
                        className="relative mr-2 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        Next
                    </Link>
                </div>
            </nav>
        )
    );
};
