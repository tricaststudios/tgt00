import Section from '@/Components/AuthenticatedLayout/Section';
import UpdateWalletAddressForm from '@/Components/Profile/UpdateWalletAddressForm';
import VerificationForm from '@/Components/Profile/VerificationForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from '../../Components/Profile/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status, verification }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Profile" />

            <Section>
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
            </Section>

            <Section>
                <UpdateWalletAddressForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
            </Section>

            <Section>
                <VerificationForm status={status} verification={verification} className="max-w-xl" />
            </Section>
        </Authenticated>
    );
}
