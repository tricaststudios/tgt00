import BottomNavigation from '@/Components/AuthenticatedLayout/BottomNavigation';
import Sidebar from '@/Components/AuthenticatedLayout/Sidebar';
import TopNavigation from '@/Components/AuthenticatedLayout/TopNavigation';
import { useState } from 'react';

export default function Layout({ auth, children }) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="relative isolate min-h-screen bg-neutral-200 pb-24 dark:bg-neutral-900 lg:pb-0">
                <div className="flex">
                    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

                    <div className="flex w-0 flex-1 flex-col lg:pl-64">
                        <TopNavigation auth={auth} setShowSidebar={setShowSidebar} />

                        <div className="py-12">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <main className="flex-1 space-y-6">{children}</main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation auth={auth} setShowSidebar={setShowSidebar} />
        </>
    );
}
