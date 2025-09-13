import { MyButton } from '@/stories/atoms/Button/MyButton';
import { style } from '@/stories/molecules/modals/ConfirmationModal/style';
import { MyModal } from '@/stories/molecules/modals/MyModal/MyModal';
import { Box, Grid, Stack, Typography } from '@mui/material';

interface IConfirmationModal {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancel: () => void;
    content?: string;
    cancelLabel?: string;
    confirmLabel?: string;
}
export const ConfirmationModal = ({
    content = 'Are you sure you want to delete the data?',
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    ...props
}: IConfirmationModal) => {
    return (
        <MyModal open={props.open} setOpen={props.setOpen}>
            <Box sx={style}>
                <Grid container spacing={2} flexDirection="column" width="100%">
                    <Typography variant="h5" gutterBottom  mb={4}>
                        {content}
                    </Typography>
                    <Stack direction="row" justifyContent={'flex-end'} spacing={2}>
                        <MyButton color={'cancel'} onClick={props.handleCancel}>
                            {cancelLabel}
                        </MyButton>
                        <MyButton onClick={props.handleConfirm}>{confirmLabel}</MyButton>
                    </Stack>
                </Grid>
            </Box>
        </MyModal>
    );
};
