import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { getPriceTicker } from '@/Lib/binance';
import { formatUSD } from '@/Lib/wallet';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { Head, Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function Markets({ auth, collection }) {
    const url = usePage().props.env.api_url;

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Markets" />
            <dl className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {collection.map((item, index) => (
                    <Link key={index} href={route('markets.show', item)}>
                        <Section key={item.id} className="flex items-center justify-around gap-4 shadow">
                            <dt className="flex flex-1 items-center space-x-3">
                                <div className="rounded-md bg-neutral-500 p-3">
                                    <img src={item.avatar} className="h-10 w-10 text-white" alt="coin-logo" />
                                </div>
                                <p className="truncate text-sm font-medium uppercase text-neutral-500">{item.symbol}/USDT</p>
                            </dt>
                            <dd className="flex flex-1 items-baseline">
                                <P className="text-2xl font-semibold text-neutral-900">${formatUSD(item.stats.lastPrice)}</P>
                                <P
                                    className={clsx(
                                        item.stats.priceChangePercent > 0 ? '!text-green-600' : '!text-red-600',
                                        'ml-2 flex items-baseline text-sm font-semibold',
                                    )}
                                >
                                    {item.stats.priceChangePercent > 0 ? (
                                        <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                                    ) : (
                                        <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                                    )}

                                    <span className="sr-only"> {item.stats.priceChangePercent > 0 ? 'Increased' : 'Decreased'} by </span>
                                    {item.stats.priceChangePercent}
                                </P>
                            </dd>
                        </Section>
                    </Link>
                ))}
            </dl>
        </AuthenticatedLayout>
    );
}
