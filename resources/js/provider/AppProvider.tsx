import { GlobalContext, GlobalDispatchContext } from '@/context/GlobalContext';
import { globalContextReducer } from '@/context/globalContextReducer';
import { useReducer } from 'react';


interface IAppProvider {
    children: React.ReactNode;
}
export const AppProvider = ({...props}: IAppProvider) => {
    const [globalContext, dispatch] = useReducer(globalContextReducer, { statusMessage: null });

    return (
        <GlobalContext.Provider value={globalContext}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {props.children}
            </GlobalDispatchContext.Provider>
        </GlobalContext.Provider>
    );
};
