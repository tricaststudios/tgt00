import { getKlines, intervals } from '@/Lib/binance';
import { formatUSD } from '@/Lib/wallet';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import P from '../AuthenticatedLayout/P';
import Section from '../AuthenticatedLayout/Section';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const CandleGraph = ({ market }) => {
    const [series, setSeries] = useState([]);
    const [selectedInterval, setSelectedInterval] = useState(intervals[0].value);
    const [datas, setDatas] = useState([]);
    const url = usePage().props.env.api_url;

    function fetchData() {
        setDatas([
            { name: 'Current Price', value: series[0].data[series[0].data.length - 1].y[1] },
            { name: 'Open Today', value: series[0].data[series[0].data.length - 1].y[1] },
            { name: 'Low', value: series[0].data[series[0].data.length - 1].y[1] },
            { name: 'High', value: series[0].data[series[0].data.length - 1].y[1] },
        ]);
    }

    useEffect(() => {
        if (!series) {
            getKlines(url, market, selectedInterval).then(data => {
                setSeries(data);
                fetchData();
            });
        } else {
            const timer = setTimeout(() => {
                getKlines(url, market, selectedInterval).then(data => {
                    setSeries(data);
                    fetchData();
                });
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [series, selectedInterval]);
    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {datas.map((item, index) => (
                    <Section key={index}>
                        <P>
                            {item.name}: $ {formatUSD(item.value)}
                        </P>
                    </Section>
                ))}
            </div>

            <RadioGroup value={selectedInterval} onChange={setSelectedInterval}>
                <RadioGroup.Label className="text-base font-medium text-neutral-900">
                    <P>Select Interval</P>
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-4 gap-y-6 gap-x-4">
                    {intervals.map((item, index) => (
                        <RadioGroup.Option
                            key={index}
                            value={item.value}
                            className={({ checked, active }) =>
                                classNames(
                                    checked ? 'border-transparent' : 'border-neutral-100',
                                    active ? 'border-neutral-500 ring-2 ring-neutral-500' : '',
                                    'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none dark:bg-neutral-800',
                                )
                            }
                        >
                            {({ checked, active }) => (
                                <>
                                    <span className="flex flex-1 items-center justify-center">
                                        <span className="flex flex-col">
                                            <RadioGroup.Label as="span" className="block truncate text-sm font-medium text-neutral-900">
                                                <P>{item.name}</P>
                                            </RadioGroup.Label>
                                        </span>
                                    </span>
                                    <CheckCircleIcon
                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600')}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-neutral-500' : 'border-transparent',
                                            'pointer-events-none absolute -inset-px rounded-lg',
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

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
