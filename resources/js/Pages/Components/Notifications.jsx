import Section from '@/Components/AuthenticatedLayout/Section';
import ButtonDanger from '@/Components/Common/ButtonDanger';
import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import NotificationPortal from '@/Components/Notification/NotificationPortal';
import Layout from '@/Layouts/ComponentsLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';

export default function Notifications({ auth }) {
    const notificationRef = useRef();

    return (
        <Layout auth={auth}>
            <Head title="Notifications"/>
            <NotificationPortal autoClose ref={notificationRef} />

            <Section className="space-y-5 sm:space-y-0 sm:space-x-2">
                <ButtonPrimary
                    className="bg-green-500 hover:bg-green-700"
                    onClick={() =>
                        notificationRef.current.addMessage({
                            type: 'success',
                            title: 'Sample success notification',
                            message: 'Sample success message',
                        })
                    }
                >
                    Sample Success Notification
                </ButtonPrimary>

                <ButtonDanger
                    onClick={() =>
                        notificationRef.current.addMessage({
                            type: 'danger',
                            title: 'Sample danger notification',
                            message: 'Sample danger message',
                        })
                    }
                >
                    Sample Danger Notification
                </ButtonDanger>
            </Section>
        </Layout>
    );
}
