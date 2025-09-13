import React from 'react';
import { MyAppBar } from '@/stories/molecules/MyAppBar/MyAppBar';
import { MyDrawer } from '@/stories/molecules/MyDrawer/MyDrawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { MySnackbar } from '@/stories/molecules/MySnackbar/MySnackbar';

interface IMyAppLayout {
    children: React.ReactNode;
}
export const MyAppLayout = ({ ...props }: IMyAppLayout) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <MyAppBar></MyAppBar>
            <MyDrawer></MyDrawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar sx={{ backgroundColor: 'transparent' }} />
                {props.children}
            </Box>
            <MySnackbar></MySnackbar>
        </Box>
    );
};
