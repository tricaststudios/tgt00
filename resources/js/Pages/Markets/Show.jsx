import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import CandleGraph from '@/Components/Market/CandleGraph';
import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MarketsShow({ auth, market }) {
    return (
        <Layout auth={auth}>
            <Head title={market.symbol.toUpperCase() + 'USDT | Market'} />

            <CandleGraph market={market.symbol} />

            <div className="flex justify-center space-x-3">
                <ButtonPrimary className="flex w-full justify-center !bg-green-500 !text-white ">Buy Up</ButtonPrimary>
                <ButtonPrimary className="flex w-full justify-center !bg-red-500 !text-white ">Buy Fall</ButtonPrimary>
            </div>
        </Layout>
    );
}
