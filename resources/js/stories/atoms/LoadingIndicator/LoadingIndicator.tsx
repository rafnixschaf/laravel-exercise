import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface ILoadingIndicator {
    isLoading?: boolean;
}
export const LoadingIndicator = ({isLoading}: ILoadingIndicator) => {
    if(!isLoading) return null;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress color={'secondary'} size={20} />
        </Box>
    );
}
