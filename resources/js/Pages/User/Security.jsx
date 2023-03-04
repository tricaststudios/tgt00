import Section from '@/Components/AuthenticatedLayout/Section';
import Layout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreatePinForm from '../../Components/Security/CreatePinForm';
import UpdatePasswordForm from '../../Components/Security/UpdatePasswordForm';
import UpdatePinForm from '../../Components/Security/UpdatePinForm';

export default function Security({ auth, hasPin }) {
    return (
        <Layout auth={auth}>
            <Head title="Security" />
            <Section>
                <UpdatePasswordForm className="max-w-xl" />
            </Section>
            <Section className={hasPin === false && 'border border-red-500'}>{!hasPin ? <CreatePinForm className="max-w-xl" /> : <UpdatePinForm className="max-w-xl" />}</Section>
        </Layout>
    );
}
