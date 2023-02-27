import Section from '@/Components/AuthenticatedLayout/Section';
import ButtonPrimary from '@/Components/Common/ButtonPrimary';
import Modal from '@/Components/Common/Modal';
import Layout from '@/Layouts/ComponentsLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Modals({ auth }) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Layout auth={auth}>
            <Head title="Modals"/>
            <Section className="space-y-5 sm:space-y-0 sm:space-x-2">
                <ButtonPrimary onClick={() => setShowModal(prev => !prev)}>Sample Modal</ButtonPrimary>
                <Modal
                    show={showModal}
                    onClose={closeModal}
                    title="This is a sample modal"
                    message="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio magni ea quae eligendi commodi pariatur rerum! Vero, est facilis facere aspernatur consequuntur modi unde blanditiis, fugiat doloremque debitis dolorem. Magni!"
                />
            </Section>
        </Layout>
    );
}
