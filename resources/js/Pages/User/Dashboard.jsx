import P from '@/Components/AuthenticatedLayout/P';
import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const posts = [
    { title: 'Boost your conversion rate', href: 'https://cointelegraph.com/tags/bitcoin', imageUrl: '/images/dashboard/crypto.jpg' },
    {
        title: 'Benefits of Holding Stocks for the Long-Term',
        href: 'https://www.investopedia.com/articles/investing/052216/4-benefits-holding-stocks-long-term.asp',
        imageUrl: '/images/dashboard/investment.jpeg',
    },
    // More posts...
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Dashboard" />

            <Alert
                type="info"
                message={
                    <a className="underline" target='_blank' href={route('terms')}>
                        Notice!: Please click here to see the terms and conditions.
                    </a>
                }
            />
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-5 gap-x-8 md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3">
                {posts.map((item, index) => (
                    <Section key={index}>
                        <a href={item.href} target="_blank">
                            <span className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="group relative">
                                        <P className="mt-8 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <span className="absolute inset-0" />
                                            {item.title}
                                        </P>
                                        {/* <p className="line-clamp-3 mt-5 text-sm leading-6 text-gray-600">{post.description}</p> */}
                                    </div>
                                </div>
                            </span>
                        </a>
                    </Section>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
