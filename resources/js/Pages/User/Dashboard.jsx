import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import clsx from 'clsx';

const stats = [
    { id: 1, name: 'BTC', pairs: 'BTC/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'ADA', pairs: 'ADA/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'XRP', pairs: 'XRP/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '3.2%', changeType: 'decrease' },
    { id: 4, name: 'BNB', pairs: 'BNB/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '3.2%', changeType: 'decrease' },
    { id: 5, name: 'DOGE', pairs: 'DOGE/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '3.2%', changeType: 'increase' },
    { id: 6, name: 'TRX', pairs: 'TRX/USDT', stat: '71,897', icon: CurrencyDollarIcon, change: '5.4%', changeType: 'increase' },
];

const MARKET_CHART_ID = 'bitcoin';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Dashboard" />
            <Section>
                <P>Welcome!</P>
            </Section>
        </AuthenticatedLayout>
    );
}
