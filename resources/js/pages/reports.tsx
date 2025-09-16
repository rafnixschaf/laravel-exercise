import reportBulkController from '@/actions/App/Http/Controllers/ReportBulkController';
import { formateDate, formatNetworkData } from '@/helper/formatter';
import { MyAppLayout } from '@/layouts/app/AppLayout/MyAppLayout';
import { MyButton } from '@/stories/atoms/MyButton/MyButton';
import { IRows, MyTable } from '@/stories/molecules/tables/MyTable/MyTable';
import { IHeadCell } from '@/stories/molecules/tables/MyTable/MyTableHead';
import { INetwork, IReport } from '@/types';
import { Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

interface IReportPage {
    reports: IReport[];
}

const headCells: readonly IHeadCell[] = [
    {
        id: 'created_at',
        numeric: false,
        disablePadding: true,
        label: 'Created',
    },
    {
        id: 'networks',
        numeric: true,
        disablePadding: false,
        label: 'Locations',
    },
];

type RowMap = {
    created_at: string;
    networks: INetwork[];
};

const rows: IRows<RowMap, 'created_at' | 'networks'> = [
    {
        key: 'created_at',
        formatter: formateDate,
    },
    {
        formatter: formatNetworkData,
        key: 'networks',
    },
];

export default function Reports({ reports }: IReportPage) {
    return (
        <MyAppLayout>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} spacing={2} container justifyContent="flex-end">
                    <Tooltip title={'Not implemented yet'}>
                        <span>
                            <MyButton disabled color={'primary'}>
                                Resend Report
                            </MyButton>
                        </span>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <MyTable data={reports} headCells={headCells} rows={rows} deleteUrl={reportBulkController.destroy().url} title={'Reports'} />
                </Grid>
            </Grid>
        </MyAppLayout>
    );
}
