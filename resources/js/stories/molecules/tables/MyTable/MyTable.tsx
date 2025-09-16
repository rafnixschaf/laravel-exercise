import { useMyTable } from '@/stories/molecules/tables/MyTable/myTableHook';
import { Box, Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IHeadCell, MyTableHead } from '@/stories/molecules/tables/MyTable/MyTableHead';
import Table from '@mui/material/Table';
import { MyTableToolbar } from '@/stories/molecules/tables/MyTable/MyTableToolbar';
import { v4 as uuidv4 } from 'uuid';

export interface ITableObject {
    id: number;
   [key: string]: any;
}
export type ITableFormatterAttributes = string | number | any[];

export interface IRowDefinition<M extends Record<string, ITableFormatterAttributes>, K extends keyof M> {
    key: string;
    formatter?:  (value: M[K]) => string;
}

export type IRows<M extends Record<string, ITableFormatterAttributes>, K extends keyof M> =
    Array<{ [P in K]: IRowDefinition<M, P> }[K]>;

export interface ITableData< M extends Record<string, ITableFormatterAttributes>,
    K extends keyof M> {
    data: ITableObject[];
    headCells: readonly IHeadCell[];
    rows: IRows<M, K>
    deleteUrl: string
    title?: string
}


export const MyTable = <
    M extends Record<string, ITableFormatterAttributes>,
    K extends keyof M
>({ ...props }: ITableData<M, K>) => {
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
    } = useMyTable({data: props.data});

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <MyTableToolbar selected={selected} setSelected={setSelected} deleteUrl={props.deleteUrl} title={props.title}/>
                <TableContainer>
                    <Table sx={{ minWidth: 250 }} aria-labelledby="tableTitle" size={'medium'}>
                        <MyTableHead
                            headCells={props.headCells}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}
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
                                        {
                                            props.rows.map((localRow, index) =>
                                                ( <TableCell
                                                    align={index >= props.rows.length -1 ? 'right': 'left'}
                                                    padding={index >= props.rows.length -1 ? "normal" : 'none'}
                                                    key={`${index}-${uuidv4()}`}
                                                    component="th" id={labelId}
                                                    scope="row"
                                                >
                                                    {localRow.formatter ? localRow.formatter(row[localRow.key]) : row[localRow.key]}
                                                </TableCell>)
                                            )
                                        }

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
                            {props.data.length === 0 && (
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
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
