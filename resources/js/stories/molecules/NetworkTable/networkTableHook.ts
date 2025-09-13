import { GlobalDispatchContext } from '@/context/GlobalContext';
import { SET_STATUS_MESSAGE } from '@/context/globalContextReducer';
import { getMessagesFromInertia, getMessagesFromInertiaResponse } from '@/helper/getMessagesFromInertia';
import { ERROR_STATUS, SUCCESS_STATUS } from '@/types/IStatusMessageTypes';
import { useForm } from '@inertiajs/react';
import { useContext, useState } from 'react';

interface IUseNetworkTable {
    setSelected: (select: number[]) => void;
    selected: readonly number[];
}
export const useNetworkTable = ({ ...props }: IUseNetworkTable) => {
    const { delete: formDelete, transform } = useForm({ ids: [] });
    const globalDispatch = useContext(GlobalDispatchContext);
    const [open, setOpen] = useState(false);

    const handleDelete = (ids: readonly number[]): void => {
        transform(() => ({ ids }));
        formDelete('/networks', {
            onSuccess: (response) => {
                props.setSelected([]);
                setOpen(false);
                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertiaResponse(response), type: SUCCESS_STATUS } });
            },
            onError: (e) => {
                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertia(e), type: ERROR_STATUS } });
            },
        });
    };

    const handleCancel = () => {
        setOpen(false);
        props.setSelected([]);
    };

    const handleConfirm = () => {
        handleDelete(props.selected);
    };

    return {
        handleCancel,
        handleConfirm,
        open,
        setOpen,
    };
};
