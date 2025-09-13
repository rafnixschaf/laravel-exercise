import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { ConfirmationModal } from '@/stories/molecules/modals/ConfirmationModal/ConfirmationModal';
import { useNetworkTableToolbar } from '@/stories/molecules/tables/NetworkTable/hooks/networkTableToolbarHook';

interface INetworkTableToolbar {
    selected: readonly number[];
    setSelected: (select: number[]) => void;
}
export const NetworkTableToolbar = ({ ...props }: INetworkTableToolbar) => {
    const { selected } = props;
    const { handleConfirm, handleCancel, open, setOpen, isLoading } = useNetworkTableToolbar({ setSelected: props.setSelected, selected });

    return (
        <>
            <Toolbar
                sx={[
                    {
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    },
                    selected.length > 0 && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    },
                ]}
            >
                {selected.length > 0 ? (
                    <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                    </Typography>
                ) : (
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        Saved Locations
                    </Typography>
                )}
                {selected.length > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setOpen(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Toolbar>
            <ConfirmationModal
                open={open}
                setOpen={setOpen}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                isLoading={isLoading}
            ></ConfirmationModal>
        </>
    );
};
