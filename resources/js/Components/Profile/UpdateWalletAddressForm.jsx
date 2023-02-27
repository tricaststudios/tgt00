import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateWalletAddressForm({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        wallet_address: user.wallet_address ?? '',
    });

    const submit = e => {
        e.preventDefault();

        patch(route('user.wallet_address.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Withdrawal Address</h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <InputGroup>
                    <InputLabel for="wallet_address" value="Wallet Address" />

                    <TextInput
                        id="wallet_address"
                        className="block w-full"
                        value={data.wallet_address}
                        handleChange={e => setData('wallet_address', e.target.value)}
                        required
                        autoComplete="wallet_address"
                    />

                    <InputError message={errors.name} />
                </InputGroup>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus:ring-offset-neutral-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <ButtonPrimary type="submit" processing={processing}>
                        Save
                    </ButtonPrimary>

                    <Transition show={recentlySuccessful} enterFrom="opacity-0" leaveTo="opacity-0" className="transition ease-in-out">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
