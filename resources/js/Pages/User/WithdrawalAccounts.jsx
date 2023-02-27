import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import Table from '@/Components/Table/Table';
import CreateWithdrawalAccountForm from '@/Components/WithdrawalAccounts/CreateWithdrawalAccountForm';
import Layout from '@/Layouts/AuthenticatedLayout';
import { formatUSDT } from '@/Lib/wallet';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import clsx from 'clsx';
import dayjs from 'dayjs';

export default function Wallet({ auth, wallets, collection }) {
    const rows = ['Preset Name', 'Type', 'Provider Name', 'Provider ID', 'Description'];
    return (
        <Layout auth={auth}>
            <Head title="Wallet" />

            <div className="flex justify-end space-x-3">
                <CreateWithdrawalAccountForm />
            </div>

            {!collection.data.length ? (
                <Alert type="warning" title="No accounts found." />
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
                                                    <CalendarDaysIcon className="h-5 w-5" />
                                                </span>
                                                {dayjs(data.created_at).format('MMM D, YYYY')}
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
                                    <Table.Data value={data.name} />
                                    <Table.Data value={data.provider_type} />
                                    <Table.Data value={data.provider_name.toUpperCase()} />
                                    <Table.Data value={data.provider_id} />
                                    <Table.Data>{data.provider_type == 'bank' && (
                                        <span className='flex flex-col'>
                                            <span>Bank Address: {data.bank_address}</span>
                                            <span>Swift Code: {data.swift_code}</span>
                                        </span>
                                    )}</Table.Data>
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
