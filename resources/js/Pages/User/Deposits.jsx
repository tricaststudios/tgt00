import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import Badge from '@/Components/Common/Badge';
import Table from '@/Components/Table/Table';
import DepositForm from '@/Components/Wallet/DepositForm';
import Layout from '@/Layouts/AuthenticatedLayout';
import { formatUSDT } from '@/Lib/wallet';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Deposits({ auth, collection, account }) {
    const rows = ['Tx #', 'Wallet Address', 'Status', 'Amount', 'Tx Date'];

    return (
        <Layout auth={auth}>
            <Head title="Deposits" />

            <div className="grid grid-cols-1 justify-between gap-5 md:grid-cols-2 xl:grid-cols-3">
                <Section>
                    <dt className="truncate text-sm font-medium text-gray-500">Balance</dt>
                    <P className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatUSDT(auth.wallet.balance)}</P>
                </Section>
            </div>

            <div className="flex justify-end space-x-3">
                <DepositForm account={account} />
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
                                                <span className="font-black">TX#</span>: iuqhwjnkdaskduhqwiud
                                            </P>
                                            <P className="flex items-center text-xs">
                                                <span className="font-black">
                                                    <CalendarDaysIcon className="h-5 w-5" />
                                                </span>
                                                July 10, 2023
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P className="text-xs">
                                                <span className="font-black">Type</span>: Commission
                                            </P>
                                        </div>
                                        <div className="flex justify-between">
                                            <P className="flex items-center !text-xs">Received commission from Yuwan.</P>
                                        </div>
                                        <div className="flex justify-end">
                                            <P className="text-xs !text-green-500">
                                                <span className="font-bold">AMOUNT</span>: 1.2324 USDT
                                            </P>
                                        </div>
                                    </td>
                                    <Table.Data value={data.uuid} />
                                    <Table.Data value={data.wallet_address} />
                                    <Table.Data value={<Badge type={data.status == 'paid' ? 'success' : 'warning'} value={data.status} />} />
                                    <Table.Data value={formatUSDT(data.amount)} />
                                    <Table.Data value={dayjs(data.created_at).format('MMM D, YYYY')} />
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
