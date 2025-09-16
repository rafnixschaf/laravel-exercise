import { IGlobalContext } from '@/types/IGlobalContext';
import { createContext } from 'react';
import { IGlobalAction } from '@/types/global/GlobalContextReducer';


export const GlobalContext = createContext<IGlobalContext>({
    statusMessage: null,
});

export const GlobalDispatchContext = createContext<React.Dispatch<IGlobalAction>>(() => {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
});
