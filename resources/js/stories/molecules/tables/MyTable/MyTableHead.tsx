import { ITableObject } from '@/stories/molecules/tables/MyTable/MyTable';
import * as React from 'react';
import { IOrder } from '@/types/IOrder';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

export interface IHeadCell {
    disablePadding: boolean;
    id: keyof ITableObject;
    label: string;
    numeric: boolean;
}

interface ITableHead {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITableObject) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: IOrder;
    orderBy: string | number;
    rowCount: number;
    headCells: readonly IHeadCell[]
}


export const MyTableHead = (props: ITableHead) =>{
    const { headCells,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property: keyof ITableObject) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
