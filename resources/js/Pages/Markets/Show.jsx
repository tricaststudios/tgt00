import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import ButtonSecondary from '@/Components/Common/ButtonSecondary';
import Modal from '@/Components/Common/Modal';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import CandleGraph from '@/Components/Market/CandleGraph';
import NotificationPortal from '@/Components/Notification/NotificationPortal';
import Layout from '@/Layouts/AuthenticatedLayout';
import { getKlines, intervals } from '@/Lib/binance';
import { formatUSD } from '@/Lib/wallet';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Head, useForm, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

export default function MarketsShow({ auth, market }) {
    const [series, setSeries] = useState([]);
    const [selectedInterval, setSelectedInterval] = useState(intervals[0].value);
    const [showModal, setShowModal] = useState(false);
    const url = usePage().props.env.api_url;
    const marketIntervals = JSON.parse(market?.metadata?.intervals) ?? [];
    const amountWinPercentage = JSON.parse(market?.metadata?.amount_win_percentage) ?? [];
    const amountQuickOptions = JSON.parse(market?.metadata?.amount_quick_options) ?? [];
    const notificationRef = useRef();

    const [datas, setDatas] = useState([
        { name: 'Current Price', value: 0 },
        { name: 'Low', value: 0 },
        { name: 'High', value: 0 },
    ]);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        market_id: market.id,
        amount: market.min_amount,
        interval: '',
        win_percentage: '',
        type: '',
        buy_amount: 0,
    });

    const setInterval = index => {
        setData(prev => ({
            ...prev,
            interval: marketIntervals[index],
            win_percentage: amountWinPercentage[index],
        }));
    };

    const submit = async e => {
        e.preventDefault();

        await transform(data => ({
            ...data,
            buy_amount: series[0]?.data[series[0]?.data?.length - 1].y[1],
        }));

        await post(route('user.orders.store'), {
            onSuccess: async () => {
                await closeModal();
                await reset();

                notificationRef.current.addMessage({
                    type: 'success',
                    title: 'Success',
                    message: 'Order created.',
                });
            },
        });
    };

    const closeModal = type => {
        setShowModal(false);
    };

    const openModal = type => {
        setData('type', type);
        setShowModal(true);
    };

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    async function fetchData(datas) {
        await setSeries(datas);

        const data = datas[0].data[datas[0]?.data?.length - 1];

        await setDatas([
            { name: 'Current Price', value: data.y[3] },
            { name: 'High', value: data.y[1] },
            { name: 'Low', value: data.y[2] },
        ]);

        setData(prev => ({
            ...prev,
            buy_amount: data.y[1],
        }));
    }

    useEffect(() => {
        if (!series) {
            getKlines(url, market.symbol, selectedInterval).then(async data => {
                fetchData(data);
            });
        } else {
            const timer = setTimeout(() => {
                getKlines(url, market.symbol, selectedInterval).then(async data => {
                    fetchData(data);
                });
            }, 1000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [series, selectedInterval]);

    return (
        <Layout auth={auth}>
            <Head title={market.symbol.toUpperCase() + 'USDT | Market'} />
            <NotificationPortal autoClose ref={notificationRef} />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {datas.map((item, index) => (
                    <Section key={index}>
                        <P className="flex w-full items-center truncate">
                            {item.name}:<span></span>
                            {item.value != 0 && !isNaN(item.value) ? (
                                <span className="ml-1">${formatUSD(item.value)}</span>
                            ) : (
                                <span className="ml-2 grid w-full grid-cols-3 gap-4">
                                    <span className="col-span-2 h-2 rounded bg-slate-200 dark:bg-slate-700"></span>
                                    <span className="col-span-1 h-2 rounded bg-slate-200 dark:bg-slate-700"></span>
                                </span>
                            )}
                        </P>
                    </Section>
                ))}
            </div>

            <RadioGroup name="selected-interval" value={selectedInterval} onChange={setSelectedInterval}>
                <div className="mt-4 grid grid-cols-4 gap-y- gap-x-4">
                    {intervals.map((item, index) => (
                        <RadioGroup.Option
                            key={item.value}
                            value={item.value}
                            className={({ checked, active }) =>
                                clsx(
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
                                    <CheckCircleIcon className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600')} aria-hidden="true" />
                                    <span
                                        className={clsx(
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

            {series && <CandleGraph series={series} />}

            <div className="flex justify-center space-x-3">
                <ButtonPrimary
                    disabled={data.buy_amount === 0}
                    className="flex w-full justify-center !bg-green-500 !text-white disabled:opacity-70"
                    onClick={() => openModal('high')}
                >
                    Buy Up
                </ButtonPrimary>
                <ButtonPrimary
                    disabled={data.buy_amount === 0}
                    className="flex w-full justify-center !bg-red-500 !text-white disabled:opacity-70"
                    onClick={() => openModal('low')}
                >
                    Buy Fall
                </ButtonPrimary>
            </div>

            <Modal show={showModal} onClose={closeModal} title={`Buy ${market.symbol}`}>
                <form onSubmit={submit} className="space-y-3 p-6">
                    <InputGroup>
                        <InputLabel forInput="interval" value="Interval" />

                        <div className="!mb-6">
                            <select
                                id="interval"
                                name="interval"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue=""
                                onChange={e => setInterval(e.target.value)}
                            >
                                <option value="">Select Interval</option>
                                {marketIntervals.map((value, index) => (
                                    <option key={value} value={index}>
                                        {value}s
                                    </option>
                                ))}
                            </select>
                        </div>

                        <InputError message={errors.interval} className="mt-2" />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel forInput="amount" value="Amount" />

                        <div className="!mb-6">
                            <RadioGroup name="amount" value={data.amount} onChange={value => setData('amount', value)}>
                                <div className="mt-4 grid grid-cols-3 gap-y-6 gap-x-4">
                                    {amountQuickOptions.map((amount, index) => (
                                        <RadioGroup.Option
                                            key={index}
                                            value={amount}
                                            className={({ checked, active }) =>
                                                clsx(
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
                                                            <RadioGroup.Label
                                                                as="span"
                                                                className="block truncate text-sm font-medium text-neutral-900"
                                                            >
                                                                <P>{amount}</P>
                                                            </RadioGroup.Label>
                                                        </span>
                                                    </span>
                                                    <CheckCircleIcon
                                                        className={clsx(!checked ? 'invisible' : '', 'h-5 w-5 text-green-600')}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={clsx(
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
                        </div>

                        <TextInput
                            id="amount"
                            type="tel"
                            name="amount"
                            value={data.amount}
                            handleChange={onHandleChange}
                            className="mt-1 block w-full"
                            placeholder="amount"
                            required
                        />

                        <InputError message={errors.amount} className="mt-2" />
                    </InputGroup>

                    <div className="!mt-6 flex flex-col justify-end sm:flex-row">
                        <ButtonSecondary className="order-2 mt-5 flex justify-center sm:order-1 sm:mt-0" onClick={closeModal}>
                            Cancel
                        </ButtonSecondary>

                        <ButtonPrimary className="order-1 flex w-full justify-center sm:order-2 sm:ml-3 sm:w-auto" processing={processing}>
                            Buy
                        </ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
}
