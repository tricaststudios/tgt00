import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import P from '../AuthenticatedLayout/P';
import ButtonPrimary from '../Common/ButtonPrimary';
import ButtonSecondary from '../Common/ButtonSecondary';
import Modal from '../Common/Modal';
import InputError from '../Form/InputError';
import InputGroup from '../Form/InputGroup';
import InputLabel from '../Form/InputLabel';
import TextInput from '../Form/TextInput';
import NotificationPortal from '../Notification/NotificationPortal';

export default function CreateMiningForm({ miner, showModal, closeModal }) {
    const notificationRef = useRef();

    const addAmount = () => setData('amount', data.amount * 2);

    const deductAmount = () => {
        if (data.amount <= miner.min_amount) return;

        setData('amount', data.amount / 2);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: miner?.min_amount ?? 0,
        miner_id: miner?.id,
    });

    useEffect(() => {
        if (miner != null) setData({ amount: miner.min_amount, miner_id: miner.id });
    }, [miner]);

    const onHandleChange = event => {
        const regex = /^[0-9\b]+$/;

        if (event.target.value === '' || regex.test(event.target.value)) {
            setData(event.target.name, event.target.value);
        }
    };

    const submit = async e => {
        e.preventDefault();

        await post(route('user.miners.store'), {
            onSuccess: () => {
                notificationRef.current.addMessage({
                    type: 'success',
                    title: 'Success',
                    message: 'Requested new deposit.',
                });
                closeModal();
            },
        });
    };
    return (
        <>
            <NotificationPortal autoClose ref={notificationRef} />

            <Modal
                show={showModal}
                onClose={closeModal}
                title={miner?.name}
                message="This will lock up your wallet points depends on the selected Amount for unified return of income and margin after maturity on the lock days given."
            >
                <div className=" p-0 px-4 py-5">
                    <dl className="divide-y divide-gray-200">
                        <div className="grid grid-cols-3 gap-4 py-5 px-6">
                            <dt className="mt-1 text-sm font-medium text-gray-500">
                                <P>Lock Days</P>
                            </dt>
                            <dd className="col-span-2 mt-1 text-sm text-gray-900">
                                <P>{miner?.lock_days} Days</P>
                            </dd>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-5 px-6">
                            <dt className="mt-1 text-sm font-medium text-gray-500">
                                <P>Daily Rate</P>
                            </dt>
                            <dd className="col-span-2 mt-1 text-sm text-gray-900">
                                <P>{miner?.daily_rate}% / Day</P>
                            </dd>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4 py-5 px-6">
                            <dt className="mt-1 text-sm font-medium text-gray-500">
                                <P>Total Revenue</P>
                            </dt>
                            <dd className="col-span-2 mt-1 text-sm text-gray-900">
                                <P>{miner !== null ? ((miner?.daily_rate / 100) * data.amount * miner?.lock_days).toFixed(4) : 0} USDT</P>
                            </dd>
                        </div>
                    </dl>
                </div>
                <form onSubmit={submit} className="!mt-10 w-full space-y-3">
                    <InputGroup>
                        <InputLabel className="text-center" forInput="amount" value="Locked up amount" />

                        <div className="m-auto !mt-5 flex w-4/5 items-center justify-around space-x-3">
                            <ButtonPrimary type="button" className="flex-shrink-0 !px-3 !py-3" onClick={deductAmount}>
                                <MinusIcon className="h-4 w-4 dark:fill-black" />
                            </ButtonPrimary>

                            <TextInput
                                id="amount"
                                name="amount"
                                value={data.amount}
                                type="tel"
                                className="block w-full text-center"
                                autoComplete="amount"
                                handleChange={onHandleChange}
                                required
                            />

                            <ButtonPrimary type="button" className="flex-shrink-0 !px-3 !py-3" onClick={addAmount}>
                                <PlusIcon className="h-4 w-4 dark:fill-black" />
                            </ButtonPrimary>
                        </div>

                        <InputError message={errors.amount} className="!mt-3 text-center" />
                    </InputGroup>

                    <div className="!mt-6 flex flex-col justify-end sm:flex-row">
                        <ButtonSecondary className="order-2 mt-5 flex justify-center sm:order-1 sm:mt-0" onClick={closeModal}>
                            Cancel
                        </ButtonSecondary>

                        <ButtonPrimary className="order-1 flex w-full justify-center sm:order-2 sm:ml-3 sm:w-auto" processing={processing}>
                            Start!
                        </ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </>
    );
}
