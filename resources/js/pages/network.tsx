import { MyAppLayout } from '@/layouts/app/AppLayout/MyAppLayout';
import { MyButton } from '@/stories/atoms/Button/MyButton';
import { useGenerateReportForm } from '@/stories/molecules/forms/hooks/generateReportFormHook';
import { ConfirmationModal } from '@/stories/molecules/modals/ConfirmationModal/ConfirmationModal';
import { NetworkModal } from '@/stories/molecules/modals/NetworkModal/NetworkModal';
import { NetworkTable } from '@/stories/molecules/NetworkTable/NetworkTable';
import { INetwork } from '@/types';
import { Grid } from '@mui/material';
import { useState } from 'react';

interface INetworkPage {
    networks: INetwork[];
}
export default function Network({ networks }: INetworkPage) {
    const [openNetworkModal, setOpenNetworkModal] = useState(false);
    const [openReportModal, setOpenReportModal] = useState(false);
    const { submit } = useGenerateReportForm({onSuccess: () => setOpenReportModal(false)});

    return (
        <MyAppLayout>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} spacing={2} container justifyContent="flex-end">
                    <MyButton onClick={() => setOpenNetworkModal(true)}>Speed check</MyButton>
                    <MyButton onClick={() => setOpenReportModal(true)}>Send Report</MyButton>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <NetworkTable data={networks} />
                </Grid>

                <NetworkModal open={openNetworkModal} setOpen={setOpenNetworkModal} />
                <ConfirmationModal
                    open={openReportModal}
                    setOpen={setOpenReportModal}
                    handleConfirm={submit}
                    content={'By confirming, a report will be generated from your entries and sent to your email.'}
                    handleCancel={() => {
                        setOpenReportModal(false);
                    }}
                ></ConfirmationModal>
            </Grid>
        </MyAppLayout>
    );
}
