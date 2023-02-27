import InputError from '@/Components/Form/InputError';
import InputLabel from '@/Components/Form/InputLabel';
import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import TextInput from '@/Components/Form/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function CreatePinForm({ className }) {
    const pinInput = useRef();

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        pin: '',
        pin_confirmation: '',
    });

    const updatePassword = e => {
        e.preventDefault();

        post(route('user.pin.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.pin) {
                    reset('pin', 'pin_confirmation');
                    pinInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Create New Pin</h2>

                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Ensure your pin account is using a long, random numeric to stay secure.</p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel for="pin" value="New Pin" />

                    <TextInput
                        id="pin"
                        ref={pinInput}
                        value={data.pin}
                        handleChange={e => setData('pin', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-pin"
                    />

                    <InputError message={errors.pin} className="mt-2" />
                </div>

                <div>
                    <InputLabel for="pin_confirmation" value="Confirm Pin" />

                    <TextInput
                        id="pin_confirmation"
                        value={data.pin_confirmation}
                        handleChange={e => setData('pin_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-pin"
                    />

                    <InputError message={errors.pin_confirmation} className="mt-2" />
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
