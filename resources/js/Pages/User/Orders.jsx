import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import Badge from '@/Components/Common/Badge';
import Table from '@/Components/Table/Table';
import Layout from '@/Layouts/AuthenticatedLayout';
import { formatUSDT } from '@/Lib/wallet';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';
import dayjs from 'dayjs';

export default function Wallet({ auth, collection }) {
    const rows = ['TX #', 'Market', 'Type', 'Status', 'Amount', 'Buy / Sell Amount', 'Interval / Scale', 'TX Date'];
    return (
        <Layout auth={auth}>
            <Head title="Market Orders" />

            <div className="flex justify-end space-x-3">
                <Link
                    href={route('markets.index')}
                    className="inline-flex items-center rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-neutral-800 dark:active:bg-neutral-300"
                >
                    Create Order
                </Link>
            </div>

            {!collection.data.length ? (
                <Alert type="warning" title="No market orders found." />
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
                                                <span className="mr-2 font-black">
                                                    <CalendarDaysIcon className="h-5 w-5 !fill-green-500" />
                                                </span>
                                                {dayjs(data.created_at).format('MMM D, YYYY h:mm A')}
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P className="text-xs">
                                                <span className="font-black">Market</span>: {formatUSDT(data.amount) + ' USDT'}
                                            </P>
                                            <P className="text-xs">
                                                <span className="font-black">Type</span>: <Badge type={data.type === 'high' ? 'success' : 'danger'} value={data.type === 'high' ? 'Up' : 'Fall'} />
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P>
                                                <span className="font-bold">Buy Amount</span> : {formatUSDT(data.buy_amount * 1000000) + ' USDT'}
                                            </P>
                                            <P className="text-xs">
                                                <span className="font-black">Status</span>:{' '}
                                                <>
                                                    {data.status === 'pending' && <Badge type="warning" value={data.status} />}
                                                    {data.status === 'win' && <Badge type="success" value={data.status} />}
                                                    {data.status === 'lose' && <Badge type="danger" value={data.status} />}
                                                </>
                                            </P>
                                        </div>
                                        <div className="flex">
                                            <span className="font-bold">Sell Amount</span> : {formatUSDT(data.sell_amount * 1000000) + ' USDT'}
                                        </div>
                                        <div className="flex justify-end">
                                            <P className={clsx('text-xs', data.amount < 0 ? '!text-red-500' : '!text-green-500')}>
                                                <span className="font-bold">Amount</span>: {formatUSDT(data.amount)} USDT
                                            </P>
                                        </div>
                                    </td>
                                    <Table.Data value={data.uuid} />
                                    <Table.Data value={data.market.symbol.toUpperCase() + '/USDT'} />
                                    <Table.Data
                                        value={
                                            <Badge type={data.type === 'high' ? 'success' : 'danger'} value={data.type === 'high' ? 'UP' : 'FALL'} />
                                        }
                                    />
                                    <Table.Data
                                        value={
                                            <>
                                                {data.status === 'pending' && <Badge type="warning" value={data.status} />}
                                                {data.status === 'win' && <Badge type="success" value={data.status} />}
                                                {data.status === 'lose' && <Badge type="danger" value={data.status} />}
                                            </>
                                        }
                                    />
                                    <Table.Data value={formatUSDT(data.amount) + ' USDT'} />
                                    <Table.Data value={
                                        <>
                                        {'$' + formatUSDT(data.buy_amount * 1000000)} / {'$' + formatUSDT((data.sell_amount ?? 0) * 1000000)}
                                        </>
                                    } />
                                    <Table.Data value={`${data.interval}s / ${data.win_percentage}%`} />
                                    {/* <Table.Data value={dayjs(data.created_at).format('MMM D, YYYY h:mm A')} /> */}
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
