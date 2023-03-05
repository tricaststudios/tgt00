
import { formatUSD } from '@/Lib/wallet';

import Chart from 'react-apexcharts';
import P from '../AuthenticatedLayout/P';
import Section from '../AuthenticatedLayout/Section';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CandleGraph = ({ series }) => {

    return (
        <>
            {series.length === 0 ? (
                <Section>
                    <div role="status" className="min-w-full animate-pulse p-4 dark:border-neutral-700 md:p-6">
                        {/* <div className="h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32 mb-2.5"></div>
                        <div className="mb-10 w-48 h-2 bg-neutral-200 rounded-full dark:bg-neutral-700"></div> */}
                        <div className="mt-6 flex items-baseline justify-between space-x-6">
                            <div className="h- h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-32 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-48 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-16 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-32 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-48 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-36 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h- h-32 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-60 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                            <div className="h-64 w-16 rounded-t-lg bg-neutral-200 dark:bg-neutral-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </Section>
            ) : (
                <Section className="!bg-neutral-200">
                    <Chart
                        options={{
                            xaxis: {
                                type: 'datetime',
                            },
                            yaxis: {
                                tooltip: {
                                    enabled: false,
                                },
                            },
                            chart: {
                                toolbar: {
                                    show: false,
                                },
                            },
                        }}
                        height={350}
                        series={series}
                        type="candlestick"
                    />
                </Section>
            )}
        </>
    );
};

export default CandleGraph;
