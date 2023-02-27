import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import Checkbox from '@/Components/Form/Checkbox';
import InputError from '@/Components/Form/InputError';
import InputGroup from '@/Components/Form/InputGroup';
import InputLabel from '@/Components/Form/InputLabel';
import TextInput from '@/Components/Form/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = event => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = e => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout title="Sign in to your account">
            <Head title="Log in" />
            <form className="space-y-6" method="POST" onSubmit={submit}>
                <InputGroup>
                    <InputLabel forInput="email" value="Username | Email Address" />
                    <TextInput
                        id="email"
                        name="email"
                        value={data.email}
                        type="text"
                        className="block w-full"
                        autoComplete="email"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} />
                </InputGroup>

                <InputGroup>
                    <InputLabel forInput="password" value="Password" />
                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        type="password"
                        className="block w-full"
                        autoComplete="password"
                        handleChange={onHandleChange}
                        required
                    />
                </InputGroup>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <label className="flex items-center">
                            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                            <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
                        </label>
                    </div>

                    {canResetPassword && (
                        <div className="text-sm">
                            <Link
                                href={route('password.request')}
                                className="font-medium text-neutral-600 hover:text-neutral-500 dark:text-neutral-400"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <ButtonPrimary className="flex w-full justify-center" processing={processing}>
                        Sign in
                    </ButtonPrimary>
                </div>
            </form>
        </GuestLayout>
    );
}
