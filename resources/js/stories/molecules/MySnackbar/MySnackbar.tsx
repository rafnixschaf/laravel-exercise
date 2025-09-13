import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { useMySnackbar } from '@/stories/molecules/MySnackbar/mySnackbarHook';

export const MySnackbar = () => {
    const { handleClose, statusMessage } = useMySnackbar();

    if (!statusMessage) return null;

    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={!!statusMessage} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={statusMessage?.type} variant="filled" sx={{ width: '100%' }}>
                {statusMessage?.message}
            </Alert>
        </Snackbar>
    );
};
