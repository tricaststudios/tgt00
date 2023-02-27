import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ButtonPrimary from '../Common/ButtonPrimary';
import ButtonSecondary from '../Common/ButtonSecondary';
import Modal from '../Common/Modal';
import InputError from '../Form/InputError';
import InputGroup from '../Form/InputGroup';
import InputLabel from '../Form/InputLabel';
import TextInput from '../Form/TextInput';
import NotificationPortal from '../Notification/NotificationPortal';

export default function DepositForm() {
    const notificationRef = useRef();

    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        wallet_address: '',
        amount: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const submit = async e => {
        e.preventDefault();

        await post(route('deposits.store'));
        await closeModal();
        await reset();

        notificationRef.current.addMessage({
            type: 'success',
            title: 'Success',
            message: 'Requested new deposit.',
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
                Deposit
            </ButtonPrimary>

            <Modal show={showModal} onClose={closeModal} title="Deposit Form">
                <form onSubmit={submit} className="space-y-3 p-6">
                    <InputGroup>
                        <InputLabel forInput="wallet_address" value="Wallet Address" />

                        <TextInput
                            id="wallet_address"
                            type="text"
                            name="wallet_address"
                            value={data.wallet_address}
                            handleChange={onHandleChange}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="wallet_address"
                            required
                        />

                        <InputError message={errors.wallet_address} className="mt-2" />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel forInput="amount" value="Amount" />

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
                            Deposit
                        </ButtonPrimary>
                    </div>
                </form>
            </Modal>
        </>
    );
}