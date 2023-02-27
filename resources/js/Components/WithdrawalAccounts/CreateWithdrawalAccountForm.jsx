import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ButtonPrimary from '../Common/ButtonPrimary';
import ButtonSecondary from '../Common/ButtonSecondary';
import Modal from '../Common/Modal';
import InputError from '../Form/InputError';
import InputGroup from '../Form/InputGroup';
import InputLabel from '../Form/InputLabel';
import TextInput from '../Form/TextInput';
import NotificationPortal from '../Notification/NotificationPortal';

export default function CreateWithdrawalAccountForm() {
    const notificationRef = useRef();
    const [showModal, setShowModal] = useState(false);

    const provider_types = [
        { name: 'Bank', value: 'bank' },
        { name: 'Crypto Wallet', value: 'crypto-wallet' },
    ];

    const crypto_types = [
        { name: 'Bitcoin', value: 'btc' },
        { name: 'Ethereum', value: 'eth' },
        { name: 'USDT', value: 'usdt' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        provider_type: provider_types[0],
        provider_name: '',
        provider_id: '',
        wallet_address: '',
        swift_code: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const submit = async e => {
        e.preventDefault();

        await post(route('user.withdrawals.accounts.store'), {
            onSuccess: () => {
                closeModal();
                reset();

                notificationRef.current.addMessage({
                    type: 'success',
                    title: 'Success',
                    message: usePage().props.flash.success,
                });
            },
        });
    };
    return (
        <>
            <NotificationPortal autoClose ref={notificationRef} />

            <ButtonPrimary
                type="button"
                onClick={() => setShowModal(prev => !prev)}
                className="inline-flex items-center rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 active:bg-neutral-900 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-neutral-800 dark:active:bg-neutral-300"
            >
                Create Account
            </ButtonPrimary>

            <Modal show={showModal} onClose={closeModal} title="Create Withdrawal Account Form">
                <form onSubmit={submit} className="space-y-3 p-6">
                    <InputGroup>
                        <InputLabel forInput="wallet_address" value="Preset Name" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            handleChange={onHandleChange}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="name"
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel forInput="provider_type" value="Provider Type" />

                        <select
                            id="provider_type"
                            name="provider_type"
                            onChange={onHandleChange}
                            className="block w-full rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                            defaultValue="Canada"
                        >
                            <option value="">Choose Provider</option>
                            {provider_types.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.provider_type} className="mt-2" />
                    </InputGroup>

                    {data.provider_type == 'crypto-wallet' && (
                        <>
                            <InputGroup>
                                <InputLabel forInput="provider_name" value="Crypto Type" />

                                <select
                                    id="provider_name"
                                    name="provider_name"
                                    onChange={onHandleChange}
                                    className="block w-full rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                                    defaultValue="Canada"
                                >
                                    <option value="">Choose type</option>
                                    {crypto_types.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                <InputError message={errors.provider_name} className="mt-2" />
                            </InputGroup>
                            <InputGroup>
                                <InputLabel forInput="provider_id" value="Wallet Address" />

                                <TextInput
                                    id="provider_id"
                                    type="text"
                                    name="provider_id"
                                    value={data.provider_id}
                                    handleChange={onHandleChange}
                                    className="mt-1 block w-full"
                                    placeholder="provider_id"
                                    required
                                />

                                <InputError message={errors.provider_id} className="mt-2" />
                            </InputGroup>
                        </>
                    )}

                    {data.provider_type == 'bank' && (
                        <>
                            <InputGroup>
                                <InputLabel forInput="provider_name" value="Bank Name" />

                                <TextInput
                                    id="provider_name"
                                    type="text"
                                    name="provider_name"
                                    value={data.provider_name}
                                    isFocused
                                    handleChange={onHandleChange}
                                    className="mt-1 block w-full"
                                    placeholder="provider_name"
                                    required
                                />

                                <InputError message={errors.provider_name} className="mt-2" />
                            </InputGroup>

                            <InputGroup>
                                <InputLabel forInput="provider_id" value="Account Number" />

                                <TextInput
                                    id="provider_id"
                                    type="text"
                                    name="provider_id"
                                    value={data.provider_id}
                                    handleChange={onHandleChange}
                                    className="mt-1 block w-full"
                                    placeholder="provider_id"
                                    required
                                />

                                <InputError message={errors.provider_id} className="mt-2" />
                            </InputGroup>

                            <InputGroup>
                                <InputLabel forInput="bank_address" value="Bank Address" />

                                <TextInput
                                    id="bank_address"
                                    type="text"
                                    name="bank_address"
                                    value={data.bank_address}
                                    handleChange={onHandleChange}
                                    className="mt-1 block w-full"
                                    placeholder="bank_address"
                                    required
                                />

                                <InputError message={errors.bank_address} className="mt-2" />
                            </InputGroup>

                            <InputGroup>
                                <InputLabel forInput="swift_code" value="Swift Code" />

                                <TextInput
                                    id="swift_code"
                                    type="text"
                                    name="swift_code"
                                    value={data.swift_code}
                                    handleChange={onHandleChange}
                                    className="mt-1 block w-full"
                                    placeholder="swift_code"
                                    required
                                />

                                <InputError message={errors.swift_code} className="mt-2" />
                            </InputGroup>
                        </>
                    )}

                    <div className="!mt-6 flex flex-col justify-end sm:flex-row">
                        <ButtonSecondary className="order-2 mt-5 flex justify-center sm:order-1 sm:mt-0" onClick={closeModal}>
                            Cancel
                        </ButtonSecondary>

                        <ButtonPrimary className="order-1 flex w-full justify-center sm:order-2 sm:ml-3 sm:w-auto" processing={processing}>
                            Create
                        </ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </>
    );
}
