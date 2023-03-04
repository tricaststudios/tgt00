import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import Table from '@/Components/Table/Table';
import Layout from '@/Layouts/AuthenticatedLayout';
import { formatUSDT } from '@/Lib/wallet';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import dayjs from 'dayjs';

export default function Wallet({ auth, wallets, collection }) {
    const rows = ['Tx #', 'Type', 'Description', 'Amount', 'Tx Date'];
    return (
        <Layout auth={auth}>
            <Head title="Wallet" />

            <div className="grid grid-cols-1 justify-between gap-5 md:grid-cols-2 xl:grid-cols-3">
                {wallets.map((item, index) => (
                    <Section key={index}>
                        <dt className="truncate text-sm font-medium text-zinc-500">{item.name}</dt>
                        <P className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900">{formatUSDT(item.balance)}</P>
                    </Section>
                ))}
            </div>

            <div className="flex justify-end space-x-3">
                <Link
                    href={route('user.deposits.index')}
                    className="inline-flex items-center rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-neutral-800 dark:active:bg-neutral-300"
                >
                    Deposit
                </Link>
                <Link
                    href={route('user.withdrawals.index')}
                    className="inline-flex items-center rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-neutral-800 dark:active:bg-neutral-300"
                >
                    Withdraw
                </Link>
            </div>

            {!collection.data.length ? (
                <Alert type="warning" title="No transactions found." />
            ) : (
                <>
                    <Section>
                        <Table rows={rows}>
                            {collection.data.map((data, index) => (
                                <tr key={index}>
                                    <td className="table-cell space-y-3 whitespace-normal py-7 pr-3 pl-3 text-sm font-medium text-zinc-900 lg:hidden">
                                        <div className="flex justify-between">
                                            <P className="text-xs">
                                                <span className="font-black">TX#</span>: {data.uuid}
                                            </P>
                                            <P className="flex items-center text-xs">
                                                <span className="font-black mr-2">
                                                    <CalendarDaysIcon className="h-5 w-5" />
                                                </span>
                                                {dayjs(data.ends_at).format('MMM D, YYYY h:mm A')}
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P className="text-xs">
                                                <span className="font-black">Type</span>: {data.type}
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P className="flex items-center !text-xs">{data.description}</P>
                                        </div>
                                        <div className="flex justify-end">
                                            <P className={clsx('text-xs', data.amount < 0 ? '!text-red-500' : '!text-green-500')}>
                                                <span className="font-bold">AMOUNT</span>: {formatUSDT(data.amount)} USDT
                                            </P>
                                        </div>
                                    </td>
                                    <Table.Data value={data.uuid} />
                                    <Table.Data value={data.type} />
                                    <Table.Data value={data.description} />
                                    <Table.Data value={formatUSDT(data.amount)} />
                                    <Table.Data value={dayjs(data.ends_at).format('MMM D, YYYY h:mm A')} />
                                </tr>
                            ))}
                        </Table>
                    </Section>

                    <Table.Pagination
                        next_page_url={collection.next_page_url}
                        prev_page_url={collection.prev_page_url}
                        total={collection.total}
                        from={collection.from}
                        to={collection.to}
                    />
                </>
            )}
        </Layout>
    );
}
