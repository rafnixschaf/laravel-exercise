import { MyAppLayout } from '@/layouts/app/AppLayout/MyAppLayout';
import { MyButton } from '@/stories/atoms/Button/MyButton';
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
                

            </Grid>
        </MyAppLayout>
    );
}
