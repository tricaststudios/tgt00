import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = event => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = e => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout title="Create your account">
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4">
                <InputGroup>
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} />
                </InputGroup>

                <InputGroup>
                    <InputLabel forInput="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </InputGroup>

                <InputGroup>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </InputGroup>

                <InputGroup>
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </InputGroup>

                <InputGroup>
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </InputGroup>

                <ButtonPrimary className="!mt-10 flex w-full justify-center" processing={processing}>
                    Register
                </ButtonPrimary>
            </form>
            <div className="mt-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 dark:bg-neutral-800 dark:text-neutral-300">
                            <Link href={route('login')}>Already registered?</Link>
                        </span>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
