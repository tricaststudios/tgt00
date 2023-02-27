import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
    });

    const submit = e => {
        e.preventDefault();

        patch(route('user.profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Profile Information</h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <InputGroup>
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        className="block w-full"
                        value={data.name}
                        handleChange={e => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError message={errors.name} />
                </InputGroup>
                <InputGroup>
                    <InputLabel for="username" value="Username" />

                    <TextInput
                        id="username"
                        className="block w-full"
                        value={data.username}
                        handleChange={e => setData('username', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError message={errors.username} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full"
                        value={data.email}
                        handleChange={e => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError message={errors.email} />
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
                    <ButtonPrimary processing={processing}>Save</ButtonPrimary>

                    <Transition show={recentlySuccessful} enterFrom="opacity-0" leaveTo="opacity-0" className="transition ease-in-out">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
