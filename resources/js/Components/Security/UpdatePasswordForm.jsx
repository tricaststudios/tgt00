import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import TextInput from '@/Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, patch, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = e => {
        e.preventDefault();

        patch(route('user.password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Update Password</h2>

                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Ensure your account is using a long, random password to stay secure.</p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel for="current_password" value="Current Password" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        handleChange={e => setData('current_password', e.target.value)}
                        type="password"
                        isFocused
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel for="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        handleChange={e => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel for="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={e => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

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
