import { ChartBarSquareIcon, HomeIcon, ListBulletIcon, ServerIcon, UserIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function BottomNavigation({ auth }) {
    const navigation = [
        { name: 'Home', href: route('dashboard'), icon: HomeIcon, current: route().current('dashboard') },
        { name: 'Mining', href: route('miners.index'), icon: ServerIcon, current: route().current('miners.index') },
        { name: 'Market', href: route('markets.index'), icon: ChartBarSquareIcon, current: route().current('markets.index') },
        { name: 'Txs', href: route('user.wallet.index'), icon: ListBulletIcon, current: route().current('user.wallet.*') || route().current('user.deposits.*') || route().current('user.withdrawals.*') },
        { name: 'Account', href: route('user.profile.edit'), icon: UserIcon, current: route().current('user.profile.edit') },
    ];

    function ButtonLink({ item }) {
        return (
            <Link
                href={item.href}
                className={clsx(
                    item.current ? 'bg-neutral-600 text-white' : 'hover:bg-neutral-600 hover:text-white ',
                    'flex flex-1 flex-col items-center justify-center rounded-lg text-neutral-700 focus:outline-none dark:text-neutral-300',
                )}
            >
                <item.icon className="h-6 w-6" aria-hidden="true" />
                <p>{item.name}</p>
            </Link>
        );
    }

    return (
        <nav className="fixed right-0 left-0 bottom-0 z-40 border-t bg-white px-2 py-3 shadow-purple-100 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none sm:px-32 lg:hidden">
            <div className="flex h-16 justify-between gap-5">
                {navigation.map(item => (
                    <ButtonLink key={item.name} item={item} />
                ))}
            </div>
        </nav>
    );
}
