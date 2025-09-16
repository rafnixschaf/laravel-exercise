import { MyAppLayout } from '@/layouts/app/AppLayout/MyAppLayout';
import { MyButton } from '@/stories/atoms/MyButton/MyButton';
import { useGenerateReportForm } from '@/stories/molecules/forms/hooks/generateReportFormHook';
import { ConfirmationModal } from '@/stories/molecules/modals/ConfirmationModal/ConfirmationModal';
import { NetworkModal } from '@/stories/molecules/modals/NetworkModal/NetworkModal';
import { INetwork } from '@/types';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { IRows, MyTable } from '@/stories/molecules/tables/MyTable/MyTable';
import { IHeadCell } from '@/stories/molecules/tables/MyTable/MyTableHead';
import { formatDownloadSpeed } from '@/helper/formatter';
import networkBulkController from '@/actions/App/Http/Controllers/NetworkBulkController';

interface INetworkPage {
    networks: INetwork[];
}

const headCells: readonly IHeadCell[] = [
    {
        id: 'location',
        numeric: false,
        disablePadding: true,
        label: 'Locations',
    },
    {
        id: 'quality_score',
        numeric: true,
        disablePadding: false,
        label: 'Quality',
    },
];

type RowMap = {
    location: string;
    quality_score: number;
};

const rows: IRows<RowMap, 'location' | 'quality_score'> = [
    {
        key: 'location',
    },
    {
        formatter: formatDownloadSpeed,
        key: 'quality_score',
    },
];

export default function Network({ networks }: INetworkPage) {
    const [openNetworkModal, setOpenNetworkModal] = useState(false);
    const [openReportModal, setOpenReportModal] = useState(false);
    const { submit, isLoading: isReportFormLoading } = useGenerateReportForm({onSuccess: () => setOpenReportModal(false)});

    return (
        <MyAppLayout>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} spacing={2} container justifyContent="flex-end">
                    <MyButton onClick={() => setOpenNetworkModal(true)}>Speed check</MyButton>
                    <MyButton onClick={() => setOpenReportModal(true)}>Send Report</MyButton>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <MyTable data={networks} headCells={headCells} rows={rows} deleteUrl={networkBulkController.destroy().url}/>
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
                    isLoading={isReportFormLoading}
                ></ConfirmationModal>
            </Grid>
        </MyAppLayout>
    );
}
