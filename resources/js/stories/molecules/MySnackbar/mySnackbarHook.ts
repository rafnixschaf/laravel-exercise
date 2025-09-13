import { GlobalContext, GlobalDispatchContext } from '@/context/GlobalContext';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useContext} from 'react';
import { REMOVE_STATUS_MESSAGE } from '@/context/globalContextReducer';

export const useMySnackbar = () => {
    const { statusMessage } = useContext(GlobalContext);
    const dispatchGlobalContext = useContext(GlobalDispatchContext);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatchGlobalContext({type: REMOVE_STATUS_MESSAGE})
    };

    return {
        handleClose,
        statusMessage,
    };
};
