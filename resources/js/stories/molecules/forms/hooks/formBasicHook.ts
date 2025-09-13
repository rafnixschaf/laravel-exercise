import { useContext } from 'react';
import { GlobalDispatchContext } from '@/context/GlobalContext';

export const useFormBasic = () => {
    const globalDispatch = useContext(GlobalDispatchContext);


    return {
        globalDispatch,
    }
};
