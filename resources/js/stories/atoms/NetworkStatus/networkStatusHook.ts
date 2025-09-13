import { checkNavigatorConnectionSpeed } from '@/helper/speedMeasure/navigator';
import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [navigatorSpeed, setNavigatorSpeed] = useState<number>(0);

    useEffect(() => {
        const measure = (): void => {
            const result: number | undefined = checkNavigatorConnectionSpeed();
            if (result) {
                setNavigatorSpeed(result);
            }
        };

        //initial call
        measure();

        const interval = setInterval(measure, 1000);

        return () => clearInterval(interval);
    });

    return {
        navigatorSpeed,
    };
};
