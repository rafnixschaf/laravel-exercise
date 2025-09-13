import { logout } from '@/routes';
import { useMyDrawer } from '@/stories/molecules/MyDrawer/myDrawerHook';
import { Link } from '@inertiajs/react';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

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
                    {['Dashboard', 'Reports'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
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
