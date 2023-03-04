import Section from '@/Components/AuthenticatedLayout/Section';
import Alert from '@/Components/Common/Alert';
import UpdateWalletAddressForm from '@/Components/Profile/UpdateWalletAddressForm';
import VerificationForm from '@/Components/Profile/VerificationForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from '../../Components/Profile/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status, verification }) {
    return (
        <Authenticated auth={auth}>
            <Head title="Profile" />

            {verification?.status === 'approved' && <Alert type="success" title="Account is fully verified." />}

            <Section>
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
            </Section>

            <Section>
                <UpdateWalletAddressForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
            </Section>

            {verification?.status === 'pending' && <Alert type="warning" title="Verification is ongoing." />}
            {verification?.status === 'declined' && <Alert type="warning" title="Verification failed." message={verification.remarks} />}
            {verification?.status !== 'approved' && (
                <Section>
                    <VerificationForm status={status} verification={verification} className="max-w-xl" />
                </Section>
            )}
        </Authenticated>
    );
}
