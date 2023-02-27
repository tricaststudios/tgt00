import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import CreateMiningForm from '@/Components/Minings/CreateMiningForm';
import Layout from '@/Layouts/AuthenticatedLayout';
import { ArrowUpIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function MinersIndex({ auth, collection }) {
    const [selectedMiner, setSelectedMiner] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setSelectedMiner(null);
        setShowModal(false);
    };

    const selectMiner = item => {
        setSelectedMiner(item);
        setShowModal(true);
    };

    return (
        <Layout auth={auth}>
            <Head title="Miners" />
            {!collection.data.length ? (
                <Alert type="warning" title="No miners available at the moment." />
            ) : (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <CreateMiningForm showModal={showModal} closeModal={closeModal} miner={selectedMiner} />
                    {collection.data.map(item => (
                        <button key={item.id} onClick={e => selectMiner(item)}>
                            <Section className="space-y-4  hover:opacity-75">
                                <div className="flex items-center justify-between">
                                    <P className="text-lg font-bold">{item.name}</P>
                                    <P className="flex items-center space-x-2">
                                        <LockClosedIcon className="h-4 w-4" />
                                        <span>{item.lock_days} Days</span>
                                    </P>
                                </div>
                                <div className="flex justify-between">
                                    <P className="text-left text-xs">
                                        Amount: {item.min_amount}.00 ~ {item.max_amount}.00
                                    </P>
                                    <P className={'ml-2  flex flex-shrink-0 items-center text-sm font-semibold !text-green-600'}>
                                        <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center !text-green-500" aria-hidden="true" />
                                        {item.daily_rate}% / Day
                                    </P>
                                </div>
                            </Section>
                        </button>
                    ))}
                </div>
            )}
        </Layout>
    );
}
