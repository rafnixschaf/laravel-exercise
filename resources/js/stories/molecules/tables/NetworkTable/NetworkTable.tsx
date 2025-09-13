import { INetwork } from '@/types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { formatDownloadSpeed } from '@/helper/formatDownloadSpeed';
import { useNetworkTable } from '@/stories/molecules/tables/NetworkTable/hooks/networkTableHook';
import { NetworkTableHead } from '@/stories/molecules/tables/NetworkTable/NetworkTableHead';
import { NetworkTableToolbar } from '@/stories/molecules/tables/NetworkTable/NetworkTableToolbar';

export interface INetworkTableData {
    id: number;
    quality_score: number;
    location: string;
}

interface INetworkTable {
    data: INetwork[];
}
export const NetworkTable = ({ data }: INetworkTable) => {
    const {
        order,
        orderBy,
        selected,
        page,
        rowsPerPage,
        emptyRows,
        visibleRows,
        handleRequestSort,
        handleSelectAllClick,
        handleClick,
        setSelected,
        handleChangePage,
        handleChangeRowsPerPage,
    } = useNetworkTable({ data });

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <NetworkTableToolbar selected={selected} setSelected={setSelected} />
                <TableContainer>
                    <Table sx={{ minWidth: 250 }} aria-labelledby="tableTitle" size={'medium'}>
                        <NetworkTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.location}
                                        </TableCell>
                                        <TableCell align="right">{formatDownloadSpeed(row.quality_score)}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={2} />
                                </TableRow>
                            )}
                            {data.length === 0 && (
                                <TableCell colSpan={3} align={'center'}>
                                    No data available
                                </TableCell>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
