import * as React from 'react';
import { IOrder } from '@/types/IOrder';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

interface IData {
    id: number;
    quality_score: number;
    location: string;
}


interface IHeadCell {
    disablePadding: boolean;
    id: keyof IData;
    label: string;
    numeric: boolean;
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
interface INetworkTableHead {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: IOrder;
    orderBy: string;
    rowCount: number;
}

export const NetworkTableHead = (props: INetworkTableHead)=> {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
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
);
}
