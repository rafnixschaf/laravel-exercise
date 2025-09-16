import * as React from 'react';
import { IOrder } from '@/types/IOrder';
import { ITableObject } from '@/stories/molecules/tables/MyTable/MyTable';
import { getComparator } from '@/stories/molecules/tables/MyTable/helper/helper';


interface IUseTable {
    data: ITableObject[];
}
export const useMyTable = ({data}: IUseTable) => {
    const [order, setOrder] = React.useState<IOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ITableObject>('id');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ITableObject) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n: ITableObject) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = React.useMemo(
        () => [...data].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [data, order, orderBy, page, rowsPerPage],
    );

    return {
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
        handleChangeRowsPerPage
    }
};
