import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const MyAppBar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                    Network Data
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
