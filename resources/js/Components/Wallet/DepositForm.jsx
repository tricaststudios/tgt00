import { CheckCircleIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import P from '../AuthenticatedLayout/P';
import ButtonPrimary from '../Common/ButtonPrimary';
import ButtonSecondary from '../Common/ButtonSecondary';
import Modal from '../Common/Modal';
import InputError from '../Form/InputError';
import InputGroup from '../Form/InputGroup';
import InputLabel from '../Form/InputLabel';
import TextInput from '../Form/TextInput';
import NotificationPortal from '../Notification/NotificationPortal';

export default function DepositForm({ account }) {
    const notificationRef = useRef();

    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        wallet_address: '',
        amount: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => {
            setCopied(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [copied]);

    const submit = async e => {
        e.preventDefault();

        await transform(data => ({ ...data, deposit_account_id: account.id }));

        await post(route('user.deposits.store'), {
            onSuccess: async () => {
                await closeModal();
                await reset();

                notificationRef.current.addMessage({
                    type: 'success',
                    title: 'Success',
                    message: 'Requested new deposit.',
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
                Deposit
            </ButtonPrimary>

            <Modal show={showModal} onClose={closeModal} title="Deposit Form">
                <form onSubmit={submit} className="space-y-3 p-6">
                    {account && account?.media?.length > 0 && (
                        <div className="mb-18 flex flex-col space-y-5 text-center">
                            <img src={account.media[0].original_url} className="m-auto h-full w-64" alt="" />
                            <P>{account.name}</P>
                            <P className="text-sm">{account.address}</P>
                            <CopyToClipboard text={account.address}>
                                <ButtonSecondary onClick={() => setCopied(true)} className="m-auto flex items-center space-x-3">
                                    <P>Copy to Clipboard</P>
                                    {copied == true ? (
                                        <CheckCircleIcon className="h-5 w-5 fill-green-500" />
                                    ) : (
                                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                                    )}
                                </ButtonSecondary>
                            </CopyToClipboard>
                        </div>
                    )}
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
