import Section from '@/Components/AuthenticatedLayout/Section';
import Layout from '@/Layouts/ComponentsLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Blank({ auth }) {
    const [sample, setSample] = useState(false);

    return (
        <Layout auth={auth}>
            <Head title="Components | " />
            <Section>Content</Section>
        </Layout>
    );
}
