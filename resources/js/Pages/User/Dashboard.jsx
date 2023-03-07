import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Dashboard" />
            <Section>
                <P>Welcome!</P>
            </Section>
        </AuthenticatedLayout>
    );
}
