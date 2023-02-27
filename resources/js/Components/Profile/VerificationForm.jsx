import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import ButtonPrimary from '../Common/ButtonPrimary';
import Filepond from '../Form/Filepond';
import InputError from '../Form/InputError';
import InputGroup from '../Form/InputGroup';
import InputLabel from '../Form/InputLabel';
import TextInput from '../Form/TextInput';
import NotificationPortal from '../Notification/NotificationPortal';

export default function VerificationForm({ className, verification }) {
    const notificationRef = useRef();
    const user = usePage().props.auth.user;

    const [attachments, setAttachments] = useState(verification != null ? [...verification.media.map(item => item.original_url)] : []);

    useEffect(() => {
        setData('attachments', [...attachments?.map(attachment => attachment?.file)]);
    }, [attachments]);

    const { data, setData, post, errors, processing, transform, recentlySuccessful } = useForm(
        {
            first_name: verification?.first_name ?? '',
            last_name: verification?.last_name ?? '',
            mobile_number: verification?.mobile_number ?? '',
            identification_type: verification?.identification_type ?? '',
            identification_value: verification?.identification_value ?? '',
        },
        {
            forceFormData: true,
        },
    );

    const submit = async e => {
        e.preventDefault();

        await transform(data => {
            return {
                ...data,
                attachments: [...attachments?.map(attachment => new File([attachment.file], attachment.filename))],
            };
        });

        await post(route('user.verification.store'), {
            _method: 'PATCH',
            preserveScroll: true,
            onSuccess: response => {
                notificationRef.current.addMessage({
                    type: 'success',
                    message: response.props.flash.success,
                });

                reset();
                setAttachments([]);
            },
            onError: error => {
                if (error.error_message)
                    notificationRef.current.addMessage({
                        type: 'error',
                        message: error.error_message,
                    });
            },
        });
    };

    return (
        <section className={className}>
            <NotificationPortal autoClose ref={notificationRef} />

            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Account Verification</h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">Update your account's profile information and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <InputGroup>
                    <InputLabel for="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        className="block w-full"
                        value={data.first_name}
                        handleChange={e => setData('first_name', e.target.value)}
                        required
                        autoComplete="first_name"
                    />

                    <InputError message={errors.first_name} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="block w-full"
                        value={data.last_name}
                        handleChange={e => setData('last_name', e.target.value)}
                        required
                        autoComplete="last_name"
                    />

                    <InputError message={errors.last_name} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="mobile_number" value="Mobile Number" />

                    <TextInput
                        type="tel"
                        id="mobile_number"
                        className="block w-full"
                        value={data.mobile_number}
                        handleChange={e => setData('mobile_number', e.target.value)}
                        required
                        autoComplete="mobile_number"
                    />

                    <InputError message={errors.mobile_number} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="identification_type" value="ID Type" />

                    <TextInput
                        type="tel"
                        id="identification_type"
                        className="block w-full"
                        value={data.identification_type}
                        handleChange={e => setData('identification_type', e.target.value)}
                        required
                        autoComplete="identification_type"
                    />

                    <InputError message={errors.identification_type} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="identification_value" value="ID Number" />

                    <TextInput
                        type="tel"
                        id="identification_value"
                        className="block w-full"
                        value={data.identification_value}
                        handleChange={e => setData('identification_value', e.target.value)}
                        required
                        autoComplete="identification_value"
                    />

                    <InputError message={errors.identification_value} />
                </InputGroup>

                <InputGroup>
                    <InputLabel for="attachments" value="Attachments" />

                    <Filepond id="assets" name="assets" files={attachments} grid onupdatefiles={setAttachments} allowMultiple={true} maxFiles={3} />

                    <InputError message={errors.attachments} />
                </InputGroup>

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
