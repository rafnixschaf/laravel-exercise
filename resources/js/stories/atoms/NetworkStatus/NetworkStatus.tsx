import ReactSpeedometer from "react-d3-speedometer"
import { useNetworkStatus } from '@/stories/atoms/NetworkStatus/networkStatusHook';
import { forwardRef, useImperativeHandle } from 'react';
import { useTheme } from '@mui/material';

export interface INetworkStatus {
    getSpeed: () => number
}

export const NetworkStatus = forwardRef<INetworkStatus>((_, ref) => {
    const {navigatorSpeed} = useNetworkStatus()
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        getSpeed: () => navigatorSpeed
    }))

    return <ReactSpeedometer
        textColor={theme.palette.text.primary}
        minValue={0}
        maxValue={15}
        value={navigatorSpeed}
        height={200}
        currentValueText={'${value} Mbit/s'}/>

})
