import ButtonDanger from '@/Components/Common/ButtonDanger';
import Modal from '@/Components/Common/Modal';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = e => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Delete Account</h2>

                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any
                    data or information that you wish to retain.
                </p>
            </header>

            <ButtonDanger onClick={confirmUserDeletion}>Delete Account</ButtonDanger>

            <Modal
                show={confirmingUserDeletion}
                onClose={closeModal}
                title="Are you sure you want to delete your account?"
                message="Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would
                        like to permanently delete your account."
            >
                <form onSubmit={deleteUser}>
                    <InputGroup>
                        <InputLabel for="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={e => setData('password', e.target.value)}
                            fullWidth
                            isFocused
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </InputGroup>

                    <Modal.ActionContainer>
                        <Modal.ButtonDanger onClick={deleteUser} processing={processing}>
                            Delete Account
                        </Modal.ButtonDanger>
                        <Modal.ButtonCancel onClick={closeModal} value="Cancel" />
                    </Modal.ActionContainer>
                </form>
            </Modal>
        </section>
    );
}
