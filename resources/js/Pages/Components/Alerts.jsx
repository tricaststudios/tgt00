import Alert from '@/Components/Common/Alert';
import Layout from '@/Layouts/ComponentsLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Alerts({ auth }) {
    const [sample, setSample] = useState(false);

    return (
        <Layout auth={auth}>
            <Head title="Components | Alerts" />

            <Alert type="info" title="Sample info alert without message" />
            <Alert type="success" title="Sample success alert without message." />
            <Alert type="warning" title="Sample warning alert with message" message="Sample warning message." />
            <Alert type="danger" title="Sample danger alert with message" message="Sample danger message." />
        </Layout>
    );
}
