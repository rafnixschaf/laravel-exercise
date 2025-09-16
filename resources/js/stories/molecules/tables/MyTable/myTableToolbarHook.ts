import { GlobalDispatchContext } from '@/context/GlobalContext';
import { getMessagesFromInertia, getMessagesFromInertiaResponse } from '@/helper/getMessagesFromInertia';
import { ERROR_STATUS, SUCCESS_STATUS } from '@/types/IStatusMessageTypes';
import { useForm } from '@inertiajs/react';
import { useContext, useState } from 'react';
import { SET_STATUS_MESSAGE } from '@/types/global/GlobalContextReducer';

interface IUseTable {
    setSelected: (select: number[]) => void;
    selected: readonly number[];
    deleteUrl: string
}
export const useMyTableToolbar = ({ ...props }: IUseTable) => {
    const { delete: formDelete, transform } = useForm({ ids: [] });
    const globalDispatch = useContext(GlobalDispatchContext);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = (ids: readonly number[]): void => {
        setIsLoading(true);
        transform(() => ({ ids }));
        formDelete(props.deleteUrl, {
            onSuccess: (response) => {
                props.setSelected([]);
                setOpen(false);
                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertiaResponse(response), type: SUCCESS_STATUS } });
            },
            onError: (e) => {
                globalDispatch({ type: SET_STATUS_MESSAGE, payload: { message: getMessagesFromInertia(e), type: ERROR_STATUS } });
            },
            onFinish: () => setIsLoading(false),
        });
    };

    const handleCancel = () => {
        setOpen(false);
        props.setSelected([]);
    };

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        //@TODO temporary fix
        (e.currentTarget as HTMLButtonElement).blur();
        handleDelete(props.selected);
    };

    return {
        handleCancel,
        handleConfirm,
        open,
        setOpen,
        isLoading,
    };
};
