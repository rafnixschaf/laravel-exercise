import { logout } from '@/routes';
import { useMyDrawer } from '@/stories/molecules/MyDrawer/myDrawerHook';
import { Link } from '@inertiajs/react';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import reportController from '@/actions/App/Http/Controllers/ReportController';
import networkController from '@/actions/App/Http/Controllers/NetworkController';

const drawerWidth = 240;

export const MyDrawer = () => {
    const { isMobile, handleLogout } = useMyDrawer();

    return (
        <Drawer
            variant={ isMobile ? 'temporary' : 'permanent'}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href={networkController.index().url}>
                            <ListItemIcon><MapIcon /></ListItemIcon>
                            <ListItemText primary={'Locations'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} href={reportController.index().url}>
                            <ListItemIcon><AssignmentIcon /></ListItemIcon>
                            <ListItemText primary={'Reports'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <Link href={logout()} as="button">
                                Log out
                            </Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};
